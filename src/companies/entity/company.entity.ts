import {
        Column,
        CreateDateColumn,
        Entity,
        PrimaryGeneratedColumn,
} from 'typeorm'

@Entity()
export class Company {
        @PrimaryGeneratedColumn()
        id: number

        @Column({ unique: true, nullable: false })
        code: string

        @Column({ unique: true, nullable: false })
        companyName: string

        @Column({ nullable: true })
        companyType: string

        @Column({ nullable: true })
        parentCompany: string

        // @Column({ nullable: true })
        // headOfficeAddress: string

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

        @Column({ nullable: true })
        website: string

        @Column({ nullable: true })
        longitude: string

        @Column({ nullable: true })
        langitude: string

        @Column({ default: 'Draft' })
        status: string

        @Column({ nullable: true })
        requestInfo: string

        @Column({ default: 'user1', nullable: false })
        user: string

        @CreateDateColumn()
        CreatedAt: Date

        @Column({ nullable: true })
        BOD: string
}
