import { Card, CardContent } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { format } from "date-fns";

export default function TaskCard({
  title,
  date,
  taskId,
  label,
  complete,
  archive,
}: {
  title: string;
  date: Date;
  taskId: string;
  label: string;
  complete: boolean;
  archive: boolean;
}) {
  return (
    <Card className="mt-4 pt-2">
      <CardContent className="flex flex-row items-start gap-4">
        <Checkbox className="mt-[2px]" id={taskId} />
        <div className="space-y-1 leading-none">
          <Label className="text-md" htmlFor={taskId}>
            {title}
          </Label>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            terminar antes del {format(new Date(date), "dd/MM/yyyy")}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
