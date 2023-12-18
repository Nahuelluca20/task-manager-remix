import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import { Label } from "~/components/ui/label";
import { CardContent, Card } from "~/components/ui/card";
import TaskCard from "~/components/task-card";
import { useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

export function headers() {
  return {
    "Cache-Control": "public, max-age=60, s-maxage=60",
  };
}

type Tasks = {
  id: string;
  title: string;
  date: string;
}[];

export default function Component() {
  const [tasks, setTasks] = useState<Tasks>([
    {
      id: "task1",
      title: "Finish writing the report",
      date: "Due by 5 PM",
    },
    { id: "task2", title: "Hacer lentejas", date: "Due by 7 PM" },
    { id: "task3", title: "Ver la masa madre", date: "Due by 30 PM" },
  ]);

  function handleDragEnd(event: any) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setTasks((tasks: Tasks) => {
        const oldIndex = tasks.findIndex((task) => task.id === active.id);
        const newIndex = tasks.findIndex((task) => task.id === over.id);

        return arrayMove(tasks, oldIndex, newIndex);
      });
    }
  }

  return (
    <main className="flex-1 p-6 flex flex-col gap-6 overflow-x-scroll">
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div className="flex gap-4">
          <div className="flex flex-col w-72 gap-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">To Do</h2>
              <Button className="ml-auto" size="sm">
                Add task
              </Button>
            </div>

            <SortableContext
              items={tasks}
              strategy={verticalListSortingStrategy}
            >
              {tasks.map((task) => (
                <TaskCard
                  key={task.id}
                  taskId={task.id}
                  title={task.title}
                  date={task.date}
                />
              ))}
            </SortableContext>
          </div>

          <div className="flex flex-col w-72 gap-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">In Progress</h2>
              <Button className="ml-auto" size="sm">
                Add task
              </Button>
            </div>
            <Card>
              <CardContent className="flex flex-row items-start gap-2 p-4">
                <Checkbox id="task3" />
                <div className="space-y-1 leading-none">
                  <Label className="text-lg font-medium" htmlFor="task3">
                    Submit the proposal
                  </Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Due by end of day
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col w-72 gap-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Done</h2>
              <Button className="ml-auto" size="sm">
                Add task
              </Button>
            </div>
          </div>
        </div>
      </DndContext>
    </main>
  );
}
