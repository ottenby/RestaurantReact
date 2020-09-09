import { render, fireEvent } from "@testing-library/react";
import React from "react";
import CheckIfTableAvailable  from "./CheckIfTableAvailable";




test("renders CreateBooking works text", () => {
    let testFunction = jest.fn();

    let formDataObject = {
        date: "2020-09-12",
        numberOfGuests: "5",
        phone: "0728883399",
        email: "hej@hej.se",
    }

    const { getByText } = render(<CheckIfTableAvailable formData={formDataObject} checkValidation={testFunction}/>)
       
 
    const h1Element = getByText(/Välkommen till purple-nurple/i);
  
    expect(h1Element).toBeInTheDocument();
  });

