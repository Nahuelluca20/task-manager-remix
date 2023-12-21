import { ActionFunction, redirect } from "@remix-run/node";
import { setTaskStatus } from "~/lib/queries.server";

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const taskId = form.get("taskId");
  const complete = form.get("complete");
  const isCompleted =
    complete !== null && String(complete).toLowerCase() === "true";

  await setTaskStatus(String(taskId), isCompleted);

  const redirectPath = form.get("redirectPath");

  return redirectPath ? redirect(`${redirectPath}`) : redirect("/");
};
