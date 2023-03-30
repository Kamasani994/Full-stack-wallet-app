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
exports.Transaction = exports.TransactionType = void 0;
const ColumnNumericTransformer_1 = require("../../classes/ColumnNumericTransformer");
const typeorm_1 = require("typeorm");
const wallet_entity_1 = require("../wallet/wallet.entity");
var TransactionType;
(function (TransactionType) {
    TransactionType["CREDIT"] = "credit";
    TransactionType["DEBIT"] = "debit";
})(TransactionType = exports.TransactionType || (exports.TransactionType = {}));
let Transaction = class Transaction {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Transaction.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => wallet_entity_1.Wallet),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", wallet_entity_1.Wallet)
], Transaction.prototype, "wallet", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: TransactionType,
        default: TransactionType.CREDIT,
        name: 'type',
    }),
    __metadata("design:type", String)
], Transaction.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'decimal',
        precision: 12,
        scale: 4,
        name: 'amount',
        transformer: new ColumnNumericTransformer_1.ColumnNumericTransformer(),
    }),
    __metadata("design:type", Number)
], Transaction.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'decimal',
        precision: 12,
        scale: 4,
        name: 'balance',
        transformer: new ColumnNumericTransformer_1.ColumnNumericTransformer(),
    }),
    __metadata("design:type", Number)
], Transaction.prototype, "balance", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'description', nullable: true }),
    __metadata("design:type", String)
], Transaction.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'date' }),
    __metadata("design:type", Date)
], Transaction.prototype, "date", void 0);
Transaction = __decorate([
    (0, typeorm_1.Entity)('transaction', { schema: 'wallet' })
], Transaction);
exports.Transaction = Transaction;
//# sourceMappingURL=transaction.entity.js.map