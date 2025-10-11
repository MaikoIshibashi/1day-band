// /app/survey/participant/page.tsx
import { Suspense } from "react";
import ParticipantSurveyClient from "./ParticipantSurveyClient";

export const dynamic = "force-dynamic"; // ✅ SSGを無効化

export default function ParticipantSurveyPage() {
  return (
    <Suspense fallback={<p style={{ color: "white", textAlign: "center" }}>読み込み中...</p>}>
      <ParticipantSurveyClient />
    </Suspense>
  );
}
