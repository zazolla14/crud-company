import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Like, Repository } from 'typeorm'
import { CreateCompanyDto } from './dto/create-company.dto'
import { Company } from './entity/company.entity'

@Injectable()
export class CompaniesService {
        constructor(
                @InjectRepository(Company)
                private readonly companyRepository: Repository<Company>,
        ) {}

        async findAll() {
                return await this.companyRepository.find()
        }

        async findOne(id: number) {
                return await this.companyRepository.findOneOrFail(id)
        }

        async create(data: CreateCompanyDto) {
                if (data.parentCompany) {
                        const codeCompany = await this.companyRepository.findOne(
                                {
                                        where: {
                                                code: Like(
                                                        `%${data.parentCompany}%`,
                                                ),
                                        },
                                },
                        )
                        if (codeCompany === undefined) {
                                return { status: 'error' }
                        } else if (codeCompany.parentCompany === null) {
                                console.log('test1')
                                return await this.companyRepository.save(data)
                        } else {
                                console.log('test2')
                                return { status: 'error' }
                        }
                }
                return await this.companyRepository.save(data)
        }

        async duplicate(id: number) {
                const lastId = await this.companyRepository.findOneOrFail({
                        order: { id: 'DESC' },
                })
                const duplicateCompany = await this.companyRepository.findOneOrFail(
                        id,
                )
                duplicateCompany.id = lastId.id + 1
                duplicateCompany.code = `${duplicateCompany.code} (duplicate)`
                duplicateCompany.companyName = `${duplicateCompany.companyName} (duplicate)`
                return await this.companyRepository.save(duplicateCompany)
        }

        async update(id: number, data: CreateCompanyDto) {
                return await this.companyRepository.save({
                        id: Number(id),
                        ...data,
                })
        }

        async delete(id: number) {
                return await this.companyRepository.delete(id)
        }
}
