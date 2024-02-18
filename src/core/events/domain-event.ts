import { UniqueEntityId } from '../value-object/unique-entity-id';

export interface DomainEvent {
  ocurredAt: Date;
  getAggregateId(): UniqueEntityId;
}
