import { UniqueEntityId } from '@/core/value-object/unique-entity-id';
import { AnswersRepository } from '../repositories/answers.repository';
import { AnswerComment } from '../../enterprise/entities/answer-comment';
import { AnswersCommentsRepository } from '../repositories/answer-comments.repository';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';
import { Either, left, right } from '@/core/either';

interface CommentOnAnswerUseCaseInput {
  authorId: string;
  answerId: string;
  content: string;
}

type CommentOnAnswerUseCaseOutput = Either<
  ResourceNotFoundError,
  {
    answerComment: AnswerComment;
  }
>;

export class CommentOnAnswerUseCase {
  constructor(
    private answersRepository: AnswersRepository,
    private answersCommentsRepository: AnswersCommentsRepository,
  ) {}
  public async execute({
    authorId,
    answerId,
    content,
  }: CommentOnAnswerUseCaseInput): Promise<CommentOnAnswerUseCaseOutput> {
    const answer = this.answersRepository.findById(answerId);

    if (!answer) {
      return left(new ResourceNotFoundError());
    }

    const answerComment = AnswerComment.create({
      authorId: new UniqueEntityId(authorId),
      answerId: new UniqueEntityId(answerId),
      content,
    });

    await this.answersCommentsRepository.create(answerComment);

    return right({ answerComment });
  }
}
