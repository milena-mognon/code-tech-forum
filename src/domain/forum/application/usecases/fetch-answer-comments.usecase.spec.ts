import { FetchAnswerCommentsUseCase } from './fetch-answer-comments.usecase';
import { UniqueEntityId } from '@/core/value-object/unique-entity-id';
import { makeNewAnswerComment } from 'test/factories/make-new-answer-comment';
import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-commets.repository';

let inMemoryCommentsRepository: InMemoryAnswerCommentsRepository;
let sut: FetchAnswerCommentsUseCase;

describe('Fetch Answer Comments', () => {
  beforeEach(() => {
    inMemoryCommentsRepository = new InMemoryAnswerCommentsRepository();
    sut = new FetchAnswerCommentsUseCase(inMemoryCommentsRepository);
  });

  // sut - system under test

  test('should be able to fetch answer comments', async () => {
    await inMemoryCommentsRepository.create(
      makeNewAnswerComment({ answerId: new UniqueEntityId('answer-1') }),
    );
    await inMemoryCommentsRepository.create(
      makeNewAnswerComment({ answerId: new UniqueEntityId('answer-1') }),
    );
    await inMemoryCommentsRepository.create(
      makeNewAnswerComment({ answerId: new UniqueEntityId('answer-1') }),
    );

    const { answerComments } = await sut.execute({
      answerId: 'answer-1',
      page: 1,
    });

    expect(answerComments).toHaveLength(3);
    expect(answerComments).toEqual([
      expect.objectContaining({ answerId: new UniqueEntityId('answer-1') }),
      expect.objectContaining({ answerId: new UniqueEntityId('answer-1') }),
      expect.objectContaining({ answerId: new UniqueEntityId('answer-1') }),
    ]);
  });

  test('should be able to fetch paginated recent comments', async () => {
    for (let index = 1; index <= 22; index++) {
      await inMemoryCommentsRepository.create(
        makeNewAnswerComment({
          answerId: new UniqueEntityId('answer-1'),
        }),
      );
    }

    const { answerComments } = await sut.execute({
      answerId: 'answer-1',
      page: 2,
    });

    expect(answerComments).toHaveLength(2);
  });
});
