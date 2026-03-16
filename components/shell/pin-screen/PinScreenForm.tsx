'use client';

import { ClassBadge } from '@/components/ClassIcon';
import WuxiaIcon from '@/components/WuxiaIcons';
import type { Translations } from '@/lib/i18n';
import * as stylex from '@stylexjs/stylex';
import { uiStyles } from '@/components/shared/Ui.stylex';
import { mergeStylexProps } from '@/lib/stylex/utils';

type Mode = 'login' | 'register';

interface PinScreenFormProps {
  t: Translations;
  mode: Mode;
  loading: boolean;
  nickname: string;
  password: string;
  showPassword: boolean;
  selectedClassName: string;
  knownClasses: string[];
  discordHandle: string;
  confirmPassword: string;
  showAdminPin: boolean;
  adminPin: string;
  error: string;
  notice: string;
  onModeChange: (mode: Mode) => void;
  onNicknameChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onTogglePassword: () => void;
  onClassNameChange: (value: string) => void;
  onDiscordHandleChange: (value: string) => void;
  onConfirmPasswordChange: (value: string) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void> | void;
  onToggleAdminPin: () => void;
  onAdminPinChange: (value: string) => void;
  onAdminPinLogin: () => Promise<void> | void;
}

export function PinScreenForm({
  t,
  mode,
  loading,
  nickname,
  password,
  showPassword,
  selectedClassName,
  knownClasses,
  discordHandle,
  confirmPassword,
  showAdminPin,
  adminPin,
  error,
  notice,
  onModeChange,
  onNicknameChange,
  onPasswordChange,
  onTogglePassword,
  onClassNameChange,
  onDiscordHandleChange,
  onConfirmPasswordChange,
  onSubmit,
  onToggleAdminPin,
  onAdminPinChange,
  onAdminPinLogin,
}: PinScreenFormProps) {
  const isLogin = mode === 'login';

  return (
    <div className="auth-shell__form mx-auto w-full max-w-[38rem] p-6 lg:mx-0 lg:max-w-none lg:p-10 xl:p-12">
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
          onClick={() => onModeChange('login')}
          {...mergeStylexProps(stylex.props(uiStyles.chip, isLogin && uiStyles.chipActive), 'min-h-[48px] rounded-2xl px-5')}
        >
          {t.auth.loginTab}
        </button>
        <button
          type="button"
          onClick={() => onModeChange('register')}
          {...mergeStylexProps(stylex.props(uiStyles.chip, !isLogin && uiStyles.chipActive), 'min-h-[48px] rounded-2xl px-5')}
        >
          {t.auth.registerTab}
        </button>
      </div>

      <form onSubmit={onSubmit} className="space-y-3.5 sm:space-y-4">
        <input
          value={nickname}
          onChange={(event) => onNicknameChange(event.target.value)}
          {...stylex.props(uiStyles.input)}
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
            onChange={(event) => onPasswordChange(event.target.value)}
            {...stylex.props(uiStyles.input)}
            placeholder={t.auth.password}
            disabled={loading}
            autoComplete={isLogin ? 'current-password' : 'new-password'}
            enterKeyHint={isLogin ? 'go' : 'next'}
          />
          <button
            type="button"
            {...mergeStylexProps(stylex.props(uiStyles.iconButton), 'h-[52px] min-w-[52px] shrink-0 rounded-2xl px-3')}
            onClick={onTogglePassword}
            title={showPassword ? t.auth.hidePassword : t.auth.showPassword}
            aria-label={showPassword ? t.auth.hidePassword : t.auth.showPassword}
            aria-pressed={showPassword}
          >
            <WuxiaIcon name={showPassword ? 'x' : 'eye'} className="h-5 w-5" />
          </button>
        </div>

        {!isLogin ? (
          <>
            <select
              value={selectedClassName}
              onChange={(event) => onClassNameChange(event.target.value)}
                {...stylex.props(uiStyles.select)}
              disabled={loading}
            >
              <option value="">{t.auth.chooseClass}</option>
              {knownClasses.map((knownClass) => (
                <option key={knownClass} value={knownClass}>
                  {knownClass}
                </option>
              ))}
            </select>
            {selectedClassName ? (
              <div className="rounded-2xl border border-[rgba(143,185,204,0.22)] bg-[rgba(12,24,34,0.58)] px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
                <ClassBadge className={selectedClassName} badgeClassName="w-full" textClassName="font-medium text-[#e6eff5]" />
              </div>
            ) : null}
            <input
              value={discordHandle}
              onChange={(event) => onDiscordHandleChange(event.target.value)}
                {...stylex.props(uiStyles.input)}
              placeholder={t.auth.discordHandle}
              disabled={loading}
              autoComplete="off"
              enterKeyHint="next"
            />
            <input
              type={showPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(event) => onConfirmPasswordChange(event.target.value)}
                {...stylex.props(uiStyles.input)}
              placeholder={t.auth.confirmPassword}
              disabled={loading}
              autoComplete="new-password"
              enterKeyHint="done"
            />
          </>
        ) : null}

        <button type="submit" disabled={loading} {...mergeStylexProps(stylex.props(uiStyles.buttonBase, uiStyles.buttonPrimary), 'w-full py-4 text-base font-bold shadow-[0_20px_34px_rgba(7,16,24,0.42)] sm:text-lg')}>
          {loading ? (
            <span className="inline-flex items-center justify-center">
              <WuxiaIcon name="spinner" className="spinner-icon mr-3 h-4 w-4" />
              {isLogin ? t.auth.loggingIn : t.auth.creatingAccount}
            </span>
          ) : (
            <span className="inline-flex items-center justify-center">
              <WuxiaIcon name={isLogin ? 'lockOpen' : 'plus'} className="mr-3 h-4 w-4" />
              {isLogin ? t.auth.loginSubmit : t.auth.registerSubmit}
            </span>
          )}
        </button>
      </form>

      <div className="mt-4">
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-full border border-[rgba(143,185,204,0.16)] bg-[rgba(8,16,24,0.42)] px-4 py-2 text-sm text-[#9fcfe4] transition-colors hover:border-[rgba(191,220,234,0.36)] hover:text-[#d2ebf7]"
          onClick={onToggleAdminPin}
        >
          <WuxiaIcon name="shield" className="h-4 w-4" />
          {showAdminPin ? t.auth.hidePinLogin : t.auth.showPinLogin}
        </button>

        {showAdminPin ? (
          <div className="mt-3 rounded-[22px] border border-[rgba(143,185,204,0.2)] bg-[linear-gradient(145deg,rgba(12,23,32,0.72),rgba(8,14,20,0.78))] p-4 shadow-[0_16px_30px_rgba(4,8,12,0.28)]">
            <div className="mb-2 text-sm text-[#c9dfeb]">{t.auth.adminPinHint}</div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <input
                type="password"
                {...mergeStylexProps(stylex.props(uiStyles.input), 'min-w-0 flex-1')}
                value={adminPin}
                onChange={(event) => onAdminPinChange(event.target.value)}
                placeholder={t.auth.adminPinPlaceholder}
                disabled={loading}
                autoComplete="one-time-code"
                enterKeyHint="go"
              />
              <button type="button" {...mergeStylexProps(stylex.props(uiStyles.buttonBase, uiStyles.buttonSecondary), 'w-full px-4 sm:w-auto')} onClick={onAdminPinLogin} disabled={loading}>
                {t.auth.loginSubmit}
              </button>
            </div>
          </div>
        ) : null}
      </div>

      {error ? (
        <div className="mt-4 rounded-[22px] border border-[rgba(143,185,204,0.26)] bg-[rgba(14,24,34,0.74)] p-4 text-sm text-[#d4e9f4] shadow-[0_16px_30px_rgba(4,8,12,0.24)]">
          <WuxiaIcon name="alertTriangle" className="mr-2 inline-block h-4 w-4 align-text-bottom" />
          {error}
        </div>
      ) : null}

      {notice ? (
        <div className="mt-4 rounded-[22px] border border-[rgba(143,185,204,0.28)] bg-[rgba(11,29,40,0.7)] p-4 text-sm text-[#d4e9f4] shadow-[0_16px_30px_rgba(4,8,12,0.24)]">
          <WuxiaIcon name="checkCircle" className="mr-2 inline-block h-4 w-4 align-text-bottom" />
          {notice}
        </div>
      ) : null}

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
  );
}
