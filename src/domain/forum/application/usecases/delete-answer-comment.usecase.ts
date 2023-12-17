import { AnswerComment } from '../../enterprise/entities/answer-comment';
import { AnswersCommentsRepository } from '../repositories/answer-comments.repository';

interface DeleteCommentOnAnswerUseCaseInput {
  authorId: string;
  answerCommentId: string;
}

interface DeleteCommentOnAnswerUseCaseOutput {
  answerComment: AnswerComment;
}

export class DeleteCommentOnAnswerUseCase {
  constructor(private answersCommentsRepository: AnswersCommentsRepository) {}
  public async execute({
    authorId,
    answerCommentId,
  }: DeleteCommentOnAnswerUseCaseInput): Promise<DeleteCommentOnAnswerUseCaseOutput> {
    const answerComment =
      await this.answersCommentsRepository.findById(answerCommentId);

    if (!answerComment) {
      throw new Error('Answer Comment not Found');
    }

    if (answerComment.authorId.toString() !== authorId) {
      throw new Error('Not allowed');
    }

    await this.answersCommentsRepository.delete(answerComment);

    return { answerComment };
  }
}
