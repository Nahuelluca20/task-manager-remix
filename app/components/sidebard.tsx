import { Link } from "@remix-run/react";
import {
  ActivityIcon,
  ArchiveIcon,
  Drum,
  HomeIcon,
  ListChecksIcon,
  UserIcon,
  WorkflowIcon,
} from "lucide-react";
import { useLocation } from "@remix-run/react";
import clsx from "clsx";
import { useState } from "react";
import { Button } from "./ui/button";

const routesLinks = [
  {
    name: "Home",
    path: "/",
    icon: HomeIcon,
  },
  {
    name: "Work",
    path: "/tasks?=work",
    icon: WorkflowIcon,
  },
  {
    name: "Personal",
    path: "/tasks?=personal",
    icon: UserIcon,
  },
  {
    name: "Hobbies",
    path: "/tasks?=hobbies",
    icon: Drum,
  },
  {
    name: "Fitness",
    path: "/tasks?=fitness",
    icon: ActivityIcon,
  },
  {
    name: "Archive",
    path: "/archive",
    icon: ArchiveIcon,
  },
];

export default function Sidebard() {
  const location = useLocation();
  const [hidden, setHidden] = useState<boolean>(true);

  return (
    <div className="fixed lg:sticky w-full z-10 bg-gray-100 border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
      <div className="flex flex-col lg:h-full lg:max-h-screen gap-2">
        <div className="flex gap-2 h-[60px] items-center border-b px-6">
          <Button
            onClick={() => setHidden(!hidden)}
            size="icon"
            variant={"ghost"}
          >
            <ListChecksIcon className="h-6 w-6" />
          </Button>
          <Link className="flex items-center gap-2 font-semibold" to="/">
            <span className="">Task Manager</span>
          </Link>
        </div>
        <div
          className={"hidden lg:block flex-1 overflow-auto py-2 top-14 w-full"}
        >
          <nav className="grid items-start px-4 text-sm font-medium">
            {routesLinks.map((route) => (
              <Link
                key={route.path}
                className={clsx(
                  "flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
                  location.pathname === route.path ||
                    location.pathname + location.search === route.path
                    ? "text-gray-900 dark:text-gray-50 bg-gray-200 dark:bg-gray-700"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50"
                )}
                to={route.path}
              >
                <route.icon className="h-4 w-4" />
                {route.name}
              </Link>
            ))}
          </nav>
        </div>
        <div
          className={clsx(
            `lg:hidden flex-1 overflow-auto py-2 top-14 w-full`,
            hidden ? "hidden" : "block"
          )}
        >
          <nav className="grid items-start px-4 text-sm font-medium">
            {routesLinks.map((route) => (
              <Link
                key={route.path}
                onClick={() => setHidden(true)}
                className={clsx(
                  "flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
                  location.pathname === route.path ||
                    location.pathname + location.search === route.path
                    ? "text-gray-900 dark:text-gray-50 bg-gray-200 dark:bg-gray-700"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50"
                )}
                to={route.path}
              >
                <route.icon className="h-4 w-4" />
                {route.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
