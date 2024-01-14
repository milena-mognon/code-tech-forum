import { FetchQuestionCommentsUseCase } from './fetch-question-comments.usecase';
import { UniqueEntityId } from '@/core/value-object/unique-entity-id';
import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-commets.repository';
import { makeNewQuestionComment } from 'test/factories/make-new-question-comment copy';

let inMemoryCommentsRepository: InMemoryQuestionCommentsRepository;
let sut: FetchQuestionCommentsUseCase;

describe('Fetch Question Comments', () => {
  beforeEach(() => {
    inMemoryCommentsRepository = new InMemoryQuestionCommentsRepository();
    sut = new FetchQuestionCommentsUseCase(inMemoryCommentsRepository);
  });

  // sut - system under test

  test('should be able to fetch question comments', async () => {
    await inMemoryCommentsRepository.create(
      makeNewQuestionComment({ questionId: new UniqueEntityId('question-1') }),
    );
    await inMemoryCommentsRepository.create(
      makeNewQuestionComment({ questionId: new UniqueEntityId('question-1') }),
    );
    await inMemoryCommentsRepository.create(
      makeNewQuestionComment({ questionId: new UniqueEntityId('question-1') }),
    );

    const result = await sut.execute({
      questionId: 'question-1',
      page: 1,
    });

    expect(result.value?.questionComments).toHaveLength(3);
    expect(result.value?.questionComments).toEqual([
      expect.objectContaining({ questionId: new UniqueEntityId('question-1') }),
      expect.objectContaining({ questionId: new UniqueEntityId('question-1') }),
      expect.objectContaining({ questionId: new UniqueEntityId('question-1') }),
    ]);
  });

  test('should be able to fetch paginated recent comments', async () => {
    for (let index = 1; index <= 22; index++) {
      await inMemoryCommentsRepository.create(
        makeNewQuestionComment({
          questionId: new UniqueEntityId('question-1'),
        }),
      );
    }

    const result = await sut.execute({
      questionId: 'question-1',
      page: 2,
    });

    expect(result.value?.questionComments).toHaveLength(2);
  });
});
