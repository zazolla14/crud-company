import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateCompanyDto } from './dto/create-company.dto'
import { Company } from './entity/company.entity'

@Injectable()
export class CompaniesService {
        constructor(
                @InjectRepository(Company)
                private readonly companyRepository: Repository<Company>,
        ) {}

        findAll() {
                return this.companyRepository.find()
        }

        findOne(id: number) {
                return this.companyRepository.findOneOrFail(id)
        }

        create(data: CreateCompanyDto) {
                const company = new Company()
                company.code = data.code
                company.companyName = data.companyName
                company.parent = data.parentCompany
                company.headOfficeAddress = `${data.address},${data.city},${data.kelurahan}, ${data.kecamatan}, ${data.city}, ${data.province}, ${data.posatalCode}`
                company.userDateTime = `BDIA01, ${data.updatedAt}`
                company.BOD = 'test'

                return this.companyRepository.save(company)
        }

        async duplicate(id: number) {
                const newData = await this.companyRepository.findOneOrFail(id)
                const company = new Company()
                company.code = newData.code
                company.companyName = newData.companyName
                company.parent = newData.parent
                company.headOfficeAddress = newData.headOfficeAddress
                company.userDateTime = newData.userDateTime
                company.BOD = newData.BOD
                return await this.companyRepository.save(company)
        }

        update(id: number, data: CreateCompanyDto) {
                return this.companyRepository.save({ id: Number(id), ...data })
        }

        delete(id: number) {
                return this.companyRepository.delete(id)
        }
}
