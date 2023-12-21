import clsx from "clsx";
import { Card, CardContent } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { format } from "date-fns";
import { Badge } from "./ui/badge";
import { useFetcher, useNavigation } from "@remix-run/react";
import { useState } from "react";
import Spinner from "./spinner";

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
  const [isCompleted, setIsCompleted] = useState<boolean>(complete);
  const isSubmitting = fetcher.state === "submitting";

  const handleCheckboxChange = () => {
    // Update the UI optimistically
    setIsCompleted(!isCompleted);
    // Make the server request
    fetcher.submit({ method: "post", action: "/completed" });
  };

  return (
    <Card className="mt-4 pt-2">
      <CardContent className="flex flex-row items-start gap-4">
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
            defaultValue={String(!isCompleted)}
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
        <div className="space-y-1 space-x-2 leading-none">
          <div className="flex items-center gap-2">
            <Label
              className={clsx(
                "text-md font-medium",
                !isCompleted && isSubmitting
                  ? ""
                  : isCompleted || isSubmitting
                  ? "text-gray-600 line-through decoration-[3px]"
                  : ""
              )}
              htmlFor={taskId}
            >
              {title}
            </Label>
            <Badge className="max-h-6">{label}</Badge>
            {isSubmitting && <Spinner className="h-5 w-5" />}
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            terminar antes del {format(new Date(date), "dd/MM/yyyy")}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
