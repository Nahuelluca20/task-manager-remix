import db from "~/lib/db.server";

export async function getTasks() {
  const tasks = await db.task.findMany({
    where: { archive: false },
    orderBy: [
      {
        title: "desc",
      },
    ],
  });
  return tasks;
}

export async function getTaskByLabel(label: string) {
  const tasks = await db.task.findMany({
    where: { label: label },
  });
  return tasks;
}

export async function setTaskStatus(id: string, isCompleted: boolean) {
  const task = await db.task.update({
    where: { id: id },
    data: { completed: !isCompleted },
  });

  return task;
}

export async function setTaskArchive(id: string, isArchived: boolean) {
  const task = await db.task.update({
    where: { id: id },
    data: { archive: !isArchived },
  });

  return task;
}
