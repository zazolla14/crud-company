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
        const datas = await this.companyRepository.find()
        const result = datas.map((data) => {
            const formatAddressHelper = new FormatAddress()
            const formatAddress = formatAddressHelper.formatAddress(data)
            return formatAddress
        })

        return { Companies: result }
    }

    async findOne(id: number) {
        const company = await this.companyRepository.findOneOrFail(id)
        const formatAddressHelper = new FormatAddress()
        const result = formatAddressHelper.formatAddress(company)
        return { Companies: result }
    }

    async create(data: CreateCompanyDto) {
        const codeCompany = await this.companyRepository.findOne({
            where: {
                code: Like(`%${data.parentCompany}%`),
            },
        })

        const companyData = new CreateCompanyHelper()
        const result = companyData.CreateCompany(data)

        // throw new HttpException(
        //             'Code Company not found',
        //             HttpStatus.NOT_FOUND,
        //         )

        //         throw new HttpException(
        //             'This company cant be parent',
        //             HttpStatus.NOT_ACCEPTABLE,
        //         )

        return !data.parentCompany
            ? await this.companyRepository.save(result)
            : !codeCompany
            ? console.log('Code Company not found')
            : !codeCompany.parentCompany
            ? await this.companyRepository.save(result)
            : console.log('This company cant be parent')
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
        const companyResult = companyData.CreateCompany(duplicateCompany)
        const result = await this.companyRepository.save(companyResult)
        return {
            Company: result,
        }
    }

    async update(id: number, data: CreateCompanyDto) {
        const codeCompany = await this.companyRepository.findOne({
            where: {
                code: Like(`%${data.parentCompany}%`),
            },
        })

        const companyData = new CreateCompanyHelper()
        const result = companyData.CreateCompany(data)

        // throw new HttpException(
        //             'Code Company not found',
        //             HttpStatus.NOT_FOUND,
        //         )

        // throw new HttpException(
        //     'This company cant be parent',
        //     HttpStatus.NOT_ACCEPTABLE,
        // )

        return !data.parentCompany
            ? await this.companyRepository.save({
                  id: Number(id),
                  ...result,
              })
            : !codeCompany
            ? console.log('Code Company not found')
            : !codeCompany.parentCompany
            ? await this.companyRepository.save({
                  id: Number(id),
                  ...result,
              })
            : console.log('This company cant be parent')
    }

    async delete(id: number) {
        await this.companyRepository.findOneOrFail(id)
        await this.companyRepository.delete(id)
        throw new HttpException('Success Deleted Data', HttpStatus.OK)
    }
}
