import AddTaskInput from "~/components/add-task-input";
import TaskCard from "~/components/task-card";
import { LoaderFunction, LoaderFunctionArgs, json } from "@remix-run/node";
import { getTasks } from "~/lib/queries.server";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { ActionFunction, redirect } from "@remix-run/node";
import { createTask } from "~/lib/queries.server";
import type { task as TaskType } from "@prisma/client";
import { getSupabaseClient } from "~/lib/supabase.server";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "~/components/ui/drawer";
import { Button } from "~/components/ui/button";
import { format } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import TaskCardOptimisticUI from "~/components/task-card-optimistic-ui";

export const loader: LoaderFunction = async ({
  request,
}: LoaderFunctionArgs) => {
  const response = new Response();

  const supabaseClient = getSupabaseClient(request, response);

  const {
    data: { session },
  } = await supabaseClient.auth.getSession();
  const data = await getTasks(session?.user?.id ?? undefined);

  return json({ data, ok: true });
};

export const action: ActionFunction = async ({ request }) => {
  const response = new Response();

  const supabaseClient = getSupabaseClient(request, response);

  const {
    data: { session },
  } = await supabaseClient.auth.getSession();

  const form = await request.formData();

  const title = form.get("title");
  const date = form.get("date");
  const label = form.get("label");

  if (title && date && label) {
    const parsedDate = new Date(date.toString());

    if (!isNaN(parsedDate.getTime())) {
      await createTask(
        String(title),
        parsedDate,
        String(label),
        session?.user?.id ?? undefined
      );

      return { ok: true };
    } else {
      console.error("The date is invalid");
    }
  } else {
    console.error("Fields are missing from the form");
  }

  return redirect("/error");
};

export default function Home() {
  const { data } = useLoaderData<typeof loader>();
  const fetcher = useFetcher({ key: "input" });
  const isAdding = fetcher.state !== "idle";

  return (
    <main className="flex-1 flex flex-col p-4 md:gap-8 md:p-6">
      <div className="flex mt-16 lg:mt-0  w-full justify-between">
        <h1 className=" font-semibold text-lg md:text-2xl">Today's tasks</h1>
        <Drawer>
          <Button asChild>
            <DrawerTrigger>Add Tasks</DrawerTrigger>
          </Button>
          <DrawerContent className="lg:h-[700px] lg:ml-auto lg:w-[700px]">
            <DrawerHeader className="md:p-0 md:mx-auto md:w-[484px]">
              <DrawerTitle>Add new Task</DrawerTitle>
              <DrawerDescription>Select label and date</DrawerDescription>
            </DrawerHeader>
            <div className="p-5">
              <AddTaskInput />
            </div>
          </DrawerContent>
        </Drawer>
      </div>
      <div className="border shadow-sm rounded-lg pb-4 px-4 mt-4 mb-4 md:mb-0">
        {isAdding && (
          <TaskCardOptimisticUI
            label={String(fetcher.formData?.get("label"))}
            title={String(fetcher.formData?.get("title"))}
            date={format(
              utcToZonedTime(
                new Date(String(fetcher.formData?.get("date"))),
                "UTC"
              ),
              "dd/MM/yyyy"
            )}
          />
        )}
        {data?.length <= 0 ? (
          <p className="text-center font-bold text-lg mt-2">No tasks found.</p>
        ) : (
          <>
            {data?.map((task: TaskType) => (
              <TaskCard
                key={`task-${task.id}`}
                taskId={task.id}
                title={task.title}
                date={format(
                  utcToZonedTime(task.date_to_end, "UTC"),
                  "dd/MM/yyyy"
                )}
                archive={task.archive}
                complete={task.completed}
                label={task.label}
                url="/"
              />
            ))}
          </>
        )}
      </div>
    </main>
  );
}
