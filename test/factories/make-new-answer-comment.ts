import { UniqueEntityId } from '@/core/value-object/unique-entity-id';
import {
  AnswerComment,
  AnswerCommentProps,
} from '@/domain/forum/enterprise/entities/answer-comment';
import { faker } from '@faker-js/faker';

export const makeNewAnswerComment = (
  override: Partial<AnswerCommentProps> = {},
  id?: UniqueEntityId,
) => {
  const newAnswerComment = AnswerComment.create(
    {
      authorId: new UniqueEntityId(),
      answerId: new UniqueEntityId(),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  );

  return newAnswerComment;
};
