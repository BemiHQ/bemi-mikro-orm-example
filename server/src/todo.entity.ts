import { Entity,Property, PrimaryKey } from '@mikro-orm/postgresql';

@Entity({ tableName: 'todos' })
export class Todo {
  @PrimaryKey()
  id!: number;

  @Property()
  task!: string;

  @Property()
  isCompleted!: boolean;

  constructor({ task }: { task: string }) {
    this.task = task;
    this.isCompleted = false;
  }
}
