import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions.repository';
import { makeNewQuestion } from 'test/factories/make-new-question';
import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-commets.repository';
import { CommentOnQuestionUseCase } from './comment-on-question.usecase';

let inMemoryQuestionRepository: InMemoryQuestionsRepository;
let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository;
let sut: CommentOnQuestionUseCase;

describe('Comment on Question', () => {
  beforeEach(() => {
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsRepository();
    inMemoryQuestionRepository = new InMemoryQuestionsRepository();
    sut = new CommentOnQuestionUseCase(
      inMemoryQuestionRepository,
      inMemoryQuestionCommentsRepository,
    );
  });

  // sut - system under test

  test('should be able to comment on question', async () => {
    const question = makeNewQuestion();

    await inMemoryQuestionRepository.create(question);

    await sut.execute({
      authorId: question.authorId.toString(),
      questionId: question.id.toString(),
      content: 'Comentário da pergunta',
    });

    expect(inMemoryQuestionCommentsRepository.items[0].content).toEqual(
      'Comentário da pergunta',
    );
  });
});
