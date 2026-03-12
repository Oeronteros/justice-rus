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
    <div className="fixed inset-0 z-20 overflow-y-auto bg-[linear-gradient(180deg,rgba(5,10,15,0.56),rgba(5,10,15,0.84))] px-3 pt-[max(12px,env(safe-area-inset-top))] pb-[max(12px,env(safe-area-inset-bottom))] backdrop-blur-[2px] sm:px-4 sm:py-6 lg:px-6 lg:py-10">
      <div className="flex min-h-full items-start justify-center lg:items-center">
        <div className="card grid w-full max-w-6xl grid-cols-1 overflow-hidden rounded-[32px] border-[rgba(143,185,204,0.34)] bg-[rgba(6,10,15,0.36)] p-0 shadow-[0_32px_80px_rgba(2,6,10,0.72)] backdrop-blur-xl lg:grid-cols-[minmax(0,0.94fr)_minmax(0,1.06fr)]">
          <div className="relative border-b border-[rgba(143,185,204,0.14)] bg-[linear-gradient(160deg,rgba(11,20,28,0.72),rgba(7,12,18,0.88))] p-6 lg:border-b-0 lg:border-r lg:p-10 xl:p-12">
            <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(143,185,204,0.28)] bg-[rgba(9,18,26,0.62)] px-3 py-1.5 text-[11px] uppercase tracking-[0.24em] text-[rgba(191,220,234,0.88)] sm:text-xs sm:tracking-[0.32em]">
              {t.common.portalEyebrow}
            </div>

            <div className="mt-6 flex justify-start">
              <div className="flex h-16 w-16 items-center justify-center rounded-[22px] border border-[rgba(190,223,237,0.18)] bg-[linear-gradient(145deg,rgba(66,136,170,0.92),rgba(151,206,231,0.78))] shadow-[0_18px_32px_rgba(5,12,18,0.45)] sm:h-[4.5rem] sm:w-[4.5rem]">
                <WuxiaIcon name="shield" className="h-8 w-8 text-white sm:h-9 sm:w-9" />
              </div>
            </div>

            <h2 className="mb-3 mt-5 max-w-[12ch] font-orbitron text-[2.15rem] font-bold leading-[0.96] text-[#eef7fd] sm:text-[2.8rem]">{t.auth.memberAccess}</h2>
            <p className="max-w-[34rem] text-sm leading-7 text-[rgba(191,209,220,0.92)] sm:text-base">
              {t.auth.accessIntro}
            </p>

            <div className="mt-6 grid gap-3 text-xs text-[rgba(205,225,236,0.95)] sm:text-sm">
              <div className="inline-flex items-start gap-3 rounded-2xl border border-[rgba(143,185,204,0.16)] bg-[rgba(8,16,24,0.42)] px-4 py-3 leading-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
                <WuxiaIcon name="checkCircle" className="mt-1 h-4 w-4 shrink-0 text-[#8fb9cc]" />
                {t.auth.benefitAccounts}
              </div>
              <div className="inline-flex items-start gap-3 rounded-2xl border border-[rgba(143,185,204,0.16)] bg-[rgba(8,16,24,0.42)] px-4 py-3 leading-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
                <WuxiaIcon name="checkCircle" className="mt-1 h-4 w-4 shrink-0 text-[#8fb9cc]" />
                {t.auth.benefitSecurity}
              </div>
              <div className="inline-flex items-start gap-3 rounded-2xl border border-[rgba(143,185,204,0.16)] bg-[rgba(8,16,24,0.42)] px-4 py-3 leading-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
                <WuxiaIcon name="checkCircle" className="mt-1 h-4 w-4 shrink-0 text-[#8fb9cc]" />
                {t.auth.benefitPin}
              </div>
            </div>

            <div className="relative mt-7 overflow-hidden rounded-[28px] border border-[rgba(143,185,204,0.2)] bg-[linear-gradient(145deg,rgba(9,16,23,0.78),rgba(7,12,18,0.66))] p-5 shadow-[0_20px_40px_rgba(3,8,12,0.36)]">
              <div className="absolute inset-0 moonfall-panel-glow"></div>
              <div className="absolute inset-0 moonfall-fog-layer moonfall-fog-layer-far opacity-80"></div>
              <div className="absolute right-[-2.5rem] top-[-2.5rem] h-32 w-32 rounded-full bg-[radial-gradient(circle,rgba(180,224,245,0.24),transparent_72%)] blur-2xl"></div>
              <div className="absolute inset-x-0 bottom-0 h-20 bg-[linear-gradient(180deg,transparent,rgba(5,10,15,0.78))]"></div>
              <div className="relative z-10 min-h-[12rem]">
                <div className="absolute inset-0 moonfall-fog-layer moonfall-fog-layer-near opacity-75"></div>
                <div className="absolute right-4 top-3 h-24 w-24 rounded-full moonfall-orbit moonfall-parallax-slow opacity-70"></div>
                <div className="absolute right-7 top-5 h-20 w-20 moonfall-crescent moonfall-parallax-slow opacity-90"></div>
                <div className="absolute inset-0 moonfall-starfield opacity-70"></div>
                <div className="absolute inset-x-0 top-[22%] h-20 moonfall-fall opacity-55"></div>
                <div className="absolute left-2 top-8 h-20 w-32 rounded-full wuxia-ink moonfall-parallax-light opacity-55"></div>
                <div className="absolute bottom-0 left-0 h-28 w-full rounded-[24px] bg-[linear-gradient(180deg,rgba(6,12,17,0.02),rgba(6,12,17,0.82))]"></div>
                <div className="absolute bottom-2 left-0 right-0 h-px bg-[linear-gradient(90deg,transparent,rgba(191,220,234,0.28),transparent)]"></div>
              </div>
            </div>
          </div>

          <div className="p-6 lg:p-10 xl:p-12">
            <div className="mb-6 flex flex-col gap-3 sm:mb-7 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-[rgba(143,185,204,0.22)] bg-[rgba(8,16,24,0.46)] px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-[rgba(170,205,223,0.88)]">
                  Silent Moonfall
                </div>
                <h3 className="font-orbitron text-[1.95rem] font-bold leading-tight text-[#eef7fd] sm:text-[2.35rem]">{t.auth.portalTitle}</h3>
                <p className="mt-2 max-w-[34rem] text-sm leading-6 text-[rgba(183,201,214,0.92)] sm:text-base">{t.auth.portalSubtitle}</p>
              </div>
            </div>

            <div className="mb-5 grid w-full grid-cols-2 rounded-[20px] border border-[rgba(143,185,204,0.16)] bg-[rgba(7,13,19,0.56)] p-1.5 sm:mb-6 sm:inline-flex sm:w-auto">
              <button
              type="button"
              onClick={() => {
                setMode('login');
                resetMessages();
              }}
              className={`ui-chip min-h-[48px] rounded-2xl px-5 ${mode === 'login' ? 'is-active' : ''}`}
            >
              {t.auth.loginTab}
              </button>
              <button
              type="button"
              onClick={() => {
                setMode('register');
                resetMessages();
              }}
              className={`ui-chip min-h-[48px] rounded-2xl px-5 ${mode === 'register' ? 'is-active' : ''}`}
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
                className="dc-icon-btn h-[52px] min-w-[52px] shrink-0 rounded-2xl px-3"
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
                    <div className="rounded-2xl border border-[rgba(143,185,204,0.22)] bg-[rgba(12,24,34,0.58)] px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
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

              <button type="submit" disabled={loading} className="btn-primary w-full py-4 text-base font-bold shadow-[0_20px_34px_rgba(7,16,24,0.42)] sm:text-lg">
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
              className="inline-flex items-center gap-2 rounded-full border border-[rgba(143,185,204,0.16)] bg-[rgba(8,16,24,0.42)] px-4 py-2 text-sm text-[#9fcfe4] transition-colors hover:border-[rgba(191,220,234,0.36)] hover:text-[#d2ebf7]"
              onClick={() => setShowAdminPin((v) => !v)}
              >
              <WuxiaIcon name="shield" className="h-4 w-4" />
              {showAdminPin ? t.auth.hidePinLogin : t.auth.showPinLogin}
              </button>

              {showAdminPin && (
                <div className="mt-3 rounded-[22px] border border-[rgba(143,185,204,0.2)] bg-[linear-gradient(145deg,rgba(12,23,32,0.72),rgba(8,14,20,0.78))] p-4 shadow-[0_16px_30px_rgba(4,8,12,0.28)]">
                  <div className="mb-2 text-sm text-[#c9dfeb]">{t.auth.adminPinHint}</div>
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
              <div className="mt-4 rounded-[22px] border border-[rgba(143,185,204,0.26)] bg-[rgba(14,24,34,0.74)] p-4 text-sm text-[#d4e9f4] shadow-[0_16px_30px_rgba(4,8,12,0.24)]">
              <WuxiaIcon name="alertTriangle" className="w-4 h-4 mr-2 inline-block align-text-bottom" />
              {error}
              </div>
            )}

            {notice && (
              <div className="mt-4 rounded-[22px] border border-[rgba(143,185,204,0.28)] bg-[rgba(11,29,40,0.7)] p-4 text-sm text-[#d4e9f4] shadow-[0_16px_30px_rgba(4,8,12,0.24)]">
              <WuxiaIcon name="checkCircle" className="w-4 h-4 mr-2 inline-block align-text-bottom" />
              {notice}
              </div>
            )}

            <div className="mt-6 grid gap-3 border-t border-[rgba(143,185,204,0.12)] pt-5 text-sm sm:mt-8 sm:grid-cols-2 sm:pt-6">
              <div className="rounded-2xl border border-[rgba(143,185,204,0.16)] bg-[rgba(8,16,24,0.34)] px-4 py-3 text-[rgba(212,230,240,0.92)]">
                <WuxiaIcon name="shield" className="mr-2 inline-block h-4 w-4 align-text-bottom text-[#8fb9cc]" />
                {t.auth.secureAccess}
              </div>
              <div className="rounded-2xl border border-[rgba(143,185,204,0.16)] bg-[rgba(8,16,24,0.34)] px-4 py-3 text-[rgba(183,201,214,0.88)]">
                {t.auth.activationHelp}
              </div>
            </div>
          </div>

          {approvalModalMessage && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#071018]/82 px-4 py-6 backdrop-blur-sm sm:px-6 sm:py-8">
              <div className="w-full max-w-md rounded-[30px] border border-[#3d7c9d]/40 bg-gradient-to-br from-[#122433] via-[#0d1924] to-[#0a1219] p-5 shadow-2xl shadow-[#041018]/60 sm:p-6">
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
