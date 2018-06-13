import { JsonController, Post, Param, Get, Body, Put, Authorized } from 'routing-controllers'
import Student from './entity';

@JsonController()
export default class StudentController {

    @Post('/students')
    createStudent(
        @Body() students: Student
    ) {
        return students.save()
    }

    @Put('/students/:id([0-9]+)')
    async updateStudent(
      @Param('id') id: number,
      @Body() update: Partial<Student>
    ) {
      const student = await Student.findOneById(id)
      console.log('Does anything happen here???????// sdgsd/g/sdg/sd/gs/dg/')
      student.lastRating = update.lastRating
      return student.save()
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