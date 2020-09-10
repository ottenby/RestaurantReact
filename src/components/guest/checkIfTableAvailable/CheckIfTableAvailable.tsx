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

    //Funktion som omvandlar datum av typen Date i react-calendar, till string
    function updateDate(e: Date) {
        let dateString =
        e.toLocaleDateString(undefined, {year: "numeric"}) + "-" +
        e.toLocaleDateString(undefined, { month: '2-digit' }) + "-" +
        e.toLocaleDateString(undefined, { day: '2-digit' });
        props.updateDate(dateString);
    };
    //Funktion som returneras om det finns 15 eller fler bokningar på valt datum och tid
    function showFullyBookedMessage() {
        if((props.earlyBookings && props.earlyBookings.length >= 14) && (props.lateBookings && props.lateBookings.length >= 14)) {
            return <div>Fullbokat, sök gärna på nytt datum!</div>
        }
    };

    //Skriver ut vår HTML
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
    <div className="message-wrapper">
      {showFullyBookedMessage()}
      {/*Om props.showMessage är true så kommer valideringen att skrivas ut. Den blir true så fort man använder sig av våra input fält men
      inte skriver in all nödvändig information*/}
      {props.showMessage && props.validationMessage()}
    </div>
    </>
  );
}
