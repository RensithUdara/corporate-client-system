'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { loginUser } from '@/lib/api';
import Link from 'next/link';
import { useState } from 'react';

const schema = z.object({
  email: z.string().email('Invalid email address').min(1, 'Email is required'),
  password: z.string().min(1, 'Password is required'),
});

type FormData = z.infer<typeof schema>;

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const response = await loginUser(data);
      console.log('Login successful:', response);
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-xl p-8 shadow-lg transform transition-all hover:shadow-xl">
        <h1 className="text-3xl font-semibold mb-6 text-gray-800 text-center">Welcome Back</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              placeholder="janedoe@email.com"
              {...register('email')}
              className="custom-input"
              disabled={loading}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              {...register('password')}
              className="custom-input"
              disabled={loading}
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full text-white rounded-lg py-3 font-medium transition-all duration-300"
          >
            {loading ? 'Logging In...' : 'Log In'}
          </button>
          <div className="links-container text-sm mt-4">
            <Link href="/register" className="text-purple-600 hover:underline hover:text-purple-800 transition-colors">
              Don’t have an account? Sign up
            </Link>
            <Link href="/forgot-password" className="text-purple-600 hover:underline hover:text-purple-800 transition-colors">
              Forgot Password?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}