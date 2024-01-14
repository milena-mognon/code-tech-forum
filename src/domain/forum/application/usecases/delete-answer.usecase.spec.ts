import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers.repository';
import { DeleteAnswerUseCase } from './delete-answer.usecase';
import { UniqueEntityId } from '@/core/value-object/unique-entity-id';
import { makeNewAnswer } from 'test/factories/make-new-answer';
import { NotAllowedError } from './errors/not-allowed-error';

let inMemoryAnswerRepository: InMemoryAnswersRepository;
let sut: DeleteAnswerUseCase;

describe('Delete Answer', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswersRepository();
    sut = new DeleteAnswerUseCase(inMemoryAnswerRepository);
  });

  // sut - system under test

  test('should be able to delete a answer', async () => {
    const newAnswer = makeNewAnswer(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('answer-1'),
    );

    await inMemoryAnswerRepository.create(newAnswer);

    await sut.execute({
      authorId: 'author-1',
      answerId: 'answer-1',
    });

    expect(inMemoryAnswerRepository.items).toHaveLength(0);
  });

  test('should not be able to delete a answer from another user', async () => {
    const newAnswer = makeNewAnswer(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('answer-1'),
    );

    await inMemoryAnswerRepository.create(newAnswer);

    const result = await sut.execute({
      authorId: 'author-2',
      answerId: 'answer-1',
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
