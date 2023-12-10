import { UniqueEntityId } from '@/core/value-object/unique-entity-id';
import { Answer, AnswerProps } from '@/domain/forum/enterprise/entities/answer';
import { faker } from '@faker-js/faker';

export const makeNewAnswer = (
  override: Partial<AnswerProps> = {},
  id?: UniqueEntityId,
) => {
  const newAnswer = Answer.create(
    {
      authorId: new UniqueEntityId(),
      questionId: new UniqueEntityId(),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  );

  return newAnswer;
};
