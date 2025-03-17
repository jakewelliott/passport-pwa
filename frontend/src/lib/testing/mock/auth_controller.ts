import type { UserProfile } from '@/types';
import { testUser } from './utils';

export const GetUser = (): UserProfile => testUser;

export const Register = (): UserProfile => testUser;

export const Login = (): UserProfile => testUser;
