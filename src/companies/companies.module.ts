import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CompaniesController } from './companies.controller'
import { CompaniesService } from './companies.service'
import { Company } from './entity/company.entity'
import { HeadOfficeAddress } from './entity/headOfficeAddress.entity'

@Module({
    imports: [
        // TypeOrmModule.forRoot(),
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
        TypeOrmModule.forFeature([HeadOfficeAddress]),
    ],
    controllers: [CompaniesController],
    providers: [CompaniesService],
})
export class CompeniesModule {}
