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

        @Column({ unique: true, nullable: false })
        code: string

        @Column({ unique: true, nullable: false })
        companyName: string

        @Column({ nullable: true })
        parent: string

        @Column({ nullable: true })
        headOfficeAddress: string

        @Column({ default: 'Draft' })
        status: string

        @Column({ default: 'Create Data' })
        requestInfo: string

        @Column()
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
