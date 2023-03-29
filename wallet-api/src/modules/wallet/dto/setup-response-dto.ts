export class SetupResponseDto {
  id: string;
  balance: number;
  transactionId: string;
  name: string;

  constructor(
    id: string,
    balance: number,
    transactionId: string,
    name: string,
  ) {
    this.id = id;
    this.name = name;
    this.transactionId = transactionId;
    this.balance = balance;
  }
}
