"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { services } from "@/lib/services-data";
import { siteConfig } from "@/lib/site-config";
import { IconArrowRight, IconUpload, IconCheck } from "@/components/icons";

const propertyTypes = [
  "Corporate Office",
  "Government Facility",
  "Commercial Building",
  "Retail Store",
  "Restaurant / Hospitality",
  "Warehouse / Industrial Facility",
  "Construction Site",
  "Residential Property",
  "Vehicle — Car / SUV",
  "Vehicle — Truck / Commercial",
  "Fleet (multiple vehicles)",
  "Other",
];

// "success"      -> confirmed the form backend accepted the submission
// "email_opened" -> no backend configured; a pre-filled email was opened but
//                   delivery cannot be confirmed, so this is NOT shown as success
type Status = "idle" | "submitting" | "success" | "error" | "email_opened";

const MAX_FILE_BYTES = 10 * 1024 * 1024;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const REQUIRED_FIELDS: { name: string; label: string }[] = [
  { name: "fullName", label: "Full name" },
  { name: "phone", label: "Phone number" },
  { name: "email", label: "Email" },
  { name: "service", label: "Service required" },
  { name: "propertyType", label: "Property / vehicle type" },
  { name: "location", label: "Location" },
  { name: "description", label: "Description of work" },
];

function validate(data: FormData): Record<string, string> {
  const errors: Record<string, string> = {};

  for (const { name, label } of REQUIRED_FIELDS) {
    if (!String(data.get(name) ?? "").trim()) {
      errors[name] = `${label} is required.`;
    }
  }

  const email = String(data.get("email") ?? "").trim();
  if (email && !EMAIL_RE.test(email)) {
    errors.email = "Enter a valid email address, e.g. you@company.com.";
  }

  const phone = String(data.get("phone") ?? "").trim();
  if (phone && phone.replace(/\D/g, "").length < 7) {
    errors.phone = "Enter a valid phone number we can reach you on.";
  }

  const file = data.get("photos");
  if (file instanceof File && file.size > 0) {
    if (file.size > MAX_FILE_BYTES) {
      errors.photos = "That file is over 10MB. Please attach a smaller photo or PDF.";
    } else if (!file.type.startsWith("image/") && file.type !== "application/pdf") {
      errors.photos = "Upload a JPG, PNG, or PDF file.";
    }
  }

  return errors;
}

