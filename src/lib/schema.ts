import { z } from 'zod';

export const configSchema = z.object({
  title: z.string().optional(),
  groomName: z.string().min(1, 'Tên chú rể là bắt buộc'),
  brideName: z.string().min(1, 'Tên cô dâu là bắt buộc'),
  date: z.string().min(1, 'Chọn ngày cưới'),
  time: z.string().optional(),
  location: z.string().optional(),
  invitationMessage: z.string().optional(),
  coverImage: z.string().url().optional().or(z.literal('')),
  galleryImages: z.array(z.string().url()).optional(),
  bankAccount: z.object({
    bankName: z.string().optional(),
    accountNumber: z.string().optional(),
    accountName: z.string().optional(),
  }).optional(),
});

export type InvitationConfig = z.infer<typeof configSchema>;

export const rsvpSchema = z.object({
  guestName: z.string().min(1, 'Nhập tên của bạn'),
  phone: z.string().min(9, 'Nhập SĐT hợp lệ'),
  status: z.enum(['GOING', 'NOT_GOING', 'MAYBE']),
  guestCount: z.number().min(1).default(1),
  message: z.string().optional(),
});
