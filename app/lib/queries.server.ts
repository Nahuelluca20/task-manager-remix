import db from "~/lib/db.server";

export function getTasks() {
  const tasks = db.task.findMany();
  return tasks;
}

export function getTaskByLabel(label: string) {
  const tasks = db.task.findMany({
    where: { label: label },
  });
  return tasks;
}
