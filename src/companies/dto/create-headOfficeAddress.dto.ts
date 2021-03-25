import { IsOptional, IsString } from 'class-validator'

export class CreateHeadOfficeAddressDto {
    @IsOptional()
    @IsString()
    address: string

    @IsOptional()
    @IsString()
    city: string

    @IsOptional()
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
}
