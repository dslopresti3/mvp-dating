import { Suspense } from "react";

import { MatchesClient } from "@/components/MatchesClient";

export default function MatchesPage() {
  return (
    <Suspense fallback={<p className="text-sm text-zinc-500">Loading matches…</p>}>
      <MatchesClient />
    </Suspense>
  );
}
