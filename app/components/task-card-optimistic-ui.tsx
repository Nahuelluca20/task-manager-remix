import clsx from "clsx";
import { Card, CardContent } from "./ui/card";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";

export default function TaskCardOptimisticUI({
  title,
  date,
  label,
}: {
  title: string | null | undefined;
  date: string | null | undefined;
  label: string | null | undefined;
}) {
  return (
    <Card
      className={clsx("mt-4 pt-2 pl-8", {
        // "opacity-25": isDeleting,
      })}
    >
      <CardContent className="flex flex-wrap flex-row items-start gap-4">
        {/* <fetcher.Form method="post" action="/set-completed">
          <input type="hidden" name="taskId" defaultValue={taskId} />

          <input
            type="hidden"
            name="complete"
            defaultValue={String(!isCompleted)}
          />

          <input type="hidden" name="archived" defaultValue={String(archive)} />

          <Checkbox
            type="submit"
            onCheckedChange={handleCheckboxChange}
            checked={isCompleted}
            className="mt-[5px]"
            id={taskId}
          />
        </fetcher.Form> */}
        <div className="space-y-1 leading-none">
          <div className="flex items-center gap-2">
            <Label
              className={clsx(
                "text-sm sm:text-base font-medium"
                // !isCompleted && isSubmitting
                //   ? ""
                //   : isCompleted || isSubmitting
                //   ? "text-gray-600 line-through decoration-[3px]"
                //   : ""
              )}
              // htmlFor={taskId}
            >
              {title || ""}
            </Label>
            <Badge className="max-h-6">{label || ""}</Badge>
            {/* {isSubmitting && <Spinner className="h-5 w-5" />} */}
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            terminar antes del {date || ""}
          </p>
        </div>
        {/* <div className="flex flex-grow gap-2 justify-end">
          <fetcher.Form method="post" action="/card-actions">
            <input type="hidden" name="action" value="archive" />
            <input type="hidden" name="taskId" defaultValue={taskId} />
            <input type="hidden" name="redirectPath" defaultValue={url} />

            <input
              type="hidden"
              name="archived"
              defaultValue={String(archive)}
            />
            <Button type="submit" variant="outline" className="gap-2">
              <ArchiveIcon className="h-4 w-4" />
              {archive ? "Unarchive" : "Archive"}
            </Button>
          </fetcher.Form>
          <fetcher.Form method="post" action="/card-actions">
            <input type="hidden" name="action" value="delete" />
            <input type="hidden" name="taskId" defaultValue={taskId} />
            <input type="hidden" name="redirectPath" defaultValue={url} />

            <input
              type="hidden"
              name="archived"
              defaultValue={String(archive)}
            />

            <Button variant={"destructive"} className="gap-2">
              <Trash className="h-4 w-4" />
              Delete
            </Button>
          </fetcher.Form>
        </div> */}
      </CardContent>
    </Card>
  );
}
