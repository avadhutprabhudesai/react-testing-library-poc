import React, { ChangeEventHandler, useState } from 'react';

type Props = {
  min?: number;
  max?: number;
};

export default function FavouriteNumber({ min = 1, max = 100 }: Props) {
  const [number, setNumber] = useState<number>(0);
  const [numberEntered, setNumberEntered] = useState<boolean>(false);
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setNumber(+e.target.value);
    setNumberEntered(true);
  };
  const isValid = numberEntered && number >= min && number <= max;
  return (
    <>
      <label htmlFor="fav-number">Enter number</label>
      <input
        id="fav-number"
        type="number"
        value={number}
        onChange={handleChange}
      />
      {isValid ? <p role="alert">Number is valid</p> : null}
    </>
  );
}
