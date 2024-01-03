import {
  json,
  type LinksFunction,
  type LoaderFunction,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";
import { cssBundleHref } from "@remix-run/css-bundle";
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";

import styles from "./tailwind.css";
import Sidebard from "./components/sidebard";
import { createClient } from "@supabase/supabase-js";
import { useState } from "react";
import { createServerClient } from "@supabase/auth-helpers-remix";
import { Button } from "./components/ui/button";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export const meta: MetaFunction = () => [
  {
    charset: "utf-8",
    title: "Task Manager",
    viewport: "width=device-width,initial-scale=1",
  },
];

export const loader: LoaderFunction = () => {
  const env = {
    SUPABASE_URL: process.env.SUPABASE_URL!,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY!,
  };

  return { env };
};

export default function App() {
  const { env } = useLoaderData<typeof loader>();
  const [supabase] = useState(() =>
    createClient(env.SUPABASE_URL!, env.SUPABASE_ANON_KEY!)
  );

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
          <Sidebard>
            {/* {supabase.auth.getUser() ? ( */}
            <div className="gap-2 w-full md:w-fit grid md:flex py-5">
              <Button asChild>
                <Link to={"/logout"}>LogOut</Link>
              </Button>
              {/* ) : ( */}
              <Button asChild>
                <Link to={"/login"}>LogIn</Link>
              </Button>
            </div>
            {/* )} */}
          </Sidebard>
          <Outlet context={supabase} />
        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
