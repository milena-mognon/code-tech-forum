import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions.repository';
import { makeNewQuestion } from 'test/factories/make-new-question';
import { UniqueEntityId } from '@/core/value-object/unique-entity-id';
import { EditQuestionUseCase } from './edit-question';
import { NotAllowedError } from './errors/not-allowed-error';
import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in-memory-question-attachments.repository';
import { makeNewQuestionAttachment } from 'test/factories/make-question-attachments';

let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository;
let inMemoryQuestionRepository: InMemoryQuestionsRepository;
let sut: EditQuestionUseCase;

describe('Edit Question', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionsRepository();
    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository();
    sut = new EditQuestionUseCase(
      inMemoryQuestionRepository,
      inMemoryQuestionAttachmentsRepository,
    );
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
      questionId: newQuestion.id.toString(),
      title: 'Pergunta Editada',
      content: 'conteúdo da pergunta',
      attachmentsIds: ['1', '3'],
    });

    expect(inMemoryQuestionRepository.items[0]).toMatchObject({
      title: 'Pergunta Editada',
      content: 'conteúdo da pergunta',
    });
    expect(
      inMemoryQuestionRepository.items[0].attachments.currentItems,
    ).toHaveLength(2);
    expect(
      inMemoryQuestionRepository.items[0].attachments.currentItems,
    ).toEqual([
      expect.objectContaining({ attachmentId: new UniqueEntityId('1') }),
      expect.objectContaining({ attachmentId: new UniqueEntityId('3') }),
    ]);
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
      attachmentsIds: [],
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
