import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  RecoverEvent,
  RemoveEvent,
  SoftRemoveEvent,
  TransactionCommitEvent,
  TransactionRollbackEvent,
  TransactionStartEvent,
  UpdateEvent,
} from 'typeorm/index';
import { PartFile } from './part-file.entity';

@EventSubscriber()
export class PartFileSubscriber implements EntitySubscriberInterface<PartFile> {
  constructor(connection: Connection) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return PartFile;
  }

  beforeInsert(event: InsertEvent<PartFile>): Promise<any> | void {
    // event.entity.updatedAt = new Date();
    console.log('PartFile beforeInsert : ', event.entity);
  }

  afterInsert(event: InsertEvent<PartFile>): Promise<any> | void {
    console.log('PartFile afterInsert : ', event.entity);
  }

  beforeUpdate(event: UpdateEvent<PartFile>): Promise<any> | void {
    console.log('PartFile beforeUpdate : ', event.entity);
  }

  afterUpdate(event: UpdateEvent<PartFile>): Promise<any> | void {
    console.log('PartFile afterUpdate : ', event.entity);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  afterRemove(event: RemoveEvent<PartFile>) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  beforeSoftRemove(event: SoftRemoveEvent<PartFile>) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  afterSoftRemove(event: SoftRemoveEvent<PartFile>) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  beforeRecover(event: RecoverEvent<PartFile>) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  afterRecover(event: RecoverEvent<PartFile>) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  beforeTransactionStart(event: TransactionStartEvent) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  afterTransactionStart(event: TransactionStartEvent) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  beforeTransactionCommit(event: TransactionCommitEvent) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  afterTransactionCommit(event: TransactionCommitEvent) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  beforeTransactionRollback(event: TransactionRollbackEvent) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  afterTransactionRollback(event: TransactionRollbackEvent) {}
}
