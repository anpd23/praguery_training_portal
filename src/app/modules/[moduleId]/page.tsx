"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Markdown } from "@/components/ui/Markdown";
import { useAcademy } from "@/lib/academy-context";
import { moduleById, quizById } from "@/lib/data/catalog";

export default function ModulePage() {
  const params = useParams<{ moduleId: string }>();
  const { session, markModule, progress } = useAcademy();
  const lesson = moduleById(params.moduleId);
  const quiz = lesson?.quizId ? quizById(lesson.quizId) : undefined;
  const done = progress.some(
    (record) => record.moduleId === lesson?.id && record.status === "completed",
  );

  useEffect(() => {
    if (session && lesson && !done) {
      void markModule(lesson.id, "in_progress");
    }
    // Intentionally run when the lesson opens.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lesson?.id, session?.employeeId]);

  if (!session) return null;
  if (!lesson) {
    return (
      <AppShell title="Module missing" backHref="/home">
        <p>We could not find that module.</p>
      </AppShell>
    );
  }

  return (
    <AppShell title={lesson.title} subtitle={lesson.contentType.replace("_", " ")} backHref={`/paths/${session.roleKey}`}>
      <Card className="mb-4">
        <Markdown text={lesson.bodyMarkdown} />
      </Card>
      <ol className="space-y-3">
        {lesson.steps.map((step, index) => (
          <li key={step.title}>
            <Card>
              <p className="text-[12px] font-semibold uppercase tracking-wide text-muted">
                Step {index + 1}
              </p>
              <h2 className="text-lg font-bold">{step.title}</h2>
              <p className="mt-1 text-[15px] leading-relaxed">{step.body}</p>
            </Card>
          </li>
        ))}
      </ol>
      {lesson.videoUrl ? (
        <Card className="mt-4">
          <video
            className="w-full rounded-xl"
            controls
            playsInline
            preload="metadata"
            src={lesson.videoUrl}
          >
            {lesson.captionsUrl ? (
              <track kind="captions" src={lesson.captionsUrl} srcLang="en" default />
            ) : null}
          </video>
        </Card>
      ) : (
        <p className="mt-4 text-[13px] text-muted">
          Video will play here when a manager uploads it. Until then, the steps above are the lesson.
        </p>
      )}
      <div className="mt-4 flex flex-col gap-3">
        {quiz ? (
          <Link
            href={`/quizzes/${quiz.id}`}
            className="flex min-h-11 items-center justify-center rounded-[10px] bg-teal text-sm font-semibold text-white"
          >
            Take the quiz: {quiz.title}
          </Link>
        ) : (
          <Button
            onClick={() => void markModule(lesson.id, "completed")}
            disabled={done}
            className="w-full"
          >
            {done ? "Marked complete" : "Mark this module complete"}
          </Button>
        )}
      </div>
    </AppShell>
  );
}
