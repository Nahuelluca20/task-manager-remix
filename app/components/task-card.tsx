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
    <Card className="mt-4 pt-2">
      <CardContent className="flex flex-row items-start gap-4">
        <Checkbox className="mt-1" id={taskId} />
        <div className="space-y-1 leading-none">
          <Label htmlFor={taskId}>{title}</Label>
          <p className="text-sm text-gray-500 dark:text-gray-400">{date}</p>
        </div>
      </CardContent>
    </Card>
  );
}
