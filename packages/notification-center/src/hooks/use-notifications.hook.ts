import { useContext } from 'react';
import { NotificationsContext } from '../store/notifications.context';
import { ButtonTypeEnum, MessageActionStatusEnum } from '@novu/shared';
import { INotificationsContext } from '../shared/interfaces';

interface IUseNotificationsProps {
  storeId?: string;
}

export function useNotifications(props?: IUseNotificationsProps) {
  const {
    notifications: mapNotifications,
    fetchNextPage: mapFetchNextPage,
    hasNextPage: mapHasNextPage,
    fetching,
    markAsRead,
    updateAction: mapUpdateAction,
    refetch: mapRefetch,
    markNotificationsAsSeen: mapMarkNotificationsAsSeen,
  } = useContext<INotificationsContext>(NotificationsContext);

  const storeId = props?.storeId ? props?.storeId : 'default_store';

  const notifications = mapNotifications[storeId];

  async function fetchNextPage() {
    await mapFetchNextPage(storeId);
  }

  const hasNextPage = mapHasNextPage?.has(storeId) ? mapHasNextPage.get(storeId) : true;

  async function updateAction(
    messageId: string,
    actionButtonType: ButtonTypeEnum,
    status: MessageActionStatusEnum,
    payload?: Record<string, unknown>
  ) {
    await mapUpdateAction(messageId, actionButtonType, status, payload, storeId);
  }

  async function refetch() {
    await mapRefetch(storeId);
  }

  async function markNotificationsAsSeen() {
    await mapMarkNotificationsAsSeen(storeId);
  }

  return {
    notifications,
    fetchNextPage,
    hasNextPage,
    fetching,
    markAsRead,
    updateAction,
    refetch,
    markNotificationsAsSeen,
  };
}
