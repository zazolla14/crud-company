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
        @IsString()
        address: string

        @IsOptional()
        @IsString()
        city: string

        @IsString()
        province: string

        @IsOptional()
        @IsString()
        country: string

        @IsOptional()
        @IsString()
        postalCode: string

        @IsOptional()
        @IsString()
        rtrw: string

        @IsOptional()
        @IsString()
        kelurahan: string

        @IsOptional()
        @IsString()
        kecamatan: string

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
