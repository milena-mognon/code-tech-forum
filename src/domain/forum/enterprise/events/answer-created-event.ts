import { UniqueEntityId } from '@/core/value-object/unique-entity-id';
import { Answer } from '../entities/answer';
import { DomainEvents } from '@/core/events/domain-events';

export class AnswerCreatedEvent implements DomainEvents {
  public ocurredAt: Date;
  public answer: Answer;

  constructor(answer: Answer) {
    this.answer = answer;
    this.ocurredAt = new Date();
  }

  getAggregateId(): UniqueEntityId {
    return this.answer.id;
  }
}
