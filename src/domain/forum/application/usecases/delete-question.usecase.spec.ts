import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions.repository';
import { makeNewQuestion } from 'test/factories/make-new-question';
import { DeleteQuestionUseCase } from './delete-question.usecase';
import { UniqueEntityId } from '@/core/value-object/unique-entity-id';
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error';
import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in-memory-question-attachments.repository';
import { makeNewQuestionAttachment } from 'test/factories/make-question-attachments';

let inMemoryQuestionRepository: InMemoryQuestionsRepository;
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository;
let sut: DeleteQuestionUseCase;

describe('Delete Question', () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository();
    inMemoryQuestionRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentsRepository,
    );
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

    inMemoryQuestionAttachmentsRepository.items.push(
      makeNewQuestionAttachment({
        questionId: newQuestion.id,
        attachmentId: new UniqueEntityId('1'),
      }),
      makeNewQuestionAttachment({
        questionId: newQuestion.id,
        attachmentId: new UniqueEntityId('2'),
      }),
    );

    await sut.execute({
      authorId: 'author-1',
      questionId: 'question-1',
    });

    expect(inMemoryQuestionRepository.items).toHaveLength(0);
    expect(inMemoryQuestionAttachmentsRepository.items).toHaveLength(0);
  });

  test('should not be able to delete a question from another user', async () => {
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
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
