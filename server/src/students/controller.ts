import { JsonController, Post, Param, Get, Body, Authorized } from 'routing-controllers'
import Student from './entity';

@JsonController()
export default class StudentController {

    @Post('/students')
    createStudent(
        @Body() students: Student
    ) {
        return students.save()
    }

    // @Authorized()
    @Get('/students/:id([0-9]+)')
    getStudent(
        @Param('id') id: number
    ) {
        return Student.findOneById(id)
    }

    // @Authorized()
    @Get('/students')
    allStudents() {
        return Student.find()
    }
}