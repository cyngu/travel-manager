import { z } from 'zod';
import { Request, Response } from 'express';
import { ApiResponse } from '../types/api';

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
type LoginRequestBody = z.infer<typeof LoginSchema>;
type LoginResponseBody = { token: string };

export type ApiLoginRequest = Request<unknown, unknown, LoginRequestBody>;
export type ApiLoginResponse = Response<ApiResponse<LoginResponseBody>>;

export const SignupSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  name: z.string(),
});
type SignupRequestBody = z.infer<typeof SignupSchema>;
type SignupResponseBody = { token: string };

export type ApiSignupRequest = Request<unknown, unknown, SignupRequestBody>;
export type ApiSignupResponse = Response<ApiResponse<SignupResponseBody>>;
