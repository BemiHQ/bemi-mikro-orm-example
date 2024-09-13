import { Migration } from '@mikro-orm/migrations';
import { bemiUpSql, bemiDownSql } from '@bemi-db/mikro-orm';

export class Migration20240917154046_bemi extends Migration {
  async up(): Promise<void> {
    this.addSql(bemiUpSql());
  }

  async down(): Promise<void> {
    this.addSql(bemiDownSql());
  }
}
