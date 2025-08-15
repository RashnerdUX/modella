import type { Route } from "./+types/login";
import type { FormEvent } from "react";
import { useState } from "react";
import { useAuth } from "../auth";
import { LoginComponent } from "~/components/authentication/LoginComponent";

export function meta({}: Route.MetaArgs) { return [{ title: "Login" }]; }

export default function Login() {
  const { login, loading, user } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  if (!loading && user) {
    if (typeof window !== 'undefined') window.location.href = '/dashboard';
  }

  async function submit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    const ok = await login(username, password);
    if (!ok) setError("Login failed");
    else window.location.href = '/dashboard';
  }

  return (
    <LoginComponent
      username={username}
      password={password}
      error={error}
      setUsername={setUsername}
      setPassword={setPassword}
      submit={submit}
    />
  );
}
