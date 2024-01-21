import { UniqueEntityId } from '@/core/value-object/unique-entity-id';
import {
  QuestionAttachment,
  QuestionAttachmentProps,
} from '@/domain/forum/enterprise/entities/question-attachment';

export const makeNewQuestionAttachment = (
  override: Partial<QuestionAttachmentProps> = {},
  id?: UniqueEntityId,
) => {
  const newQuestionAttachment = QuestionAttachment.create(
    {
      questionId: new UniqueEntityId(),
      attachmentId: new UniqueEntityId(),
      ...override,
    },
    id,
  );

  return newQuestionAttachment;
};
