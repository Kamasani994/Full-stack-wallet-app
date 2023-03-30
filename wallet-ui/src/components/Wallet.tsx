import React, { useState } from "react";
import {
  Button,
  Card,
  CardGroup,
  Container,
  FloatingLabel,
  Form,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { TransactionType, WalletType } from "../pages/Home";
import TransactionTypeToggleButton from "./ToggleButton";

type Props = {
  wallet: WalletType;
  onSubmit: (amount: number) => {};
};

const Wallet = ({ wallet, onSubmit }: Props) => {
  const [amount, setAmount] = useState<number>(0);
  const [selected, setSelected] = useState<TransactionType>(
    TransactionType.CREDIT
  );

  const navigate = useNavigate();

  return (
    <CardGroup style={{ width: "70%" }}>
      <Card
        bg={"dark"}
        key={"dark"}
        text={"light"}
        style={{ width: "18rem" }}
        className="mb-2"
      >
        <Card.Header>Wallet Details</Card.Header>
        <Card.Body>
          <Card.Title>{wallet.name} </Card.Title>
          <Card.Text>Balance : {wallet.balance}</Card.Text>
          <Button onClick={() => navigate('/transactions')} variant="outline-primary">View all transactions</Button>
        </Card.Body>
      </Card>
      <Card
        bg={"dark"}
        key={"dark"}
        text={"light"}
        style={{ width: "18rem" }}
        className="mb-2"
      >
        <Card.Header>Make Transactions</Card.Header>
        <Card.Body>
          <Form.Group className="mb-3">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              min={1}
              value={amount ? amount : ""}
              step=".0001"
              onChange={(e) => {
                setAmount(Number(e.target.value));
              }}
              type="number"
              placeholder="Enter amount"
            />
          </Form.Group>

          <div className="d-flex justify-content-between">
            <TransactionTypeToggleButton
              selected={selected}
              setSelected={setSelected}
            />
            <Button
              disabled={amount === 0}
              onClick={() => {
                onSubmit(
                  selected === TransactionType.CREDIT ? amount : -amount
                );
                setAmount(0);
              }}
              variant="outline-primary"
            >
              Submit
            </Button>
          </div>
        </Card.Body>
      </Card>
    </CardGroup>
  );
};

export default Wallet;
