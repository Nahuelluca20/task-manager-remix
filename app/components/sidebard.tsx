import { Link } from "@remix-run/react";
import {
  ActivityIcon,
  ArchiveIcon,
  HomeIcon,
  ListChecksIcon,
} from "lucide-react";
import { useLocation } from "@remix-run/react";
import clsx from "clsx";

const routesLinks = [
  {
    name: "Home",
    path: "/",
    icon: HomeIcon,
  },
  {
    name: "Tasks",
    path: "/tasks",
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
  return (
    <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
      <div className="flex flex-col h-full max-h-screen gap-2">
        <div className="flex h-[60px] items-center border-b px-6">
          <Link className="flex items-center gap-2 font-semibold" to="/">
            <ListChecksIcon className="h-6 w-6" />
            <span className="">Task Manager</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-4 text-sm font-medium">
            {routesLinks.map((route) => (
              <Link
                key={route.path}
                className={clsx(
                  "flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
                  location.pathname === route.path
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
