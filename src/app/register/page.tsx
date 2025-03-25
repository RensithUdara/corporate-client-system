'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { registerUser } from '@/lib/api';
import Link from 'next/link';

const schema = z.object({
  firstName: z.string().min(1, 'First Name is required'),
  lastName: z.string().min(1, 'Last Name is required'),
  customerType: z.enum(['Corporate', 'Private']),
  companyName: z.string().optional().refine((val) => !val || val.length > 0, { message: 'Company Name is required for Corporate customers' }),
  companyAddress: z.string().optional(),
  email: z.string().email('Invalid email').min(1, 'Email is required'),
  contactNumber: z.string().min(1, 'Contact Number is required'),
  password: z.string().min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[!@#$%^&*]/, 'Password must contain at least one special character'),
  confirmPassword: z.string(),
  termsAccepted: z.boolean().refine((val) => val === true, { message: 'You must agree to the Terms & Conditions' }),
}).refine((data) => data.password === data.confirmPassword, { message: 'Passwords must match', path: ['confirmPassword'] })
  .refine((data) => data.customerType === 'Private' || (data.companyName && data.companyAddress), { message: 'Company Name and Address are required for Corporate customers', path: ['companyName'] });

type FormData = z.infer<typeof schema>;

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const customerType = watch('customerType');

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const response = await registerUser(data);
      console.log('Registration successful:', response);
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-blue-500 via-purple-500 to-purple-600">
      <div className="w-full max-w-lg bg-white rounded-xl p-8 shadow-lg transform transition-all hover:shadow-xl">
        <h1 className="text-3xl font-semibold mb-6 text-gray-800 text-center">Create Account</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-2 gap-4 px-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
              <input type="text" placeholder="Jane" {...register('firstName')} className="custom-input" />
              {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
              <input type="text" placeholder="Doe" {...register('lastName')} className="custom-input" />
              {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>}
            </div>
          </div>
          <div className="px-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Customer Type</label>
            <select {...register('customerType')} className="custom-select">
              <option value="" disabled>Select customer type</option>
              <option value="Corporate">Corporate</option>
              <option value="Private">Private</option>
            </select>
            {errors.customerType && <p className="text-red-500 text-xs mt-1">{errors.customerType.message}</p>}
          </div>
          {customerType === 'Corporate' && (
            <>
              <div className="px-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                <input type="text" placeholder="Acme Inc." {...register('companyName')} className="custom-input" />
                {errors.companyName && <p className="text-red-500 text-xs mt-1">{errors.companyName.message}</p>}
              </div>
              <div className="px-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Company Address</label>
                <input type="text" placeholder="123 Main St" {...register('companyAddress')} className="custom-input" />
                {errors.companyAddress && <p className="text-red-500 text-xs mt-1">{errors.companyAddress.message}</p>}
              </div>
            </>
          )}
          <div className="px-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input type="email" placeholder="janedoe@email.com" {...register('email')} className="custom-input" />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>
          <div className="px-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Contact Number</label>
            <input type="text" placeholder="+1 123-456-7890" {...register('contactNumber')} className="custom-input" />
            {errors.contactNumber && <p className="text-red-500 text-xs mt-1">{errors.contactNumber.message}</p>}
          </div>
          <div className="px-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input type="password" placeholder="••••••••" {...register('password')} className="custom-input" />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>
          <div className="px-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
            <input type="password" placeholder="••••••••" {...register('confirmPassword')} className="custom-input" />
            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
          </div>
          <div className="flex items-center px-4">
            <input type="checkbox" {...register('termsAccepted')} className="h-4 w-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500" />
            <label className="ml-2 text-sm text-gray-700">I agree to the <span className="text-purple-600">Terms & Conditions</span></label>
          </div>
          {errors.termsAccepted && <p className="text-red-500 text-xs px-4">{errors.termsAccepted.message}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg py-3 font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50"
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
          <div className="flex justify-between text-sm mt-4 px-4">
            <Link href="/login" className="text-purple-600 hover:underline hover:text-purple-800 transition-colors">
              Already have an account?
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