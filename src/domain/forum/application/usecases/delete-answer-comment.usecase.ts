import { Either, left, right } from '@/core/either';
import { AnswersCommentsRepository } from '../repositories/answer-comments.repository';
import { ResourceNotFoundError } from './errors/resource-not-found-error';
import { NotAllowedError } from './errors/not-allowed-error';

interface DeleteCommentOnAnswerUseCaseInput {
  authorId: string;
  answerCommentId: string;
}

type DeleteCommentOnAnswerUseCaseOutput = Either<
  ResourceNotFoundError | NotAllowedError,
  object
>;

export class DeleteCommentOnAnswerUseCase {
  constructor(private answersCommentsRepository: AnswersCommentsRepository) {}
  public async execute({
    authorId,
    answerCommentId,
  }: DeleteCommentOnAnswerUseCaseInput): Promise<DeleteCommentOnAnswerUseCaseOutput> {
    const answerComment =
      await this.answersCommentsRepository.findById(answerCommentId);

    if (!answerComment) {
      return left(new ResourceNotFoundError());
    }

    if (answerComment.authorId.toString() !== authorId) {
      return left(new NotAllowedError());
    }

    await this.answersCommentsRepository.delete(answerComment);

    return right({});
  }
}
