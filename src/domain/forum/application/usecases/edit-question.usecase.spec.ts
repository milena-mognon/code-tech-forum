import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions.repository';
import { makeNewQuestion } from 'test/factories/make-new-question';
import { UniqueEntityId } from '@/core/value-object/unique-entity-id';
import { EditQuestionUseCase } from './edit-question';
import { NotAllowedError } from './errors/not-allowed-error';

let inMemoryQuestionRepository: InMemoryQuestionsRepository;
let sut: EditQuestionUseCase;

describe('Edit Question', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionsRepository();
    sut = new EditQuestionUseCase(inMemoryQuestionRepository);
  });

  // sut - system under test

  test('should be able to edit a question', async () => {
    const newQuestion = makeNewQuestion(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('question-1'),
    );

    await inMemoryQuestionRepository.create(newQuestion);

    await sut.execute({
      authorId: 'author-1',
      questionId: newQuestion.id.toString(),
      title: 'Pergunta Editada',
      content: 'conteúdo da pergunta',
    });

    expect(inMemoryQuestionRepository.items[0]).toMatchObject({
      title: 'Pergunta Editada',
      content: 'conteúdo da pergunta',
    });
  });

  test('should not be able to edit a question from another user', async () => {
    const newQuestion = makeNewQuestion(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('question-1'),
    );

    await inMemoryQuestionRepository.create(newQuestion);

    const result = await sut.execute({
      authorId: 'author-2',
      questionId: 'question-1',
      title: 'Pergunta Editada 1',
      content: 'conteúdo da pergunta 1',
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
