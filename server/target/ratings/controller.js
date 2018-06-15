"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const routing_controllers_1 = require("routing-controllers");
const entity_1 = require("./entity");
let RatingController = class RatingController {
    createRating(ratings) {
        return ratings.save();
    }
    async updateRating(id, update) {
        const rating = await entity_1.default.findOneById(id);
        console.log('Does anything happen here???????// sdgsd/g/sdg/sd/gs/dg/');
        rating.color = update.color;
        rating.remark = update.remark;
        rating.date = update.date;
        return rating.save();
    }
    getRatings(id) {
        return entity_1.default.findOneById(id);
    }
    allRatings() {
        return entity_1.default.find();
    }
};
__decorate([
    routing_controllers_1.Post('/ratings'),
    __param(0, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [entity_1.default]),
    __metadata("design:returntype", void 0)
], RatingController.prototype, "createRating", null);
__decorate([
    routing_controllers_1.Put('/ratings/:id([0-9]+)'),
    __param(0, routing_controllers_1.Param('id')),
    __param(1, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], RatingController.prototype, "updateRating", null);
__decorate([
    routing_controllers_1.Get('/ratings/:id([0-9]+)'),
    __param(0, routing_controllers_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], RatingController.prototype, "getRatings", null);
__decorate([
    routing_controllers_1.Get('/ratings'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RatingController.prototype, "allRatings", null);
RatingController = __decorate([
    routing_controllers_1.JsonController()
], RatingController);
exports.default = RatingController;
//# sourceMappingURL=controller.js.map