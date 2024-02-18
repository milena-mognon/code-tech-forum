import { randomUUID } from 'node:crypto';
import { ValueObject } from './value-object';

export class UniqueEntityId implements ValueObject {
  private _value: string;

  constructor(value?: string) {
    this._value = value ?? randomUUID();
  }

  toString() {
    return this._value;
  }

  toValue() {
    return this._value;
  }

  public equals(id: UniqueEntityId) {
    return id.toValue() === this._value;
  }
}
