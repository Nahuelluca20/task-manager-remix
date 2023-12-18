import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import { Label } from "~/components/ui/label";
import { CardContent, Card } from "~/components/ui/card";
import TaskCard from "~/components/task-card";

export function headers({
  loaderHeaders,
  parentHeaders,
}: {
  loaderHeaders: Headers;
  parentHeaders: Headers;
}) {
  return {
    "Cache-Control": "public, max-age=60, s-maxage=60",
  };
}

export default function Component() {
  return (
    <main className="flex-1 p-6 flex flex-col gap-6 overflow-x-scroll">
      <div className="flex gap-4">
        <div className="flex flex-col w-72 gap-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">To Do</h2>
            <Button className="ml-auto" size="sm">
              Add task
            </Button>
          </div>
          <TaskCard
            taskId={"task1"}
            title={"Finish writing the report"}
            date="Due by 5 PM"
          />
          <TaskCard
            taskId={"task1"}
            title={"Finish writing the report 2"}
            date="Due by 5 PM"
          />
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
    </main>
  );
}
