import { CreateCompanyDto } from '../dto/create-company.dto'
import { Company } from '../entity/company.entity'
import { HeadOfficeAddress } from '../entity/headOfficeAddress.entity'

export class CreateCompanyHelper {
    CreateCompany(data: CreateCompanyDto) {
        const headOfficeAddressData = new HeadOfficeAddress()
        const {
            address,
            city,
            province,
            country,
            postalCode,
            rtrw,
            kelurahan,
            kecamatan,
        } = data.headOfficeAddress

        headOfficeAddressData.address = address
        headOfficeAddressData.city = city
        headOfficeAddressData.province = province
        headOfficeAddressData.country = country
        headOfficeAddressData.postalCode = postalCode
        headOfficeAddressData.rtrw = rtrw
        headOfficeAddressData.kelurahan = kelurahan
        headOfficeAddressData.kecamatan = kecamatan

        const companyData = new Company()
        const {
            code,
            companyName,
            companyType,
            parentCompany,
            website,
            longitude,
            langitude,
        } = data

        companyData.code = code
        companyData.companyName = companyName
        companyData.companyType = companyType
        companyData.parentCompany = parentCompany
        companyData.headOfficeAddress = headOfficeAddressData
        companyData.website = website
        companyData.longitude = longitude
        companyData.langitude = langitude

        return companyData
    }
}
