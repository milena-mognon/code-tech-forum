import { UniqueEntityId } from '@/core/value-object/unique-entity-id';
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
    const result = await sut.execute({
      authorId: '1',
      title: 'Primeira pergunta',
      content: 'Descrição da pergunta',
      attachmentsIds: ['1', '2'],
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryQuestionRepository.items[0]).toEqual(result.value?.question);
    expect(
      inMemoryQuestionRepository.items[0].attachments.currentItems,
    ).toHaveLength(2);
    expect(
      inMemoryQuestionRepository.items[0].attachments.currentItems,
    ).toEqual([
      expect.objectContaining({ attachmentId: new UniqueEntityId('1') }),
      expect.objectContaining({ attachmentId: new UniqueEntityId('2') }),
    ]);
  });
});
