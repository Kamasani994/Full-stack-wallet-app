import React, { useState } from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";

type Props = {
  onSubmit: ({ name, amount }: { name: string; amount: number }) => {};
  initializing: boolean;
};

const InitializeWallet = ({ onSubmit, initializing }: Props) => {
  const [form, setForm] = useState({
    name: "",
    amount: 0,
  });

  const { name, amount } = form;

  const changeValue = (e: any) => {
    const { name, value } = e.target;
    setForm((val) => ({ ...val, [name]: value }));
  };

  return (
    <div>
      <FloatingLabel
        controlId="floatingTextarea"
        label="Username"
        className="mb-3"
      >
        <Form.Control
          name="name"
          onChange={changeValue}
          value={name}
          type="text"
          placeholder="Enter username"
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingTextarea2" label="Amount">
        <Form.Control
          min={0}
          name="amount"
          type="number"
          onChange={changeValue}
          value={amount}
          placeholder="Amount"
        />
      </FloatingLabel>
      <Button
        disabled={initializing}
        className="mt-2"
        onClick={() => {
          onSubmit(form);
        }}
        variant="primary"
        type="submit"
      >
        Submit
      </Button>
    </div>
  );
};

export default InitializeWallet;
