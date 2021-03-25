import { Company } from '../entity/company.entity'

export class FormatAddress {
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
