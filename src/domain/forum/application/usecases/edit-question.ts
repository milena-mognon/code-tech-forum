import { QuestionsRepository } from '../repositories/questions.repository';

interface EditQuestionUseCaseInput {
  authorId: string;
  questionId: string;
  title: string;
  content: string;
}

interface EditQuestionUseCaseOutput {}

export class EditQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}
  public async execute({
    questionId,
    authorId,
    title,
    content,
  }: EditQuestionUseCaseInput): Promise<EditQuestionUseCaseOutput> {
    const question = await this.questionsRepository.findById(questionId);

    if (!question) {
      throw new Error('Question not found');
    }

    if (authorId !== question.authorId.toString()) {
      throw new Error('Not Allowed');
    }

    question.title = title;
    question.content = content;

    await this.questionsRepository.save(question);

    return {};
  }
}
