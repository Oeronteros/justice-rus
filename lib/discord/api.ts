import type { DiscordBotConfig, DiscordSyncStatus, DiscordCommand, DiscordNotification } from '@/lib/schemas/discord';

// Mock Discord integration API
export const discordApi = {
  // Configuration
  getConfig: async (): Promise<DiscordBotConfig> => {
    return {} as DiscordBotConfig;
  },
  updateConfig: async (config: DiscordBotConfig): Promise<DiscordBotConfig> => {
    return config;
  },

  // Sync status
  getSyncStatus: async (): Promise<DiscordSyncStatus> => {
    return {
      status: 'idle',
      stats: {
        membersSynced: 0,
        rolesSynced: 0,
        messagesSent: 0,
      },
    };
  },
  triggerSync: async (): Promise<void> => {},

  // Commands
  getCommands: async (): Promise<DiscordCommand[]> => {
    return [];
  },
  updateCommand: async (command: DiscordCommand): Promise<DiscordCommand> => {
    return command;
  },

  // Notifications
  getNotifications: async (): Promise<DiscordNotification[]> => {
    return [];
  },
  createNotification: async (notification: Omit<DiscordNotification, 'id'>): Promise<DiscordNotification> => {
    return {} as DiscordNotification;
  },
  updateNotification: async (notification: DiscordNotification): Promise<DiscordNotification> => {
    return notification;
  },
  deleteNotification: async (id: string): Promise<void> => {},

  // Test connection
  testConnection: async (): Promise<{ success: boolean; message: string }> => {
    return { success: true, message: 'Connection successful' };
  },

  // Send message
  sendMessage: async (channelId: string, message: string): Promise<void> => {},
};
