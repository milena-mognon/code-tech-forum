import { AnswersRepository } from '../repositories/answers.repository';

interface EditAnswerUseCaseInput {
  authorId: string;
  answerId: string;
  content: string;
}

interface EditAnswerUseCaseOutput {}

export class EditAnswerUseCase {
  constructor(private answersRepository: AnswersRepository) {}
  public async execute({
    answerId,
    authorId,
    content,
  }: EditAnswerUseCaseInput): Promise<EditAnswerUseCaseOutput> {
    const answer = await this.answersRepository.findById(answerId);

    if (!answer) {
      throw new Error('Answer not found');
    }

    if (authorId !== answer.authorId.toString()) {
      throw new Error('Not Allowed');
    }

    answer.content = content;

    await this.answersRepository.save(answer);

    return {};
  }
}
