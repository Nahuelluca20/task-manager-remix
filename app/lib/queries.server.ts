import db from "~/lib/db.server";

export function getTasks() {
  const tasks = db.task.findMany();
  return tasks;
}
