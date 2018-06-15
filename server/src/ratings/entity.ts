import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { MinLength, MaxLength, IsString, IsNumber } from 'class-validator';

@Entity()
export default class Rating extends BaseEntity {

    @PrimaryGeneratedColumn()
    id?: number

    @Column()
    studentId: number

    @IsString()
    @MinLength(2)
    @Column('text')
    date: string

    @IsString()
    @Column('text', {nullable:true})
    remark: string

    @IsString()
    @Column('text')
    color: string
}