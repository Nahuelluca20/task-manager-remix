import { useSortable } from "@dnd-kit/sortable";
import { Card, CardContent } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { CSS } from "@dnd-kit/utilities";

export default function TaskCard({
  title,
  date,
  taskId,
}: {
  title: string;
  date: string;
  taskId: string;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: taskId });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Card style={style} ref={setNodeRef} {...attributes} {...listeners}>
      <CardContent className="flex flex-row items-start gap-2 p-4">
        <Checkbox id={taskId} />
        <div className="space-y-1 leading-none">
          <Label className="text-lg font-medium" htmlFor={taskId}>
            {title}
          </Label>
          <p className="text-sm text-gray-500 dark:text-gray-400">{date}</p>
        </div>
      </CardContent>
    </Card>
  );
}
