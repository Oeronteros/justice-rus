'use client';

import { useState } from 'react';
import { User } from '@/types';

interface PinScreenProps {
  onAuthSuccess: (user: User) => void;
}

export default function PinScreen({ onAuthSuccess }: PinScreenProps) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!pin) {
      setError('Please enter password');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: pin }),
      });

      if (!response.ok) {
        throw new Error('Invalid password');
      }

      const data = await response.json();

      // Сохраняем токен
      localStorage.setItem('auth_token', data.token);
      onAuthSuccess({ role: data.role });

    } catch (error) {
      setError('Invalid password');
      setPin('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-20 bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="card p-10 text-center w-full max-w-md relative overflow-hidden">
        {/* Анимированный фон для карточки */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/10 to-purple-900/10 rounded-2xl -z-10"></div>

        <div className="mb-8">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-red-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg shadow-red-600/30">
              <i className="fas fa-skull-crossbones text-3xl text-white"></i>
            </div>
          </div>

          <h2 className="text-4xl font-bold font-orbitron bg-clip-text text-transparent bg-gradient-to-r from-red-400 via-purple-400 to-red-400 mb-3">
            Cult Game Community
          </h2>
          <p className="text-gray-400 text-lg">Guild Portal - Justice Mobile</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <p className="text-sm text-gray-400 mb-4 font-medium">Enter password to access</p>
            <input
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="input-field text-center text-2xl tracking-widest py-5"
              placeholder="****"
              maxLength={4}
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full py-4 text-lg font-bold"
          >
            {loading ? (
              <span><i className="fas fa-spinner fa-spin mr-3"></i>Loading...</span>
            ) : (
              <span><i className="fas fa-lock-open mr-3"></i>Enter Portal</span>
            )}
          </button>

          {error && (
            <div className="text-red-400 text-sm mt-2 p-4 bg-red-900/30 rounded-xl border border-red-800/50">
              <i className="fas fa-exclamation-triangle mr-2"></i>
              {error}
            </div>
          )}
        </form>

        <div className="mt-8 pt-6 border-t border-gray-800">
          <p className="text-xs text-gray-500 font-medium">
            <i className="fas fa-shield-alt mr-2"></i>
            Secure Guild Access
          </p>
        </div>
      </div>
    </div>
  );
}

