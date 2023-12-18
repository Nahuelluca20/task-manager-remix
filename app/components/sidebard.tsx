import { Badge } from "~/components/ui/badge";
import { Link } from "@remix-run/react";
import { ActivityIcon, ArchiveIcon, BellIcon, HomeIcon } from "lucide-react";

export default function Sidebard() {
  return (
    <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
      <div className="flex flex-col h-full max-h-screen gap-2">
        <div className="flex h-[60px] items-center border-b px-6">
          <Link className="flex items-center gap-2 font-semibold" to="/">
            <ActivityIcon className="h-6 w-6" />
            <span className="">Task Manager</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-4 text-sm font-medium">
            <Link
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              to="/"
            >
              <HomeIcon className="h-4 w-4" />
              Home
            </Link>
            <Link
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              to="/tasks"
            >
              <ActivityIcon className="h-4 w-4" />
              Tasks
              <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                12
              </Badge>
            </Link>
            <Link
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              to="/archive"
            >
              <ArchiveIcon className="h-4 w-4" />
              Archive
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}
