import { format } from "date-fns";
import { Card, CardContent } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";

export default function CardTaskArchived({
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
    <Card>
      <CardContent className="flex flex-row items-start gap-2 p-4">
        <Checkbox id={taskId} className="mt-2" />
        <div className="space-y-1 leading-none">
          <Label className="text-lg font-medium" htmlFor={taskId}>
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
