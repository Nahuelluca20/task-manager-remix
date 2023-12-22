import { LoaderFunction } from "@remix-run/node";
import { getTaskByLabel } from "~/lib/queries.server";
import { useLoaderData } from "@remix-run/react";
import CardTaskArchived from "~/components/card-task-archived";
import type { task as TaskType } from "@prisma/client";

export function headers() {
  return {
    "Cache-Control": "public, max-age=60, s-maxage=60",
  };
}

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const query = url.searchParams.get("");
  const data = query && getTaskByLabel(String(query));

  return data;
};

export default function Tasks() {
  const data = useLoaderData<typeof loader>();
  return (
    <main className="flex-1 p-6 flex flex-col gap-6 overflow-x-scroll">
      <h2 className="text-xl font-semibold mt-12 lg:mt-0">Tasks</h2>
      <div className="flex gap-4">
        <div className="flex flex-col w-72 gap-4">
          {data.map((task: TaskType) => (
            <CardTaskArchived
              key={`task-${task.id}`}
              taskId={task.id}
              title={task.title}
              date={task.date_to_end}
              archive={task.archive}
              complete={task.completed}
              label={task.label}
              url={`/tasks?=${task.label}`}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
