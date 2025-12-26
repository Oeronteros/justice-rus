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
      setError('Please enter PIN code');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pin }),
      });

      if (!response.ok) {
        throw new Error('Invalid PIN');
      }

      const data = await response.json();

      // Сохраняем токен
      localStorage.setItem('auth_token', data.token);
      onAuthSuccess({ role: data.role });

    } catch (error) {
      setError('Invalid PIN code');
      setPin('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-20">
      <div className="bg-gray-900/90 backdrop-blur-xl p-8 rounded-2xl shadow-2xl text-center w-full max-w-md border border-red-700/50">
        <div className="mb-6">
          <i className="fas fa-skull-crossbones text-4xl text-red-600 mb-3"></i>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-purple-600 bg-clip-text text-transparent">
            Cult Game Community
          </h2>
          <p className="text-gray-400 mt-2">Guild Portal - Justice Mobile</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <p className="text-sm text-gray-400 mb-3">Enter PIN code to access</p>
            <input
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-gray-800/70 border border-gray-700 text-center text-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition"
              placeholder="****"
              maxLength={4}
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <i className="fas fa-spinner fa-spin mr-2"></i>
            ) : (
              <i className="fas fa-unlock-alt mr-2"></i>
            )}
            Enter Portal
          </button>

          {error && (
            <div className="text-red-400 text-sm mt-2 p-3 bg-red-900/30 rounded-lg">
              <i className="fas fa-exclamation-triangle mr-2"></i>
              {error}
            </div>
          )}
        </form>

        <div className="mt-6 pt-6 border-t border-gray-800">
          <p className="text-xs text-gray-500">
            <i className="fas fa-info-circle mr-1"></i>
            Contact guild leadership for access
          </p>
        </div>
      </div>
    </div>
  );
}

