import { Migration } from '@mikro-orm/migrations';

export class Migration20240913170048 extends Migration {

  override async up(): Promise<void> {
    this.addSql('create table "todos" ("id" serial primary key, "task" varchar(255) not null, "is_completed" boolean not null);');
  }

}
