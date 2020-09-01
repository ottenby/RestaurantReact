import React from "react";
import { IFormData } from "../GuestParent";
import { IBooking } from "../../admin/AdminParent";

export interface ICheckIfTableAvailableProps {
  formData: IFormData;
  earlyBookings?: IBooking[];
  lateBookings?: IBooking[];
  checkAvailability: () => void;
  updateFormValues: (
    e: React.ChangeEvent<HTMLInputElement>,
    id: keyof IFormData
  ) => void;
}

export default function CheckIfTableAvailable(
  props: ICheckIfTableAvailableProps
) {

    function showFullyBookedMessage() {
        if((props.earlyBookings && props.earlyBookings?.length > 14) && (props.lateBookings && props.lateBookings?.length > 14)) {
            return <div>Fullbokat</div>
        }
    }

  return (
    <>
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
        placeholder="Antal gäster"
        className="num-of-guests"
        onChange={e => props.updateFormValues(e, "numberOfGuests")}
      />
      <button onClick={() => props.checkAvailability()}>
        Check for available tables
      </button>
    </div>
    <div>{showFullyBookedMessage()}</div>
    </>
  );
}
