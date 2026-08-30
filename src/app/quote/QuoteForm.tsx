"use client";

import { useState, type FormEvent } from "react";
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

type Status = "idle" | "submitting" | "success" | "error";

export function QuoteForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [frequency, setFrequency] = useState<"One-Time" | "Recurring">("One-Time");
  const [fileName, setFileName] = useState<string>("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const summaryFields: [string, string][] = [
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

    const endpoint = siteConfig.quoteFormEndpoint;

    if (endpoint) {
      setStatus("submitting");
      try {
        const res = await fetch(endpoint, {
          method: "POST",
          body: data,
          headers: { Accept: "application/json" },
        });
        if (res.ok) {
          setStatus("success");
          form.reset();
          setFileName("");
        } else {
          setStatus("error");
        }
      } catch {
        setStatus("error");
      }
      return;
    }

    // Fallback when no form backend is configured yet: open a pre-filled
    // email so no lead is lost. See README.md "Connecting the quote form".
    const subject = encodeURIComponent(
      `Quote Request — ${summaryFields[0][1] || "New Lead"} (${summaryFields[4][1] || "Service"})`
    );
    const body = encodeURIComponent(
      summaryFields.map(([label, value]) => `${label}: ${value || "—"}`).join("\n") +
        (data.get("photos") && (data.get("photos") as File).name
          ? "\n\nNote: please attach your photo(s) to this email before sending — file uploads can't be attached automatically from this form yet."
          : "")
    );
    window.location.href = `mailto:${siteConfig.contact.email}?subject=${subject}&body=${body}`;
    setStatus("success");
  }

  if (status === "success") {
    return (
      <div className="rounded-xl border border-brand-200 bg-brand-50 p-8 text-center sm:p-12">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-600 text-white">
          <IconCheck className="h-7 w-7" />
        </div>
        <h3 className="mt-5 text-2xl font-bold text-navy-900">Quote Request Received</h3>
        <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
          Thank you! Your quote has been received.
          If it didn&apos;t open, email us directly at{" "}
          <a href={siteConfig.contact.emailHref} className="font-bold text-brand-600">
            {siteConfig.contact.email}
          </a>{" "}
          or message us on WhatsApp at {siteConfig.contact.phoneDisplay}.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-bold text-brand-600 hover:underline"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {status === "error" && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          Something went wrong sending your request. Please try again, or contact us directly at{" "}
          {siteConfig.contact.phoneDisplay}.
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Full Name" required>
          <input name="fullName" type="text" required autoComplete="name" className={inputClass} placeholder="Jane Persaud" />
        </Field>
        <Field label="Company / Organization">
          <input name="company" type="text" autoComplete="organization" className={inputClass} placeholder="ABC Enterprises Inc." />
        </Field>
        <Field label="Phone Number" required>
          <input name="phone" type="tel" required autoComplete="tel" className={inputClass} placeholder="+592 XXX-XXXX" />
        </Field>
        <Field label="Email" required>
          <input name="email" type="email" required autoComplete="email" className={inputClass} placeholder="you@company.com" />
        </Field>

        <Field label="Service Required" required>
          <select name="service" required defaultValue="" className={inputClass}>
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

        <Field label="Property / Vehicle Type" required>
          <select name="propertyType" required defaultValue="" className={inputClass}>
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

        <Field label="Location" required>
          <input name="location" type="text" required className={inputClass} placeholder="e.g. Georgetown, Region 4" />
        </Field>

        <Field label="Preferred Service Date">
          <input name="preferredDate" type="date" className={inputClass} />
        </Field>
      </div>

      <Field label="One-Time or Recurring Service" required>
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

      <Field label="Description of Work" required>
        <textarea
          name="description"
          required
          rows={5}
          className={inputClass}
          placeholder="Tell us about the space, vehicle, or fleet — size, condition, specific concerns, or anything else that will help us scope the job accurately."
        />
      </Field>

      <Field label="Upload Photos (optional)">
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
            onChange={(e) => setFileName(e.target.files?.[0]?.name || "")}
          />
        </label>
      </Field>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="flex w-full items-center justify-center gap-2 rounded-md bg-accent-500 px-6 py-4 text-base font-bold text-navy-950 transition-colors hover:bg-accent-600 disabled:opacity-60"
      >
        {status === "submitting" ? "Sending..." : "Request My Quote"}
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
  "w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-sm text-navy-900 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100";

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-bold text-navy-900">
        {label} {required && <span className="text-accent-600">*</span>}
      </span>
      {children}
    </label>
  );
}
