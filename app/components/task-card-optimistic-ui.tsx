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
    <Card className="mt-4 pt-2 pl-8">
      <CardContent className="flex flex-wrap flex-row items-start gap-4">
        <div className="space-y-1 leading-none">
          <div className="flex items-center gap-2">
            <Label className="text-sm sm:text-base font-medium">
              {title || ""}
            </Label>
            <Badge className="max-h-6">{label || ""}</Badge>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            terminar antes del {date || ""}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
