import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers.repository';
import { FetchQuestionAnswersUseCase } from './fetch-question-answers.usecase';
import { makeNewAnswer } from 'test/factories/make-new-answer';
import { UniqueEntityId } from '@/core/value-object/unique-entity-id';
import { InMemoryAnswerAttachmentsRepository } from 'test/repositories/in-memory-answer-attachments.repository';

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository;
let sut: FetchQuestionAnswersUseCase;

describe('Fetch Question Answers', () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository();
    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentsRepository,
    );
    sut = new FetchQuestionAnswersUseCase(inMemoryAnswersRepository);
  });

  // sut - system under test

  test('should be able to fetch question answers', async () => {
    await inMemoryAnswersRepository.create(
      makeNewAnswer({ questionId: new UniqueEntityId('question-1') }),
    );
    await inMemoryAnswersRepository.create(
      makeNewAnswer({ questionId: new UniqueEntityId('question-1') }),
    );
    await inMemoryAnswersRepository.create(
      makeNewAnswer({ questionId: new UniqueEntityId('question-1') }),
    );

    const result = await sut.execute({
      questionId: 'question-1',
      page: 1,
    });

    expect(result.value?.answers).toHaveLength(3);
    expect(result.value?.answers).toEqual([
      expect.objectContaining({ questionId: new UniqueEntityId('question-1') }),
      expect.objectContaining({ questionId: new UniqueEntityId('question-1') }),
      expect.objectContaining({ questionId: new UniqueEntityId('question-1') }),
    ]);
  });

  test('should be able to fetch paginated recent answers', async () => {
    for (let index = 1; index <= 22; index++) {
      await inMemoryAnswersRepository.create(
        makeNewAnswer({ questionId: new UniqueEntityId('question-1') }),
      );
    }

    const result = await sut.execute({
      questionId: 'question-1',
      page: 2,
    });

    expect(result.value?.answers).toHaveLength(2);
  });
});
