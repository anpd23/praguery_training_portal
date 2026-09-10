"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useAcademy } from "@/lib/academy-context";
import { brandCopy, ui } from "@/lib/brand/copy";
import { quizById } from "@/lib/data/catalog";

export default function QuizPage() {
  const params = useParams<{ quizId: string }>();
  const { session, submitQuiz, attempts } = useAcademy();
  const quiz = quizById(params.quizId);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [resultId, setResultId] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const result = useMemo(
    () => attempts.find((attempt) => attempt.id === resultId),
    [attempts, resultId],
  );

  if (!session) return null;
  if (!quiz) {
    return (
      <AppShell title="Quiz missing" backHref="/home">
        <p>We could not find that quiz.</p>
      </AppShell>
    );
  }

  const currentQuiz = quiz;
  const question = currentQuiz.questions[index];
  const selected = question ? answers[question.id] : undefined;

  async function finish() {
    setBusy(true);
    try {
      const attempt = await submitQuiz({ quizId: currentQuiz.id, answers });
      setResultId(attempt.id);
    } finally {
      setBusy(false);
    }
  }

  if (result) {
    return (
      <AppShell title={quiz.title} backHref={`/modules/${quiz.moduleId}`}>
        <Card className={result.passed ? "border-2 border-teal" : "border-2 border-gold"}>
          <p className="text-4xl font-bold text-dark-teal">{result.scorePct}%</p>
          <p className="mt-2 text-lg font-semibold">{result.passed ? ui.quizPass : ui.quizFail}</p>
          <p className="mt-2 text-[13px] text-muted">Pass mark: {quiz.passThresholdPct}%</p>
          {result.passed ? (
            <p className="mt-4 text-sm italic text-dark-teal">{brandCopy.certificateSignOff}</p>
          ) : null}
        </Card>
        <div className="mt-4 flex flex-col gap-3">
          <Link
            href={`/modules/${quiz.moduleId}`}
            className="flex min-h-11 items-center justify-center rounded-[10px] bg-light-teal font-semibold text-dark-teal"
          >
            Review the guide
          </Link>
          {!result.passed ? (
            <Button
              onClick={() => {
                setResultId(null);
                setIndex(0);
                setAnswers({});
              }}
            >
              Try again
            </Button>
          ) : (
            <Link
              href="/home"
              className="flex min-h-11 items-center justify-center rounded-[10px] bg-teal font-semibold text-white"
            >
              Back to home
            </Link>
          )}
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell title={quiz.title} subtitle={`Question ${index + 1} of ${quiz.questions.length}`} backHref={`/modules/${quiz.moduleId}`}>
      <Card>
        <p className="text-lg font-bold leading-snug">{question.prompt}</p>
        <ul className="mt-4 space-y-2">
          {question.options.map((option) => (
            <li key={option.id}>
              <button
                type="button"
                onClick={() => setAnswers((current) => ({ ...current, [question.id]: option.id }))}
                className={`w-full rounded-xl border-2 px-3 py-3 text-left text-[15px] ${
                  selected === option.id
                    ? "border-teal bg-light-teal"
                    : "border-border bg-white"
                }`}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      </Card>
      <div className="mt-4 flex gap-3">
        <Button
          variant="secondary"
          className="flex-1"
          disabled={index === 0}
          onClick={() => setIndex((value) => value - 1)}
        >
          Previous
        </Button>
        {index < quiz.questions.length - 1 ? (
          <Button className="flex-1" disabled={!selected} onClick={() => setIndex((value) => value + 1)}>
            Next
          </Button>
        ) : (
          <Button className="flex-1" disabled={!selected || busy} onClick={() => void finish()}>
            Submit
          </Button>
        )}
      </div>
    </AppShell>
  );
}
