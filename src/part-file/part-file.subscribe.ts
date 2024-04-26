import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  RemoveEvent,
  SoftRemoveEvent,
  UpdateEvent,
} from 'typeorm/index';
import { PartFile } from './part-file.entity';
import { Logger } from '@nestjs/common';

@EventSubscriber()
export class PartFileSubscriber implements EntitySubscriberInterface<PartFile> {
  private readonly logger = new Logger(PartFileSubscriber.name);

  constructor(connection: Connection) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return PartFile;
  }

  afterLoad(entity: any) {
    this.logger.log(`After Entity Load: ${JSON.stringify(entity, null, 2)}`);
  }

  beforeInsert(event: InsertEvent<PartFile>): Promise<any> | void {
    this.logger.log(
      `Before Entity Inserted: ${JSON.stringify(event.entity, null, 2)}`,
    );
  }

  afterInsert(event: InsertEvent<PartFile>): Promise<any> | void {
    this.logger.log(
      `After Entity Inserted: ${JSON.stringify(event.entity, null, 2)}`,
    );
  }

  beforeUpdate(event: UpdateEvent<PartFile>): Promise<any> | void {
    this.logger.log(
      `Before Entity Updated: ${JSON.stringify(event.entity, null, 2)}`,
    );
  }

  afterUpdate(event: UpdateEvent<PartFile>): Promise<any> | void {
    this.logger.log(
      `After Entity Updated: ${JSON.stringify(event.entity, null, 2)}`,
    );
  }

  beforeRemove(event: RemoveEvent<PartFile>) {
    this.logger.log(
      `Before Entity with ID ${event.entityId} Removed: ${JSON.stringify(event.entity, null, 2)}`,
    );
  }

  afterRemove(event: RemoveEvent<PartFile>) {
    this.logger.log(
      `After Entity with ID ${event.entityId} Removed: ${JSON.stringify(event.entity, null, 2)}`,
    );
  }

  beforeSoftRemove(event: SoftRemoveEvent<PartFile>) {
    this.logger.log(
      `Before Entity with ID ${event.entityId}: ${JSON.stringify(event.entity, null, 2)}`,
    );
  }

  afterSoftRemove(event: SoftRemoveEvent<PartFile>) {
    this.logger.log(
      `After Entity with ID ${event.entityId} Soft Removed: ${JSON.stringify(event.entity, null, 2)}`,
    );
  }
}
