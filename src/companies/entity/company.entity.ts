import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Company {
        @PrimaryGeneratedColumn()
        no: number

        @Column({ unique: true })
        code: string

        @Column({ unique: true })
        companyName: string

        @Column({ nullable: true })
        parent: string

        @Column({ nullable: true })
        headOfficeAddress: string

        @Column({ default: 'Draft' })
        status: string

        @Column({ default: 'Create Data' })
        requestInfo: string

        @Column({ nullable: true })
        userDateTime: string

        @Column({ nullable: true })
        BOD: string

        @Column({ type: 'date' })
        createdAt: Date

        @Column({ type: 'timestamp' })
        updatedAt: Date
}
