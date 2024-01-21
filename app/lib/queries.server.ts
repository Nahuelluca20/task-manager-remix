import db from "~/lib/db.server";

export async function getTasks(userId?: string) {
  const tasks = await db.task.findMany({
    where: { archive: false, user_id: userId || null },
    orderBy: [
      {
        created_at: "desc",
      },
    ],
  });

  return tasks;
}

export async function getArchiveTasks(userId?: string) {
  const tasks = await db.task.findMany({
    where: { archive: true, user_id: userId || null },
    orderBy: [
      {
        created_at: "desc",
      },
    ],
  });
  return tasks;
}

export async function getTaskByLabel(label: string, userId?: string) {
  const tasks = await db.task.findMany({
    where: { label: label, user_id: userId || null },
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

export async function createTask(
  title: string,
  dateToEnd: Date,
  label: string,
  userId?: string
) {
  const task = await db.task.create({
    data: {
      title: title,
      date_to_end: dateToEnd,
      label: label,
      user_id: userId || null,
    },
  });

  return task;
}

export async function deleteTask(taskId: string) {
  const task = await db.task.delete({
    where: { id: taskId },
  });

  return task;
}
