import { QuestionsRepository } from '../repositories/questions.repository';

interface DeleteQuestionUseCaseInput {
  authorId: string;
  questionId: string;
}

interface DeleteQuestionUseCaseOutput {}

export class DeleteQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}
  public async execute({
    questionId,
    authorId,
  }: DeleteQuestionUseCaseInput): Promise<DeleteQuestionUseCaseOutput> {
    const question = await this.questionsRepository.findById(questionId);

    if (!question) {
      throw new Error('Question not found');
    }

    if (authorId !== question.authorId.toString()) {
      throw new Error('Not Allowed');
    }
    await this.questionsRepository.delete(question);

    return {};
  }
}
