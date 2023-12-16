import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers.repository';
import { UniqueEntityId } from '@/core/value-object/unique-entity-id';
import { makeNewAnswer } from 'test/factories/make-new-answer';
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions.repository';
import { ChooseQuestionBestAnswerUseCase } from './choose-question-best-answer.usecase';
import { makeNewQuestion } from 'test/factories/make-new-question';

let inMemoryQuestionRepository: InMemoryQuestionsRepository;
let inMemoryAnswerRepository: InMemoryAnswersRepository;
let sut: ChooseQuestionBestAnswerUseCase;

describe('Choose Question Best Answer', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswersRepository();
    inMemoryQuestionRepository = new InMemoryQuestionsRepository();
    sut = new ChooseQuestionBestAnswerUseCase(
      inMemoryAnswerRepository,
      inMemoryQuestionRepository,
    );
  });

  // sut - system under test

  test('should be able to choose the question best answer', async () => {
    const question = makeNewQuestion();
    const answer = makeNewAnswer({
      questionId: question.id,
    });

    await inMemoryQuestionRepository.create(question);
    await inMemoryAnswerRepository.create(answer);

    await sut.execute({
      authorId: question.authorId.toString(),
      answerId: answer.id.toString(),
    });

    expect(inMemoryQuestionRepository.items[0].bestAnswerId).toEqual(answer.id);
  });

  test('should not be able to choose another user question best answer', async () => {
    const question = makeNewQuestion({
      authorId: new UniqueEntityId('author-1'),
    });
    const answer = makeNewAnswer({
      questionId: question.id,
    });

    await inMemoryQuestionRepository.create(question);
    await inMemoryAnswerRepository.create(answer);

    expect(() => {
      return sut.execute({
        authorId: 'author-2',
        answerId: answer.id.toString(),
      });
    }).rejects.toBeInstanceOf(Error);
  });
});
