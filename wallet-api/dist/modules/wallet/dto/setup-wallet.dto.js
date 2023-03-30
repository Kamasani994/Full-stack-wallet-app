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
exports.SetupWalletDto = void 0;
const class_validator_1 = require("class-validator");
class SetupWalletDto {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'balance cannot be empty' }),
    (0, class_validator_1.IsNumber)({}, { message: 'balance should be a valid number' }),
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 4 }, { message: 'balance can have upto 4 decimal values' }),
    (0, class_validator_1.Min)(0, { message: 'Balance cannnot be less than 0' }),
    __metadata("design:type", Number)
], SetupWalletDto.prototype, "balance", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'name cannot be empty' }),
    __metadata("design:type", String)
], SetupWalletDto.prototype, "name", void 0);
exports.SetupWalletDto = SetupWalletDto;
//# sourceMappingURL=setup-wallet.dto.js.map