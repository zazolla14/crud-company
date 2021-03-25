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
                const result = await this.companyRepository.find()
                const r = []
                for (let i = 0; i < result.length; i++) {
                        const company = result[i]
                        const formatAddress = this.formatAddress(company)
                        r.push(formatAddress)
                }
                return { Companies: r }
        }

        async findOne(id: number) {
                const company = await this.companyRepository.findOneOrFail(id)
                const r = this.formatAddress(company)
                return { Companies: r }
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
                                return await this.companyRepository.save(data)
                        } else {
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
                                return await this.companyRepository.save({
                                        id: Number(id),
                                        ...data,
                                })
                        } else {
                                return { status: 'error' }
                        }
                }
                return await this.companyRepository.save({
                        id: Number(id),
                        ...data,
                })
        }

        async delete(id: number) {
                return await this.companyRepository.delete(id)
        }

        formatAddress(company: Company) {
                const r = {
                        id: company.id,
                        code: company.code,
                        companyName: company.companyName,
                        parent: company.parentCompany,
                        headOfficeAddress: `${company.address}, Kota ${company.city}, Provinsi ${company.province}, ${company.country}, ${company.postalCode}, RT/RW ${company.rtrw}, Kelurahan ${company.kelurahan},Kecamatan ${company.kecamatan}`,
                        website: company.website,
                        maps: `${company.langitude}, ${company.langitude}`,
                        requestInfo: company.requestInfo,
                        userDateTime: `${company.user}, ${company.CreatedAt}`,
                        bod: company.BOD,
                }
                return r
        }
}
