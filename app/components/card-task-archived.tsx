import { format } from "date-fns";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import clsx from "clsx";
import { useFetcher } from "@remix-run/react";

export default function CardTaskArchived({
  title,
  date,
  taskId,
  label,
  complete,
  url,
  archive,
}: {
  title: string;
  date: Date;
  taskId: string;
  label: string;
  complete: boolean;
  archive: boolean;
  url: string;
}) {
  const fetcher = useFetcher();

  return (
    <Card className="">
      <Badge className="mx-2 mt-4">{label}</Badge>
      <CardContent className="flex flex-row items-start gap-2 px-4">
        <fetcher.Form method="post" action="/completed">
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
          <input
            className="hidden"
            name="redirectPath"
            defaultValue={url}
            type="text"
          />
          <Checkbox
            type="submit"
            checked={complete}
            className="mt-[5px]"
            id={taskId}
          />
        </fetcher.Form>
        <div className="space-y-1 leading-none">
          <Label
            className={clsx(
              "text-lg font-medium",
              complete ? "text-gray-600 line-through decoration-[4px]" : ""
            )}
            htmlFor={taskId}
          >
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
