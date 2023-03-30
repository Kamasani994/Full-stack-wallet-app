import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { toast } from "react-toastify";
import InitializeWallet from "../components/InitializeWallet";
import Wallet from "../components/Wallet";

type Props = {};

export type WalletType = {
  id: string;
  name: string;
  balance: number;
  transactionId: string;
};

export type Transaction = {
  id: string;
  amount: number;
  balance: number;
  type: TransactionType;
  date: string;
};

export enum TransactionType {
  CREDIT = "credit",
  DEBIT = "debit",
}

const Home = (props: Props) => {
  const [walletData, setWalletData] = useState<WalletType>({} as WalletType);
  const [initializingWallet, setInititalizingWallet] = useState(false);

  const fetchWallet = async () => {
    const walletId = localStorage.getItem("wallet_id");
    if (!walletId) {
      return;
    }
    try {
      const { data } = await axios.get(
        `http://localhost:3000/wallet/${walletId}`
      );
      setWalletData(data);
    } catch (err: any) {
      console.log(err);
      toast.error(err.response.data.message);
    }
  };

  useEffect(() => {
    fetchWallet();
  }, [walletData?.id]);

  const setupWallet = async ({
    name,
    amount,
  }: {
    name: string;
    amount: number;
  }) => {
    setInititalizingWallet(true);
    try {
      const { data } = await axios.post("http://localhost:3000/wallet/setup", {
        name: name,
        balance: Number(amount),
      });
      localStorage.setItem("wallet_id", data.id);
      setWalletData(data);
    } catch (err: any) {
      toast.error(err.response.data.message);
    } finally {
      setInititalizingWallet(false);
    }
  };

  const createTransaction = async (amount: number) => {
    try {
      const { data } = await axios.post(
        `http://localhost:3000/transact/${walletData?.id}`,
        { amount: amount }
      );
      setWalletData((val) => ({ ...val, balance: data.balance }));
      toast.success("Transaction successfull");
    } catch (err: any) {
      console.log(err);
      toast.error(err.response.data.message);
    }
  };

  return (
    <div className="page">
      <Container className="d-flex align-items-center justify-content-center h-50">
        {walletData?.id ? (
          <Wallet wallet={walletData} onSubmit={createTransaction} />
        ) : (
          <InitializeWallet
            initializing={initializingWallet}
            onSubmit={setupWallet}
          />
        )}
      </Container>
    </div>
  );
};

export default Home;
