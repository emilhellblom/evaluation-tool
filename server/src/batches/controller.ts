import { JsonController, Post, Param, Get, Body, Authorized } from 'routing-controllers'
import Batches from './entity';

@JsonController()
export default class BatchController {

    @Post('/batches')
    createStudent(
        @Body() batches: Batches
    ) {
        return batches.save()
    }

    @Authorized()
    @Get('/batches/:id([0-9]+)')
    getUser(
        @Param('id') id: number
    ) {
        return Batches.findOneById(id)
    }

    @Authorized()
    @Get('/batches')
    allUsers() {
        return Batches.find()
    }
}