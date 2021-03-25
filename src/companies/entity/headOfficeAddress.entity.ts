import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class HeadOfficeAddress {
    @PrimaryGeneratedColumn()
    public id: number

    @Column({ nullable: true })
    address: string

    @Column({ nullable: true })
    city: string

    @Column({ nullable: true })
    province: string

    @Column({ nullable: true })
    country: string

    @Column({ nullable: true })
    postalCode: string

    @Column({ nullable: true })
    rtrw: string

    @Column({ nullable: true })
    kelurahan: string

    @Column({ nullable: true })
    kecamatan: string
}
