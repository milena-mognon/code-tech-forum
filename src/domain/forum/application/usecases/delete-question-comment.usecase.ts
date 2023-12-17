import { QuestionComment } from '../../enterprise/entities/question-comment';
import { QuestionsCommentsRepository } from '../repositories/question-comments.repository';

interface DeleteCommentOnQuestionUseCaseInput {
  authorId: string;
  questionCommentId: string;
}

interface DeleteCommentOnQuestionUseCaseOutput {
  questionComment: QuestionComment;
}

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
      throw new Error('Question Comment not Found');
    }

    if (questionComment.authorId.toString() !== authorId) {
      throw new Error('Not allowed');
    }

    await this.questionsCommentsRepository.delete(questionComment);

    return { questionComment };
  }
}
