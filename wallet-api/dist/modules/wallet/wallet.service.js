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
exports.WalletService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const transaction_entity_1 = require("../transaction/transaction.entity");
const setup_response_dto_1 = require("./dto/setup-response-dto");
const wallet_entity_1 = require("./wallet.entity");
let WalletService = class WalletService {
    constructor(walletRepository, transactionRepository) {
        this.walletRepository = walletRepository;
        this.transactionRepository = transactionRepository;
    }
    async setupWallet(setupWalletDto) {
        const { name, balance } = setupWalletDto;
        const wallet = await this.walletRepository.save({ name, balance });
        const transaction = await this.transactionRepository.save({
            wallet: wallet,
            type: transaction_entity_1.TransactionType.CREDIT,
            amount: wallet.balance,
            balance: wallet.balance,
            description: 'Initial setup',
        });
        return new setup_response_dto_1.SetupResponseDto(wallet.id, wallet.balance, transaction.id, wallet.name);
    }
    async getWalletData(id) {
        return this.walletRepository.findOne({ where: { id } });
    }
};
WalletService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(wallet_entity_1.Wallet)),
    __param(1, (0, typeorm_1.InjectRepository)(transaction_entity_1.Transaction)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], WalletService);
exports.WalletService = WalletService;
//# sourceMappingURL=wallet.service.js.map