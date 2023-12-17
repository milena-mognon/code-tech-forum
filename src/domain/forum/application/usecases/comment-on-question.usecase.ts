import { UniqueEntityId } from '@/core/value-object/unique-entity-id';
import { QuestionsRepository } from '../repositories/questions.repository';
import { QuestionComment } from '../../enterprise/entities/question-comment';
import { QuestionsCommentsRepository } from '../repositories/question-comments.repository';

interface CommentOnQuestionUseCaseInput {
  authorId: string;
  questionId: string;
  content: string;
}

interface CommentOnQuestionUseCaseOutput {
  questionComment: QuestionComment;
}

export class CommentOnQuestionUseCase {
  constructor(
    private questionsRepository: QuestionsRepository,
    private questionsCommentsRepository: QuestionsCommentsRepository,
  ) {}
  public async execute({
    authorId,
    questionId,
    content,
  }: CommentOnQuestionUseCaseInput): Promise<CommentOnQuestionUseCaseOutput> {
    const question = this.questionsRepository.findById(questionId);

    if (!question) {
      throw new Error('Question ont Found');
    }

    const questionComment = QuestionComment.create({
      authorId: new UniqueEntityId(authorId),
      questionId: new UniqueEntityId(questionId),
      content,
    });

    await this.questionsCommentsRepository.create(questionComment);

    return { questionComment };
  }
}
