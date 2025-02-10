import parks from './parks';
import { userProfile, userStamps } from './user';
import {useMutation} from '@tanstack/react-query'
import Cookies from 'js-cookie';
import {decodeToken} from '@/lib/token-helper'

import type { Geopoint, LoginCredentials, ErrorResponse, Park, ParkAbbreviation } from './types';
import { queryClient } from '../tanstack-local-storage';

// ADAM: We should design our API to allow us to do as much on the client side as possible.
// Can't rely on the service layer if you're offline!
// For now, this will do as a mock API.

export const api = {
  // Parks
  getParks: () => parks,

  // biome-ignore lint/style/noNonNullAssertion: dangerous but we r just mocking
  getPark: (code: ParkAbbreviation) => parks.find((park: Park) => park.abbreviation === code)!,

  // Users
  getUserByID: (userId: string) => {
    console.log(userId);
    return userProfile;
  },
  getUserStampsByID: (userId: string) => {
    console.log(userId);
    return userStamps;
  },
  loginUser: () => {
    return useMutation<string, Error, LoginCredentials>({
      mutationFn: async (credentials) => {
        const response = await fetch('http://localhost:5002/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(credentials),
        });
        if (!response.ok) {
          var responseData: ErrorResponse = await response.json();
          throw new Error(responseData.detail || "Login failed. Please try again later.");
        }
        return response.text();
      },
      onSuccess: (data) => {
        Cookies.set('token', data, { secure: true, sameSite: 'strict' });
  
        const userDetails = decodeToken(data);
        queryClient.setQueryData(['user'], { ...userDetails, token: data });
        localStorage.setItem('user', JSON.stringify(userDetails))
      }
    });
  },
  registerUser: () => {
    return useMutation<string, Error, LoginCredentials>({
      mutationFn: async (credentials) => {
        const response = await fetch('http://localhost:5002/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(credentials),
        });
        if (!response.ok) {
          var responseData: ErrorResponse = await response.json();
          throw new Error(responseData.detail || "Login failed. Please try again later.");
        }
        return response.text();
      },
      onSuccess: (data) => {
        Cookies.set('token', data, { secure: true, sameSite: 'strict' });
  
        const userDetails = decodeToken(data);
        queryClient.setQueryData(['user'], { ...userDetails, token: data });
        localStorage.setItem('user', JSON.stringify(userDetails))
      }
    });
  },
  logoutUser: () => {
    Cookies.remove('token');
    queryClient.invalidateQueries({
      queryKey: ['user'],
      refetchType: 'all'
    });
    queryClient.clear();
  },


  // Stamps
  collectStamp: (userId: string, stampId: string, location: Geopoint | null) => {
    console.error('Not mocked yet', userId, stampId, location);
  },
};
