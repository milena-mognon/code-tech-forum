import { CreateQuestionUseCase } from './create-question.usecase';
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions.repository';

let inMemoryQuestionRepository: InMemoryQuestionsRepository;
let sut: CreateQuestionUseCase;

describe('Create Question', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionsRepository();
    sut = new CreateQuestionUseCase(inMemoryQuestionRepository);
  });

  // sut - system under test

  test('should be able to create a question', async () => {
    const { question } = await sut.execute({
      authorId: '1',
      title: 'Primeira pergunta',
      content: 'Descrição da pergunta',
    });

    expect(question.id).toBeTruthy();
    expect(question.content).toEqual('Descrição da pergunta');
  });
});
