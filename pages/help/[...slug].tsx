import { useRouter } from "next/router";

export default function HelpPage() {
  const router = useRouter();
  const slug = router.query.slug || [];

  return (
    <div>
      <h1 className="fw-bold mb-3">Help Center</h1>

      <p className="text-muted">
        You are viewing help topic:
        <strong> {Array.isArray(slug) ? slug.join(" / ") : slug}</strong>
      </p>

      <p>
        This is a dynamic help page. You can create URLs like:
        <br />
        <code>/help/getting-started</code>
        <br />
        <code>/help/orders/how-to-track</code>
        <br />
        <code>/help/payments/refunds</code>
      </p>
    </div>
  );
}