import { DomainEvent } from '../events/domain-event';
import { DomainEvents } from '../events/domain-events';
import { Entity } from './entity';

export abstract class AggregateRoot<Props> extends Entity<Props> {
  // todo agregado tem uma forma de anotar dentro dele todos os eventos que ele disparou
  private _domainEvents: DomainEvent[] = [];

  get domainEvents(): DomainEvent[] {
    return this._domainEvents;
  }

  protected addDomainEvents(domainEvents: DomainEvent): void {
    this._domainEvents.push(domainEvents);
    DomainEvents.markAggregateForDispatch(this);
  }

  public clearEvents() {
    this._domainEvents = [];
  }
}
