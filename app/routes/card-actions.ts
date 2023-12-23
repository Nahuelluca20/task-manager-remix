// The action reducer pattern

import { ActionFunction, redirect } from "@remix-run/node";
import { deleteTask, setTaskArchive } from "~/lib/queries.server";

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const taskId = form.get("taskId");
  const redirectPath = form.get("redirectPath");

  switch (form.get("action")) {
    case "archive": {
      const archived = form.get("archived");
      const isArchived =
        archived !== null && String(archived).toLowerCase() === "true";

      await setTaskArchive(String(taskId), isArchived);

      return redirectPath ? redirect(`${redirectPath}`) : redirect("/");
    }
    case "delete": {
      await deleteTask(String(taskId));
      return redirectPath ? redirect(`${redirectPath}`) : redirect("/");
    }
    default: {
      throw new Error("Unknown action");
    }
  }
};
