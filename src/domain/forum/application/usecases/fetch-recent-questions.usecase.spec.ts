import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions.repository';
import { makeNewQuestion } from 'test/factories/make-new-question';
import { FetchRecentQuestionsUseCase } from './fetch-recent-questions.usecase';

let inMemoryQuestionRepository: InMemoryQuestionsRepository;
let sut: FetchRecentQuestionsUseCase;

describe('Fetch Recent Questions', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionsRepository();
    sut = new FetchRecentQuestionsUseCase(inMemoryQuestionRepository);
  });

  // sut - system under test

  test('should be able to fetch recent questions', async () => {
    await inMemoryQuestionRepository.create(
      makeNewQuestion({ createdAt: new Date(2022, 0, 20) }),
    );
    await inMemoryQuestionRepository.create(
      makeNewQuestion({ createdAt: new Date(2022, 0, 18) }),
    );
    await inMemoryQuestionRepository.create(
      makeNewQuestion({ createdAt: new Date(2022, 0, 23) }),
    );

    const result = await sut.execute({
      page: 1,
    });

    expect(result.value?.questions).toEqual([
      expect.objectContaining({ createdAt: new Date(2022, 0, 23) }),
      expect.objectContaining({ createdAt: new Date(2022, 0, 20) }),
      expect.objectContaining({ createdAt: new Date(2022, 0, 18) }),
    ]);
  });

  test('should be able to fetch paginated recent questions', async () => {
    for (let index = 1; index <= 22; index++) {
      await inMemoryQuestionRepository.create(makeNewQuestion());
    }

    const result = await sut.execute({
      page: 2,
    });

    expect(result.value?.questions).toHaveLength(2);
  });
});
