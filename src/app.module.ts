import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { CompeniesModule } from './companies/companies.module'

@Module({
        imports: [CompeniesModule],
        controllers: [AppController],
        providers: [AppService],
})
export class AppModule {}
