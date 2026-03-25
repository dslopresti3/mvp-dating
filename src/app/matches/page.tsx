import { Suspense } from "react";

import { MatchesClient } from "@/components/MatchesClient";

export default function MatchesPage() {
  return (
    <Suspense fallback={null}>
      <MatchesClient />
    </Suspense>
  );
}
