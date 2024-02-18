import { DomainEvents } from '@/core/events/domain-events';
import { PaginationParams } from '@/core/repositories/pagination-params';
import { AnswerAttachmentsRepository } from '@/domain/forum/application/repositories/answer-attachments.repository';
import { AnswersRepository } from '@/domain/forum/application/repositories/answers.repository';
import { Answer } from '@/domain/forum/enterprise/entities/answer';

export class InMemoryAnswersRepository implements AnswersRepository {
  public items: Answer[] = [];

  constructor(
    private answerAttachmentsRepository: AnswerAttachmentsRepository,
  ) {}

  async findManyByQuestionId(
    questionId: string,
    input: PaginationParams,
  ): Promise<Answer[]> {
    const answers = this.items
      .filter((item) => item.questionId.toString() === questionId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((input.page - 1) * 20, input.page * 20);

    return answers;
  }

  async save(answer: Answer): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === answer.id);
    this.items[itemIndex] = answer;
    DomainEvents.dispatchEventsForAggregate(answer.id);
  }

  async delete(answer: Answer): Promise<void> {
    // encontra o index do item
    const itemIndex = this.items.findIndex((item) => item.id === answer.id);
    // deleta o item
    this.items.splice(itemIndex, 1);

    this.answerAttachmentsRepository.deleteManyByAnswerId(answer.id.toString());
  }

  async findById(id: string): Promise<Answer | null> {
    const answer = this.items.find((item) => item.id.toString() === id);
    if (!answer) {
      return null;
    }
    return answer;
  }

  async create(answer: Answer) {
    this.items.push(answer);
    DomainEvents.dispatchEventsForAggregate(answer.id);
  }
}
