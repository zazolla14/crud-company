import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Like, Repository } from 'typeorm'
import { CreateCompanyDto } from './dto/create-company.dto'
import { Company } from './entity/company.entity'
import { CreateCompanyHelper } from './helpers/createCompany.helper'
import { FormatAddress } from './helpers/formatAddres.helper'

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
            const formatAddressHelper = new FormatAddress()
            const formatAddress = formatAddressHelper.formatAddress(company)
            r.push(formatAddress)
        }
        return { Companies: r }
    }

    async findOne(id: number) {
        const company = await this.companyRepository.findOneOrFail(id)
        const formatAddressHelper = new FormatAddress()
        const r = formatAddressHelper.formatAddress(company)
        return { Companies: r }
    }

    async create(data: CreateCompanyDto) {
        if (data.parentCompany) {
            const codeCompany = await this.companyRepository.findOne({
                where: {
                    code: Like(`%${data.parentCompany}%`),
                },
            })
            if (codeCompany === undefined) {
                throw new HttpException(
                    'Code Company not found',
                    HttpStatus.NOT_FOUND,
                )
            } else if (codeCompany.parentCompany === null) {
                const companyData = new CreateCompanyHelper()
                const result = companyData.CreateCompany(data)
                const companyResult = await this.companyRepository.save(result)
                return {
                    Company: companyResult,
                }
            } else {
                throw new HttpException(
                    'This company cant be parent',
                    HttpStatus.NOT_ACCEPTABLE,
                )
            }
        }
        const companyData = new CreateCompanyHelper()
        const result = companyData.CreateCompany(data)
        const companyResult = await this.companyRepository.save(result)
        return {
            Company: companyResult,
        }
    }

    async duplicate(id: number) {
        const lastId = await this.companyRepository.findOneOrFail({
            order: { id: 'DESC' },
        })
        const duplicateCompany = await this.companyRepository.findOneOrFail(id)
        console.log(duplicateCompany)

        duplicateCompany.id = lastId.id + 1
        duplicateCompany.code = `${duplicateCompany.code} (duplicate)`
        duplicateCompany.companyName = `${duplicateCompany.companyName} (duplicate)`

        const companyData = new CreateCompanyHelper()
        const result = companyData.CreateCompany(duplicateCompany)
        const companyResult = await this.companyRepository.save(result)
        return {
            Company: companyResult,
        }
    }

    async update(id: number, data: CreateCompanyDto) {
        if (data.parentCompany) {
            const codeCompany = await this.companyRepository.findOne({
                where: {
                    code: Like(`%${data.parentCompany}%`),
                },
            })
            if (codeCompany === undefined) {
                return { messagge: 'Parent Company not found' }
            } else if (codeCompany.parentCompany === null) {
                const companyData = new CreateCompanyHelper()
                const result = companyData.CreateCompany(data)
                const companyResult = await this.companyRepository.save({
                    id: Number(id),
                    ...result,
                })
                return {
                    Company: companyResult,
                }
            } else {
                return { messagge: 'Parent Company not found' }
            }
        }
        const companyData = new CreateCompanyHelper()
        const result = companyData.CreateCompany(data)
        const companyResult = await this.companyRepository.save({
            id: Number(id),
            ...result,
        })
        return {
            Company: companyResult,
        }
    }

    async delete(id: number) {
        await this.companyRepository.findOneOrFail(id)
        await this.companyRepository.delete(id)
        return { messagge: 'ok' }
    }
}
