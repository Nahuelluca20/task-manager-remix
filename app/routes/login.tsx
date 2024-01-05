import { useNavigate, useOutletContext } from "@remix-run/react";
import { SupabaseClient } from "@supabase/auth-helpers-remix";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

export default function Login() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const supabase = useOutletContext<{ supabase: SupabaseClient }>();
  const navigate = useNavigate();

  const handleEmailLogin = async (email: string, password: string) => {
    try {
      const { error } = await supabase.supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        console.error("Login failed", error);
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Unexpected error during login", error);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLFormElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleEmailLogin(credentials.email, credentials.password);
    }
  };

  return (
    <div className="flex-1 flex flex-col p-4 md:p-6 gap-4">
      <h1 className="font-bold text-2xl mt-20 lg:mt-0">Login</h1>
      <p className="text-gray-600">
        If you have an account, log in but if not, try the application, you can
        use it anyway
      </p>
      <form
        className="max-w-[300px] flex flex-col gap-4"
        onKeyDown={handleKeyDown}
      >
        <label htmlFor="email">Email</label>
        <Input
          type="email"
          name="email"
          id="email"
          value={credentials.email}
          onChange={(e) =>
            setCredentials({ ...credentials, email: e.target.value })
          }
        />
        <label htmlFor="password">Password</label>
        <Input
          type="password"
          name="password"
          id="password"
          value={credentials.password}
          onChange={(e) =>
            setCredentials({ ...credentials, password: e.target.value })
          }
        />
        <Button
          type="button"
          className="max-w-[77px]"
          onClick={() =>
            handleEmailLogin(credentials.email, credentials.password)
          }
        >
          Login
        </Button>
      </form>
    </div>
  );
}
