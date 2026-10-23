"use client";

import { useState } from "react";
import { services } from "@/lib/services";
import { site } from "@/lib/site";

type Status = "idle" | "sending" | "sent" | "error";

const fieldClass =
  "mt-2 w-full border-2 border-line bg-white px-4 py-3 font-body text-lg text-ink placeholder:text-granite/70 focus:border-evergreen focus:outline-none";
const labelClass = "block font-display text-base font-bold";

export function QuoteForm({ defaultService = "" }: { defaultService?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [sentName, setSentName] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");
    setMessage("");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const body = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setStatus("error");
        setMessage(body.error || `Your request could not be sent. Please email ${site.email} instead.`);
        return;
      }
      setSentName(String(data.name || ""));
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
      setMessage(`We could not reach the server. Check your connection and try again, or email ${site.email}.`);
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="border-2 border-evergreen bg-white p-8">
        <h2 className="text-3xl">Request sent{sentName ? `, ${sentName.split(" ")[0]}` : ""}</h2>
        <p className="mt-4">
          We received your project details and will contact you by email or phone to set up your free consultation.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6" noValidate={false}>
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            Your name
          </label>
          <input id="name" name="name" type="text" required autoComplete="name" className={fieldClass} />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>
            Email
          </label>
          <input id="email" name="email" type="email" required autoComplete="email" className={fieldClass} />
        </div>
        <div>
          <label htmlFor="phone" className={labelClass}>
            Phone <span className="font-body font-normal text-granite">(optional)</span>
          </label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" className={fieldClass} />
        </div>
        <div>
          <label htmlFor="town" className={labelClass}>
            Town or city of the project
          </label>
          <input id="town" name="town" type="text" required className={fieldClass} />
        </div>
      </div>

      <div>
        <label htmlFor="service" className={labelClass}>
          What do you need?
        </label>
        <select id="service" name="service" defaultValue={defaultService} className={fieldClass}>
          <option value="">Not sure yet</option>
          {services.map((s) => (
            <option key={s.slug} value={s.slug}>
              {s.title}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="details" className={labelClass}>
          Tell us about your project
        </label>
        <textarea
          id="details"
          name="details"
          rows={6}
          required
          className={fieldClass}
          placeholder="What would you like built, roughly how big is the space, and when would you like to start?"
        />
      </div>

      {/* Honeypot: real visitors never see or fill this in. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {status === "error" && (
        <p role="alert" className="border-2 border-red-800 bg-red-50 p-4 text-base text-red-900">
          {message}
        </p>
      )}

      <button type="submit" disabled={status === "sending"} className="btn btn-solid disabled:opacity-60">
        {status === "sending" ? "Sending…" : "Send request"}
      </button>
    </form>
  );
}
