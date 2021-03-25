import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Like, Repository } from 'typeorm'
import { CreateCompanyDto } from './dto/create-company.dto'
import { Company } from './entity/company.entity'
import { HeadOfficeAddress } from './entity/headOfficeAddress.entity'

@Injectable()
export class CompaniesService {
    constructor(
        @InjectRepository(Company)
        private readonly companyRepository: Repository<Company>,
        @InjectRepository(HeadOfficeAddress)
        private readonly headOfficeAddressRepository: Repository<HeadOfficeAddress>,
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
            const codeCompany = await this.companyRepository.findOne({
                where: {
                    code: Like(`%${data.parentCompany}%`),
                },
            })
            if (codeCompany === undefined) {
                return { messagge: 'Code Company not found' }
            } else if (codeCompany.parentCompany === null) {
                const headOfficeAddressData = new HeadOfficeAddress()

                headOfficeAddressData.address = data.headOfficeAddress.address
                headOfficeAddressData.city = data.headOfficeAddress.city
                headOfficeAddressData.province = data.headOfficeAddress.province
                headOfficeAddressData.country = data.headOfficeAddress.country
                headOfficeAddressData.postalCode =
                    data.headOfficeAddress.postalCode
                headOfficeAddressData.rtrw = data.headOfficeAddress.rtrw
                headOfficeAddressData.kelurahan =
                    data.headOfficeAddress.kelurahan
                headOfficeAddressData.kecamatan =
                    data.headOfficeAddress.kecamatan

                const companyData = new Company()

                companyData.code = data.code
                companyData.companyName = data.companyName
                companyData.companyType = data.companyType
                companyData.parentCompany = data.parentCompany
                companyData.headOfficeAddress = headOfficeAddressData
                companyData.website = data.website
                companyData.longitude = data.longitude
                companyData.langitude = data.langitude

                const companyResult = await this.companyRepository.save(
                    companyData,
                )
                return {
                    Company: companyResult,
                    // headOfficeAddress: headOfficeAddressResult,
                }
            } else {
                return { messagge: 'This company cant be parent' }
            }
        }
        const headOfficeAddressData = new HeadOfficeAddress()
        headOfficeAddressData.address = data.headOfficeAddress.address
        headOfficeAddressData.city = data.headOfficeAddress.city
        headOfficeAddressData.province = data.headOfficeAddress.province
        headOfficeAddressData.country = data.headOfficeAddress.country
        headOfficeAddressData.postalCode = data.headOfficeAddress.postalCode
        headOfficeAddressData.rtrw = data.headOfficeAddress.rtrw
        headOfficeAddressData.kelurahan = data.headOfficeAddress.kelurahan
        headOfficeAddressData.kecamatan = data.headOfficeAddress.kecamatan

        const headOfficeAddressResult = await this.headOfficeAddressRepository.save(
            headOfficeAddressData,
        )

        const companyData = new Company()
        companyData.code = data.code
        companyData.companyName = data.companyName
        companyData.companyType = data.companyType
        companyData.parentCompany = data.parentCompany
        companyData.headOfficeAddress = headOfficeAddressData
        companyData.website = data.website
        companyData.longitude = data.longitude
        companyData.langitude = data.langitude

        const companyResult = await this.companyRepository.save(companyData)
        return {
            Company: companyResult,
            headOfficeAddress: headOfficeAddressResult,
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
        const headOfficeAddressData = new HeadOfficeAddress()
        headOfficeAddressData.address =
            duplicateCompany.headOfficeAddress.address
        headOfficeAddressData.city = duplicateCompany.headOfficeAddress.city
        headOfficeAddressData.province =
            duplicateCompany.headOfficeAddress.province
        headOfficeAddressData.country =
            duplicateCompany.headOfficeAddress.country
        headOfficeAddressData.postalCode =
            duplicateCompany.headOfficeAddress.postalCode
        headOfficeAddressData.rtrw = duplicateCompany.headOfficeAddress.rtrw
        headOfficeAddressData.kelurahan =
            duplicateCompany.headOfficeAddress.kelurahan
        headOfficeAddressData.kecamatan =
            duplicateCompany.headOfficeAddress.kecamatan

        const companyData = new Company()
        companyData.code = duplicateCompany.code
        companyData.companyName = duplicateCompany.companyName
        companyData.companyType = duplicateCompany.companyType
        companyData.parentCompany = duplicateCompany.parentCompany
        companyData.headOfficeAddress = headOfficeAddressData
        companyData.website = duplicateCompany.website
        companyData.longitude = duplicateCompany.longitude
        companyData.langitude = duplicateCompany.langitude
        await this.companyRepository.save(companyData)

        return {
            Companies: companyData,
            HeadOfficeAddress: headOfficeAddressData,
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
                return await this.companyRepository.save({
                    id: Number(id),
                    ...data,
                })
            } else {
                return { messagge: 'Parent Company not found' }
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
            headOfficeAddress: `${company.headOfficeAddress.address}, Kota ${company.headOfficeAddress.city}, Provinsi ${company.headOfficeAddress.province}, ${company.headOfficeAddress.country}, ${company.headOfficeAddress.postalCode}, RT/RW ${company.headOfficeAddress.rtrw}, Kelurahan ${company.headOfficeAddress.kelurahan},Kecamatan ${company.headOfficeAddress.kecamatan}`,
            website: company.website,
            maps: `${company.langitude}, ${company.langitude}`,
            requestInfo: company.requestInfo,
            userDateTime: `${company.user}, ${company.CreatedAt}`,
            bod: company.BOD,
        }
        return r
    }
}
