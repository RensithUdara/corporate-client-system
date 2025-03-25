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
  customerType: z.enum(['Corporate', 'Private'], { errorMap: () => ({ message: 'Please select a customer type' }) }),
  companyName: z.string().optional(),
  companyAddress: z.string().optional(),
  companyAddressField2: z.string().optional(),
  city: z.string().optional(),
  stateProvince: z.string().optional(),
  postalCode: z.string().optional(),
  country: z.string().optional(),
  email: z.string().email('Invalid email address').min(1, 'Email is required'),
  contactNumber: z.string().min(1, 'Contact Number is required'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[!@#$%^&*]/, 'Password must contain at least one special character'),
  confirmPassword: z.string(),
  termsAccepted: z.boolean().refine((val) => val === true, { message: 'You must agree to the Terms & Conditions' }),
}).refine((data) => data.password === data.confirmPassword, { message: 'Passwords must match', path: ['confirmPassword'] })
  .refine((data) => {
    if (data.customerType === 'Corporate') {
      return (
        data.companyName &&
        data.companyAddress &&
        data.city &&
        data.stateProvince &&
        data.postalCode &&
        data.country
      );
    }
    return true; // No additional requirements for Private
  }, {
    message: 'All required Corporate fields must be filled',
    path: ['companyName'], // Point to companyName for error display, but it applies to all required fields
  });

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
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-lg bg-white rounded-xl p-8 shadow-lg transform transition-all hover:shadow-xl">
        <h1 className="text-3xl font-semibold mb-6 text-gray-800 text-center">Create Your Account</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
              <input
                type="text"
                placeholder="Jane"
                {...register('firstName')}
                className="custom-input"
                disabled={loading}
              />
              {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
              <input
                type="text"
                placeholder="Doe"
                {...register('lastName')}
                className="custom-input"
                disabled={loading}
              />
              {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Customer Type</label>
            <select {...register('customerType')} className="custom-select" disabled={loading}>
              <option value="" disabled>Select customer type</option>
              <option value="Corporate">Corporate</option>
              <option value="Private">Private</option>
            </select>
            {errors.customerType && <p className="text-red-500 text-xs mt-1">{errors.customerType.message}</p>}
          </div>
          {customerType === 'Corporate' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                <input
                  type="text"
                  placeholder="Acme Inc."
                  {...register('companyName')}
                  className="custom-input"
                  disabled={loading}
                />
                {errors.companyName && <p className="text-red-500 text-xs mt-1">{errors.companyName.message || 'Company Name is required'}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company Address</label>
                <input
                  type="text"
                  placeholder="123 Main St"
                  {...register('companyAddress')}
                  className="custom-input"
                  disabled={loading}
                />
                {errors.companyAddress && <p className="text-red-500 text-xs mt-1">{errors.companyAddress.message || 'Company Address is required'}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company Address Field 2 (Optional)</label>
                <input
                  type="text"
                  placeholder="Suite 100"
                  {...register('companyAddressField2')}
                  className="custom-input"
                  disabled={loading}
                />
                {errors.companyAddressField2 && <p className="text-red-500 text-xs mt-1">{errors.companyAddressField2.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                <input
                  type="text"
                  placeholder="New York"
                  {...register('city')}
                  className="custom-input"
                  disabled={loading}
                />
                {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message || 'City is required'}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">State / Province</label>
                <input
                  type="text"
                  placeholder="NY"
                  {...register('stateProvince')}
                  className="custom-input"
                  disabled={loading}
                />
                {errors.stateProvince && <p className="text-red-500 text-xs mt-1">{errors.stateProvince.message || 'State / Province is required'}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Postal Code</label>
                <input
                  type="text"
                  placeholder="10001"
                  {...register('postalCode')}
                  className="custom-input"
                  disabled={loading}
                />
                {errors.postalCode && <p className="text-red-500 text-xs mt-1">{errors.postalCode.message || 'Postal Code is required'}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                <input
                  type="text"
                  placeholder="United States"
                  {...register('country')}
                  className="custom-input"
                  disabled={loading}
                />
                {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country.message || 'Country is required'}</p>}
              </div>
            </>
          )}
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
            <label className="block text-sm font-medium text-gray-700 mb-2">Contact Number</label>
            <input
              type="text"
              placeholder="+1 123-456-7890"
              {...register('contactNumber')}
              className="custom-input"
              disabled={loading}
            />
            {errors.contactNumber && <p className="text-red-500 text-xs mt-1">{errors.contactNumber.message}</p>}
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
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
            <input
              type="password"
              placeholder="••••••••"
              {...register('confirmPassword')}
              className="custom-input"
              disabled={loading}
            />
            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              {...register('termsAccepted')}
              className="h-4 w-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
              disabled={loading}
            />
            <label className="ml-2 text-sm text-gray-700">
              I agree to the <span className="text-purple-600 hover:underline">Terms & Conditions</span>
            </label>
          </div>
          {errors.termsAccepted && <p className="text-red-500 text-xs">{errors.termsAccepted.message}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full text-white rounded-lg py-3 font-medium transition-all duration-300"
          >
            {loading ? 'Registering...' : 'Create Account'}
          </button>
          <div className="links-container text-sm mt-4">
            <Link href="/login" className="text-purple-600 hover:underline hover:text-purple-800 transition-colors">
              Already have an account? Log in
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