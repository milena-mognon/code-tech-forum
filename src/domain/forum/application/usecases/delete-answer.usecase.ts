import { AnswersRepository } from '../repositories/answers.repository';

interface DeleteAnswerUseCaseInput {
  authorId: string;
  answerId: string;
}

interface DeleteAnswerUseCaseOutput {}

export class DeleteAnswerUseCase {
  constructor(private answersRepository: AnswersRepository) {}
  public async execute({
    answerId,
    authorId,
  }: DeleteAnswerUseCaseInput): Promise<DeleteAnswerUseCaseOutput> {
    const answer = await this.answersRepository.findById(answerId);

    if (!answer) {
      throw new Error('Answer not found');
    }

    if (authorId !== answer.authorId.toString()) {
      throw new Error('Not Allowed');
    }
    await this.answersRepository.delete(answer);

    return {};
  }
}
