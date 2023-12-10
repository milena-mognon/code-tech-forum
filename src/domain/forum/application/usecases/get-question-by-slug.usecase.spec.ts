import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions.repository copy';
import { GetQuestionBySlugUseCase } from './get-question-by-slug.usecase';
import { makeNewQuestion } from 'test/factories/make-new-question';
import { Slug } from '../../enterprise/entities/value-objects/slug';

let inMemoryQuestionRepository: InMemoryQuestionsRepository;
let sut: GetQuestionBySlugUseCase;

describe('Get Question by Slug', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionsRepository();
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionRepository);
  });

  // sut - system under test

  test('should be able to find a question by slug', async () => {
    const newQuestion = makeNewQuestion({
      slug: Slug.create('example-question'),
    });

    await inMemoryQuestionRepository.create(newQuestion);

    const { question } = await sut.execute({
      slug: 'example-question',
    });

    expect(question.id).toBeTruthy();
    expect(question.title).toBe(newQuestion.title);
  });
});
