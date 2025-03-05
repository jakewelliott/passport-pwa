import type { CollectedStamp } from './tables';

export interface LoginResponse {
  token: string;
}

export interface CollectStampResponse {
  id: number;
  createdAt: string;
  method: string;
  parkAbbreviation: string;
}

export type CollectStampRequest = Omit<CollectedStamp, 'id' | 'parkId'>;
