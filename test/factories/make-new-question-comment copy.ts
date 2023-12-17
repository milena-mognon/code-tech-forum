import { UniqueEntityId } from '@/core/value-object/unique-entity-id';
import {
  QuestionComment,
  QuestionCommentProps,
} from '@/domain/forum/enterprise/entities/question-comment';
import { faker } from '@faker-js/faker';

export const makeNewQuestionComment = (
  override: Partial<QuestionCommentProps> = {},
  id?: UniqueEntityId,
) => {
  const newQuestionComment = QuestionComment.create(
    {
      authorId: new UniqueEntityId(),
      questionId: new UniqueEntityId(),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  );

  return newQuestionComment;
};
