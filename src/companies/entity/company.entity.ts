import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Company {
        @PrimaryGeneratedColumn()
        no: number

        @Column()
        code: string

        @Column()
        companyName: string

        @Column()
        parent: string

        @Column()
        headOfficeAddress: string

        @Column({ default: 'Draft' })
        status: string

        @Column({ default: 'Create Data' })
        requestInfo: string

        @Column()
        userDateTime: string

        @Column()
        BOD: string

        // @Column()
        // createdAt: Date

        // @Column()
        // updatedAt: Date
}
