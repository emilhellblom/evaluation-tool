import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { MinLength, MaxLength, IsString, IsNumber } from 'class-validator';

@Entity()
export default class Rating extends BaseEntity {

    @PrimaryGeneratedColumn()
    id?: number

    // @IsString()
    // @MinLength(1)
    // @MaxLength(1)
    @Column()
    studentId: number

    @IsString()
    @MinLength(2)
    @Column('text')
    date: string

    @IsString()
    @MinLength(2)
    @Column('text')
    remark: string

    @IsString()
    @Column('text')
    color: string
}