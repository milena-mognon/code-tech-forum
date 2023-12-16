import { Answer } from '../../enterprise/entities/answer';

export interface AnswersRepository {
  create(answer: Answer): Promise<void>;
  save(answer: Answer): Promise<void>;
  delete(question: Answer): Promise<void>;
  findById(id: string): Promise<Answer | null>;
}
