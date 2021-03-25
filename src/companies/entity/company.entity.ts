import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm'
import { HeadOfficeAddress } from './headOfficeAddress.entity'

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

    @OneToOne(() => HeadOfficeAddress, {
        eager: true,
        cascade: true,
        // onDelete: 'CASCADE', //! saya cari di forum, beberapa ada yang bilang memang ada issue untuk realtion OneToOne.
    })
    @JoinColumn()
    headOfficeAddress: HeadOfficeAddress

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
