'use client';
import { useState } from 'react';
import axiosClient from '@/api/axiosClient';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await axiosClient.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.access_token);
      router.push('/dashboard/invitations');
    } catch {
      alert("Sai email hoặc mật khẩu!");
    }
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gray-50">
       <form onSubmit={submit} className="bg-white p-10 rounded-2xl shadow-lg flex flex-col gap-4 w-96">
         <h2 className="text-2xl font-bold text-center">Đăng Nhập</h2>
         <input type="email" placeholder="Email" required className="border p-3 rounded" value={email} onChange={e=>setEmail(e.target.value)} autoComplete="username" />
         <input type="password" placeholder="Mật khẩu" required className="border p-3 rounded" value={password} onChange={e=>setPassword(e.target.value)} autoComplete="current-password" />
         <button className="bg-rose-600 text-white p-3 rounded font-bold hover:bg-rose-700">Đăng Nhập</button>
         <p className="text-sm text-center">Chưa có tài khoản? <Link href="/register" className="text-blue-600">Đăng ký</Link></p>
       </form>
    </div>
  )
}
