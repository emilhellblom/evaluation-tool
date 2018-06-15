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
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
let Rating = class Rating extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Rating.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Rating.prototype, "studentId", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.MinLength(2),
    typeorm_1.Column('text'),
    __metadata("design:type", String)
], Rating.prototype, "date", void 0);
__decorate([
    class_validator_1.IsString(),
    typeorm_1.Column('text', { nullable: true }),
    __metadata("design:type", String)
], Rating.prototype, "remark", void 0);
__decorate([
    class_validator_1.IsString(),
    typeorm_1.Column('text'),
    __metadata("design:type", String)
], Rating.prototype, "color", void 0);
Rating = __decorate([
    typeorm_1.Entity()
], Rating);
exports.default = Rating;
//# sourceMappingURL=entity.js.map