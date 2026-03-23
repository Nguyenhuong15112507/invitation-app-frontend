import { z } from 'zod';

export const configSchema = z.object({
  groomName: z.string().min(1, 'Tên chú rể là bắt buộc'),
  brideName: z.string().min(1, 'Tên cô dâu là bắt buộc'),
  date: z.string(),
  time: z.string(),
  location: z.string(),
  message: z.string().optional(),
  coverImage: z.string().optional(),
  bankAccount: z.object({
    bankName: z.string().optional(),
    accountNumber: z.string().optional(),
    accountName: z.string().optional()
  }).optional()
});

export type InvitationConfig = z.infer<typeof configSchema>;

export const rsvpSchema = z.object({
  guestName: z.string().min(1, 'Nhập tên của bạn'),
  phone: z.string().min(10, 'Nhập SĐT hợp lệ'),
  status: z.enum(['GOING', 'NOT_GOING', 'MAYBE']),
  guestCount: z.number().min(1),
  message: z.string().optional()
});