export function QuoteForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [frequency, setFrequency] = useState<"One-Time" | "Recurring">("One-Time");
  const [fileName, setFileName] = useState<string>("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [errorMessage, setErrorMessage] = useState<string>("");

  function clearFieldError(name?: string | null) {
    if (!name) return;
    setFieldErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  }

  function resetForm() {
    setStatus("idle");
    setFieldErrors({});
    setErrorMessage("");
    setFileName("");
    setFrequency("One-Time");
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;

    const form = e.currentTarget;
    const data = new FormData(form);

    // 1. Validate before doing anything else. If it fails we surface the
    //    errors and stop — no request, no success state.
    const errors = validate(data);
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) {
      setStatus("error");
      setErrorMessage("Please fix the highlighted fields, then submit again.");
      form.querySelector<HTMLElement>(`[name="${Object.keys(errors)[0]}"]`)?.focus();
      return;
    }
    setErrorMessage("");

    const endpoint = siteConfig.quoteFormEndpoint;

    // 2. Preferred path: POST to the configured form backend (Formspree).
    if (endpoint) {
      setStatus("submitting");
      try {
        const res = await fetch(endpoint, {
          method: "POST",
          body: data,
          headers: { Accept: "application/json" },
        });

        let payload:
          | { ok?: boolean; error?: string; errors?: { message?: string }[] }
          | null = null;
        try {
          payload = await res.json();
        } catch {
          payload = null;
        }

        if (res.ok && payload?.ok !== false) {
          setStatus("success");
          setFieldErrors({});
          form.reset();
          setFileName("");
          setFrequency("One-Time");
          return;
        }

        const detail =
          payload?.errors
            ?.map((x) => x.message)
            .filter(Boolean)
            .join(" ") || payload?.error;
        setErrorMessage(
          detail
            ? `${detail} Please try again, or contact us directly.`
            : `Your request couldn't be submitted (error ${res.status}). Please try again in a moment, or contact us directly.`
        );
        setStatus("error");
      } catch {
        setErrorMessage(
          "We couldn't reach our form service — this is usually a network problem. Please check your connection and try again, or contact us directly."
        );
        setStatus("error");
      }
      return;
    }

    // 3. Fallback only when no backend is configured (e.g. local dev): open a
    //    pre-filled email. Delivery can't be confirmed, so we show an honest
    //    "finish in your email app" panel — never the success screen.
    const summary: [string, string][] = [
      ["Full Name", String(data.get("fullName") || "")],
      ["Company / Organization", String(data.get("company") || "")],
      ["Phone Number", String(data.get("phone") || "")],
      ["Email", String(data.get("email") || "")],
      ["Service Required", String(data.get("service") || "")],
      ["Property / Vehicle Type", String(data.get("propertyType") || "")],
      ["Location", String(data.get("location") || "")],
      ["Preferred Service Date", String(data.get("preferredDate") || "")],
      ["One-Time or Recurring", String(data.get("frequency") || "")],
      ["Description of Work", String(data.get("description") || "")],
    ];
    const subject = `Quote Request — ${summary[0][1] || "New Lead"} (${summary[4][1] || "Service"})`;
    const photo = data.get("photos");
    const body =
      summary.map(([label, value]) => `${label}: ${value || "—"}`).join("\n") +
      (photo instanceof File && photo.name
        ? "\n\nNote: please attach your photo(s) to this email before sending."
        : "");
    window.location.href = `mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    setStatus("email_opened");
  }

  if (status === "success") {
    return (
      <Panel
        heading="Quote Request Sent"
        onReset={resetForm}
        resetLabel="Submit another request"
      >
        Thank you — we&apos;ve received your request and will follow up by phone, email, or
        WhatsApp. Need to reach us sooner? Call or WhatsApp{" "}
        <a href={siteConfig.contact.phoneHref} className="font-bold text-brand-600">
          {siteConfig.contact.phoneDisplay}
        </a>{" "}
        or email{" "}
        <a href={siteConfig.contact.emailHref} className="font-bold text-brand-600">
          {siteConfig.contact.email}
        </a>
        .
      </Panel>
    );
  }

  if (status === "email_opened") {
    return (
      <Panel
        heading="Finish in Your Email App"
        onReset={resetForm}
        resetLabel="Back to the form"
      >
        We&apos;ve opened a pre-filled email in your mail app — please review it and press send
        to complete your request. If nothing opened, contact us directly on WhatsApp or by phone
        at{" "}
        <a href={siteConfig.contact.phoneHref} className="font-bold text-brand-600">
          {siteConfig.contact.phoneDisplay}
        </a>
        , or email{" "}
        <a href={siteConfig.contact.emailHref} className="font-bold text-brand-600">
          {siteConfig.contact.email}
        </a>
        .
      </Panel>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      onChange={(e) => {
        const target = e.target as unknown as { name?: string };
        clearFieldError(target.name);
      }}
      className="space-y-6"
      noValidate
    >
      {status === "error" && errorMessage && (
        <div
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {errorMessage}
          {Object.keys(fieldErrors).length === 0 && (
            <>
              {" "}
              <a href={siteConfig.contact.phoneHref} className="font-bold underline">
                {siteConfig.contact.phoneDisplay}
              </a>
            </>
          )}
        </div>
      )}

      {/* Honeypot: hidden from real users; bots that fill every field are
          silently dropped by Formspree. */}
      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />
      <input type="hidden" name="_subject" value="New quote request — CDCS website" />

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Full Name" name="fullName" required error={fieldErrors.fullName}>
          <input {...inputA11y("fullName", fieldErrors)} name="fullName" type="text" required autoComplete="name" className={inputClass} placeholder="Jane Persaud" />
        </Field>
        <Field label="Company / Organization" name="company">
          <input name="company" type="text" autoComplete="organization" className={inputClass} placeholder="ABC Enterprises Inc." />
        </Field>
        <Field label="Phone Number" name="phone" required error={fieldErrors.phone}>
          <input {...inputA11y("phone", fieldErrors)} name="phone" type="tel" inputMode="tel" required autoComplete="tel" className={inputClass} placeholder="+592 XXX-XXXX" />
        </Field>
        <Field label="Email" name="email" required error={fieldErrors.email}>
          <input {...inputA11y("email", fieldErrors)} name="email" type="email" inputMode="email" required autoComplete="email" className={inputClass} placeholder="you@company.com" />
        </Field>

        <Field label="Service Required" name="service" required error={fieldErrors.service}>
          <select {...inputA11y("service", fieldErrors)} name="service" required defaultValue="" className={inputClass}>
            <option value="" disabled>
              Select a service
            </option>
            {services.map((s) => (
              <option key={s.slug} value={s.title}>
                {s.title}
              </option>
            ))}
            <option value="Not sure / Need guidance">Not sure / Need guidance</option>
          </select>
        </Field>

        <Field label="Property / Vehicle Type" name="propertyType" required error={fieldErrors.propertyType}>
          <select {...inputA11y("propertyType", fieldErrors)} name="propertyType" required defaultValue="" className={inputClass}>
            <option value="" disabled>
              Select an option
            </option>
            {propertyTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Location" name="location" required error={fieldErrors.location}>
          <input {...inputA11y("location", fieldErrors)} name="location" type="text" required className={inputClass} placeholder="e.g. Georgetown, Region 4" />
        </Field>

        <Field label="Preferred Service Date" name="preferredDate">
          <input name="preferredDate" type="date" className={inputClass} />
        </Field>
      </div>

      <Field label="One-Time or Recurring Service" name="frequency" required>
        <div className="flex gap-3">
          {(["One-Time", "Recurring"] as const).map((option) => (
            <label
              key={option}
              className={`flex flex-1 cursor-pointer items-center justify-center rounded-md border-2 px-4 py-3 text-sm font-bold transition-colors ${
                frequency === option
                  ? "border-brand-600 bg-brand-50 text-brand-700"
                  : "border-slate-200 text-slate-600 hover:border-slate-300"
              }`}
            >
              <input
                type="radio"
                name="frequency"
                value={option}
                checked={frequency === option}
                onChange={() => setFrequency(option)}
                className="sr-only"
              />
              {option}
            </label>
          ))}
        </div>
      </Field>

      <Field label="Description of Work" name="description" required error={fieldErrors.description}>
        <textarea
          {...inputA11y("description", fieldErrors)}
          name="description"
          required
          rows={5}
          className={inputClass}
          placeholder="Tell us about the space, vehicle, or fleet — size, condition, specific concerns, or anything else that will help us scope the job accurately."
        />
      </Field>

      <Field label="Upload Photos (optional)" name="photos" error={fieldErrors.photos}>
        <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center transition-colors hover:border-brand-400">
          <IconUpload className="h-6 w-6 text-slate-400" />
          <span className="text-sm font-semibold text-slate-600">
            {fileName || "Click to upload a photo of the space, vehicle, or issue"}
          </span>
          <span className="text-xs text-slate-400">JPG, PNG, or PDF — up to 10MB</span>
          <input
            name="photos"
            type="file"
            accept="image/*,.pdf"
            className="hidden"
            onChange={(e) => {
              setFileName(e.target.files?.[0]?.name || "");
              clearFieldError("photos");
            }}
          />
        </label>
      </Field>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="flex w-full items-center justify-center gap-2 rounded-md bg-accent-500 px-6 py-4 text-base font-bold text-navy-950 transition-colors hover:bg-accent-600 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Request My Quote"}
        {status !== "submitting" && <IconArrowRight className="h-5 w-5" />}
      </button>

      <p className="text-center text-xs text-slate-500">
        By submitting, you agree that CDCS Inc. may contact you by phone, email, or WhatsApp
        regarding your request.
      </p>
    </form>
  );
}

const inputClass =
  "w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-sm text-navy-900 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100 aria-[invalid=true]:border-red-400 aria-[invalid=true]:ring-red-100";

function inputA11y(name: string, errors: Record<string, string>) {
  return errors[name]
    ? ({ "aria-invalid": true, "aria-describedby": `${name}-error` } as const)
    : {};
}

function Field({
  label,
  name,
  required,
  error,
  children,
}: {
  label: string;
  name: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-bold text-navy-900">
        {label} {required && <span className="text-accent-600">*</span>}
      </span>
      {children}
      {error && (
        <span id={`${name}-error`} className="mt-1 block text-xs font-semibold text-red-600">
          {error}
        </span>
      )}
    </label>
  );
}

function Panel({
  heading,
  children,
  onReset,
  resetLabel,
}: {
  heading: string;
  children: ReactNode;
  onReset: () => void;
  resetLabel: string;
}) {
  return (
    <div className="rounded-xl border border-brand-200 bg-brand-50 p-8 text-center sm:p-12">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-600 text-white">
        <IconCheck className="h-7 w-7" />
      </div>
      <h3 className="mt-5 text-2xl font-bold text-navy-900">{heading}</h3>
      <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">{children}</p>
      <button onClick={onReset} className="mt-6 text-sm font-bold text-brand-600 hover:underline">
        {resetLabel}
      </button>
    </div>
  );
}
