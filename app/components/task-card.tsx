import { Card, CardContent } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";

export default function TaskCard({
  title,
  date,
  taskId,
}: {
  title: string;
  date: string;
  taskId: string;
}) {
  return (
    <Card>
      <CardContent className="flex flex-row items-start gap-2 p-4">
        <Checkbox id="task1" />
        <div className="space-y-1 leading-none">
          <Label className="text-lg font-medium" htmlFor="task1">
            Finish writing the report
          </Label>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Due by 5 PM
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
