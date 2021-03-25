import { IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator'
// import { CreateHeadOfficeAddressDto } from './create-headOfficeAddress.dto'

export class CreateCompanyDto {
    @IsNotEmpty({ message: 'jangan kosong' })
    code: string

    @IsNotEmpty({ message: 'jangan kosong' })
    @IsString({ message: 'companyName wajib string' })
    companyName: string

    @IsOptional()
    @IsString({ message: 'companyType wajib string' })
    companyType: string

    @IsOptional()
    @IsString({ message: 'parentCompany wajib string' })
    parentCompany: string

    @IsOptional()
    @IsObject({ message: 'headOfficeAddress wajib objek' })
    headOfficeAddress: {
        address: string
        city: string
        province: string
        country: string
        postalCode: string
        rtrw: string
        kelurahan: string
        kecamatan: string
    }

    @IsOptional()
    @IsString({ message: 'website wajib string' })
    website: string

    @IsOptional()
    @IsString({ message: 'longitude wajib string' })
    longitude: string

    @IsOptional()
    @IsString({ message: 'langitude wajib string' })
    langitude: string
}
