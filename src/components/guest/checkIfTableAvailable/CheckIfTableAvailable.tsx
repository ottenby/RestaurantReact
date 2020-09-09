import React from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { IFormData } from "../GuestParent";
import { IBooking } from "../../admin/AdminParent";

export interface ICheckIfTableAvailableProps {
  formData: IFormData;
  earlyBookings?: IBooking[];
  lateBookings?: IBooking[];
  checkAvailability: () => void;
  checkValidation: () => void;
  updateFormValues: (
    e: React.ChangeEvent<HTMLInputElement>,
    id: keyof IFormData
  ) => void;
  validationMessage: () => void;
  showMessage: boolean;
  updateDate: (date: string) => void;
}

export default function CheckIfTableAvailable(props: ICheckIfTableAvailableProps) {

    function updateDate(e: Date) {
        let dateString =
        e.toLocaleDateString(undefined, {year: "numeric"}) + "-" +
        e.toLocaleDateString(undefined, { month: '2-digit' }) + "-" +
        e.toLocaleDateString(undefined, { day: '2-digit' });
        console.log(dateString);
        props.updateDate(dateString);
    };

    function showFullyBookedMessage() {
        if((props.earlyBookings && props.earlyBookings.length > 14) && (props.lateBookings && props.lateBookings.length > 14)) {
            return <div>Fullbokat</div>
        }
    };

  return (
      <>
      <h2>Välkommen till Purple Nurple</h2>
    <div className="booking-form" id="booking-form">
    <div><Calendar onClickDay={updateDate} /></div>
      <div className="input-and-button-wrapper">
        <input
            type="number"
            max="6"
            name="number-of-guests"
            placeholder="Antal gäster"
            className="num-of-guests"
            onChange={e => props.updateFormValues(e, "numberOfGuests")}
        />
        <button className="check-availability-button" onClick={() => props.checkValidation()}>
            Kolla efter lediga bord
        </button>
      </div>
    </div>
    <div>
      {showFullyBookedMessage()}
      {props.showMessage && props.validationMessage()}
    </div>
    </>
  );
}
