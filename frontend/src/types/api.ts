import type { CollectedStamp, UserActivity } from './activity';

export type PutRequest<T> = Omit<T, keyof UserActivity>;

export interface LoginResponse {
  token: string;
}

export interface CollectStampResponse {
  id: number;
  createdAt: string;
  method: string;
  parkAbbreviation: string;
}

export type CollectStampRequest = Omit<PutRequest<CollectedStamp>, 'id' | 'parkId'>;
