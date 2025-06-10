"use client";
import Link from "next/link";

export default function Header() {
  return (
    <header className="p-4 bg-white shadow flex gap-4">
      <Link href="/workers/new">Create Worker</Link>
      <Link href="/store">Marketplace</Link>
    </header>
  );
}
