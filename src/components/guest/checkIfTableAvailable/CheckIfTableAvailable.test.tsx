import { render } from "@testing-library/react";
import React from "react";
import CheckIfTableAvailable  from "./CheckIfTableAvailable";

let testFunction = jest.fn();
let testFunctionCheckAvailability = jest.fn();
let testUpdateFormValues=jest.fn();
let testValidationMessage =jest.fn();

let formDataObject = {
    date: "2020-09-12",
    numberOfGuests: "5",
    phone: "0728883399",
    email: "hej@hej.se",
}

let testshowMessage=true

let earlyBookingObject =[ {
    amountOfGuests: "6",
    customerId:"1",
    _id:"2",
    time: "18.30",
    date: "2020-09-22",
    bookingActive: true,
    bookingFinished: true,
}]


let lateBookingObject = [{
    amountOfGuests: "6",
    customerId:"1",
    _id:"2",
    time: "18.30",
    date: "2020-09-22",
    bookingActive: true,
 bookingFinished: true,
}]

    test("renders CreateBooking works text", () => {
    

    
    
        const { getByText } = render(<CheckIfTableAvailable  showMessage={testshowMessage} formData={formDataObject} checkValidation={testFunction}  validationMessage={testValidationMessage} checkAvailability={testFunctionCheckAvailability} updateFormValues={testUpdateFormValues} earlyBookings={earlyBookingObject}
            lateBookings={lateBookingObject}/>)
        
        const h1Element = getByText(/Välkommen till purple-nurple/i);
    
        expect(h1Element).toBeInTheDocument();


        
    });

