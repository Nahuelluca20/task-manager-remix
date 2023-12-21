import { format } from "date-fns";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import clsx from "clsx";
import { useFetcher } from "@remix-run/react";
import Spinner from "./spinner";
import { useState } from "react";

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
  const [isCompleted, setIsCompleted] = useState<boolean>(complete);
  const isSubmitting = fetcher.state === "submitting";

  const handleCheckboxChange = () => {
    // Update the UI optimistically
    setIsCompleted(!isCompleted);
    // Make the server request
    fetcher.submit({ method: "post", action: "/set-completed" });
  };

  return (
    <Card className="">
      <div className="px-2 pt-4 flex justify-between w-full">
        <Badge className="">{label}</Badge>
        {isSubmitting && <Spinner className="h-5 w-5" />}
      </div>
      <CardContent className="flex flex-row items-start gap-2 px-4">
        <fetcher.Form method="post" action="/set-completed">
          <input
            className="hidden"
            name="taskId"
            defaultValue={taskId}
            type="text"
          />
          <input
            className="hidden"
            name="complete"
            defaultValue={String(!isCompleted)}
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
            onCheckedChange={handleCheckboxChange}
            checked={isCompleted}
            className="mt-[5px]"
            id={taskId}
          />
        </fetcher.Form>
        <div className="space-y-1 leading-none">
          <Label
            className={clsx(
              "text-lg font-medium",
              !isCompleted && isSubmitting
                ? ""
                : isCompleted || isSubmitting
                ? "text-gray-600 line-through decoration-[4px]"
                : ""
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
