import AddTaskInput from "~/components/add-task-input";
import TaskCard from "~/components/task-card";
import { LoaderFunction, LoaderFunctionArgs } from "@remix-run/node";
import { getTasks } from "~/lib/queries.server";
import { useLoaderData } from "@remix-run/react";
import { ActionFunction, redirect } from "@remix-run/node";
import { createTask } from "~/lib/queries.server";
import type { task as TaskType } from "@prisma/client";
import { getSupabaseClient } from "~/lib/supabase.server";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "~/components/ui/drawer";
import { Button } from "~/components/ui/button";
import { format } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";

export const loader: LoaderFunction = async ({
  request,
}: LoaderFunctionArgs) => {
  const response = new Response();

  const supabaseClient = getSupabaseClient(request, response);

  const {
    data: { session },
  } = await supabaseClient.auth.getSession();
  const data = await getTasks(session?.user?.id ?? undefined);

  console.log(data);

  return data;
};

export default function Home() {
  const data = useLoaderData<typeof loader>();

  return (
    <main className="flex-1 flex flex-col p-4 md:gap-8 md:p-6">
      <div className="flex mt-16 lg:mt-0  w-full justify-between">
        <h1 className=" font-semibold text-lg md:text-2xl">Today's tasks</h1>
        <Drawer>
          <DrawerTrigger>
            <Button>Add Tasks</Button>
          </DrawerTrigger>
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

      {data.length <= 0 ? (
        <div className="border shadow-sm rounded-lg mt-4 py-6">
          <p className="text-center font-bold text-lg">No tasks found.</p>
        </div>
      ) : (
        <div className="border shadow-sm rounded-lg pb-4 px-4 mt-4 mb-4 md:mb-0">
          {data.map((task: TaskType) => (
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
        </div>
      )}
    </main>
  );
}

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

      return redirect("/");
    } else {
      console.error("The date is invalid");
    }
  } else {
    console.error("Fields are missing from the form");
  }

  return redirect("/error");
};
