import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateCompanyDto {
    @IsNotEmpty()
    code: string

    @IsNotEmpty()
    @IsString()
    companyName: string

    @IsOptional()
    @IsString()
    companyType: string

    @IsOptional()
    @IsString()
    parentCompany: string

    @IsOptional()
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
    @IsString()
    website: string

    @IsOptional()
    @IsString()
    longitude: string

    @IsOptional()
    @IsString()
    langitude: string
}
