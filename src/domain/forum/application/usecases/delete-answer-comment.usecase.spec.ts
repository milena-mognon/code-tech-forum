import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-commets.repository';
import { UniqueEntityId } from '@/core/value-object/unique-entity-id';
import { DeleteCommentOnAnswerUseCase } from './delete-answer-comment.usecase';
import { makeNewAnswerComment } from 'test/factories/make-new-answer-comment';
import { NotAllowedError } from './errors/not-allowed-error';

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository;
let sut: DeleteCommentOnAnswerUseCase;

describe('Delete Comment on Answer', () => {
  beforeEach(() => {
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository();
    sut = new DeleteCommentOnAnswerUseCase(inMemoryAnswerCommentsRepository);
  });

  // sut - system under test

  test('should be able to delete a answer comment', async () => {
    const answerComment = makeNewAnswerComment();

    await inMemoryAnswerCommentsRepository.create(answerComment);

    await sut.execute({
      authorId: answerComment.authorId.toString(),
      answerCommentId: answerComment.id.toString(),
    });

    expect(inMemoryAnswerCommentsRepository.items).toHaveLength(0);
  });

  test('should not be able to delete another user answer comment', async () => {
    const answerComment = makeNewAnswerComment({
      authorId: new UniqueEntityId('author-1'),
    });

    await inMemoryAnswerCommentsRepository.create(answerComment);

    const result = await sut.execute({
      authorId: 'author-2',
      answerCommentId: answerComment.id.toString(),
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
