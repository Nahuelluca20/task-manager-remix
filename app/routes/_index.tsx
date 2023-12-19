import AddTaskInput from "~/components/add-task-input";
import TaskCard from "~/components/task-card";

import { Card, CardContent } from "~/components/ui/card";
import { Checkbox } from "~/components/ui/checkbox";
import { Label } from "~/components/ui/label";

export function headers() {
  return {
    "Cache-Control": "public, max-age=60, s-maxage=60",
  };
}

export default function Home() {
  const tasks = [
    {
      taskId: "task1",
      title: "Plan the weekly meeting",
      date: "Due by 5pm today",
    },
    {
      taskId: "task2",
      title: "Prepare presentation for client",
      date: "Due by end of this week",
    },
    {
      taskId: "task3",
      title: "Update project roadmap",
      date: "Due by end of this month",
    },
    {
      taskId: "task33",
      title: "Update project roadmap",
      date: "Due by end of this month",
    },
    {
      taskId: "task34",
      title: "Update project roadmap",
      date: "Due by end of this month",
    },
    {
      taskId: "task36",
      title: "Update project roadmap",
      date: "Due by end of this month",
    },
  ];

  return (
    <main className="flex-1 flex flex-col p-4 md:gap-8 md:p-6">
      <div className="flex items-center mt-12 lg:mt-0">
        <h1 className="font-semibold text-lg md:text-2xl">Today's tasks</h1>
      </div>
      <div className="border shadow-sm rounded-lg pb-4 px-4 mt-4 mb-4 md:mb-0">
        {tasks.map((task) => (
          <TaskCard key={`task-${task.taskId}`} {...task} />
        ))}
      </div>
      <AddTaskInput />
    </main>
  );
}
