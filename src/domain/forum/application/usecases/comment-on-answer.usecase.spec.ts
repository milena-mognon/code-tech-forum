import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers.repository';
import { makeNewAnswer } from 'test/factories/make-new-answer';
import { CommentOnAnswerUseCase } from './comment-on-answer.usecase';
import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-commets.repository';
import { InMemoryAnswerAttachmentsRepository } from 'test/repositories/in-memory-answer-attachments.repository';

let inMemoryAnswerRepository: InMemoryAnswersRepository;
let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository;
let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository;
let sut: CommentOnAnswerUseCase;

describe('Comment on Answer', () => {
  beforeEach(() => {
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository();
    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository();
    inMemoryAnswerRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentsRepository,
    );
    sut = new CommentOnAnswerUseCase(
      inMemoryAnswerRepository,
      inMemoryAnswerCommentsRepository,
    );
  });

  // sut - system under test

  test('should be able to comment on answer', async () => {
    const answer = makeNewAnswer();

    await inMemoryAnswerRepository.create(answer);

    await sut.execute({
      authorId: answer.authorId.toString(),
      answerId: answer.id.toString(),
      content: 'Comentário da resposta',
    });

    expect(inMemoryAnswerCommentsRepository.items[0].content).toEqual(
      'Comentário da resposta',
    );
  });
});
