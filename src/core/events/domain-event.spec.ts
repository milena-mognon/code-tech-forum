import { AggregateRoot } from '../entities/aggregate-root';
import { UniqueEntityId } from '../value-object/unique-entity-id';
import { DomainEvent } from './domain-event';
import { DomainEvents } from './domain-events';
import { vi } from 'vitest';

class CustomAggregateCreated implements DomainEvent {
  public ocurredAt: Date;
  private aggregate: CustomAggregate;

  constructor(aggregate: CustomAggregate) {
    this.ocurredAt = new Date();
    this.aggregate = aggregate;
  }

  public getAggregateId(): UniqueEntityId {
    return this.aggregate.id;
  }
}

class CustomAggregate extends AggregateRoot<any> {
  static create() {
    const aggregate = new CustomAggregate(null);
    aggregate.addDomainEvents(new CustomAggregateCreated(aggregate));
    return aggregate;
  }
}

describe('domain events', () => {
  it('should be able to dispatch and listen to events', () => {
    // função varia que será usada para verificar se a função de disparo foi chamada
    const callbackSpy = vi.fn();

    // subscriber cadastrado - ouvindo o evento de "resposta criada"
    DomainEvents.register(callbackSpy, CustomAggregateCreated.name);

    // criando uma resposta sem salvar no banco
    const aggregate = CustomAggregate.create();

    // garanto que foi criado o evento, mas não foi disparado
    expect(aggregate.domainEvents).toHaveLength(1);

    // salva no banco e dispara o evento
    DomainEvents.dispatchEventsForAggregate(aggregate.id);

    // o subscriber ouve o evento e faz o que precisa ser feito com o dado
    expect(callbackSpy).toHaveBeenCalled();

    expect(aggregate.domainEvents).toHaveLength(0);
  });
});
