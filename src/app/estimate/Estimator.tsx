"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { IconArrowRight, IconCheck, IconUpload, IconPhone, IconWhatsapp } from "@/components/icons";
import { siteConfig } from "@/lib/site-config";
import { trackEvent } from "@/lib/analytics";
import {
  addOnsByGroup,
  customerTypes,
  estimatorCategories,
  getEstimatorService,
  groupLabels,
  isQuestionVisible,
  presetQuestionIds,
  questionSets,
  servicesInCategory,
  type EstimatorQuestion,
  type EstimatorService,
} from "@/lib/estimator-data";
import { getServiceBySlug } from "@/lib/services-data";
import {
  computeEstimate,
  formatGYD,
  makeEstimateReference,
  type EstimateResult,
} from "@/lib/estimator-pricing";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const STEPS = ["Customer", "Service", "Job Details", "Options", "Estimate", "Request Quote"] as const;
const TOTAL_STEPS = STEPS.length;

const STORAGE_KEY = "cdcs-estimator-v1";
const MAX_FILE_BYTES = 10 * 1024 * 1024;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type AnswerValue = string | string[] | boolean;
type Answers = Record<string, AnswerValue>;

interface WizardState {
  step: number;
  customerType: string | null;
  serviceId: string | null;
  answers: Answers;
  addOns: string[];
  estimatorNotes: string;
  reference: string | null;
}

const INITIAL_STATE: WizardState = {
  step: 1,
  customerType: null,
  serviceId: null,
  answers: {},
  addOns: [],
  estimatorNotes: "",
  reference: null,
};

type LeadStatus = "idle" | "submitting" | "success" | "error" | "email_opened";

/**
 * Read any saved progress from localStorage. Runs in the lazy `useState`
 * initializer — server-safe (returns INITIAL_STATE when there is no window)
 * and never throws.
 */
