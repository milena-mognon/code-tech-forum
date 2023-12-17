import { QuestionComment } from '../../enterprise/entities/question-comment';

export interface QuestionsCommentsRepository {
  create(questionComment: QuestionComment): Promise<void>;
}
