"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { submitContact, type ContactState, type FieldName } from "@/app/[lang]/contact/actions";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/en";
import { ArrowRight } from "./Icons";

type Props = {
  locale: Locale;
  labels: Dictionary["contact"];
  serviceOptions: { key: string; name: string }[];
  initialType: "consultation" | "question";
  initialService?: string;
};

const initialState: ContactState = { status: "idle" };

export function ContactForm({ locale, labels, serviceOptions, initialType, initialService = "" }: Props) {
  const [state, formAction, pending] = useActionState(submitContact, initialState);
  const [requestType, setRequestType] = useState(initialType);
  const [startedAt, setStartedAt] = useState("");
  const alertRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const f = labels.form;
  const err = state.errors ?? {};
  const v = state.values ?? {};

  useEffect(() => setStartedAt(String(Date.now())), []);

  useEffect(() => {
    if (state.status === "error") alertRef.current?.focus();
    if (state.status === "success") successRef.current?.focus();
  }, [state]);

  if (state.status === "success") {
    return (
      <div className="form-success" ref={successRef} tabIndex={-1} role="status">
        <h2>{labels.success.title}</h2>
        <p>{labels.success.text}</p>
        <button type="button" className="btn btn--ghost" onClick={() => window.location.reload()}>
          {labels.success.again}
        </button>
      </div>
    );
  }

  const describe = (name: FieldName, hintId?: string) =>
    [err[name] ? `${name}-error` : null, hintId].filter(Boolean).join(" ") || undefined;

  const FieldError = ({ name }: { name: FieldName }) =>
    err[name] ? (
      <p className="field__error" id={`${name}-error`}>
        {labels.errors[name]}
      </p>
    ) : null;

  const Req = () => (
    <span className="field__opt">
      {" "}
      <span aria-hidden="true">*</span>
      <span className="visually-hidden">({f.required})</span>
    </span>
  );
  const Opt = () => <span className="field__opt"> ({f.optional})</span>;

  return (
    <form key={state.ts ?? 0} action={formAction} className="form" noValidate>
      {state.status === "error" && (
        <div className="form-alert" role="alert" tabIndex={-1} ref={alertRef}>
          {state.sendFailed ? labels.errors.generic : labels.errors.summary}
        </div>
      )}

      <input type="hidden" name="locale" value={locale} />
      <input type="hidden" name="startedAt" value={startedAt} />
      <div className="hp" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <fieldset className="request-type field">
        <legend>{f.requestType}</legend>
        <div className="request-type__options">
          <label className="radio-card">
            <input
              type="radio"
              name="requestType"
              value="consultation"
              checked={requestType === "consultation"}
              onChange={() => setRequestType("consultation")}
            />
            <strong>{f.typeConsultation}</strong>
            <span>{f.typeConsultationHint}</span>
          </label>
          <label className="radio-card">
            <input
              type="radio"
              name="requestType"
              value="question"
              checked={requestType === "question"}
              onChange={() => setRequestType("question")}
            />
            <strong>{f.typeQuestion}</strong>
            <span>{f.typeQuestionHint}</span>
          </label>
        </div>
      </fieldset>

      <div className="form-row">
        <div className="field">
          <label htmlFor="name">
            {f.name}
            <Req />
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            defaultValue={v.name}
            aria-invalid={err.name || undefined}
            aria-describedby={describe("name")}
          />
          <FieldError name="name" />
        </div>
        <div className="field">
          <label htmlFor="email">
            {f.email}
            <Req />
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            required
            defaultValue={v.email}
            aria-invalid={err.email || undefined}
            aria-describedby={describe("email")}
          />
          <FieldError name="email" />
        </div>
      </div>

      <div className="form-row">
        <div className="field">
          <label htmlFor="phone">
            {f.phone}
            <Opt />
          </label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" defaultValue={v.phone} />
        </div>
        <div className="field">
          <label htmlFor="service">
            {f.service}
            <Req />
          </label>
          <select
            id="service"
            name="service"
            required
            defaultValue={v.service ?? initialService}
            aria-invalid={err.service || undefined}
            aria-describedby={describe("service")}
          >
            <option value="" disabled>
              {f.servicePlaceholder}
            </option>
            {serviceOptions.map((s) => (
              <option key={s.key} value={s.key}>
                {s.name}
              </option>
            ))}
            <option value="unsure">{f.serviceUnsure}</option>
          </select>
          <FieldError name="service" />
        </div>
      </div>

      <div className="field">
        <label htmlFor="room">
          {f.room}
          <Opt />
        </label>
        <input id="room" name="room" type="text" placeholder={f.roomPlaceholder} defaultValue={v.room} />
      </div>

      {requestType === "consultation" && (
        <div className="form-row">
          <div className="field">
            <label htmlFor="city">
              {f.city}
              <Req />
            </label>
            <input
              id="city"
              name="city"
              type="text"
              autoComplete="address-level2"
              required
              defaultValue={v.city}
              aria-invalid={err.city || undefined}
              aria-describedby={describe("city", "city-hint")}
            />
            <p className="field__hint" id="city-hint">
              {f.cityHint}
            </p>
            <FieldError name="city" />
          </div>
          <div className="field">
            <label htmlFor="timing">
              {f.timing}
              <Opt />
            </label>
            <input id="timing" name="timing" type="text" placeholder={f.timingPlaceholder} defaultValue={v.timing} />
          </div>
        </div>
      )}

      <div className="field">
        <label htmlFor="message">
          {f.message}
          <Req />
        </label>
        <textarea
          id="message"
          name="message"
          required
          minLength={10}
          placeholder={f.messagePlaceholder}
          defaultValue={v.message}
          aria-invalid={err.message || undefined}
          aria-describedby={describe("message")}
        />
        <FieldError name="message" />
      </div>

      <div className="field">
        <label className="consent">
          <input
            type="checkbox"
            name="consent"
            required
            defaultChecked={v.consent === "on"}
            aria-invalid={err.consent || undefined}
            aria-describedby={describe("consent")}
          />
          <span>{f.consent}</span>
        </label>
        <FieldError name="consent" />
      </div>

      <div>
        <button type="submit" className="btn" disabled={pending} aria-disabled={pending}>
          {pending ? f.sending : f.submit} {!pending && <ArrowRight />}
        </button>
      </div>
    </form>
  );
}
