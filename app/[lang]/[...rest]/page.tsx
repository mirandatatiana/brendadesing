import { notFound } from "next/navigation";

/** Sends any unknown URL under /en or /nl to the localized 404 page. */
export default function CatchAll() {
  notFound();
}
