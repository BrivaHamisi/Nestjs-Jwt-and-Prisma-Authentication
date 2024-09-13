import { Global, Module } from '@nestjs/common';
import { DatabaseService } from './database.service';

@Global()
@Module({
    providers: [DatabaseService],
    exports: [DatabaseService], //Makes sure this module exports the servicce for other modules to use it
})
export class DatabaseModule {}
