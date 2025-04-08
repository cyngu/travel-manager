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
  email: z
    .string()
    .email('The email must be valid')
    .min(5, 'The email must be at least 5 characters long')
    .max(255, 'The email cannot exceed 255 characters'),
  password: z
    .string()
    .min(8, 'The password must be at least 8 characters long')
    .max(128, 'The password cannot exceed 128 characters')
    .regex(/[a-z]/, 'The password must contain at least one lowercase letter')
    .regex(/[A-Z]/, 'The password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'The password must contain at least one number')
    .regex(
      /^[A-Za-z0-9~!?@#$%^&*_+\-()[\]{}><\/\\|".,;]+$/,
      'The password contains invalid characters',
    )
    .refine((password) => !/\s/.test(password), 'The password must not contain spaces'),
  name: z
    .string()
    .min(2, 'The name must be at least 2 characters long')
    .max(50, 'The name cannot exceed 50 characters')
    .regex(/^[A-Za-zà-úÀ-Ú\s\-]+$/, 'The name can only contain letters, spaces, and hyphens'),
});
type SignupRequestBody = z.infer<typeof SignupSchema>;
type SignupResponseBody = { token: string };

export type ApiSignupRequest = Request<unknown, unknown, SignupRequestBody>;
export type ApiSignupResponse = Response<ApiResponse<SignupResponseBody>>;
