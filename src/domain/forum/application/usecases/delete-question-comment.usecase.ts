import { Either, left, right } from '@/core/either';
import { QuestionComment } from '../../enterprise/entities/question-comment';
import { QuestionsCommentsRepository } from '../repositories/question-comments.repository';
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';

interface DeleteCommentOnQuestionUseCaseInput {
  authorId: string;
  questionCommentId: string;
}

type DeleteCommentOnQuestionUseCaseOutput = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    questionComment: QuestionComment;
  }
>;

export class DeleteCommentOnQuestionUseCase {
  constructor(
    private questionsCommentsRepository: QuestionsCommentsRepository,
  ) {}
  public async execute({
    authorId,
    questionCommentId,
  }: DeleteCommentOnQuestionUseCaseInput): Promise<DeleteCommentOnQuestionUseCaseOutput> {
    const questionComment =
      await this.questionsCommentsRepository.findById(questionCommentId);

    if (!questionComment) {
      return left(new ResourceNotFoundError());
    }

    if (questionComment.authorId.toString() !== authorId) {
      return left(new NotAllowedError());
    }

    await this.questionsCommentsRepository.delete(questionComment);

    return right({ questionComment });
  }
}
