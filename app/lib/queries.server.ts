import db from "~/lib/db.server";

export async function getTasks() {
  const tasks = await db.task.findMany();
  return tasks;
}

export async function getTaskByLabel(label: string) {
  const tasks = await db.task.findMany({
    where: { label: label },
  });
  return tasks;
}

export async function SwitchTaskStatus(id: string, isCompleted: boolean) {
  console.log(isCompleted);
  const task = await db.task.update({
    where: { id: id },
    data: { completed: !isCompleted },
  });

  return task;
}
