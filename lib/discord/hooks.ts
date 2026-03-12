import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { discordApi } from './api';
import type { DiscordBotConfig, DiscordSyncStatus, DiscordCommand, DiscordNotification } from '@/lib/schemas/discord';

export const discordKeys = {
  all: ['discord'] as const,
  config: () => [...discordKeys.all, 'config'] as const,
  syncStatus: () => [...discordKeys.all, 'syncStatus'] as const,
  commands: () => [...discordKeys.all, 'commands'] as const,
  notifications: () => [...discordKeys.all, 'notifications'] as const,
};

// Configuration
export function useDiscordConfig() {
  return useQuery({
    queryKey: discordKeys.config(),
    queryFn: () => discordApi.getConfig(),
  });
}

export function useUpdateDiscordConfig() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (config: DiscordBotConfig) => discordApi.updateConfig(config),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: discordKeys.config() });
    },
  });
}

// Sync status
export function useDiscordSyncStatus() {
  return useQuery({
    queryKey: discordKeys.syncStatus(),
    queryFn: () => discordApi.getSyncStatus(),
    refetchInterval: 5000, // Poll every 5 seconds
  });
}

export function useTriggerDiscordSync() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => discordApi.triggerSync(),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: discordKeys.syncStatus() });
    },
  });
}

// Commands
export function useDiscordCommands() {
  return useQuery({
    queryKey: discordKeys.commands(),
    queryFn: () => discordApi.getCommands(),
  });
}

export function useUpdateDiscordCommand() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (command: DiscordCommand) => discordApi.updateCommand(command),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: discordKeys.commands() });
    },
  });
}

// Notifications
export function useDiscordNotifications() {
  return useQuery({
    queryKey: discordKeys.notifications(),
    queryFn: () => discordApi.getNotifications(),
  });
}

export function useCreateDiscordNotification() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (notification: Omit<DiscordNotification, 'id'>) => discordApi.createNotification(notification),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: discordKeys.notifications() });
    },
  });
}

export function useUpdateDiscordNotification() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (notification: DiscordNotification) => discordApi.updateNotification(notification),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: discordKeys.notifications() });
    },
  });
}

export function useDeleteDiscordNotification() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => discordApi.deleteNotification(id),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: discordKeys.notifications() });
    },
  });
}

// Connection test
export function useTestDiscordConnection() {
  return useMutation({
    mutationFn: () => discordApi.testConnection(),
  });
}
