import React, { useState } from "react";
import { ButtonGroup, ToggleButton } from "react-bootstrap";
import { TransactionType } from "../pages/Home";

type Props = {
  selected: TransactionType;
  setSelected: (val: TransactionType) => void;
};

const TransactionTypeToggleButton = ({ selected, setSelected }: Props) => {
  return (
    <ButtonGroup>
      <ToggleButton
        key={TransactionType.CREDIT}
        id={`radio-${TransactionType.CREDIT}`}
        type="radio"
        variant="outline-success"
        name={TransactionType.CREDIT}
        value={TransactionType.CREDIT}
        checked={selected === TransactionType.CREDIT}
        onChange={() => setSelected(TransactionType.CREDIT)}
      >
        {TransactionType.CREDIT}
      </ToggleButton>
      <ToggleButton
        key={TransactionType.DEBIT}
        id={`radio-${TransactionType.DEBIT}`}
        type="radio"
        variant="outline-danger"
        name={TransactionType.DEBIT}
        value={TransactionType.DEBIT}
        checked={selected === TransactionType.DEBIT}
        onChange={() => setSelected(TransactionType.DEBIT)}
      >
        {TransactionType.DEBIT}
      </ToggleButton>
    </ButtonGroup>
  );
};

export default TransactionTypeToggleButton;
