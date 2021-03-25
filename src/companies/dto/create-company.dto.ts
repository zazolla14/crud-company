import { IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { OneToOne } from 'typeorm'
import { HeadOfficeAddress } from '../entity/headOfficeAddress.entity'

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

    // @IsOptional()
    // headOfficeAddress: {
    //     address: string
    //     city: string
    //     province: string
    //     country: string
    //     postalCode: string
    //     rtree: string
    //     kelurahan: string
    //     kecamatan: string
    // }

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
