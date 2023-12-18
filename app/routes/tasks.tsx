import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { Checkbox } from "~/components/ui/checkbox";
import { Label } from "~/components/ui/label";
import { CardContent, Card } from "~/components/ui/card";

export default function Component() {
  return (
    <main className="flex-1 p-6 flex flex-col gap-6 overflow-x-scroll">
      <h2 className="text-xl font-semibold">Tasks</h2>
      <div className="flex gap-4">
        <div className="flex flex-col w-72 gap-4">
          <Card>
            <CardContent className="flex flex-row items-start gap-2 p-4">
              <Checkbox id="task1" />
              <div className="space-y-1 leading-none">
                <Label className="text-lg font-medium" htmlFor="task1">
                  Task 1
                </Label>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Due on 20th Dec 2023
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-row items-start gap-2 p-4">
              <Checkbox id="task2" />
              <div className="space-y-1 leading-none">
                <Label className="text-lg font-medium" htmlFor="task2">
                  Task 2
                </Label>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Due on 25th Dec 2023
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
