'use client';

import { useState } from 'react';
import type { User } from '@/lib/schemas/auth';
import { authApi } from '@/lib/api/auth';
import { useKnownClasses } from '@/lib/auth/hooks';
import { useTranslation } from '@/lib/i18n/context';
import { PinScreenApprovalModal } from '@/components/shell/pin-screen/PinScreenApprovalModal';
import { PinScreenForm } from '@/components/shell/pin-screen/PinScreenForm';
import { PinScreenHero } from '@/components/shell/pin-screen/PinScreenHero';

interface PinScreenProps {
  onAuthSuccess: (user: User) => void;
}

type Mode = 'login' | 'register';

export default function PinScreen({ onAuthSuccess }: PinScreenProps) {
  const { t } = useTranslation();
  const [mode, setMode] = useState<Mode>('login');
  const { data: knownClasses = [] } = useKnownClasses({ enabled: mode === 'register' });
  const [nickname, setNickname] = useState('');
  const [className, setClassName] = useState('');
  const [discordHandle, setDiscordHandle] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [adminPin, setAdminPin] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showAdminPin, setShowAdminPin] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [approvalModalMessage, setApprovalModalMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const resetMessages = () => {
    setError('');
    setNotice('');
  };

  const handleModeChange = (nextMode: Mode) => {
    setMode(nextMode);
    resetMessages();
  };

  const resetRegistrationForm = () => {
    setClassName('');
    setDiscordHandle('');
    setPassword('');
    setConfirmPassword('');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    resetMessages();

    if (!nickname.trim() || !password.trim()) {
      setError(t.auth.enterNicknameAndPassword);
      return;
    }

    setLoading(true);
    try {
      const payload = await authApi.login({
        nickname: nickname.trim(),
        password,
      });

      onAuthSuccess(payload.user);
    } catch (err) {
      setError(err instanceof Error ? err.message : t.auth.loginFailed);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    resetMessages();

    if (!nickname.trim()) {
      setError(t.auth.enterNickname);
      return;
    }

    if (!className.trim()) {
      setError(t.auth.chooseOrEnterClass);
      return;
    }

    if (password.length < 8) {
      setError(t.auth.passwordTooShort);
      return;
    }

    if (password !== confirmPassword) {
      setError(t.auth.passwordsDoNotMatch);
      return;
    }

    setLoading(true);
    try {
      const payload = await authApi.register({
        nickname: nickname.trim(),
        className: className.trim(),
        discordHandle: discordHandle.trim(),
        password,
      });

      setNotice('');
      setApprovalModalMessage(payload.message || t.auth.accountCreatedPendingApproval);
      setMode('login');
      resetRegistrationForm();
    } catch (err) {
      setError(err instanceof Error ? err.message : t.auth.registerFailed);
    } finally {
      setLoading(false);
    }
  };

  const handleAdminPinLogin = async () => {
    resetMessages();
    if (!adminPin.trim()) {
      setError(t.auth.enterAdminPin);
      return;
    }

    setLoading(true);
    try {
      const payload = await authApi.login({ password: adminPin.trim() });

      onAuthSuccess(payload.user);
    } catch (err) {
      setError(err instanceof Error ? err.message : t.auth.adminPinRejected);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-20 overflow-y-auto bg-[linear-gradient(180deg,rgba(5,10,15,0.32),rgba(5,10,15,0.72))] px-3 pt-[max(12px,env(safe-area-inset-top))] pb-[max(12px,env(safe-area-inset-bottom))] backdrop-blur-[1px] sm:px-4 sm:py-6 lg:px-6 lg:py-10">
      <div className="flex min-h-full items-start justify-center lg:items-center">
        <div className="card auth-shell grid w-full max-w-[74rem] grid-cols-1 overflow-hidden rounded-[32px] border-[rgba(143,185,204,0.34)] bg-[rgba(6,10,15,0.28)] p-0 shadow-[0_32px_80px_rgba(2,6,10,0.68)] backdrop-blur-xl lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)]">
          <PinScreenHero t={t} />
          <PinScreenForm
            t={t}
            mode={mode}
            loading={loading}
            nickname={nickname}
            password={password}
            showPassword={showPassword}
            selectedClassName={className}
            knownClasses={knownClasses}
            discordHandle={discordHandle}
            confirmPassword={confirmPassword}
            showAdminPin={showAdminPin}
            adminPin={adminPin}
            error={error}
            notice={notice}
            onModeChange={handleModeChange}
            onNicknameChange={setNickname}
            onPasswordChange={setPassword}
            onTogglePassword={() => setShowPassword((value) => !value)}
            onClassNameChange={setClassName}
            onDiscordHandleChange={setDiscordHandle}
            onConfirmPasswordChange={setConfirmPassword}
            onSubmit={mode === 'login' ? handleLogin : handleRegister}
            onToggleAdminPin={() => setShowAdminPin((value) => !value)}
            onAdminPinChange={setAdminPin}
            onAdminPinLogin={handleAdminPinLogin}
          />

          <PinScreenApprovalModal
            message={approvalModalMessage}
            t={t}
            onDismiss={() => setApprovalModalMessage('')}
            onBackToLogin={() => {
              setMode('login');
              setApprovalModalMessage('');
            }}
          />
        </div>
      </div>
    </div>
  );
}
