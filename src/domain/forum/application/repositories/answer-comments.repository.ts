import { AnswerComment } from '../../enterprise/entities/answer-comment';

export interface AnswersCommentsRepository {
  create(answerComment: AnswerComment): Promise<void>;
}
