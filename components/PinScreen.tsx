'use client';

import { useState } from 'react';
import { User } from '@/types';
import WuxiaIcon from './WuxiaIcons';

interface PinScreenProps {
  onAuthSuccess: (user: User) => void;
}

type Mode = 'login' | 'register';

export default function PinScreen({ onAuthSuccess }: PinScreenProps) {
  const [mode, setMode] = useState<Mode>('login');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [adminPin, setAdminPin] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showAdminPin, setShowAdminPin] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [loading, setLoading] = useState(false);

  const resetMessages = () => {
    setError('');
    setNotice('');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    resetMessages();

    if (!nickname.trim() || !password.trim()) {
      setError('Укажи ник и пароль');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nickname: nickname.trim(),
          password,
        }),
      });

      const payload = (await response.json().catch(() => ({}))) as { error?: string; user?: User };
      if (!response.ok || !payload.user) {
        throw new Error(payload.error || 'Не удалось войти');
      }

      onAuthSuccess(payload.user);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Не удалось войти');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    resetMessages();

    if (!nickname.trim()) {
      setError('Укажи ник');
      return;
    }

    if (password.length < 8) {
      setError('Пароль должен быть не короче 8 символов');
      return;
    }

    if (password !== confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nickname: nickname.trim(),
          password,
        }),
      });

      const payload = (await response.json().catch(() => ({}))) as { error?: string; message?: string };
      if (!response.ok) {
        throw new Error(payload.error || 'Не удалось создать аккаунт');
      }

      setNotice(payload.message || 'Аккаунт создан и ожидает активации офицером/GM.');
      setMode('login');
      setPassword('');
      setConfirmPassword('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Не удалось создать аккаунт');
    } finally {
      setLoading(false);
    }
  };

  const handleAdminPinLogin = async () => {
    resetMessages();
    if (!adminPin.trim()) {
      setError('Введи PIN офицера/GM');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: adminPin.trim() }),
      });

      const payload = (await response.json().catch(() => ({}))) as { error?: string; user?: User };
      if (!response.ok || !payload.user) {
        throw new Error(payload.error || 'PIN не принят');
      }

      onAuthSuccess(payload.user);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'PIN не принят');
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

          <h2 className="text-3xl font-bold font-orbitron text-[#e6eff5] mt-5 mb-2">Member Access</h2>
          <p className="text-[#b7c9d6] leading-relaxed">
            Вход в личный кабинет по нику и паролю. Новые учетные записи создаются неактивными до проверки офицером/GM.
          </p>

          <div className="mt-6 space-y-3 text-sm text-[#bdd5e4]">
            <div className="inline-flex items-center gap-2">
              <WuxiaIcon name="checkCircle" className="w-4 h-4 text-[#8fb9cc]" />
              Личные аккаунты с включением/выключением валидности
            </div>
            <div className="inline-flex items-center gap-2">
              <WuxiaIcon name="checkCircle" className="w-4 h-4 text-[#8fb9cc]" />
              Защита от brute-force и secure cookie
            </div>
            <div className="inline-flex items-center gap-2">
              <WuxiaIcon name="checkCircle" className="w-4 h-4 text-[#8fb9cc]" />
              Резервный вход офицера/GM по PIN
            </div>
          </div>
        </div>

        <div className="lg:col-span-3 p-8 lg:p-10">
          <div className="mb-6">
            <h3 className="text-2xl font-bold font-orbitron text-[#e6eff5] mb-2">Guild Portal</h3>
            <p className="text-[#b7c9d6]">Justice Mobile command dashboard</p>
          </div>

          <div className="inline-flex rounded-2xl p-1 bg-[#0b141d]/70 border border-[#223140]/70 mb-6">
            <button
              type="button"
              onClick={() => {
                setMode('login');
                resetMessages();
              }}
              className={`px-4 py-2 text-sm rounded-2xl transition-colors ${
                mode === 'login' ? 'bg-[#183244]/80 text-[#e6eff5]' : 'text-gray-400 hover:text-[#bcd6e5]'
              }`}
            >
              Вход
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('register');
                resetMessages();
              }}
              className={`px-4 py-2 text-sm rounded-2xl transition-colors ${
                mode === 'register' ? 'bg-[#183244]/80 text-[#e6eff5]' : 'text-gray-400 hover:text-[#bcd6e5]'
              }`}
            >
              Регистрация
            </button>
          </div>

          <form onSubmit={mode === 'login' ? handleLogin : handleRegister} className="space-y-4">
            <input
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="input-field w-full"
              placeholder="Ник в гильдии"
              autoFocus
              disabled={loading}
            />

            <div className="flex gap-2">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field w-full"
                placeholder="Пароль"
                disabled={loading}
              />
              <button
                type="button"
                className="dc-icon-btn px-3 rounded-xl"
                onClick={() => setShowPassword((v) => !v)}
                title={showPassword ? 'Скрыть пароль' : 'Показать пароль'}
              >
                <WuxiaIcon name={showPassword ? 'x' : 'eye'} className="w-5 h-5" />
              </button>
            </div>

            {mode === 'register' && (
              <input
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="input-field w-full"
                placeholder="Повтори пароль"
                disabled={loading}
              />
            )}

            <button type="submit" disabled={loading} className="btn-primary w-full py-4 text-lg font-bold">
              {loading ? (
                <span className="inline-flex items-center justify-center">
                  <WuxiaIcon name="spinner" className="w-4 h-4 mr-3 animate-spin" />
                  {mode === 'login' ? 'Входим...' : 'Создаем...'}
                </span>
              ) : (
                <span className="inline-flex items-center justify-center">
                  <WuxiaIcon name={mode === 'login' ? 'lockOpen' : 'plus'} className="w-4 h-4 mr-3" />
                  {mode === 'login' ? 'Войти' : 'Создать аккаунт'}
                </span>
              )}
            </button>
          </form>

          <div className="mt-4">
            <button
              type="button"
              className="text-sm text-[#8fb9cc] hover:text-[#bcd6e5] transition-colors"
              onClick={() => setShowAdminPin((v) => !v)}
            >
              {showAdminPin ? 'Скрыть' : 'Показать'} вход офицера/GM по PIN
            </button>

            {showAdminPin && (
              <div className="mt-3 p-4 rounded-xl border border-[#2f6e8d]/35 bg-[#12202b]/55">
                <div className="text-sm text-[#bcd6e5] mb-2">Резервный вход для офицера/GM</div>
                <div className="flex gap-2">
                  <input
                    type="password"
                    className="input-field"
                    value={adminPin}
                    onChange={(e) => setAdminPin(e.target.value)}
                    placeholder="Officer/GM PIN"
                    disabled={loading}
                  />
                  <button type="button" className="btn-secondary px-4" onClick={handleAdminPinLogin} disabled={loading}>
                    Войти
                  </button>
                </div>
              </div>
            )}
          </div>

          {error && (
            <div className="text-[#bcd6e5] text-sm mt-4 p-4 bg-[#16202b]/65 rounded-xl border border-[#2f6e8d]/40">
              <WuxiaIcon name="alertTriangle" className="w-4 h-4 mr-2 inline-block align-text-bottom" />
              {error}
            </div>
          )}

          {notice && (
            <div className="text-[#bcd6e5] text-sm mt-4 p-4 bg-[#112430]/65 rounded-xl border border-[#3d7c9d]/45">
              <WuxiaIcon name="checkCircle" className="w-4 h-4 mr-2 inline-block align-text-bottom" />
              {notice}
            </div>
          )}

          <div className="mt-8 pt-5 border-t border-gray-800/70 text-xs text-gray-500 font-medium flex items-center justify-between gap-3">
            <span>
              <WuxiaIcon name="shield" className="w-4 h-4 mr-2 inline-block align-text-bottom" />
              Secure Guild Access
            </span>
            <span>Need activation? Ask officer/GM</span>
          </div>
        </div>
      </div>
    </div>
  );
}
