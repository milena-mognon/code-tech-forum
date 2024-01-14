import { AnswerQuestionUseCase } from './answer-question.usecase';
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers.repository';

let inMemoryQuestionRepository: InMemoryAnswersRepository;
let sut: AnswerQuestionUseCase;

describe('Create Answer', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryAnswersRepository();
    sut = new AnswerQuestionUseCase(inMemoryQuestionRepository);
  });

  test('should be able to create an answer', async () => {
    const result = await sut.execute({
      instructorId: '1',
      questionId: '1',
      content: 'Nova Resposta',
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryQuestionRepository.items[0]).toEqual(result.value?.answer);
  });
});
