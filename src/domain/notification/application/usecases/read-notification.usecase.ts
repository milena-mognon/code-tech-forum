import { Either, left, right } from '@/core/either';
import { Notification } from '../../enterprise/entities/notification';
import { NotificationsRepository } from '../repositories/notification.repository';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error';

interface ReadNotificationUseCaseInput {
  recipientId: string;
  notificationId: string;
}

type ReadNotificationUseCaseOutput = Either<
  NotAllowedError | ResourceNotFoundError,
  {
    notification: Notification;
  }
>;

export class ReadNotificationUseCase {
  constructor(private notificationsRepository: NotificationsRepository) {}
  public async execute({
    recipientId,
    notificationId,
  }: ReadNotificationUseCaseInput): Promise<ReadNotificationUseCaseOutput> {
    const notification =
      await this.notificationsRepository.findById(notificationId);

    if (!notification) {
      return left(new ResourceNotFoundError());
    }

    if (recipientId !== notification.recipientId.toString()) {
      return left(new NotAllowedError());
    }

    notification.read();

    await this.notificationsRepository.save(notification);

    return right({ notification });
  }
}
