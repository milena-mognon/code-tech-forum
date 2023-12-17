import { AnswersCommentsRepository } from '@/domain/forum/application/repositories/answer-comments.repository';
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment';

export class InMemoryAnswerCommentsRepository
  implements AnswersCommentsRepository
{
  public items: AnswerComment[] = [];

  async create(answerComment: AnswerComment) {
    this.items.push(answerComment);
  }

  async delete(answerComment: AnswerComment): Promise<void> {
    // encontra o index do item
    const itemIndex = this.items.findIndex(
      (item) => item.id === answerComment.id,
    );
    // deleta o item
    this.items.splice(itemIndex, 1);
  }

  async findById(id: string): Promise<AnswerComment | null> {
    const answerComment = this.items.find((item) => item.id.toString() === id);
    if (!answerComment) {
      return null;
    }
    return answerComment;
  }
}
