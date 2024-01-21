import { UniqueEntityId } from '@/core/value-object/unique-entity-id';
import {
  AnswerAttachment,
  AnswerAttachmentProps,
} from '@/domain/forum/enterprise/entities/answer-attachment';

export const makeNewAnswerAttachment = (
  override: Partial<AnswerAttachmentProps> = {},
  id?: UniqueEntityId,
) => {
  const newAnswerAttachment = AnswerAttachment.create(
    {
      answerId: new UniqueEntityId(),
      attachmentId: new UniqueEntityId(),
      ...override,
    },
    id,
  );

  return newAnswerAttachment;
};
