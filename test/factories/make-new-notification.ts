import { UniqueEntityId } from '@/core/value-object/unique-entity-id';
import {
  Notification,
  NotificationProps,
} from '@/domain/notification/enterprise/entities/notification';

import { faker } from '@faker-js/faker';

export const makeNewNotification = (
  override: Partial<NotificationProps> = {},
  id?: UniqueEntityId,
) => {
  const newNotification = Notification.create(
    {
      recipientId: new UniqueEntityId(),
      title: faker.lorem.sentence(4),
      content: faker.lorem.sentence(10),
      ...override,
    },
    id,
  );

  return newNotification;
};
