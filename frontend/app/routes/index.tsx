import { Welcome } from "../welcome/welcome";
import { LandingPage } from "~/landing/landing_page";

export function meta() {
  return [
    { title: "Modella" },
    { name: "description", content: "Elevate your fashion sense today with Modella" },
  ];
}

export default function Home() {
  return <LandingPage />;
}