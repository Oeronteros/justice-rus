'use client';

import { useState } from 'react';
import { SectionHero } from '@/components/shared/SectionHero';
import WuxiaIcon from '@/components/WuxiaIcons';
import {
  useDiscordConfig,
  useUpdateDiscordConfig,
  useDiscordSyncStatus,
  useTriggerDiscordSync,
  useTestDiscordConnection,
} from '@/lib/discord';
import { hasRoleAtLeast } from '@/lib/authz';
import { useUser } from '@/lib/auth/context';
import type { Language } from '@/lib/i18n';

interface DiscordIntegrationPageProps {
  language: Language;
}

const copy: Record<Language, {
  title: string;
  subtitle: string;
  config: string;
  sync: string;
  status: string;
  test: string;
  saving: string;
  saved: string;
  testing: string;
  connected: string;
  disconnected: string;
  syncNow: string;
  syncing: string;
}> = {
  ru: {
    title: 'Discord Интеграция',
    subtitle: 'Настройка подключения к Discord боту и синхронизация данных',
    config: 'Конфигурация бота',
    sync: 'Синхронизация',
    status: 'Статус',
    test: 'Проверить подключение',
    saving: 'Сохранение...',
    saved: 'Сохранено',
    testing: 'Проверка...',
    connected: 'Подключено',
    disconnected: 'Не подключено',
    syncNow: 'Синхронизировать',
    syncing: 'Синхронизация...',
  },
  en: {
    title: 'Discord Integration',
    subtitle: 'Configure Discord bot connection and data synchronization',
    config: 'Bot Configuration',
    sync: 'Synchronization',
    status: 'Status',
    test: 'Test Connection',
    saving: 'Saving...',
    saved: 'Saved',
    testing: 'Testing...',
    connected: 'Connected',
    disconnected: 'Disconnected',
    syncNow: 'Sync Now',
    syncing: 'Syncing...',
  },
  zh: {
    title: 'Discord 集成',
    subtitle: '配置 Discord 机器人连接和数据同步',
    config: '机器人配置',
    sync: '同步',
    status: '状态',
    test: '测试连接',
    saving: '保存中...',
    saved: '已保存',
    testing: '测试中...',
    connected: '已连接',
    disconnected: '未连接',
    syncNow: '立即同步',
    syncing: '同步中...',
  },
};

