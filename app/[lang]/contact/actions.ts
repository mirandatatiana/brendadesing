"use server";

import { sendEnquiry } from "@/lib/email";
import { services } from "@/lib/content/services";
import { isLocale } from "@/lib/i18n/config";

export type FieldName = "name" | "email" | "service" | "message" | "consent" | "city";

export type ContactState = {
  status: "idle" | "success" | "error";
  errors?: Partial<Record<FieldName, true>>;
  sendFailed?: boolean;
  /** Echo values back so a failed submit without JS doesn't lose input. */
  values?: Record<string, string>;
  /** Changes on every response so the form remounts with the echoed values. */
  ts?: number;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX = 4000;

export async function submitContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const get = (k: string) => String(formData.get(k) ?? "").trim().slice(0, MAX);

  const values = {
    requestType: get("requestType") === "question" ? "question" : "consultation",
    name: get("name"),
    email: get("email"),
    phone: get("phone"),
    service: get("service"),
    room: get("room"),
    city: get("city"),
    timing: get("timing"),
    message: get("message"),
    locale: get("locale"),
  } as const;

  // Spam protection: hidden honeypot field + too-fast submissions
  const startedAt = Number(get("startedAt"));
  if (get("website") || (startedAt && Date.now() - startedAt < 2500)) {
    return { status: "success" };
  }

  const errors: ContactState["errors"] = {};
  if (values.name.length < 2) errors.name = true;
  if (!EMAIL_RE.test(values.email)) errors.email = true;
  const validService = values.service === "unsure" || services.some((s) => s.key === values.service);
  if (!validService) errors.service = true;
  if (values.message.length < 10) errors.message = true;
  if (values.requestType === "consultation" && values.city.length < 2) errors.city = true;
  if (formData.get("consent") !== "on") errors.consent = true;

  if (Object.keys(errors).length) {
    return { status: "error", errors, values: { ...values, consent: formData.get("consent") === "on" ? "on" : "" }, ts: Date.now() };
  }

  const locale = isLocale(values.locale) ? values.locale : "en";
  const serviceName =
    values.service === "unsure"
      ? "Not sure yet"
      : (services.find((s) => s.key === values.service)?.name.en ?? values.service);

  const { ok } = await sendEnquiry({
    ...values,
    requestType: values.requestType,
    service: serviceName,
    locale,
  });

  if (!ok) return { status: "error", sendFailed: true, values: { ...values, consent: "on" }, ts: Date.now() };
  return { status: "success" };
}
