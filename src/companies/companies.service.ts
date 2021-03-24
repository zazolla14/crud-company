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
                company.headOfficeAddress = `${data.address},${data.rtrw}, ${data.kelurahan}, ${data.kecamatan}, ${data.city}, ${data.province}, ${data.country}, ${data.posatalCode}`
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

        async update(id: number, data: CreateCompanyDto) {
                const updateCompany = await this.companyRepository.findOneOrFail(
                        id,
                )

                updateCompany.code = data.code
                updateCompany.companyName = data.companyName
                if (data.parentCompany) {
                        updateCompany.parent = data.parentCompany
                }
                const address = updateCompany.headOfficeAddress.split(',')

                for (let i = 0; i < address.length; i++) {
                        if (data.address) {
                                address[i] = data.address
                        }
                        i++
                        if (data.rtrw) {
                                address[i] = data.rtrw
                        }
                        i++
                        if (data.kelurahan) {
                                address[i] = data.kelurahan
                        }
                        i++
                        if (data.kecamatan) {
                                address[i] = data.kecamatan
                        }
                        i++
                        if (data.city) {
                                address[i] = data.city
                        }
                        i++
                        if (data.province) {
                                address[i] = data.province
                        }
                        i++
                        if (data.posatalCode) {
                                address[i] = data.posatalCode
                        }
                        i++
                }
                const rAddress = address.join(' ')
                updateCompany.headOfficeAddress = rAddress

                return this.companyRepository.save({
                        id: Number(id),
                        ...updateCompany,
                })
        }

        delete(id: number) {
                return this.companyRepository.delete(id)
        }
}
