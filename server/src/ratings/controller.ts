import { JsonController, Post, Param, Get, Body, Put, Authorized } from 'routing-controllers'
import Rating from './entity';

@JsonController()
export default class RatingController {

    @Post('/ratings')
    createRating(
        @Body() ratings: Rating
    ) {
        return ratings.save()
    }

    @Put('/ratings/:id([0-9]+)')
    async updateRating(
      @Param('id') id: number,
      @Body() update: Partial<Rating>
    ) {
      const rating = await Rating.findOneById(id)

      rating.color = update.color
      rating.remark = update.remark
      rating.date = update.date
      return rating.save()
    }

    @Get('/ratings/:id([0-9]+)')
    getRatings(
        @Param('id') id: number
    ) {
        return Rating.findOneById(id)
    }

    // @Authorized()
    @Get('/ratings')
    allRatings() {
        return Rating.find()
    }
}