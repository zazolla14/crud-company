import {
        Column,
        CreateDateColumn,
        Entity,
        PrimaryGeneratedColumn,
} from 'typeorm'

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

        @CreateDateColumn()
        DateAdded: Date

        // @Column({ type: 'datetime', nullable: true, default: null })
        // createdAt: Date

        // @Column('datetime')
        // createdAt: Date

        // @Column({ type: 'datetime', nullable: true, default: null })
        // updatedAt: Date

        // @Column('datetime')
        // updatedAt: Date
}
