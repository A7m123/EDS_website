"use client";

import { useId, useState } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

type Status = "idle" | "submitting" | "ok" | "error";
type Errors = Partial<Record<"name" | "email" | "message", string>>;

const labelClass = "block font-mono text-eyebrow uppercase text-text-muted";
const inputClass =
  "mt-2 block w-full rounded-md border border-border bg-surface px-4 py-3 text-text " +
  "placeholder:text-text-muted/60 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/40";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const formId = useId();

  function validate(form: HTMLFormElement): Errors {
    const data = new FormData(form);
    const e: Errors = {};
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (name.length < 2) e.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      e.email = "Please enter a valid email address.";
    if (message.length < 10)
      e.message = "Tell us a bit more — at least a sentence or two.";
    return e;
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const e = validate(form);
    setErrors(e);
    if (Object.keys(e).length > 0) return;

    setStatus("submitting");
    // v1: open the user's mail client. Wire to a real endpoint later.
    const data = new FormData(form);
    const subject = encodeURIComponent(`Inquiry from ${data.get("name")}`);
    const body = encodeURIComponent(
      `${data.get("message")}\n\n— ${data.get("name")} <${data.get("email")}>`,
    );
    window.location.href = `mailto:hello@energydriven.me?subject=${subject}&body=${body}`;
    setStatus("ok");
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6" noValidate>
      <div>
        <label htmlFor={`${formId}-name`} className={labelClass}>
          Name
        </label>
        <input
          id={`${formId}-name`}
          name="name"
          type="text"
          autoComplete="name"
          required
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? `${formId}-name-err` : undefined}
          className={cn(inputClass, errors.name && "border-red-400")}
        />
        {errors.name ? (
          <p id={`${formId}-name-err`} className="mt-2 text-sm text-red-400">
            {errors.name}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor={`${formId}-email`} className={labelClass}>
          Email
        </label>
        <input
          id={`${formId}-email`}
          name="email"
          type="email"
          autoComplete="email"
          required
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? `${formId}-email-err` : undefined}
          className={cn(inputClass, errors.email && "border-red-400")}
        />
        {errors.email ? (
          <p id={`${formId}-email-err`} className="mt-2 text-sm text-red-400">
            {errors.email}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor={`${formId}-message`} className={labelClass}>
          Message
        </label>
        <textarea
          id={`${formId}-message`}
          name="message"
          required
          rows={6}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? `${formId}-msg-err` : undefined}
          className={cn(inputClass, errors.message && "border-red-400")}
        />
        {errors.message ? (
          <p id={`${formId}-msg-err`} className="mt-2 text-sm text-red-400">
            {errors.message}
          </p>
        ) : null}
      </div>

      <div className="flex items-center gap-4">
        <Button type="submit" size="lg" withArrow>
          {status === "submitting" ? "Sending..." : "Send message"}
        </Button>
        {status === "ok" ? (
          <p className="text-sm text-text-muted">Thanks — we&apos;ll be in touch.</p>
        ) : null}
      </div>
    </form>
  );
}
