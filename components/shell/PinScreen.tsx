'use client';

import { useState } from 'react';
import type { User } from '@/lib/schemas/auth';
import { authApi } from '@/lib/api/auth';
import WuxiaIcon from '../WuxiaIcons';
import { useKnownClasses } from '@/lib/auth/hooks';
import { ClassBadge } from '@/components/ClassIcon';
import { useTranslation } from '@/lib/i18n/context';

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

      onAuthSuccess(payload.user as User);
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
      setApprovalModalMessage(
        payload.message || t.auth.accountCreatedPendingApproval
      );
      setMode('login');
      setClassName('');
      setDiscordHandle('');
      setPassword('');
      setConfirmPassword('');
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

      onAuthSuccess(payload.user as User);
    } catch (err) {
      setError(err instanceof Error ? err.message : t.auth.adminPinRejected);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-20 overflow-y-auto bg-[#070d12]/95 px-3 pt-[max(12px,env(safe-area-inset-top))] pb-[max(12px,env(safe-area-inset-bottom))] sm:px-4 sm:py-6">
      <div className="flex min-h-full items-start justify-center lg:items-center">
        <div className="card grid w-full max-w-4xl grid-cols-1 overflow-hidden p-0 lg:grid-cols-5">
          <div className="border-b border-[#273a49]/50 bg-gradient-to-br from-[#13202b]/78 to-[#0b141c]/92 p-6 lg:col-span-2 lg:border-b-0 lg:border-r lg:p-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#37556c]/65 bg-[#10202d]/75 px-3 py-1.5 text-[11px] uppercase tracking-[0.22em] text-[#9cc4d7] sm:text-xs sm:tracking-widest">
            {t.common.portalEyebrow}
            </div>

            <div className="mt-5 flex justify-start sm:mt-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-[#2f6e8d] to-[#8fb9cc] shadow-lg shadow-[#0c1a24]/40 sm:h-16 sm:w-16">
                <WuxiaIcon name="shield" className="h-7 w-7 text-white sm:h-8 sm:w-8" />
              </div>
            </div>

            <h2 className="mb-2 mt-4 font-orbitron text-[2rem] font-bold leading-tight text-[#e6eff5] sm:mt-5 sm:text-3xl">{t.auth.memberAccess}</h2>
            <p className="text-sm leading-7 text-[#b7c9d6] sm:text-base">
            {t.auth.accessIntro}
            </p>

            <div className="mt-5 grid gap-2.5 text-xs text-[#bdd5e4] sm:mt-6 sm:space-y-0 sm:text-sm">
              <div className="inline-flex items-start gap-2.5 leading-6">
                <WuxiaIcon name="checkCircle" className="mt-1 h-4 w-4 shrink-0 text-[#8fb9cc]" />
              {t.auth.benefitAccounts}
              </div>
              <div className="inline-flex items-start gap-2.5 leading-6">
                <WuxiaIcon name="checkCircle" className="mt-1 h-4 w-4 shrink-0 text-[#8fb9cc]" />
              {t.auth.benefitSecurity}
              </div>
              <div className="inline-flex items-start gap-2.5 leading-6">
                <WuxiaIcon name="checkCircle" className="mt-1 h-4 w-4 shrink-0 text-[#8fb9cc]" />
              {t.auth.benefitPin}
              </div>
            </div>
          </div>

          <div className="p-6 lg:col-span-3 lg:p-10">
            <div className="mb-5 sm:mb-6">
              <h3 className="mb-2 font-orbitron text-[1.75rem] font-bold leading-tight text-[#e6eff5] sm:text-2xl">{t.auth.portalTitle}</h3>
              <p className="text-sm text-[#b7c9d6] sm:text-base">{t.auth.portalSubtitle}</p>
            </div>

            <div className="mb-5 grid w-full grid-cols-2 rounded-2xl border border-[#223140]/70 bg-[#0b141d]/70 p-1 sm:mb-6 sm:inline-flex sm:w-auto">
              <button
              type="button"
              onClick={() => {
                setMode('login');
                resetMessages();
              }}
              className={`ui-chip ${mode === 'login' ? 'is-active' : ''}`}
            >
              {t.auth.loginTab}
              </button>
              <button
              type="button"
              onClick={() => {
                setMode('register');
                resetMessages();
              }}
              className={`ui-chip ${mode === 'register' ? 'is-active' : ''}`}
            >
              {t.auth.registerTab}
              </button>
            </div>

            <form onSubmit={mode === 'login' ? handleLogin : handleRegister} className="space-y-3.5 sm:space-y-4">
              <input
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="input-field w-full"
              placeholder={t.auth.nickname}
              autoFocus
              disabled={loading}
              autoComplete="username"
              enterKeyHint="next"
            />

              <div className="flex gap-2">
                <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field w-full"
                placeholder={t.auth.password}
                disabled={loading}
                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                enterKeyHint={mode === 'login' ? 'go' : 'next'}
                />
                <button
                type="button"
                className="dc-icon-btn shrink-0 rounded-xl px-3"
                onClick={() => setShowPassword((v) => !v)}
                title={showPassword ? t.auth.hidePassword : t.auth.showPassword}
              >
                <WuxiaIcon name={showPassword ? 'x' : 'eye'} className="w-5 h-5" />
                </button>
              </div>

              {mode === 'register' && (
                <>
                  <select
                  value={className}
                  onChange={(e) => setClassName(e.target.value)}
                  className="select-field w-full"
                  disabled={loading}
                  >
                    <option value="">{t.auth.chooseClass}</option>
                    {knownClasses.map((knownClass) => (
                      <option key={knownClass} value={knownClass}>{knownClass}</option>
                    ))}
                  </select>
                  {className ? (
                    <div className="rounded-2xl border border-[#2f6e8d]/35 bg-[#12202b]/55 px-4 py-3">
                      <ClassBadge className={className} badgeClassName="w-full" textClassName="text-[#e6eff5] font-medium" />
                    </div>
                  ) : null}
                  <input
                  value={discordHandle}
                  onChange={(e) => setDiscordHandle(e.target.value)}
                  className="input-field w-full"
                  placeholder={t.auth.discordHandle}
                  disabled={loading}
                  autoComplete="off"
                  enterKeyHint="next"
                  />
                  <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="input-field w-full"
                  placeholder={t.auth.confirmPassword}
                  disabled={loading}
                  autoComplete="new-password"
                  enterKeyHint="done"
                  />
                </>
              )}

              <button type="submit" disabled={loading} className="btn-primary w-full py-4 text-base font-bold sm:text-lg">
              {loading ? (
                <span className="inline-flex items-center justify-center">
                  <WuxiaIcon name="spinner" className="spinner-icon w-4 h-4 mr-3" />
                  {mode === 'login' ? t.auth.loggingIn : t.auth.creatingAccount}
                </span>
              ) : (
                <span className="inline-flex items-center justify-center">
                  <WuxiaIcon name={mode === 'login' ? 'lockOpen' : 'plus'} className="w-4 h-4 mr-3" />
                  {mode === 'login' ? t.auth.loginSubmit : t.auth.registerSubmit}
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
              {showAdminPin ? t.auth.hidePinLogin : t.auth.showPinLogin}
              </button>

              {showAdminPin && (
                <div className="mt-3 rounded-xl border border-[#2f6e8d]/35 bg-[#12202b]/55 p-4">
                  <div className="mb-2 text-sm text-[#bcd6e5]">{t.auth.adminPinHint}</div>
                  <div className="flex flex-col gap-2 sm:flex-row">
                    <input
                    type="password"
                    className="input-field min-w-0 flex-1"
                    value={adminPin}
                    onChange={(e) => setAdminPin(e.target.value)}
                    placeholder={t.auth.adminPinPlaceholder}
                    disabled={loading}
                    autoComplete="one-time-code"
                    enterKeyHint="go"
                    />
                    <button type="button" className="btn-secondary w-full px-4 sm:w-auto" onClick={handleAdminPinLogin} disabled={loading}>
                    {t.auth.loginSubmit}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {error && (
              <div className="mt-4 rounded-xl border border-[#2f6e8d]/40 bg-[#16202b]/65 p-4 text-sm text-[#bcd6e5]">
              <WuxiaIcon name="alertTriangle" className="w-4 h-4 mr-2 inline-block align-text-bottom" />
              {error}
              </div>
            )}

            {notice && (
              <div className="mt-4 rounded-xl border border-[#3d7c9d]/45 bg-[#112430]/65 p-4 text-sm text-[#bcd6e5]">
              <WuxiaIcon name="checkCircle" className="w-4 h-4 mr-2 inline-block align-text-bottom" />
              {notice}
              </div>
            )}

            <div className="mt-6 flex flex-col gap-2 border-t border-gray-800/70 pt-4 text-xs font-medium text-gray-500 sm:mt-8 sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:pt-5">
              <span>
              <WuxiaIcon name="shield" className="w-4 h-4 mr-2 inline-block align-text-bottom" />
              {t.auth.secureAccess}
              </span>
              <span>{t.auth.activationHelp}</span>
            </div>
          </div>

          {approvalModalMessage && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#071018]/82 px-4 py-6 backdrop-blur-sm sm:px-6 sm:py-8">
              <div className="w-full max-w-md rounded-[28px] border border-[#3d7c9d]/40 bg-gradient-to-br from-[#122433] via-[#0d1924] to-[#0a1219] p-5 shadow-2xl shadow-[#041018]/60 sm:p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-[#5e9fbe]/35 bg-[#153245]/80 text-[#9fd3ea]">
                  <WuxiaIcon name="checkCircle" className="h-7 w-7" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs uppercase tracking-[0.28em] text-[#7db2ca]">{t.auth.registrationComplete}</div>
                  <h4 className="mt-2 text-2xl font-bold font-orbitron text-[#edf7fd]">{t.auth.officerApprovalNeeded}</h4>
                  <p className="mt-3 text-sm leading-6 text-[#c2d8e5]">
                    {t.auth.accountCreatedPendingApproval}
                  </p>
                </div>
              </div>

              <div className="mt-5 rounded-2xl border border-[#2b5368]/45 bg-[#10202c]/70 px-4 py-3 text-sm leading-6 text-[#d7e8f1]">
                {approvalModalMessage}
              </div>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  className="btn-primary flex-1 px-4 py-3 text-sm font-semibold"
                  onClick={() => setApprovalModalMessage('')}
                >
                  {t.auth.gotIt}
                </button>
                <button
                  type="button"
                  className="btn-secondary flex-1 px-4 py-3 text-sm font-semibold"
                  onClick={() => {
                    setMode('login');
                    setApprovalModalMessage('');
                  }}
                >
                  {t.auth.backToLogin}
                </button>
              </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
