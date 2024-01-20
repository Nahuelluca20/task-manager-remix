import { useEffect, useRef, useState, useTransition } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { DatePicker } from "./date-picker";
import { useFetcher } from "@remix-run/react";

export default function AddTaskInput() {
  const [date, setDate] = useState<Date>();
  const fetcher = useFetcher({ key: "input" });

  let $form = useRef<HTMLFormElement>(null);

  useEffect(
    function resetFormOnSuccess() {
      // @ts-ignore
      if (fetcher.state === "idle" && fetcher.data?.ok) {
        $form.current?.reset();
      }
    },
    [fetcher.state, fetcher.data]
  );

  return (
    <div className="grid md:flex flex-col md:mx-auto gap-4">
      <fetcher.Form
        ref={$form}
        method="post"
        action="/?index"
        className="grid md:flex flex-col md:mx-auto gap-4"
      >
        <Input
          className="border p-2 rounded-md w-full md:w-[485px]"
          name="title"
          placeholder="Add Task Title"
          type="text"
        />
        <div className="grid md:flex gap-6">
          <input
            className="hidden"
            type="date"
            name="date"
            defaultValue={date ? date.toISOString().split("T")[0] : undefined}
          />
          <DatePicker date={date} setDate={setDate} />
          <Select name="label">
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Add Target" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="work">Work</SelectItem>
              <SelectItem value="personal">Personal</SelectItem>
              <SelectItem value="hobbies">Hobbies</SelectItem>
              <SelectItem value="fitness">Fitness</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button type="submit" className="w-[100px]">
          Add task
        </Button>
      </fetcher.Form>
    </div>
  );
}
