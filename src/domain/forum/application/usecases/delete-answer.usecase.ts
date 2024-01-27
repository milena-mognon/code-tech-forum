import { Either, left, right } from '@/core/either';
import { AnswersRepository } from '../repositories/answers.repository';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error';

interface DeleteAnswerUseCaseInput {
  authorId: string;
  answerId: string;
}

type DeleteAnswerUseCaseOutput = Either<
  ResourceNotFoundError | NotAllowedError,
  object
>;

export class DeleteAnswerUseCase {
  constructor(private answersRepository: AnswersRepository) {}
  public async execute({
    answerId,
    authorId,
  }: DeleteAnswerUseCaseInput): Promise<DeleteAnswerUseCaseOutput> {
    const answer = await this.answersRepository.findById(answerId);

    if (!answer) {
      return left(new ResourceNotFoundError());
    }

    if (authorId !== answer.authorId.toString()) {
      return left(new NotAllowedError());
    }
    await this.answersRepository.delete(answer);

    return right({});
  }
}
