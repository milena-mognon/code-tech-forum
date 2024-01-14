import { Either, right } from '@/core/either';
import { AnswerComment } from '../../enterprise/entities/answer-comment';
import { AnswersCommentsRepository } from '../repositories/answer-comments.repository';

interface FetchAnswerCommentsUseCaseInput {
  answerId: string;
  page: number;
}

type FetchAnswerCommentsUseCaseOutput = Either<
  null,
  {
    answerComments: AnswerComment[];
  }
>;

export class FetchAnswerCommentsUseCase {
  constructor(private answerCommentsRepository: AnswersCommentsRepository) {}
  public async execute({
    answerId,
    page,
  }: FetchAnswerCommentsUseCaseInput): Promise<FetchAnswerCommentsUseCaseOutput> {
    const answerComments =
      await this.answerCommentsRepository.findManyByAnswerId(answerId, {
        page,
      });

    return right({
      answerComments,
    });
  }
}
