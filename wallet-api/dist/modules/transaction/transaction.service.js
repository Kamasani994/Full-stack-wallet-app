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
exports.TransactionService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const wallet_entity_1 = require("../wallet/wallet.entity");
const transaction_entity_1 = require("./transaction.entity");
let TransactionService = class TransactionService {
    constructor(transactionRepository, walletRepository) {
        this.transactionRepository = transactionRepository;
        this.walletRepository = walletRepository;
    }
    async create(createTransactionDto, walletId) {
        try {
            const { amount, description } = createTransactionDto;
            const transactionType = amount > 0 ? transaction_entity_1.TransactionType.CREDIT : transaction_entity_1.TransactionType.DEBIT;
            const wallet = await this.walletRepository.findOne({
                where: { id: walletId },
            });
            if (transactionType === transaction_entity_1.TransactionType.DEBIT) {
                if (Math.abs(amount) > wallet.balance) {
                    throw new common_1.HttpException('Insufficient balance', common_1.HttpStatus.BAD_REQUEST);
                }
            }
            await this.walletRepository.update({ id: walletId }, { balance: wallet.balance + amount });
            const { balance, id } = await this.transactionRepository.save({
                balance: wallet.balance + amount,
                amount: amount,
                description: description,
                type: transactionType,
                wallet: wallet,
            });
            return {
                balance: Number(balance.toFixed(4)),
                transactionId: id,
            };
        }
        catch (err) {
            throw err;
        }
    }
    async fetchAllTransactions(pageOptionsDto) {
        const { walletId, skip, limit } = pageOptionsDto;
        try {
            const [list, count] = await this.transactionRepository.findAndCount({
                where: { wallet: { id: walletId } },
                select: ['id', 'amount', 'type', 'balance', 'date'],
                order: { date: 'DESC' },
                skip: skip,
                take: limit,
            });
            return { list, count };
        }
        catch (err) {
            throw new common_1.HttpException('Something went wrong. Please try again after sometime', common_1.HttpStatus.BAD_GATEWAY);
        }
    }
};
TransactionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(transaction_entity_1.Transaction)),
    __param(1, (0, typeorm_1.InjectRepository)(wallet_entity_1.Wallet)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], TransactionService);
exports.TransactionService = TransactionService;
//# sourceMappingURL=transaction.service.js.map