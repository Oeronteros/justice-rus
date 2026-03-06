'use client';

import { useState } from 'react';
import { User } from '@/types';
import WuxiaIcon from './WuxiaIcons';

interface PinScreenProps {
  onAuthSuccess: (user: User) => void;
}

export default function PinScreen({ onAuthSuccess }: PinScreenProps) {
  const [pin, setPin] = useState('');
  const [showPin, setShowPin] = useState(false);
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
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: pin }),
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => ({}))) as { error?: string };
        throw new Error(payload.error || 'Invalid credentials');
      }

      const data = await response.json();

      onAuthSuccess({ role: data.role });

    } catch (error) {
      setError(error instanceof Error ? error.message : 'Invalid credentials');
      setPin('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-20 bg-[#070d12]/95 px-4">
      <div className="card p-0 w-full max-w-4xl relative overflow-hidden grid grid-cols-1 lg:grid-cols-5">
        <div className="lg:col-span-2 p-8 lg:p-10 border-b lg:border-b-0 lg:border-r border-[#273a49]/50 bg-gradient-to-br from-[#13202b]/78 to-[#0b141c]/92">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#37556c]/65 bg-[#10202d]/75 text-xs uppercase tracking-widest text-[#9cc4d7]">
            Silent Moonfall
          </div>

          <div className="mt-6 flex justify-start">
            <div className="w-16 h-16 bg-gradient-to-r from-[#2f6e8d] to-[#8fb9cc] rounded-2xl flex items-center justify-center shadow-lg shadow-[#0c1a24]/40">
              <WuxiaIcon name="shield" className="w-8 h-8 text-white" />
            </div>
          </div>

          <h2 className="text-3xl font-bold font-orbitron text-[#e6eff5] mt-5 mb-2">
            Member Access
          </h2>
          <p className="text-[#b7c9d6] leading-relaxed">
            Вход по PIN-коду гильдии. Попытки защищены лимитом, сессия ограничена по времени.
          </p>

          <div className="mt-6 space-y-3 text-sm text-[#bdd5e4]">
            <div className="inline-flex items-center gap-2">
              <WuxiaIcon name="checkCircle" className="w-4 h-4 text-[#8fb9cc]" />
              Secure cookie + strict same-site
            </div>
            <div className="inline-flex items-center gap-2">
              <WuxiaIcon name="checkCircle" className="w-4 h-4 text-[#8fb9cc]" />
              Rate limit against brute-force
            </div>
            <div className="inline-flex items-center gap-2">
              <WuxiaIcon name="checkCircle" className="w-4 h-4 text-[#8fb9cc]" />
              Session verification on each page open
            </div>
          </div>
        </div>

        <div className="lg:col-span-3 p-8 lg:p-10">
          <div className="mb-8">
            <h3 className="text-2xl font-bold font-orbitron text-[#e6eff5] mb-2">Guild Portal</h3>
            <p className="text-[#b7c9d6]">Justice Mobile command dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <p className="text-sm text-[#b7c9d6] mb-3 font-medium">Enter guild PIN</p>
              <div className="flex gap-2">
                <input
                  type={showPin ? 'text' : 'password'}
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  className="input-field text-center text-2xl tracking-[0.25em] py-4"
                  placeholder="****"
                  autoFocus
                  disabled={loading}
                />
                <button
                  type="button"
                  className="dc-icon-btn px-3 rounded-xl"
                  onClick={() => setShowPin((v) => !v)}
                  title={showPin ? 'Hide PIN' : 'Show PIN'}
                >
                  <WuxiaIcon name={showPin ? 'x' : 'eye'} className="w-5 h-5" />
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-4 text-lg font-bold"
            >
              {loading ? (
                <span className="inline-flex items-center justify-center">
                  <WuxiaIcon name="spinner" className="w-4 h-4 mr-3 animate-spin" />
                  Verifying...
                </span>
              ) : (
                <span className="inline-flex items-center justify-center">
                  <WuxiaIcon name="lockOpen" className="w-4 h-4 mr-3" />
                  Enter Portal
                </span>
              )}
            </button>

            {error && (
              <div className="text-[#bcd6e5] text-sm mt-2 p-4 bg-[#16202b]/65 rounded-xl border border-[#2f6e8d]/40">
                <WuxiaIcon name="alertTriangle" className="w-4 h-4 mr-2 inline-block align-text-bottom" />
                {error}
              </div>
            )}
          </form>

          <div className="mt-8 pt-5 border-t border-gray-800/70 text-xs text-gray-500 font-medium flex items-center justify-between gap-3">
            <span>
              <WuxiaIcon name="shield" className="w-4 h-4 mr-2 inline-block align-text-bottom" />
              Secure Guild Access
            </span>
            <span>Need access? Ask officer/GM</span>
          </div>
        </div>
      </div>
    </div>
  );
}

