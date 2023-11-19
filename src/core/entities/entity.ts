import { UniqueEntityId } from "../value-object/unique-entity-id";

export class Entity<Props> {
  // Props representa um valor genérico (generic), comumente chamado de T
  private _id: UniqueEntityId;
  protected props: Props;

  get id() {
    return this._id;
  }

  constructor(props: Props, id?: string) {
    this.props = props;
    this._id = new UniqueEntityId();
  }
}
