import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersController } from './companies.controller'
import { CompaniesService } from './companies.service'
import { Company } from './entity/company.entity'
import 'dotenv/config'

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            database: 'crud-company',
            username: 'root',
            password: '',
            autoLoadEntities: true,
            synchronize: true,
        }),
        TypeOrmModule.forFeature([Company]),
    ],
    controllers: [UsersController],
    providers: [CompaniesService],
})
export class CompeniesModule {}
