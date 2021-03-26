import { IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator'

export class CreateCompanyDto {
    @IsNotEmpty({ message: 'tidak diizinkan kosong' })
    code: string

    @IsNotEmpty({ message: 'tidak diizinkan kosong' })
    @IsString({ message: 'Name wajib string' })
    companyName: string

    @IsOptional()
    @IsString({ message: 'Type wajib string' })
    companyType: string

    @IsOptional()
    @IsString({ message: 'Parent wajib string' })
    parentCompany: string

    @IsOptional()
    @IsObject({ message: 'Head Office Address wajib objek' })
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
    @IsString({ message: 'Website wajib string' })
    website: string

    @IsOptional()
    @IsString({ message: 'Longitude wajib string' })
    longitude: string

    @IsOptional()
    @IsString({ message: 'Langitude wajib string' })
    langitude: string
}
