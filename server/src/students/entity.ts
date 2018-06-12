import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { MinLength, IsString, IsNumber } from 'class-validator';

@Entity()
export default class Student extends BaseEntity {

    @PrimaryGeneratedColumn()
    id?: number

    @IsString()
    @MinLength(2)
    @Column('text')
    firstName: string

    @IsString()
    @MinLength(2)
    @Column('text')
    lastName: string

    @IsString()
    @Column('text')
    picture: string

    @IsNumber()
    @Column('text')
    batchId: number
}
