import { UniqueEntityId } from '@/core/value-object/unique-entity-id';
import { QuestionsRepository } from '../repositories/questions.repository';
import { QuestionComment } from '../../enterprise/entities/question-comment';
import { QuestionsCommentsRepository } from '../repositories/question-comments.repository';
import { Either, left, right } from '@/core/either';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';

interface CommentOnQuestionUseCaseInput {
  authorId: string;
  questionId: string;
  content: string;
}

type CommentOnQuestionUseCaseOutput = Either<
  ResourceNotFoundError,
  {
    questionComment: QuestionComment;
  }
>;

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
      return left(new ResourceNotFoundError());
    }

    const questionComment = QuestionComment.create({
      authorId: new UniqueEntityId(authorId),
      questionId: new UniqueEntityId(questionId),
      content,
    });

    await this.questionsCommentsRepository.create(questionComment);

    return right({ questionComment });
  }
}
