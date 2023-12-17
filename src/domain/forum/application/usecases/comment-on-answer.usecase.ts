import { UniqueEntityId } from '@/core/value-object/unique-entity-id';
import { AnswersRepository } from '../repositories/answers.repository';
import { AnswerComment } from '../../enterprise/entities/answer-comment';
import { AnswersCommentsRepository } from '../repositories/answer-comments.repository';

interface CommentOnAnswerUseCaseInput {
  authorId: string;
  answerId: string;
  content: string;
}

interface CommentOnAnswerUseCaseOutput {
  answerComment: AnswerComment;
}

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
      throw new Error('Answer ont Found');
    }

    const answerComment = AnswerComment.create({
      authorId: new UniqueEntityId(authorId),
      answerId: new UniqueEntityId(answerId),
      content,
    });

    await this.answersCommentsRepository.create(answerComment);

    return { answerComment };
  }
}
