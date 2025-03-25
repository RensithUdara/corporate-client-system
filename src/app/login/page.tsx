'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { loginUser } from '@/lib/api';
import Link from 'next/link';

const schema = z.object({
  email: z.string().email('Invalid email').min(1, 'Email is required'),
  password: z.string().min(1, 'Password is required'),
});

type FormData = z.infer<typeof schema>;

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const response = await loginUser(data);
      console.log('Login successful:', response);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-blue-500 via-purple-500 to-purple-600">
      <div className="w-full max-w-md bg-white rounded-xl p-8 shadow-lg transform transition-all hover:shadow-xl">
        <h1 className="text-3xl font-semibold mb-6 text-gray-800 text-center">Log In</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="px-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              placeholder="janedoe@email.com"
              {...register('email')}
              className="custom-input transition-all duration-200 focus:ring-purple-500"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>
          <div className="px-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              {...register('password')}
              className="custom-input transition-all duration-200 focus:ring-purple-500"
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg py-3 font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
          >
            Log In
          </button>
          <div className="flex justify-between text-sm mt-4 px-4">
            <Link href="/register" className="text-purple-600 hover:underline hover:text-purple-800 transition-colors">
              Create an account
            </Link>
            <Link href="/forgot-password" className="text-purple-600 hover:underline hover:text-purple-800 transition-colors">
              Forgot password?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}