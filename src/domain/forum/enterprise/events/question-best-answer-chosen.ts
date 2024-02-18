import { UniqueEntityId } from '@/core/value-object/unique-entity-id';
import { DomainEvents } from '@/core/events/domain-events';
import { Question } from '../entities/question';

export class QuestionBestAnswerChosenEvent implements DomainEvents {
  public ocurredAt: Date;
  public question: Question;
  public bestAnswerId: UniqueEntityId;

  constructor(question: Question, bestAnswerId: UniqueEntityId) {
    this.question = question;
    this.bestAnswerId = bestAnswerId;
    this.ocurredAt = new Date();
  }

  getAggregateId(): UniqueEntityId {
    return this.question.id;
  }
}
