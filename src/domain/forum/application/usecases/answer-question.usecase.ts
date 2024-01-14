import { UniqueEntityId } from '@/core/value-object/unique-entity-id';
import { AnswersRepository } from '../repositories/answers.repository';
import { Answer } from '../../enterprise/entities/answer';
import { Either, right } from '@/core/either';

interface AnswerQuestionUseCaseInput {
  instructorId: string;
  questionId: string;
  content: string;
}

type AnswerQuestionUseCaseOutput = Either<null, { answer: Answer }>;

export class AnswerQuestionUseCase {
  constructor(private answersRepository: AnswersRepository) {}
  public async execute({
    content,
    instructorId,
    questionId,
  }: AnswerQuestionUseCaseInput): Promise<AnswerQuestionUseCaseOutput> {
    const answer = Answer.create({
      content,
      authorId: new UniqueEntityId(instructorId),
      questionId: new UniqueEntityId(questionId),
    });

    await this.answersRepository.create(answer);

    return right({ answer });
  }
}