function loadInitialState(): WizardState {
  if (typeof window === "undefined") return INITIAL_STATE;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL_STATE;
    const saved = JSON.parse(raw) as Partial<WizardState>;
    if (!saved || typeof saved !== "object") return INITIAL_STATE;
    const serviceOk = !saved.serviceId || Boolean(getEstimatorService(saved.serviceId));
    return {
      ...INITIAL_STATE,
      ...saved,
      step: serviceOk ? Math.min(Math.max(Number(saved.step) || 1, 1), TOTAL_STEPS) : 1,
      serviceId: serviceOk ? saved.serviceId ?? null : null,
      answers: (saved.answers as Answers) ?? {},
      addOns: Array.isArray(saved.addOns) ? saved.addOns : [],
      estimatorNotes: typeof saved.estimatorNotes === "string" ? saved.estimatorNotes : "",
      reference: typeof saved.reference === "string" ? saved.reference : null,
    };
  } catch {
    return INITIAL_STATE;
  }
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function Estimator() {
  const [state, setState] = useState<WizardState>(loadInitialState);
  const [mounted, setMounted] = useState(false);
  const [stepError, setStepError] = useState<string>("");
  const [openCategory, setOpenCategory] = useState<string | null>(
    () => getEstimatorService(state.serviceId)?.category ?? null,
  );
  const [photos, setPhotos] = useState<File[]>([]);
  const [photoError, setPhotoError] = useState<string>("");
  const startedRef = useRef(false);
  const topRef = useRef<HTMLDivElement>(null);

  const addPhotos = useCallback((list: FileList | null) => {
    if (!list) return;
    const problems: string[] = [];
    const accepted: File[] = [];
    for (const f of Array.from(list)) {
      if (f.size > MAX_FILE_BYTES) problems.push(`${f.name} is over 10MB`);
      else if (!f.type.startsWith("image/") && f.type !== "application/pdf") problems.push(`${f.name} is not an image or PDF`);
      else accepted.push(f);
    }
    setPhotoError(problems.join("; "));
    setPhotos((prev) => {
      const seen = new Set(prev.map((p) => p.name + p.size));
      return [...prev, ...accepted.filter((f) => !seen.has(f.name + f.size))];
    });
  }, []);

  const removePhoto = useCallback((idx: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== idx));
  }, []);

  // Single mount flag so the prerendered markup and the first client render
  // match (both show the skeleton) before any restored progress is painted.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-shot mount gate to avoid a hydration mismatch on restored progress
    setMounted(true);
  }, []);

  // Persist progress (photos are never serialized).
  useEffect(() => {
    if (!mounted) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* storage full or blocked — non-fatal */
    }
  }, [state, mounted]);

  // Fire estimator_started once, after mount.
  useEffect(() => {
    if (startedRef.current || !mounted) return;
    startedRef.current = true;
    trackEvent("estimator_started");
  }, [mounted]);

  const service = useMemo(() => getEstimatorService(state.serviceId), [state.serviceId]);
  const group = service?.group ?? null;
  const questions = useMemo(() => (group ? questionSets[group] : []), [group]);
  const groupAddOns = useMemo(() => (group ? addOnsByGroup[group] : []), [group]);
  // Questions fixed by the chosen service — seeded, not asked.
  const hiddenIds = useMemo(() => presetQuestionIds(service), [service]);
  const visibleQuestions = useMemo(
    () => questions.filter((q) => !hiddenIds.includes(q.id) && isQuestionVisible(q, state.answers)),
    [questions, hiddenIds, state.answers],
  );

  const result: EstimateResult | null = useMemo(() => {
    if (!service || !group) return null;
    return computeEstimate({
      serviceId: service.id,
      group,
      answers: state.answers,
      selectedAddOnIds: state.addOns,
    });
  }, [service, group, state.answers, state.addOns]);

  const patch = useCallback((next: Partial<WizardState>) => {
    setStepError("");
    setState((prev) => ({ ...prev, ...next }));
  }, []);

  const setAnswer = useCallback((id: string, value: AnswerValue) => {
    setStepError("");
    setState((prev) => ({ ...prev, answers: { ...prev.answers, [id]: value } }));
  }, []);

  const scrollToTop = useCallback(() => {
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  // ---- Navigation ----

  function validateCurrentStep(): string {
    if (state.step === 1 && !state.customerType) return "Choose a customer type to continue.";
    if (state.step === 2 && !state.serviceId) return "Choose the service you need an estimate for.";
    if (state.step === 3) {
      for (const q of visibleQuestions) {
        if (q.optional) continue;
        const v = state.answers[q.id];
        if (q.type === "boolean") continue; // defaults to "No"
        if (q.type === "multiselect") {
          if (!Array.isArray(v) || v.length === 0) return `Answer "${q.label}" to continue.`;
        } else if (q.type === "number") {
          const s = String(v ?? "").trim();
          if (s === "" || !Number.isFinite(Number(s)) || Number(s) < (q.min ?? 0)) {
            return `Enter a valid value for "${q.label}".`;
          }
        } else if (!String(v ?? "").trim()) {
          return `Answer "${q.label}" to continue.`;
        }
      }
    }
    return "";
  }

  function goNext() {
    const err = validateCurrentStep();
    if (err) {
      setStepError(err);
      return;
    }
    let nextStep = state.step + 1;
    if (nextStep > TOTAL_STEPS) nextStep = TOTAL_STEPS;

    const updates: Partial<WizardState> = { step: nextStep };
    if (nextStep === 5 && !state.reference) {
      updates.reference = makeEstimateReference();
    }
    patch(updates);

    if (nextStep === 5 && result) {
      trackEvent("estimator_completed", {
        service_category: service?.category,
        service_id: service?.id,
        ...result.analytics,
        outcome: result.kind,
      });
    }
    scrollToTop();
  }

  function goBack() {
    if (state.step <= 1) return;
    patch({ step: state.step - 1 });
    scrollToTop();
  }

  function resetAll() {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
    setState(INITIAL_STATE);
    setStepError("");
    setOpenCategory(null);
    setPhotos([]);
    setPhotoError("");
    scrollToTop();
  }

  function selectService(id: string) {
    const svc = getEstimatorService(id);
    // Seed the answers this specific service fixes, and clear everything else
    // so a value from a previously-chosen service can never carry over.
    patch({
      serviceId: id,
      answers: { ...(svc?.presetAnswers ?? {}) },
      addOns: [],
      reference: null,
    });
    setOpenCategory(svc?.category ?? null);
    setPhotos([]);
    setPhotoError("");
    trackEvent("estimator_service_selected", {
      service_category: svc?.category,
      service_id: svc?.id,
    });
  }

  // ---- WhatsApp deep link (shared by result + confirmation) ----
  const whatsappHref = useMemo(() => {
    const outcome = describeOutcome(result);
    const location = locationFromAnswers(questions, state.answers) || "To be confirmed";
    const figureLine =
      result?.kind === "estimated_range"
        ? `Estimated Range: ${outcome}`
        : result?.kind === "estimated_price"
          ? `Preliminary Estimate: ${outcome}`
          : `Estimate: ${outcome}`;
    const msg =
      `Hello CDCS Inc. I completed the website estimator and would like an official quotation.\n\n` +
      `Estimate Reference: ${state.reference ?? "(pending)"}\n` +
      `Service: ${service?.label ?? "-"}\n` +
      `${figureLine}\n` +
      `Location: ${location}\n` +
      `Preferred Date: Flexible`;
    return siteConfig.contact.whatsappHrefWithMessage(msg);
  }, [result, service, state.reference, state.answers, questions]);

  if (!mounted) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center text-sm text-slate-500 shadow-sm">
        Loading the estimator…
      </div>
    );
  }

  return (
    <div ref={topRef} className="scroll-mt-24">
      <ProgressBar current={state.step} />

      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
        {state.step === 1 && (
          <StepShell title="Who is this estimate for?" subtitle="This helps us frame the estimate the right way.">
            <div className="grid gap-3 sm:grid-cols-2">
              {customerTypes.map((c) => (
                <OptionButton
                  key={c.id}
                  selected={state.customerType === c.id}
                  onClick={() => patch({ customerType: c.id })}
                >
                  {c.label}
                </OptionButton>
              ))}
            </div>
          </StepShell>
        )}

        {state.step === 2 && (
          <StepShell
            title="Which service do you need?"
            subtitle={
              openCategory
                ? "Pick the closest match — you can add detail on the next step."
                : "Choose a service family first, then the specific service."
            }
          >
            {!openCategory ? (
              <div className="grid gap-2.5 sm:grid-cols-2">
                {estimatorCategories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setOpenCategory(category)}
                    className="flex items-center justify-between gap-3 rounded-lg border-2 border-slate-200 px-4 py-4 text-left text-sm font-bold text-navy-900 transition-colors hover:border-brand-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
                  >
                    <span>{category}</span>
                    <span className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                      {servicesInCategory(category).length}
                      <IconArrowRight className="h-4 w-4 text-brand-600" />
                    </span>
                  </button>
                ))}
              </div>
            ) : (
              <div>
                <button
                  type="button"
                  onClick={() => setOpenCategory(null)}
                  className="mb-4 inline-flex items-center gap-1.5 text-sm font-bold text-brand-600 hover:underline"
                >
                  <span aria-hidden>&larr;</span> All service families
                </button>
                <p className="mb-2.5 text-xs font-bold uppercase tracking-[0.14em] text-brand-600">
                  {openCategory}
                </p>
                <div className="grid gap-2 sm:grid-cols-2">
                  {servicesInCategory(openCategory).map((s) => (
                    <OptionButton
                      key={s.id}
                      selected={state.serviceId === s.id}
                      onClick={() => selectService(s.id)}
                      small
                    >
                      {s.label}
                    </OptionButton>
                  ))}
                </div>
              </div>
            )}
          </StepShell>
        )}

        {state.step === 3 && service && (
          <StepShell
            title={`Job details — ${service.label}`}
            subtitle={`A few questions about this ${groupLabels[service.group].toLowerCase()} job. Only what's relevant is shown.`}
          >
            {hiddenIds.length > 0 && (
              <p className="mb-4 rounded-lg bg-brand-50 px-4 py-2.5 text-sm text-brand-800">
                This estimate is for <strong>{presetSummary(service)}</strong> — set by your service choice.
              </p>
            )}
            <div className="space-y-5">
              {visibleQuestions.map((q) => (
                <QuestionField
                  key={q.id}
                  question={q}
                  value={state.answers[q.id]}
                  onChange={(v) => setAnswer(q.id, v)}
                />
              ))}
            </div>
          </StepShell>
        )}

        {state.step === 4 && service && (
          <StepShell
            title="Optional add-ons"
            subtitle="Add anything else you'd like included. Everything here is optional."
          >
            {groupAddOns.length > 0 ? (
              <div className="space-y-2.5">
                {groupAddOns.map((a) => {
                  const checked = state.addOns.includes(a.id);
                  return (
                    <label
                      key={a.id}
                      className={`flex cursor-pointer items-start gap-3 rounded-lg border-2 px-4 py-3 text-sm transition-colors ${
                        checked ? "border-brand-600 bg-brand-50" : "border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <input
                        type="checkbox"
                        className="mt-0.5 h-4 w-4 accent-brand-600"
                        checked={checked}
                        onChange={(e) =>
                          patch({
                            addOns: e.target.checked
                              ? [...state.addOns, a.id]
                              : state.addOns.filter((x) => x !== a.id),
                          })
                        }
                      />
                      <span className="font-semibold text-navy-900">{a.label}</span>
                    </label>
                  );
                })}
              </div>
            ) : (
              <p className="rounded-lg bg-slate-50 px-4 py-3 text-sm text-slate-600">
                No standard add-ons for this service — tell us anything extra in the notes below.
              </p>
            )}

            <label className="mt-5 block">
              <span className="mb-1.5 block text-sm font-bold text-navy-900">
                Anything else we should know? <span className="font-normal text-slate-500">(optional)</span>
              </span>
              <textarea
                rows={3}
                className={inputClass}
                value={state.estimatorNotes}
                onChange={(e) => patch({ estimatorNotes: e.target.value })}
                placeholder="Access constraints, deadlines, specific problem areas, or anything unusual about the job."
              />
            </label>
          </StepShell>
        )}

        {state.step === 5 && service && result && (
          <ResultScreen
            reference={state.reference}
            customerTypeLabel={customerTypes.find((c) => c.id === state.customerType)?.label ?? "-"}
            service={service}
            questions={questions}
            answers={state.answers}
            addOnLabels={selectedAddOnLabels(service.group, state.addOns)}
            estimatorNotes={state.estimatorNotes}
            result={result}
            whatsappHref={whatsappHref}
            photos={photos}
            onAddPhotos={addPhotos}
            onRemovePhoto={removePhoto}
            photoError={photoError}
            onRequestQuote={() => {
              patch({ step: 6 });
              scrollToTop();
            }}
          />
        )}

        {state.step === 6 && service && result && (
          <LeadForm
            reference={state.reference}
            customerTypeLabel={customerTypes.find((c) => c.id === state.customerType)?.label ?? "-"}
            service={service}
            questions={questions}
            answers={state.answers}
            addOnLabels={selectedAddOnLabels(service.group, state.addOns)}
            estimatorNotes={state.estimatorNotes}
            result={result}
            defaultLocation={locationFromAnswers(questions, state.answers)}
            whatsappHref={whatsappHref}
            photos={photos}
            onAddPhotos={addPhotos}
            onRemovePhoto={removePhoto}
            photoError={photoError}
          />
        )}

        {stepError && (
          <p role="alert" className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
            {stepError}
          </p>
        )}

        {/* Wizard controls — hidden on the lead-capture step, which has its own submit. */}
        {state.step !== 6 && (
          <div className="mt-7 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-6">
            <div className="flex gap-3">
              {state.step > 1 && (
                <button
                  type="button"
                  onClick={goBack}
                  className="rounded-md border-2 border-navy-800 px-5 py-2.5 text-sm font-bold text-navy-900 transition-colors hover:bg-navy-900 hover:text-white"
                >
                  Back
                </button>
              )}
              <button
                type="button"
                onClick={resetAll}
                className="rounded-md px-3 py-2.5 text-sm font-semibold text-slate-500 hover:text-red-600 hover:underline"
              >
                Reset estimate
              </button>
            </div>

            {state.step < 5 && (
              <button
                type="button"
                onClick={goNext}
                className="inline-flex items-center gap-2 rounded-md bg-accent-500 px-6 py-3 text-sm font-bold text-navy-950 transition-colors hover:bg-accent-600"
              >
                Continue
                <IconArrowRight className="h-4 w-4" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Progress bar
// ---------------------------------------------------------------------------

function ProgressBar({ current }: { current: number }) {
  const pct = Math.round(((current - 1) / (TOTAL_STEPS - 1)) * 100);
  return (
    <div>
      <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
        <span>
          Step {current} of {TOTAL_STEPS}
        </span>
        <span className="text-navy-900">{STEPS[current - 1]}</span>
      </div>
      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-200" aria-hidden>
        <div
          className="h-full rounded-full bg-accent-500 transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
      <ol className="mt-3 hidden grid-cols-6 gap-1 sm:grid">
        {STEPS.map((label, i) => {
          const n = i + 1;
          const done = n < current;
          const active = n === current;
          return (
            <li
              key={label}
              className={`flex items-center gap-1.5 text-[11px] font-semibold ${
                active ? "text-navy-900" : done ? "text-brand-600" : "text-slate-400"
              }`}
            >
              <span
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] ${
                  active
                    ? "bg-navy-900 text-white"
                    : done
                      ? "bg-brand-600 text-white"
                      : "bg-slate-200 text-slate-500"
                }`}
              >
                {done ? <IconCheck className="h-3 w-3" /> : n}
              </span>
              <span className="truncate">{label}</span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Shared UI
// ---------------------------------------------------------------------------

const inputClass =
  "w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-sm text-navy-900 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100";

function StepShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <h2 className="text-xl font-bold text-navy-900 sm:text-2xl">{title}</h2>
      {subtitle && <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{subtitle}</p>}
      <div className="mt-5">{children}</div>
    </div>
  );
}

function OptionButton({
  selected,
  onClick,
  children,
  small,
}: {
  selected: boolean;
  onClick: () => void;
  children: ReactNode;
  small?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`flex min-h-[44px] items-center justify-between gap-2 rounded-lg border-2 text-left font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 ${
        small ? "px-3.5 py-2.5 text-sm" : "px-4 py-3.5 text-sm"
      } ${
        selected
          ? "border-brand-600 bg-brand-50 text-brand-700 ring-1 ring-brand-600"
          : "border-slate-200 text-navy-900 hover:border-slate-300"
      }`}
    >
      <span>{children}</span>
      {selected && <IconCheck className="h-4 w-4 shrink-0 text-brand-600" />}
    </button>
  );
}

function QuestionField({
  question: q,
  value,
  onChange,
}: {
  question: EstimatorQuestion;
  value: AnswerValue | undefined;
  onChange: (v: AnswerValue) => void;
}) {
  const labelNode = (
    <span className="mb-1.5 block text-sm font-bold text-navy-900">
      {q.label} {q.optional && <span className="font-normal text-slate-500">(optional)</span>}
    </span>
  );

  if (q.type === "boolean") {
    const v = value === true;
    return (
      <div>
        <span className="mb-1.5 block text-sm font-bold text-navy-900">{q.label}</span>
        <div className="flex gap-2" role="group" aria-label={q.label}>
          {[
            { label: "Yes", val: true },
            { label: "No", val: false },
          ].map((opt) => (
            <button
              key={opt.label}
              type="button"
              onClick={() => onChange(opt.val)}
              aria-pressed={v === opt.val}
              className={`min-h-[44px] min-w-[84px] rounded-md border-2 px-5 py-2.5 text-sm font-bold transition-colors ${
                v === opt.val
                  ? "border-brand-600 bg-brand-50 text-brand-700 ring-1 ring-brand-600"
                  : "border-slate-200 text-slate-600 hover:border-slate-300"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (q.type === "select") {
    return (
      <label className="block">
        {labelNode}
        <select
          className={inputClass}
          value={typeof value === "string" ? value : ""}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="" disabled>
            Select an option
          </option>
          {q.options?.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </label>
    );
  }

  if (q.type === "multiselect") {
    const arr = Array.isArray(value) ? value : [];
    return (
      <div>
        {labelNode}
        <div className="flex flex-wrap gap-2">
          {q.options?.map((o) => {
            const on = arr.includes(o);
            return (
              <button
                key={o}
                type="button"
                onClick={() => onChange(on ? arr.filter((x) => x !== o) : [...arr, o])}
                aria-pressed={on}
                className={`min-h-[40px] rounded-full border-2 px-4 py-2 text-sm font-semibold transition-colors ${
                  on
                    ? "border-brand-600 bg-brand-50 text-brand-700 ring-1 ring-brand-600"
                    : "border-slate-200 text-slate-600 hover:border-slate-300"
                }`}
              >
                {o}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  if (q.type === "number") {
    return (
      <label className="block">
        {labelNode}
        <div className="flex items-center gap-2">
          <input
            type="number"
            inputMode="numeric"
            min={q.min ?? 0}
            className={`${inputClass} max-w-[200px]`}
            value={typeof value === "string" ? value : ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder={q.placeholder}
          />
          {q.unit && <span className="text-sm text-slate-500">{q.unit}</span>}
        </div>
      </label>
    );
  }

  if (q.type === "textarea") {
    return (
      <label className="block">
        {labelNode}
        <textarea
          rows={4}
          className={inputClass}
          value={typeof value === "string" ? value : ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={q.placeholder}
        />
      </label>
    );
  }

  // text
  return (
    <label className="block">
      {labelNode}
      <input
        type="text"
        className={inputClass}
        value={typeof value === "string" ? value : ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={q.placeholder}
      />
    </label>
  );
}

// ---------------------------------------------------------------------------
// Result screen
// ---------------------------------------------------------------------------

interface SummaryProps {
  reference: string | null;
  customerTypeLabel: string;
  service: EstimatorService;
  questions: EstimatorQuestion[];
  answers: Answers;
  addOnLabels: string[];
  estimatorNotes: string;
  result: EstimateResult;
}

interface PhotoProps {
  photos: File[];
  onAddPhotos: (list: FileList | null) => void;
  onRemovePhoto: (idx: number) => void;
  photoError: string;
}

function PhotoUpload({
  photos,
  onAddPhotos,
  onRemovePhoto,
  photoError,
  hint,
}: PhotoProps & { hint: string }) {
  return (
    <div>
      <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-center transition-colors hover:border-brand-400">
        <IconUpload className="h-6 w-6 text-slate-400" />
        <span className="text-sm font-semibold text-slate-600">Add photos</span>
        <span className="text-xs text-slate-400">{hint}</span>
        <span className="text-[11px] text-slate-400">JPG, PNG, or PDF — up to 10MB each, multiple allowed</span>
        <input
          type="file"
          accept="image/*,.pdf"
          multiple
          className="hidden"
          onChange={(e) => {
            onAddPhotos(e.target.files);
            e.target.value = "";
          }}
        />
      </label>
      {photoError && <span className="mt-1 block text-xs font-semibold text-red-600">{photoError}</span>}
      {photos.length > 0 && (
        <ul className="mt-2 space-y-1.5">
          {photos.map((f, i) => (
            <li
              key={f.name + f.size + i}
              className="flex items-center justify-between gap-3 rounded-md bg-slate-50 px-3 py-2 text-xs"
            >
              <span className="truncate text-slate-700">{f.name}</span>
              <button
                type="button"
                onClick={() => onRemovePhoto(i)}
                className="shrink-0 font-bold text-red-600 hover:underline"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function JobSummaryList({ questions, answers }: { questions: EstimatorQuestion[]; answers: Answers }) {
  const rows = questions
    .filter((q) => isQuestionVisible(q, answers))
    .map((q) => [q.label, formatAnswer(q, answers[q.id])] as const)
    .filter(([, v]) => v !== "");
  if (rows.length === 0) return null;
  return (
    <dl className="divide-y divide-slate-200 rounded-lg border border-slate-200">
      {rows.map(([label, val]) => (
        <div key={label} className="flex justify-between gap-4 px-4 py-2.5 text-sm">
          <dt className="text-slate-500">{label}</dt>
          <dd className="text-right font-semibold text-navy-900">{val}</dd>
        </div>
      ))}
    </dl>
  );
}

/**
 * The result headline. For a calculated price or range this is the hero of the
 * screen — a large, unmistakable figure. For an assessment outcome it states
 * clearly what CDCS needs next.
 */
function OutcomeBlock({ result }: { result: EstimateResult }) {
  if (result.kind === "site_assessment") {
    return (
      <div className="rounded-xl border-2 border-navy-800 bg-navy-950 p-6 text-center text-white sm:p-8">
        <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-accent-400">Site Assessment Required</p>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-200">{result.reason}</p>
      </div>
    );
  }
  if (result.kind === "photo_assessment") {
    return (
      <div className="rounded-xl border-2 border-brand-600 bg-brand-50 p-6 text-center sm:p-8">
        <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-brand-700">Photo Assessment Required</p>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-700">{result.reason}</p>
      </div>
    );
  }

  const isRange = result.kind === "estimated_range";
  const figure = isRange ? (
    <>
      {formatGYD(result.low ?? 0)}
      <span className="mx-2 font-normal text-slate-400">–</span>
      {formatGYD(result.high ?? 0)}
    </>
  ) : (
    formatGYD(result.amount ?? 0)
  );

  return (
    <div className="rounded-xl border-2 border-brand-600 bg-white p-6 text-center shadow-sm sm:p-8">
      <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-brand-700">
        {isRange ? "Estimated Range" : "Preliminary Estimate"}
      </p>
      <p className="mt-2 text-3xl font-black leading-tight text-navy-900 sm:text-[2.6rem]">{figure}</p>
      {result.lineItems && result.lineItems[0] && (
        <p className="mx-auto mt-2 max-w-sm text-xs text-slate-500">{result.lineItems[0].label}</p>
      )}
    </div>
  );
}

function ResultScreen(
  props: SummaryProps & PhotoProps & { whatsappHref: string; onRequestQuote: () => void },
) {
  const {
    service,
    result,
    reference,
    customerTypeLabel,
    questions,
    answers,
    addOnLabels,
    estimatorNotes,
    whatsappHref,
    onRequestQuote,
    photos,
    onAddPhotos,
    onRemovePhoto,
    photoError,
  } = props;
  const servicePage = service.servicePageSlug ? getServiceBySlug(service.servicePageSlug) : undefined;
  const hasFigure = result.kind === "estimated_price" || result.kind === "estimated_range";

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <Logo />
        {reference && (
          <span className="rounded-md bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">{reference}</span>
        )}
      </div>

      {/* ===== 1. The figure / outcome — the hero of this screen ===== */}
      <div className="mt-6">
        <OutcomeBlock result={result} />
      </div>

      {/* ===== 2. Disclaimer (immediately under the figure) ===== */}
      {hasFigure ? (
        <p className="mt-4 text-center text-xs leading-relaxed text-slate-500">
          This estimate is provided for planning purposes only. Final pricing is subject to
          confirmation of scope, condition, location, access and service requirements.
        </p>
      ) : (
        <p className="mt-4 text-center text-xs leading-relaxed text-slate-500">
          This is a preliminary read, not a quotation. CDCS confirms the price after reviewing what
          you send.
        </p>
      )}

      {/* ===== 3. Actions (above the fold, above all the detail) ===== */}
      <div className="mt-6 flex flex-col gap-3">
        <button
          type="button"
          onClick={onRequestQuote}
          className="inline-flex items-center justify-center gap-2 rounded-md bg-accent-500 px-6 py-4 text-base font-bold text-navy-950 transition-colors hover:bg-accent-600"
        >
          Request Official Quotation
          <IconArrowRight className="h-5 w-5" />
        </button>
        <div className="grid gap-3 sm:grid-cols-2">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackEvent("estimator_whatsapp_clicked", { service_category: service.category, transport_type: "beacon" })
            }
            className="inline-flex items-center justify-center gap-2 rounded-md border-2 border-[#25D366] px-5 py-3 text-sm font-bold text-navy-900 transition-colors hover:bg-[#25D366] hover:text-white"
          >
            <IconWhatsapp className="h-5 w-5" />
            Send Details on WhatsApp
          </a>
          <a
            href={siteConfig.contact.phoneHref}
            onClick={() =>
              trackEvent("estimator_call_clicked", { service_category: service.category, transport_type: "beacon" })
            }
            className="inline-flex items-center justify-center gap-2 rounded-md border-2 border-navy-800 px-5 py-3 text-sm font-bold text-navy-900 transition-colors hover:bg-navy-900 hover:text-white"
          >
            <IconPhone className="h-5 w-5" />
            Call CDCS
          </a>
        </div>
      </div>

      {servicePage && (
        <p className="mt-4 text-center text-sm text-slate-600">
          More about this service:{" "}
          <Link href={`/services/${servicePage.slug}/`} className="font-semibold text-brand-600 hover:underline">
            {servicePage.title}
          </Link>
        </p>
      )}

      {/* ===== 4. Recurring plans (when calculated) ===== */}
      {result.subscriptions && result.subscriptions.length > 0 && (
        <div className="mt-6 rounded-lg border-2 border-brand-200 bg-brand-50 p-4">
          <p className="text-xs font-bold uppercase tracking-wider text-brand-700">Recurring plan options</p>
          <ul className="mt-2 space-y-1.5 text-sm">
            {result.subscriptions.map((sub) => (
              <li key={sub.label} className="flex justify-between gap-4">
                <span className="text-navy-900">{sub.label}</span>
                <span className="font-bold text-navy-900">{formatGYD(sub.monthly)} / month</span>
              </li>
            ))}
          </ul>
          <p className="mt-2 text-xs text-slate-500">
            Prepaid monthly. Registered vehicle, standard condition allowance. Confirmed when you set up the plan.
          </p>
        </div>
      )}

      {result.recurringNote && (
        <p className="mt-4 rounded-lg border border-brand-200 bg-brand-50 px-4 py-3 text-sm font-semibold text-brand-800">
          {result.recurringNote}
        </p>
      )}

      <hr className="my-8 border-slate-200" />

      {/* ===== 5. Your estimate details ===== */}
      <h3 className="text-sm font-bold uppercase tracking-wider text-navy-900">Your estimate details</h3>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <InfoCard label="Service">{service.label}</InfoCard>
        <InfoCard label="Customer type">{customerTypeLabel}</InfoCard>
      </div>

      <h4 className="mt-6 text-xs font-bold uppercase tracking-wider text-slate-500">Job summary</h4>
      <div className="mt-2">
        <JobSummaryList questions={questions} answers={answers} />
      </div>

      {hasFigure && result.lineItems && result.lineItems.length > 0 && (
        <>
          <h4 className="mt-6 text-xs font-bold uppercase tracking-wider text-slate-500">How it&apos;s made up</h4>
          <div className="mt-2 rounded-lg border border-slate-200">
            <dl className="divide-y divide-slate-200">
              {result.lineItems.map((li, i) => (
                <div key={li.label + i} className="flex justify-between gap-4 px-4 py-2 text-sm">
                  <dt className="text-slate-500">{li.label}</dt>
                  <dd className="text-right font-semibold text-navy-900">
                    {li.amount < 0 ? `−${formatGYD(-li.amount)}` : formatGYD(li.amount)}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          {result.subtotalLabel && (
            <p className="mt-2 text-sm text-slate-600">
              {result.kind === "estimated_range" ? "Estimated range" : "Estimated total"}:{" "}
              <span className="font-bold text-navy-900">{result.subtotalLabel}</span>
            </p>
          )}
        </>
      )}

      {addOnLabels.length > 0 && (
        <>
          <h4 className="mt-6 text-xs font-bold uppercase tracking-wider text-slate-500">Selected add-ons</h4>
          <ul className="mt-2 space-y-1.5 text-sm text-slate-700">
            {addOnLabels.map((a) => (
              <li key={a} className="flex items-start gap-2">
                <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                {a}
              </li>
            ))}
          </ul>
        </>
      )}

      {result.noteExtra && <p className="mt-4 text-xs leading-relaxed text-slate-500">{result.noteExtra}</p>}

      {estimatorNotes.trim() && (
        <p className="mt-4 rounded-lg bg-slate-50 px-4 py-3 text-sm text-slate-600">
          <span className="font-semibold text-navy-900">Your notes: </span>
          {estimatorNotes}
        </p>
      )}

      <div className="mt-6">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
          {result.kind === "photo_assessment" ? "Add photos of the condition" : "Add photos (optional)"}
        </h4>
        <p className="mt-1 mb-3 text-xs text-slate-500">Photos you add here are carried straight into your quote request.</p>
        <PhotoUpload
          photos={photos}
          onAddPhotos={onAddPhotos}
          onRemovePhoto={onRemovePhoto}
          photoError={photoError}
          hint={
            result.kind === "photo_assessment"
              ? "We'll price your job from these — no site visit needed."
              : "Speeds up your official quotation."
          }
        />
      </div>
    </div>
  );
}

function InfoCard({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="rounded-lg border border-slate-200 px-4 py-3">
      <p className="text-xs font-bold uppercase tracking-wider text-slate-500">{label}</p>
      <p className="mt-1 text-sm font-semibold text-navy-900">{children}</p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Lead-capture form (step 6)
// ---------------------------------------------------------------------------

function LeadForm(
  props: SummaryProps & PhotoProps & { defaultLocation: string; whatsappHref: string },
) {
  const {
    reference,
    customerTypeLabel,
    service,
    questions,
    answers,
    addOnLabels,
    estimatorNotes,
    result,
    defaultLocation,
    whatsappHref,
    photos,
    onAddPhotos,
    onRemovePhoto,
    photoError,
  } = props;

  const [status, setStatus] = useState<LeadStatus>("idle");
  const [error, setError] = useState("");

  const jobSummaryText = useMemo(
    () =>
      questions
        .filter((q) => isQuestionVisible(q, answers))
        .map((q) => [q.label, formatAnswer(q, answers[q.id])] as const)
        .filter(([, v]) => v !== "")
        .map(([l, v]) => `${l}: ${v}`)
        .join("\n"),
    [questions, answers],
  );
  const outcomeText = describeOutcome(result);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;

    const form = e.currentTarget;
    const data = new FormData(form);

    const fullName = String(data.get("fullName") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const location = String(data.get("location") ?? "").trim();

    if (!fullName || !phone || !email || !location) {
      setError("Please fill in your name, phone, email and service location.");
      setStatus("error");
      return;
    }
    if (!EMAIL_RE.test(email)) {
      setError("Enter a valid email address, e.g. you@company.com.");
      setStatus("error");
      return;
    }
    if (phone.replace(/\D/g, "").length < 7) {
      setError("Enter a phone number we can reach you on.");
      setStatus("error");
      return;
    }
    setError("");

    // Attach the estimator context so the customer never re-enters it.
    data.set("_subject", `Estimator quote request — ${reference ?? "CDCS"}`);
    data.set("estimateReference", reference ?? "");
    data.set("customerType", customerTypeLabel);
    data.set("service", service.label);
    data.set("serviceGroup", groupLabels[service.group]);
    data.set("estimateOutcome", outcomeText);
    data.set("jobSummary", jobSummaryText);
    data.set("addOns", addOnLabels.join(", "));
    data.set("estimatorNotes", estimatorNotes);
    photos.forEach((f, i) => data.append(`photo_${i + 1}`, f, f.name));

    const endpoint = siteConfig.quoteFormEndpoint;

    if (endpoint) {
      setStatus("submitting");
      try {
        const res = await fetch(endpoint, {
          method: "POST",
          body: data,
          headers: { Accept: "application/json" },
        });
        let payload: { ok?: boolean; error?: string; errors?: { message?: string }[] } | null = null;
        try {
          payload = await res.json();
        } catch {
          payload = null;
        }
        if (res.ok && payload?.ok !== false) {
          trackEvent("estimator_quote_requested", {
            service_category: service.category,
            service_id: service.id,
            ...result.analytics,
            outcome: result.kind,
          });
          trackEvent("generate_lead", { service: service.label, frequency: "estimator" });
          setStatus("success");
          return;
        }
        const detail = payload?.errors?.map((x) => x.message).filter(Boolean).join(" ") || payload?.error;
        setError(
          detail
            ? `${detail} Please try again, or contact us directly.`
            : `Your request couldn't be submitted (error ${res.status}). Please try again, or contact us directly.`,
        );
        setStatus("error");
      } catch {
        setError("We couldn't reach our form service — check your connection and try again, or contact us directly.");
        setStatus("error");
      }
      return;
    }

    // Fallback: pre-filled email (delivery not confirmable).
    const lines = [
      `Estimate Reference: ${reference ?? ""}`,
      `Customer Type: ${customerTypeLabel}`,
      `Service: ${service.label}`,
      `Estimate Outcome: ${outcomeText}`,
      "",
      "Job summary:",
      jobSummaryText,
      "",
      `Add-ons: ${addOnLabels.join(", ") || "—"}`,
      `Estimator notes: ${estimatorNotes || "—"}`,
      "",
      `Full Name: ${fullName}`,
      `Company: ${String(data.get("company") ?? "") || "—"}`,
      `Phone / WhatsApp: ${phone}`,
      `Email: ${email}`,
      `Service Location: ${location}`,
      `Preferred Service Date: ${String(data.get("preferredDate") ?? "") || "—"}`,
      `Notes: ${String(data.get("notes") ?? "") || "—"}`,
      photos.length ? `\nNote: please attach your ${photos.length} photo(s) to this email before sending.` : "",
    ];
    window.location.href = `mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(
      `Estimator quote request — ${reference ?? "CDCS"}`,
    )}&body=${encodeURIComponent(lines.join("\n"))}`;
    setStatus("email_opened");
  }

  if (status === "success") {
    return (
      <ConfirmationPanel heading="Quote Request Received" reference={reference} whatsappHref={whatsappHref}>
        Thank you — your official quotation request is in. A CDCS estimator will follow up by phone,
        email, or WhatsApp, usually within one business day.
      </ConfirmationPanel>
    );
  }
  if (status === "email_opened") {
    return (
      <ConfirmationPanel heading="Finish in Your Email App" reference={reference} whatsappHref={whatsappHref}>
        We&apos;ve opened a pre-filled email in your mail app — review it and press send to complete
        your request. If nothing opened, use WhatsApp or call us.
      </ConfirmationPanel>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-xl font-bold text-navy-900 sm:text-2xl">Request Your Official Quotation</h2>
        {reference && (
          <span className="rounded-md bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">{reference}</span>
        )}
      </div>
      <p className="mt-1.5 text-sm text-slate-600">
        Your estimator answers are attached automatically — you only need your contact details.
      </p>

      <form onSubmit={handleSubmit} className="mt-5 space-y-5" noValidate>
        {status === "error" && error && (
          <p role="alert" className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
            {error}
          </p>
        )}

        <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

        <div className="grid gap-5 sm:grid-cols-2">
          <LeadField label="Full Name" required>
            <input name="fullName" type="text" required autoComplete="name" className={inputClass} placeholder="Jane Persaud" />
          </LeadField>
          <LeadField label="Company / Organization">
            <input name="company" type="text" autoComplete="organization" className={inputClass} placeholder="ABC Enterprises Inc." />
          </LeadField>
          <LeadField label="Phone / WhatsApp" required>
            <input name="phone" type="tel" inputMode="tel" required autoComplete="tel" className={inputClass} placeholder="+592 XXX-XXXX" />
          </LeadField>
          <LeadField label="Email" required>
            <input name="email" type="email" inputMode="email" required autoComplete="email" className={inputClass} placeholder="you@company.com" />
          </LeadField>
          <LeadField label="Service Location" required>
            <input name="location" type="text" required defaultValue={defaultLocation} className={inputClass} placeholder="e.g. Georgetown, Region 4" />
          </LeadField>
          <LeadField label="Preferred Service Date">
            <input name="preferredDate" type="date" className={inputClass} />
          </LeadField>
        </div>

        <LeadField label="Photos (optional)">
          <PhotoUpload
            photos={photos}
            onAddPhotos={onAddPhotos}
            onRemovePhoto={onRemovePhoto}
            photoError={photoError}
            hint="Photos of the space, vehicle, or issue help us quote accurately."
          />
        </LeadField>

        <LeadField label="Describe anything else we should know">
          <textarea name="notes" rows={3} className={inputClass} placeholder="Optional — anything that will help us prepare an accurate quotation." />
        </LeadField>

        <button
          type="submit"
          disabled={status === "submitting"}
          className="flex w-full items-center justify-center gap-2 rounded-md bg-accent-500 px-6 py-4 text-base font-bold text-navy-950 transition-colors hover:bg-accent-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "submitting" ? "Sending…" : "Submit Quote Request"}
          {status !== "submitting" && <IconArrowRight className="h-5 w-5" />}
        </button>

        <p className="text-center text-xs text-slate-500">
          By submitting, you agree that CDCS Inc. may contact you by phone, email, or WhatsApp about
          your request.
        </p>
      </form>
    </div>
  );
}

function LeadField({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-bold text-navy-900">
        {label} {required && <span className="text-accent-600">*</span>}
      </span>
      {children}
    </label>
  );
}

function ConfirmationPanel({
  heading,
  reference,
  whatsappHref,
  children,
}: {
  heading: string;
  reference: string | null;
  whatsappHref: string;
  children: ReactNode;
}) {
  return (
    <div role="status" className="rounded-xl border border-brand-200 bg-brand-50 p-8 text-center sm:p-10">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-600 text-white">
        <IconCheck className="h-7 w-7" />
      </div>
      <h3 className="mt-5 text-2xl font-bold text-navy-900">{heading}</h3>
      {reference && (
        <p className="mt-2 text-sm font-bold text-slate-600">Reference: {reference}</p>
      )}
      <p className="mt-3 text-sm leading-relaxed text-slate-600">{children}</p>
      <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-md bg-[#25D366] px-5 py-3 text-sm font-bold text-white"
        >
          <IconWhatsapp className="h-5 w-5" />
          Send on WhatsApp
        </a>
        <a
          href={siteConfig.contact.phoneHref}
          className="inline-flex items-center justify-center gap-2 rounded-md border-2 border-navy-900 px-5 py-3 text-sm font-bold text-navy-900"
        >
          <IconPhone className="h-4 w-4" />
          Call {siteConfig.contact.phoneDisplay}
        </a>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatAnswer(q: EstimatorQuestion, v: AnswerValue | undefined): string {
  if (v === undefined || v === null) return "";
  if (q.type === "boolean") return v === true ? "Yes" : "No";
  if (Array.isArray(v)) return v.join(", ");
  const s = String(v).trim();
  if (s === "") return "";
  return q.unit ? `${s} ${q.unit}` : s;
}

function selectedAddOnLabels(group: NonNullable<ReturnType<typeof getEstimatorService>>["group"], ids: string[]): string[] {
  const list = addOnsByGroup[group] ?? [];
  return ids.map((id) => list.find((a) => a.id === id)?.label).filter((x): x is string => Boolean(x));
}

function locationFromAnswers(questions: EstimatorQuestion[], answers: Answers): string {
  const q = questions.find((x) => x.fillsLocation);
  if (!q) return "";
  const v = answers[q.id];
  return typeof v === "string" ? v.trim() : "";
}

/** Human-readable list of the answers a specialized service fixes. */
function presetSummary(service: EstimatorService | undefined): string {
  if (!service?.presetAnswers) return "";
  return Object.values(service.presetAnswers).flat().join(", ");
}

function describeOutcome(result: EstimateResult | null): string {
  if (!result) return "Pending";
  if (result.kind === "site_assessment") return "Site assessment required";
  if (result.kind === "photo_assessment") return "Photo assessment required";
  if (result.kind === "estimated_range") return `${formatGYD(result.low ?? 0)} – ${formatGYD(result.high ?? 0)}`;
  return formatGYD(result.amount ?? 0);
}
