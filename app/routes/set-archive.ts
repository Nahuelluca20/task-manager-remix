import { ActionFunction, redirect } from "@remix-run/node";
import { setTaskArchive } from "~/lib/queries.server";

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const taskId = form.get("taskId");
  const archived = form.get("archived");
  const isArchived =
    archived !== null && String(archived).toLowerCase() === "true";

  await setTaskArchive(String(taskId), isArchived);

  const redirectPath = form.get("redirectPath");

  return redirectPath ? redirect(`${redirectPath}`) : redirect("/");
};
