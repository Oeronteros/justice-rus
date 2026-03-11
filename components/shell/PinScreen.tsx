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
    <div className="fixed inset-0 flex items-center justify-center z-20 bg-[#070d12]/95 px-4">
      <div className="card p-0 w-full max-w-4xl relative overflow-hidden grid grid-cols-1 lg:grid-cols-5">
        <div className="lg:col-span-2 p-8 lg:p-10 border-b lg:border-b-0 lg:border-r border-[#273a49]/50 bg-gradient-to-br from-[#13202b]/78 to-[#0b141c]/92">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#37556c]/65 bg-[#10202d]/75 text-xs uppercase tracking-widest text-[#9cc4d7]">
            {t.common.portalEyebrow}
          </div>

          <div className="mt-6 flex justify-start">
            <div className="w-16 h-16 bg-gradient-to-r from-[#2f6e8d] to-[#8fb9cc] rounded-2xl flex items-center justify-center shadow-lg shadow-[#0c1a24]/40">
              <WuxiaIcon name="shield" className="w-8 h-8 text-white" />
            </div>
          </div>

          <h2 className="text-3xl font-bold font-orbitron text-[#e6eff5] mt-5 mb-2">{t.auth.memberAccess}</h2>
          <p className="text-[#b7c9d6] leading-relaxed">
            {t.auth.accessIntro}
          </p>

          <div className="mt-6 space-y-3 text-sm text-[#bdd5e4]">
            <div className="inline-flex items-center gap-2">
              <WuxiaIcon name="checkCircle" className="w-4 h-4 text-[#8fb9cc]" />
              {t.auth.benefitAccounts}
            </div>
            <div className="inline-flex items-center gap-2">
              <WuxiaIcon name="checkCircle" className="w-4 h-4 text-[#8fb9cc]" />
              {t.auth.benefitSecurity}
            </div>
            <div className="inline-flex items-center gap-2">
              <WuxiaIcon name="checkCircle" className="w-4 h-4 text-[#8fb9cc]" />
              {t.auth.benefitPin}
            </div>
          </div>
        </div>

        <div className="lg:col-span-3 p-8 lg:p-10">
          <div className="mb-6">
            <h3 className="text-2xl font-bold font-orbitron text-[#e6eff5] mb-2">{t.auth.portalTitle}</h3>
            <p className="text-[#b7c9d6]">{t.auth.portalSubtitle}</p>
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
              {t.auth.loginTab}
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
              {t.auth.registerTab}
            </button>
          </div>

          <form onSubmit={mode === 'login' ? handleLogin : handleRegister} className="space-y-4">
            <input
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="input-field w-full"
              placeholder={t.auth.nickname}
              autoFocus
              disabled={loading}
            />

            <div className="flex gap-2">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field w-full"
                placeholder={t.auth.password}
                disabled={loading}
              />
              <button
                type="button"
                className="dc-icon-btn px-3 rounded-xl"
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
                />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="input-field w-full"
                  placeholder={t.auth.confirmPassword}
                  disabled={loading}
                />
              </>
            )}

            <button type="submit" disabled={loading} className="btn-primary w-full py-4 text-lg font-bold">
              {loading ? (
                <span className="inline-flex items-center justify-center">
                  <WuxiaIcon name="spinner" className="w-4 h-4 mr-3 animate-spin" />
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
              <div className="mt-3 p-4 rounded-xl border border-[#2f6e8d]/35 bg-[#12202b]/55">
                <div className="text-sm text-[#bcd6e5] mb-2">{t.auth.adminPinHint}</div>
                <div className="flex gap-2">
                  <input
                    type="password"
                    className="input-field"
                    value={adminPin}
                    onChange={(e) => setAdminPin(e.target.value)}
                    placeholder={t.auth.adminPinPlaceholder}
                    disabled={loading}
                  />
                  <button type="button" className="btn-secondary px-4" onClick={handleAdminPinLogin} disabled={loading}>
                    {t.auth.loginSubmit}
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
              {t.auth.secureAccess}
            </span>
            <span>{t.auth.activationHelp}</span>
          </div>
        </div>

        {approvalModalMessage && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#071018]/82 px-6 py-8 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-[28px] border border-[#3d7c9d]/40 bg-gradient-to-br from-[#122433] via-[#0d1924] to-[#0a1219] p-6 shadow-2xl shadow-[#041018]/60">
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
  );
}
