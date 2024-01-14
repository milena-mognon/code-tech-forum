import { Either, left, right } from '@/core/either';
import { AnswersCommentsRepository } from '../repositories/answer-comments.repository';

interface DeleteCommentOnAnswerUseCaseInput {
  authorId: string;
  answerCommentId: string;
}

type DeleteCommentOnAnswerUseCaseOutput = Either<string, object>;

export class DeleteCommentOnAnswerUseCase {
  constructor(private answersCommentsRepository: AnswersCommentsRepository) {}
  public async execute({
    authorId,
    answerCommentId,
  }: DeleteCommentOnAnswerUseCaseInput): Promise<DeleteCommentOnAnswerUseCaseOutput> {
    const answerComment =
      await this.answersCommentsRepository.findById(answerCommentId);

    if (!answerComment) {
      return left('Answer Comment not Found');
    }

    if (answerComment.authorId.toString() !== authorId) {
      return left('Not allowed');
    }

    await this.answersCommentsRepository.delete(answerComment);

    return right({});
  }
}
