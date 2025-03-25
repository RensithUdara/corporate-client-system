'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-br from-blue-500 via-purple-500 to-purple-600 text-white">
      <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">Welcome to the Corporate Client Portal</h1>
      <p className="text-lg md:text-xl mb-10 text-center max-w-2xl">Streamline your business operations with our secure and intuitive platform.</p>
      <div className="flex gap-6">
        <Link
          href="/register"
          className="rounded-full bg-white text-purple-600 px-8 py-3 font-medium hover:bg-gray-100 transition-all duration-300 shadow-md"
        >
          Register
        </Link>
        <Link
          href="/login"
          className="rounded-full border-2 border-white text-white px-8 py-3 font-medium hover:bg-white hover:text-purple-600 transition-all duration-300"
        >
          Login
        </Link>
      </div>
    </div>
  );
}