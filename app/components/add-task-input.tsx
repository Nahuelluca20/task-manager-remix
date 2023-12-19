import { useState } from "react";
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

export default function AddTaskInput() {
  const [date, setDate] = useState<Date>();

  return (
    <div className="grid md:flex flex-col md:mx-auto gap-4">
      <Input
        className="border p-2 rounded-md w-full md:w-[485px]"
        placeholder="Add Task Title"
        type="text"
      />
      <div className="grid md:flex gap-6">
        <DatePicker date={date} setDate={setDate} />
        <Select>
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
      <Button className="w-[100px]">Add task</Button>
    </div>
  );
}
