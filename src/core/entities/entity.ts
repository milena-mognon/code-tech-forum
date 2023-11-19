import { UniqueEntityId } from '../value-object/unique-entity-id';

export class Entity<Props> {
  // Props representa um valor genérico (generic), comumente chamado de T
  private _id: UniqueEntityId;
  protected props: Props;

  get id() {
    return this._id;
  }

  /**
   * Construtor da Entidade. Ele é protegido (protected), então só pode ser chamado
   * pela classe Entity e as classes que herdam Entity. Isso significa que não é possível
   * instanciar (new Entity()) em outros arquivos.
   *
   * @param props {Props}
   * @param id {UniqueEntityId}
   */
  protected constructor(props: Props, id?: UniqueEntityId) {
    this.props = props;
    this._id = id ?? new UniqueEntityId();
  }
}
