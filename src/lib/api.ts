import { Booking } from '@/types/booking';
import { User } from '@/types/user';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Replace with your backend URL
});

export const registerUser = async (user: User) => {
  const response = await api.post('/register', user);
  return response.data;
};

export const loginUser = async (credentials: { email: string; password: string }) => {
  const response = await api.post('/login', credentials);
  return response.data;
};

export const createBooking = async (booking: Booking) => {
  const response = await api.post('/bookings', booking);
  return response.data;
};