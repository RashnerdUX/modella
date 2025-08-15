import type { Route } from "./+types/register";
import type { FormEvent } from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../auth";
import { RegisterComponent } from "../components/authentication/RegisterComponent";

export function meta({}: Route.MetaArgs) { return [{ title: "Register" }]; }

export default function Register() {
  const { register: registerUser, loading, user } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && user) {
      navigate('/dashboard', { replace: true });
    }
  }, [loading, user, navigate]);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
  const ok = await registerUser({ username, email, password });
  if (!ok) setError("Registration failed");
  else navigate('/dashboard', { replace: true });
  }

  return (
    <RegisterComponent
      username={username}
      email={email}
      password={password}
      confirmPassword={confirmPassword}
      error={error}
      loading={loading}
      setUsername={setUsername}
      setEmail={setEmail}
      setPassword={setPassword}
      setConfirmPassword={setConfirmPassword}
      submit={submit}
    />
  );
}
