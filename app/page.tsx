import { redirect } from "next/navigation";

export default function Home() {
  redirect("/workers/new");
  return null;
}
