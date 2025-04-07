import { z } from 'zod';
import { Request, Response } from 'express';
import { ApiResponse } from '../types/api';

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type ApiLoginRequest = Request<unknown, unknown, z.infer<typeof loginSchema>>;
export type ApiLoginResponse = Response<{ token: string }>;

export const signupSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  name: z.string(),
});

export type ApiSignupRequest = Request<unknown, unknown, z.infer<typeof signupSchema>>;
export type ApiSignupResponse = Response<ApiResponse<{ token: string }>>;
