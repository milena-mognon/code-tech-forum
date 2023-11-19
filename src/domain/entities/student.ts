import { Entity } from "../../core/entities/entity";
import { UniqueEntityId } from "../../core/value-object/unique-entity-id";

interface StudentProps {
  name: string;
}
export class Student extends Entity<StudentProps> {
  static create(props: StudentProps, id?: UniqueEntityId) {
    return new Student(props, id);
  }

  get name() {
    return this.props.name;
  }
}
