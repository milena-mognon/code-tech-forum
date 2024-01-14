import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-commets.repository';
import { DeleteCommentOnQuestionUseCase } from './delete-question-comment.usecase';
import { makeNewQuestionComment } from 'test/factories/make-new-question-comment copy';
import { UniqueEntityId } from '@/core/value-object/unique-entity-id';
import { NotAllowedError } from './errors/not-allowed-error';

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository;
let sut: DeleteCommentOnQuestionUseCase;

describe('Delete Comment on Question', () => {
  beforeEach(() => {
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsRepository();
    sut = new DeleteCommentOnQuestionUseCase(
      inMemoryQuestionCommentsRepository,
    );
  });

  // sut - system under test

  test('should be able to delete a question comment', async () => {
    const questionComment = makeNewQuestionComment();

    await inMemoryQuestionCommentsRepository.create(questionComment);

    await sut.execute({
      authorId: questionComment.authorId.toString(),
      questionCommentId: questionComment.id.toString(),
    });

    expect(inMemoryQuestionCommentsRepository.items).toHaveLength(0);
  });

  test('should not be able to delete another user question comment', async () => {
    const questionComment = makeNewQuestionComment({
      authorId: new UniqueEntityId('author-1'),
    });

    await inMemoryQuestionCommentsRepository.create(questionComment);

    const result = await sut.execute({
      authorId: 'author-2',
      questionCommentId: questionComment.id.toString(),
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
