import { CreateCompanyDto } from '../dto/create-company.dto'
import { Company } from '../entity/company.entity'
import { HeadOfficeAddress } from '../entity/headOfficeAddress.entity'

export class CreateCompanyHelper {
    CreateCompany(data: CreateCompanyDto) {
        const headOfficeAddressData = new HeadOfficeAddress()

        headOfficeAddressData.address = data.headOfficeAddress.address
        headOfficeAddressData.city = data.headOfficeAddress.city
        headOfficeAddressData.province = data.headOfficeAddress.province
        headOfficeAddressData.country = data.headOfficeAddress.country
        headOfficeAddressData.postalCode = data.headOfficeAddress.postalCode
        headOfficeAddressData.rtrw = data.headOfficeAddress.rtrw
        headOfficeAddressData.kelurahan = data.headOfficeAddress.kelurahan
        headOfficeAddressData.kecamatan = data.headOfficeAddress.kecamatan

        const companyData = new Company()

        companyData.code = data.code
        companyData.companyName = data.companyName
        companyData.companyType = data.companyType
        companyData.parentCompany = data.parentCompany
        companyData.headOfficeAddress = headOfficeAddressData
        companyData.website = data.website
        companyData.longitude = data.longitude
        companyData.langitude = data.langitude

        return companyData
    }
}
