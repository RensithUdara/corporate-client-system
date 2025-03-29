'use client';

import Link from 'next/link';
import { motion } from 'framer-motion'; 

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-br text-white">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl md:text-5xl font-bold mb-6 text-center"
      >
        Welcome to the Corporate Client Portal
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-lg md:text-xl mb-10 text-center max-w-2xl"
      >
        Streamline your business operations with our secure and intuitive platform.
      </motion.p>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="flex gap-6"
      >
        <Link
          href="/register"
          className="rounded-full bg-white text-purple-600 px-8 py-3 font-medium hover:bg-gray-100 transition-all duration-300 shadow-md"
        >
          Register
        </Link>
        <Link
          href="/login"
          className="rounded-full border-2 border-white text-white px-8 py-3 font-medium hover:bg-white hover:text-purple-600 transition-all duration-300 shadow-md"
        >
          Login
        </Link>
      </motion.div>
    </div>
  );
}