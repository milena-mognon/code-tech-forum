import { QuestionComment } from '../../enterprise/entities/question-comment';
import { QuestionsCommentsRepository } from '../repositories/question-comments.repository';

interface FetchQuestionCommentsUseCaseInput {
  questionId: string;
  page: number;
}

interface FetchQuestionCommentsUseCaseOutput {
  questionComments: QuestionComment[];
}

export class FetchQuestionCommentsUseCase {
  constructor(
    private questionCommentsRepository: QuestionsCommentsRepository,
  ) {}
  public async execute({
    questionId,
    page,
  }: FetchQuestionCommentsUseCaseInput): Promise<FetchQuestionCommentsUseCaseOutput> {
    const questionComments =
      await this.questionCommentsRepository.findManyByQuestionId(questionId, {
        page,
      });

    return {
      questionComments,
    };
  }
}
