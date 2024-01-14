import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers.repository';
import { makeNewAnswer } from 'test/factories/make-new-answer';
import { UniqueEntityId } from '@/core/value-object/unique-entity-id';
import { EditAnswerUseCase } from './edit-answer';
import { NotAllowedError } from './errors/not-allowed-error';

let inMemoryAnswerRepository: InMemoryAnswersRepository;
let sut: EditAnswerUseCase;

describe('Edit Answer', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswersRepository();
    sut = new EditAnswerUseCase(inMemoryAnswerRepository);
  });

  // sut - system under test

  test('should be able to edit a answer', async () => {
    const newAnswer = makeNewAnswer(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('answer-1'),
    );

    await inMemoryAnswerRepository.create(newAnswer);

    await sut.execute({
      authorId: 'author-1',
      answerId: newAnswer.id.toString(),
      content: 'conteúdo da resposta',
    });

    expect(inMemoryAnswerRepository.items[0]).toMatchObject({
      content: 'conteúdo da resposta',
    });
  });

  test('should not be able to edit a answer from another user', async () => {
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
      content: 'conteúdo da resposta',
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
