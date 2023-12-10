import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions.repository copy';
import { makeNewQuestion } from 'test/factories/make-new-question';
import { DeleteQuestionUseCase } from './delete-question.usecase';
import { UniqueEntityId } from '@/core/value-object/unique-entity-id';

let inMemoryQuestionRepository: InMemoryQuestionsRepository;
let sut: DeleteQuestionUseCase;

describe('Delete Question', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionsRepository();
    sut = new DeleteQuestionUseCase(inMemoryQuestionRepository);
  });

  // sut - system under test

  test('should be able to delete a question', async () => {
    const newQuestion = makeNewQuestion(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('question-1'),
    );

    await inMemoryQuestionRepository.create(newQuestion);

    await sut.execute({
      authorId: 'author-1',
      questionId: 'question-1',
    });

    expect(inMemoryQuestionRepository.items).toHaveLength(0);
  });

  test('should not be able to delete a question from another user', async () => {
    const newQuestion = makeNewQuestion(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('question-1'),
    );

    await inMemoryQuestionRepository.create(newQuestion);

    expect(() => {
      return sut.execute({
        authorId: 'author-2',
        questionId: 'question-1',
      });
    }).rejects.toBeInstanceOf(Error);
  });
});
