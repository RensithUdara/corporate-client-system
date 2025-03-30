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
    return true;
  }, {
    message: 'All required Corporate fields must be filled',
    path: ['companyName'],
  });

type FormData = z.infer<typeof schema>;

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      customerType: '',
    },
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
    <div className="min-h-screen">
      <div className="w-full max-w-lg bg-white">
        <h1 className="text-gray-800 text-center mb-4">Create Your Account</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-2">
            <div>
              <label className="block text-gray-700 mb-1">First Name</label>
              <input
                type="text"
                placeholder="Jane"
                {...register('firstName')}
                className="custom-input"
                disabled={loading}
              />
              {errors.firstName && <p className="text-red-500">{errors.firstName.message}</p>}
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Last Name</label>
              <input
                type="text"
                placeholder="Doe"
                {...register('lastName')}
                className="custom-input"
                disabled={loading}
              />
              {errors.lastName && <p className="text-red-500">{errors.lastName.message}</p>}
            </div>
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Customer Type</label>
            <select {...register('customerType')} className="custom-select" disabled={loading}>
              <option value="" disabled>Select customer type</option>
              <option value="Corporate">Corporate</option>
              <option value="Private">Private</option>
            </select>
            {errors.customerType && <p className="text-red-500">{errors.customerType.message}</p>}
          </div>
          {customerType === 'Corporate' && (
            <>
              <div>
                <label className="block text-gray-700 mb-1">Company Name</label>
                <input
                  type="text"
                  placeholder="Acme Inc."
                  {...register('companyName')}
                  className="custom-input"
                  disabled={loading}
                />
                {errors.companyName && <p className="text-red-500">{errors.companyName.message || 'Company Name is required'}</p>}
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Company Address</label>
                <input
                  type="text"
                  placeholder="123 Main St"
                  {...register('companyAddress')}
                  className="custom-input"
                  {...register('companyAddress')}
                  className="custom-input"
                  disabled={loading}
                />
                {errors.companyAddress && <p className="text-red-500">{errors.companyAddress.message || 'Company Address is required'}</p>}
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Company Address Field 2 (Optional)</label>
                <input
                  type="text"
                  placeholder="Suite 100"
                  {...register('companyAddressField2')}
                  className="custom-input"
                  disabled={loading}
                />
                {errors.companyAddressField2 && <p className="text-red-500">{errors.companyAddressField2.message}</p>}
              </div>
              <div>
                <label className="block text-gray-700 mb-1">City</label>
                <input
                  type="text"
                  placeholder="New York"
                  {...register('city')}
                  className="custom-input"
                  disabled={loading}
                />
                {errors.city && <p className="text-red-500">{errors.city.message || 'City is required'}</p>}
              </div>
              <div>
                <label className="block text-gray-700 mb-1">State / Province</label>
                <input
                  type="text"
                  placeholder="NY"
                  {...register('stateProvince')}
                  className="custom-input"
                  disabled={loading}
                />
                {errors.stateProvince && <p className="text-red-500">{errors.stateProvince.message || 'State / Province is required'}</p>}
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Postal Code</label>
                <input
                  type="text"
                  placeholder="10001"
                  {...register('postalCode')}
                  className="custom-input"
                  disabled={loading}
                />
                {errors.postalCode && <p className="text-red-500">{errors.postalCode.message || 'Postal Code is required'}</p>}
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Country</label>
                <input
                  type="text"
                  placeholder="United States"
                  {...register('country')}
                  className="custom-input"
                  disabled={loading}
                />
                {errors.country && <p className="text-red-500">{errors.country.message || 'Country is required'}</p>}
              </div>
            </>
          )}
          <div>
            <label className="block text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              placeholder="example@email.com"
              {...register('email')}
              className="custom-input"
              disabled={loading}
            />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Contact Number</label>
            <input
              type="text"
              placeholder="+1 123-456-7890"
              {...register('contactNumber')}
              className="custom-input"
              disabled={loading}
            />
            {errors.contactNumber && <p className="text-red-500">{errors.contactNumber.message}</p>}
          </div>
          <div className="relative">
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              {...register('password')}
              className="custom-input"
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="password-toggle"
              disabled={loading}
            >
              {showPassword ? (
                <svg className="h-4 w-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              ) : (
                <svg className="h-4 w-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              )}
            </button>
            {errors.password && <p className="text-red-500">{errors.password.message}</p>}
          </div>
          <div className="relative">
            <label className="block text-gray-700 mb-1">Confirm Password</label>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="••••••••"
              {...register('confirmPassword')}
              className="custom-input"
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="password-toggle"
              disabled={loading}
            >
              {showConfirmPassword ? (
                <svg className="h-4 w-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              ) : (
                <svg className="h-4 w-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              )}
            </button>
            {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              {...register('termsAccepted')}
              className="focus:ring-0"
              disabled={loading}
            />
            <label className="ml-2 text-gray-700">
              I agree to the <span className="text-purple-600 hover:underline">Terms & Conditions</span>
            </label>
          </div>
          {errors.termsAccepted && <p className="text-red-500">{errors.termsAccepted.message}</p>}
          <button type="submit" disabled={loading}>
            {loading ? 'Registering...' : 'Create Account'}
          </button>
          <div className="links-container">
            <Link href="/login" className="text-purple-600 hover:text-purple-800">
              Already have an account? Log in
            </Link>
            <Link href="/forgot-password" className="text-purple-600 hover:text-purple-800">
              Forgot Password?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}