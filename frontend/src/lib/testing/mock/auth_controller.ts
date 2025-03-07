import type { UserProfile } from '@/types';
import { testUser } from '.';

export const Get = (): UserProfile => testUser;

export const Register = (): UserProfile => testUser;

export const Login = (): UserProfile => testUser;
