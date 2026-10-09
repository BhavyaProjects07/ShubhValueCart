import { useState } from 'react';
import axios from 'axios';
import { X } from 'lucide-react';
import toast from 'react-hot-toast';

export default function LoginModal({ isOpen, onClose, onSuccess }) {
  const [step, setStep] = useState('phone'); // phone, otp, register
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (phone.length < 10) return toast.error('Enter valid phone number');
    
    setLoading(true);
    try {
      await axios.post('/api/auth/send_otp', { phone });
      toast.success('OTP sent successfully');
      setStep('otp');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (otp.length < 6) return toast.error('Enter valid OTP');

    setLoading(true);
    try {
      const { data } = await axios.post('/api/auth/verify_otp', { phone, otp });
      if (data.isNewUser) {
        toast.success('Phone verified. Please complete your profile.');
        setStep('register');
      } else {
        toast.success('Logged in successfully');
        window.location.reload();
      }
    } catch (err) {
      toast.error(err.response?.data?.error || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!firstName || !lastName) return toast.error('Please fill all fields');

    setLoading(true);
    try {
      await axios.post('/api/auth/register', { firstName, lastName });
      toast.success('Registered successfully');
      window.location.reload();
    } catch (err) {
      toast.error(err.response?.data?.error || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 p-4">
      <div className="relative w-full max-w-sm rounded-xl bg-white p-6 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>

        <h2 className="mb-6 text-2xl font-bold text-gray-800">
          {step === 'phone' ? 'Login or Sign up' : step === 'otp' ? 'Enter OTP' : 'Complete Profile'}
        </h2>

        {step === 'phone' && (
          <form onSubmit={handleSendOtp} className="flex flex-col gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Mobile Number</label>
              <div className="flex rounded-md border border-gray-300 focus-within:border-[#0a6c3d] focus-within:ring-1 focus-within:ring-[#0a6c3d]">
                <span className="flex items-center rounded-l-md bg-gray-50 px-3 text-gray-500">+91</span>
                <input
                  type="tel"
                  maxLength={10}
                  className="w-full rounded-r-md px-3 py-2 outline-none"
                  placeholder="Enter mobile number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                  autoFocus
                />
              </div>
            </div>
            <button
              disabled={loading}
              type="submit"
              className="mt-2 w-full rounded-md bg-[#0a6c3d] py-2.5 font-semibold text-white transition-colors hover:bg-[#085531] disabled:opacity-70"
            >
              {loading ? 'Sending...' : 'Continue'}
            </button>
          </form>
        )}

        {step === 'otp' && (
          <form onSubmit={handleVerifyOtp} className="flex flex-col gap-4">
            <p className="text-sm text-gray-600">
              Sent to +91 {phone}{' '}
              <button type="button" onClick={() => setStep('phone')} className="font-semibold text-[#0a6c3d] underline">
                Change
              </button>
            </p>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">One Time Password</label>
              <input
                type="text"
                maxLength={6}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-center text-lg tracking-widest outline-none focus:border-[#0a6c3d] focus:ring-1 focus:ring-[#0a6c3d]"
                placeholder="------"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                autoFocus
              />
            </div>
            <button
              disabled={loading}
              type="submit"
              className="mt-2 w-full rounded-md bg-[#0a6c3d] py-2.5 font-semibold text-white transition-colors hover:bg-[#085531] disabled:opacity-70"
            >
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
            
            <button 
              type="button" 
              onClick={handleSendOtp}
              disabled={loading}
              className="mt-2 text-sm text-[#0a6c3d] hover:underline text-center w-full"
            >
              Resend OTP
            </button>
          </form>
        )}

        {step === 'register' && (
          <form onSubmit={handleRegister} className="flex flex-col gap-4">
            <div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="mb-1 block text-sm font-medium text-gray-700">First Name</label>
                <input
                  type="text"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-[#0a6c3d] focus:ring-1 focus:ring-[#0a6c3d]"
                  placeholder="John"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  autoFocus
                />
              </div>
              <div className="flex-1">
                <label className="mb-1 block text-sm font-medium text-gray-700">Last Name</label>
                <input
                  type="text"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-[#0a6c3d] focus:ring-1 focus:ring-[#0a6c3d]"
                  placeholder="Doe"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>
            </div>

            <button
              disabled={loading}
              type="submit"
              className="mt-2 w-full rounded-md bg-[#0a6c3d] py-2.5 font-semibold text-white transition-colors hover:bg-[#085531] disabled:opacity-70"
            >
              {loading ? 'Creating...' : 'Complete Profile'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
