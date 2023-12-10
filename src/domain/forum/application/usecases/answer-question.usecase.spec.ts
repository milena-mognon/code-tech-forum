import { AnswerQuestionUseCase } from './answer-question.usecase';
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers.repository';

let inMemoryQuestionRepository: InMemoryAnswersRepository;
let sut: AnswerQuestionUseCase;

describe('Create Question', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryAnswersRepository();
    sut = new AnswerQuestionUseCase(inMemoryQuestionRepository);
  });

  test('create an answer', async () => {
    const { answer } = await sut.execute({
      instructorId: '1',
      questionId: '1',
      content: 'Nova Resposta',
    });

    expect(answer.id).toBeTruthy();
    expect(answer.content).toEqual('Nova Resposta');
  });
});
