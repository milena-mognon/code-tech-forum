import { PaginationParams } from '@/core/repositories/pagination-params';
import { QuestionsRepository } from '@/domain/forum/application/repositories/questions.repository';
import { Question } from '@/domain/forum/enterprise/entities/question';

export class InMemoryQuestionsRepository implements QuestionsRepository {
  public items: Question[] = [];

  async save(question: Question): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === question.id);
    this.items[itemIndex] = question;
  }

  async findById(id: string): Promise<Question | null> {
    const question = this.items.find((item) => item.id.toString() === id);
    if (!question) {
      return null;
    }
    return question;
  }

  async create(question: Question) {
    this.items.push(question);
  }

  async findBySlug(slug: string) {
    const question = this.items.find((item) => item.slug.value === slug);
    if (!question) {
      return null;
    }
    return question;
  }

  async delete(question: Question): Promise<void> {
    // encontra o index do item
    const itemIndex = this.items.findIndex((item) => item.id === question.id);
    // deleta o item
    this.items.splice(itemIndex, 1);
  }

  async findManyRecent(input: PaginationParams): Promise<Question[]> {
    const questions = this.items
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((input.page - 1) * 20, input.page * 20);

    return questions;
  }
}
