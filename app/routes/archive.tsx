import TaskCard from "~/components/task-card";
import { LoaderFunction, LoaderFunctionArgs } from "@remix-run/node";
import { getArchiveTasks } from "~/lib/queries.server";
import { useLoaderData } from "@remix-run/react";
import type { task as TaskType } from "@prisma/client";
import { getSupabaseClient } from "~/lib/supabase.server";

export function headers() {
  return {
    "Cache-Control": "public, max-age=60, s-maxage=60",
  };
}

export const loader: LoaderFunction = async ({
  request,
}: LoaderFunctionArgs) => {
  const response = new Response();

  const supabaseClient = getSupabaseClient(request, response);

  const {
    data: { session },
  } = await supabaseClient.auth.getSession();

  const data = await getArchiveTasks(session?.user?.id ?? undefined);

  return data;
};

export default function Archive() {
  const data = useLoaderData<typeof loader>();

  if (data.length <= 0) {
    return (
      <main className="flex-1 flex flex-col p-4 md:gap-8 md:p-6">
        <div className="flex items-center mt-12 lg:mt-0">
          <h1 className="font-semibold text-lg md:text-2xl">Today's tasks</h1>
        </div>
        <div className="border shadow-sm rounded-lg py-6">
          <p className="text-center font-bold text-lg">No tasks found.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 flex flex-col p-4 md:gap-8 md:p-6">
      <div className="flex items-center mt-12 lg:mt-0">
        <h1 className="font-semibold text-lg md:text-2xl">Today's tasks</h1>
      </div>
      <div className="border shadow-sm rounded-lg pb-4 px-4 mt-4 mb-4 md:mb-0">
        {data.map((task: TaskType) => (
          <TaskCard
            url="/archive"
            key={`task-${task.id}`}
            taskId={task.id}
            title={task.title}
            date={task.date_to_end}
            archive={task.archive}
            complete={task.completed}
            label={task.label}
          />
        ))}
      </div>
    </main>
  );
}
