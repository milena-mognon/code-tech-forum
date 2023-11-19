import { Entity } from "../../core/entities/entity";
import { Optional } from "../../core/types/optional";
import { UniqueEntityId } from "../../core/value-object/unique-entity-id";

interface AnswerProps {
  authorId: UniqueEntityId;
  questionId: UniqueEntityId;
  content: string;
  createdAt: Date;
  updatedAt?: Date;
}

export class Answer extends Entity<AnswerProps> {
  static create(
    props: Optional<AnswerProps, "createdAt">,
    id?: UniqueEntityId
  ) {
    return new Answer(
      {
        ...props,
        createdAt: new Date(),
      },
      id
    );
  }

  get content() {
    return this.props.content;
  }
}
