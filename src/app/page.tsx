'use client'; // Add this if you plan to use client-side features like hooks

import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold mb-8">Corporate Client Portal</h1>
      <div className="flex gap-4">
        <Link
          href="/register"
          className="rounded-full bg-blue-600 text-white px-6 py-3 hover:bg-blue-700 transition-colors"
        >
          Register
        </Link>
        <Link
          href="/login"
          className="rounded-full border border-blue-600 text-blue-600 px-6 py-3 hover:bg-blue-50 transition-colors"
        >
          Login
        </Link>
      </div>
    </div>
  );
}