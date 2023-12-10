import { UniqueEntityId } from '@/core/value-object/unique-entity-id';
import {
  Question,
  QuestionProps,
} from '@/domain/forum/enterprise/entities/question';
import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug';

export const makeNewQuestion = (override: Partial<QuestionProps> = {}) => {
  const newQuestion = Question.create({
    authorId: new UniqueEntityId('1'),
    title: 'Example question',
    slug: Slug.create('example-question'),
    content: 'Example Content',
    ...override,
  });

  return newQuestion;
};
