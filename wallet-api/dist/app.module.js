"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const typeorm_1 = require("@nestjs/typeorm");
const wallet_module_1 = require("./modules/wallet/wallet.module");
const wallet_entity_1 = require("./modules/wallet/wallet.entity");
const transaction_entity_1 = require("./modules/transaction/transaction.entity");
const transaction_module_1 = require("./modules/transaction/transaction.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: 'sql.freedb.tech',
                port: 3306,
                username: 'freedb_meher',
                password: '%6B#?b%s?MX4?G8',
                database: 'freedb_wallet-database',
                entities: [wallet_entity_1.Wallet, transaction_entity_1.Transaction],
                synchronize: true,
            }),
            wallet_module_1.WalletModule,
            transaction_module_1.TransactionModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map