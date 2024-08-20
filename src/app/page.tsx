"use client";

import { Paths } from "@/constants/paths";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  router.push(Paths.SignIn);

  return <main>Hey</main>;
}
