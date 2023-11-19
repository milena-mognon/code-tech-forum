import { UniqueEntityId } from '@/core/value-object/unique-entity-id';
import { Answer } from '../entities/answer';
import { AnswersRepository } from '../repositories/answers.repository';

interface AnswerQuestionUseCaseInput {
  instructorId: string;
  questionId: string;
  content: string;
}

export class AnswerQuestionUseCase {
  constructor(private answersRepository: AnswersRepository) {}
  public async execute({
    content,
    instructorId,
    questionId,
  }: AnswerQuestionUseCaseInput) {
    const answer = Answer.create({
      content,
      authorId: new UniqueEntityId(instructorId),
      questionId: new UniqueEntityId(questionId),
    });

    await this.answersRepository.create(answer);

    return answer;
  }
}
