import { render, fireEvent } from "@testing-library/react";
import React from "react";
import CheckIfTableAvailable  from "./CheckIfTableAvailable";




test("renders CreateBooking works text", () => {
    
    const { getByText } = render(<CheckIfTableAvailable/>)
       
 
    const h1Element = getByText(/Välkommen till purple-nurple/i);
  
    expect(h1Element).toBeInTheDocument();
  });

