import { InMemoryNotificationsRepository } from 'test/repositories/in-memory-notifications.repository';
import { ReadNotificationUseCase } from './read-notification.usecase';
import { makeNewNotification } from 'test/factories/make-new-notification';
import { UniqueEntityId } from '@/core/value-object/unique-entity-id';
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';

let inMemoryNotificationRepository: InMemoryNotificationsRepository;
let sut: ReadNotificationUseCase;

describe('Read Notification', () => {
  beforeEach(() => {
    inMemoryNotificationRepository = new InMemoryNotificationsRepository();
    sut = new ReadNotificationUseCase(inMemoryNotificationRepository);
  });

  // sut - system under test

  test('should be able to read a notification', async () => {
    const notification = makeNewNotification();

    await inMemoryNotificationRepository.create(notification);

    const result = await sut.execute({
      recipientId: notification.recipientId.toString(),
      notificationId: notification.id.toString(),
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryNotificationRepository.items[0].readAt).toEqual(
      expect.any(Date),
    );
  });

  test('should not be able to read another user notification', async () => {
    const notification = makeNewNotification({
      recipientId: new UniqueEntityId('recipient-1'),
    });

    await inMemoryNotificationRepository.create(notification);

    const result = await sut.execute({
      recipientId: 'recipient-2',
      notificationId: notification.id.toString(),
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });

  test('should return an error is the notifications was not found', async () => {
    const result = await sut.execute({
      recipientId: 'author-2',
      notificationId: '123',
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(ResourceNotFoundError);
  });
});
