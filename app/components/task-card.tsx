import clsx from "clsx";
import { Card, CardContent } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { format } from "date-fns";
import { Badge } from "./ui/badge";
import { Form, useFetcher } from "@remix-run/react";

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
  const fetcher = useFetcher();

  return (
    <Card className="mt-4 pt-2">
      <CardContent className="flex flex-row items-start gap-4">
        <fetcher.Form method="post" action="/?index">
          <input
            className="hidden"
            name="taskId"
            defaultValue={taskId}
            type="text"
          />
          <input
            className="hidden"
            name="complete"
            defaultValue={String(complete)}
            type="text"
          />
          <Checkbox
            type="submit"
            checked={complete}
            className="mt-[5px]"
            id={taskId}
          />
        </fetcher.Form>
        <div className="space-y-1 space-x-2 leading-none">
          <Label
            className={clsx(
              "text-md font-medium",
              complete ? "text-gray-600 line-through decoration-[3px]" : ""
            )}
            htmlFor={taskId}
          >
            {title}
          </Label>
          <Badge className="">{label}</Badge>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            terminar antes del {format(new Date(date), "dd/MM/yyyy")}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
