import { Slug } from "./value-objects/slug";
import { Entity } from "../../core/entities/entity";
import { UniqueEntityId } from "../../core/value-object/unique-entity-id";
import { Optional } from "../../core/types/optional";

interface QuestionProps {
  authorId: UniqueEntityId;
  bestAnswerId?: UniqueEntityId;
  title: string;
  content: string;
  slug: Slug;
  createdAt: Date;
  updatedAt?: Date;
}

export class Question extends Entity<QuestionProps> {
  static create(
    props: Optional<QuestionProps, "createdAt">,
    id?: UniqueEntityId
  ) {
    return new Question(
      {
        ...props,
        createdAt: new Date(),
      },
      id
    );
  }
}