export default function DiscordIntegrationPage({ language }: DiscordIntegrationPageProps) {
  const user = useUser();
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);

  const canManageIntegrations = hasRoleAtLeast(user.role, 'officer');

  const { data: config, isLoading: configLoading } = useDiscordConfig();
  const { data: syncStatus, isLoading: statusLoading } = useDiscordSyncStatus();
  const updateConfig = useUpdateDiscordConfig();
  const triggerSync = useTriggerDiscordSync();
  const testConnection = useTestDiscordConnection();

  if (!canManageIntegrations) {
    return (
      <section className="section-shell py-10 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHero
            icon={<WuxiaIcon name="schedule" className="w-5 h-5" />}
            title={copy[language].title}
            subtitle={copy[language].subtitle}
            chips={['Integration', 'Officers Only']}
          />
          <div className="card section-card p-6 text-center text-gray-400">
            <WuxiaIcon name="lockOpen" className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>{language === 'zh' ? '此页面需要官员或更高权限' : language === 'en' ? 'This page requires officer or higher role' : 'Эта страница требует роли офицера или выше'}</p>
          </div>
        </div>
      </section>
    );
  }

  const handleTestConnection = async () => {
    setTestResult(null);
    const result = await testConnection.mutateAsync();
    setTestResult(result);
  };

  const handleSync = async () => {
    await triggerSync.mutateAsync();
  };

  if (configLoading || statusLoading) {
    return (
      <section className="section-shell py-10 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHero
            icon={<WuxiaIcon name="schedule" className="w-5 h-5" />}
            title={copy[language].title}
            subtitle={copy[language].subtitle}
            chips={['Integration']}
          />
          <div className="text-center text-gray-400 py-12">
            <WuxiaIcon name="schedule" className="w-12 h-12 mx-auto mb-3 animate-pulse" />
            <p>{language === 'zh' ? '加载中...' : language === 'en' ? 'Loading...' : 'Загрузка...'}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-shell py-10 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHero
          icon={<WuxiaIcon name="schedule" className="w-5 h-5" />}
          title={copy[language].title}
          subtitle={copy[language].subtitle}
          chips={['Integration', 'Officers']}
        />

        <div className="space-y-6">
          {/* Connection Status */}
          <div className="card section-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-[#bcd6e5]">{copy[language].status}</h3>
              <div className={`flex items-center gap-2 text-xs px-3 py-1.5 rounded-full ${
                syncStatus?.status === 'syncing'
                  ? 'bg-[#5a4a2d]/30 text-[#b9a56f]'
                  : syncStatus?.error
                    ? 'bg-[#5a2d2d]/30 text-[#b96f6f]'
                    : 'bg-[#2d5a3f]/30 text-[#6fb98f]'
              }`}>
                <div className={`w-2 h-2 rounded-full ${
                  syncStatus?.status === 'syncing' ? 'bg-[#b9a56f] animate-pulse' :
                  syncStatus?.error ? 'bg-[#b96f6f]' :
                  'bg-[#6fb98f]'
                }`} />
                {syncStatus?.status === 'syncing'
                  ? copy[language].syncing
                  : syncStatus?.error
                    ? copy[language].disconnected
                    : copy[language].connected}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 text-xs">
              <div className="p-3 rounded-lg bg-[#101a23]/65 border border-[#2a3c4c]/60">
                <div className="text-gray-400 mb-1">{language === 'zh' ? '成员' : language === 'en' ? 'Members' : 'Участники'}</div>
                <div className="text-lg font-semibold text-[#e6eff5]">{syncStatus?.stats.membersSynced || 0}</div>
              </div>
              <div className="p-3 rounded-lg bg-[#101a23]/65 border border-[#2a3c4c]/60">
                <div className="text-gray-400 mb-1">{language === 'zh' ? '角色' : language === 'en' ? 'Roles' : 'Роли'}</div>
                <div className="text-lg font-semibold text-[#e6eff5]">{syncStatus?.stats.rolesSynced || 0}</div>
              </div>
              <div className="p-3 rounded-lg bg-[#101a23]/65 border border-[#2a3c4c]/60">
                <div className="text-gray-400 mb-1">{language === 'zh' ? '消息' : language === 'en' ? 'Messages' : 'Сообщения'}</div>
                <div className="text-lg font-semibold text-[#e6eff5]">{syncStatus?.stats.messagesSent || 0}</div>
              </div>
            </div>

            {syncStatus?.error && (
              <div className="mt-4 p-3 rounded-lg bg-[#5a2d2d]/20 border border-[#5a2d2d]/40 text-sm text-[#b96f6f]">
                {syncStatus.error}
              </div>
            )}
          </div>

          {/* Bot Configuration */}
          <div className="card section-card p-6">
            <h3 className="text-sm font-semibold text-[#bcd6e5] mb-4">{copy[language].config}</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#bcd6e5] mb-1">
                  {language === 'zh' ? '机器人 Token' : language === 'en' ? 'Bot Token' : 'Токен бота'}
                </label>
                <input
                  type="password"
                  defaultValue={config?.botToken}
                  className="input-field w-full"
                  placeholder="Bot token from Discord Developer Portal"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#bcd6e5] mb-1">
                    {language === 'zh' ? '服务器 ID' : language === 'en' ? 'Guild ID' : 'ID сервера'}
                  </label>
                  <input
                    type="text"
                    defaultValue={config?.guildId}
                    className="input-field w-full"
                    placeholder="Discord server ID"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#bcd6e5] mb-1">
                    {language === 'zh' ? 'API 地址' : language === 'en' ? 'API Base URL' : 'API адрес'}
                  </label>
                  <input
                    type="url"
                    defaultValue={config?.apiBaseUrl}
                    className="input-field w-full"
                    placeholder="https://your-bot.example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#bcd6e5] mb-1">
                  {language === 'zh' ? 'API 密钥' : language === 'en' ? 'API Key' : 'API ключ'}
                </label>
                <input
                  type="password"
                  defaultValue={config?.apiKey}
                  className="input-field w-full"
                  placeholder="Optional API key for authentication"
                />
              </div>

              <div className="flex items-center gap-2 pt-4 border-t border-[#2a3c4c]/60">
                <button
                  type="button"
                  onClick={handleTestConnection}
                  disabled={testConnection.isPending}
                  className="btn-secondary text-xs"
                >
                  {testConnection.isPending ? copy[language].testing : copy[language].test}
                </button>
                <button
                  type="button"
                  onClick={handleSync}
                  disabled={triggerSync.isPending}
                  className="btn-primary text-xs"
                >
                  {triggerSync.isPending ? copy[language].syncing : copy[language].syncNow}
                </button>
              </div>

              {testResult && (
                <div className={`p-3 rounded-lg text-sm ${
                  testResult.success
                    ? 'bg-[#2d5a3f]/20 border border-[#2d5a3f]/40 text-[#6fb98f]'
                    : 'bg-[#5a2d2d]/20 border border-[#5a2d2d]/40 text-[#b96f6f]'
                }`}>
                  {testResult.message}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
