import React from "react";
import { IFormData } from "../GuestParent";

export interface ICheckIfTableAvailableProps {
  formData: IFormData;
  checkAvailability: () => void;
  updateFormValues: (
    e: React.ChangeEvent<HTMLInputElement>,
    id: keyof IFormData
  ) => void;
}

export default function CheckIfTableAvailable(
  props: ICheckIfTableAvailableProps
) {
  return (
    <div id="booking-form">
      <input
        type="date"
        name="date"
        placeholder="Date"
        onChange={e => props.updateFormValues(e, "date")}
      />
      <input
        type="number"
        max="6"
        name="number-of-guests"
        placeholder="Number of guests"
        className="num-of-guests"
        onChange={e => props.updateFormValues(e, "numberOfGuests")}
      />
      <button onClick={() => props.checkAvailability()}>
        Check for available tables
      </button>
    </div>
  );
}
