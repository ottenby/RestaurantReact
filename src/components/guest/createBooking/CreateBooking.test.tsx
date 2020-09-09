import { render } from "@testing-library/react";
import React from "react";
import { CreateBooking } from "./CreateBooking";

  let testFunction = jest.fn();
   
    let formDataObject = {
        date: "2020-09-12",
        numberOfGuests: "5",
        phone: "0728883399",
        email: "hej@hej.se",
    }

   let earlyBookingObject =[ {
        amountOfGuests: "6",
        customerId:"1",
        _id:"2",
        time: "18.30",
        date: "2020-09-22",
        bookingActive: true,
        bookingFinished: true,
   }]

   let guestList= [
       {
        _id: '123abc',
        name: 'Linda Lindenstein',
        phone: '076555333',
        email: 'lindacool@gmail.com',
       },{
        _id: 'gjh654',
        name: 'Oscar Angel',
        phone: '073567092',
        email: 'Oscar666@gmail.com'
        }
   ]

   let bookings = [{
        amountOfGuests: '2',
        customerId: '456cba',
        _id: '567hjg',
        time: '20.30',
        date: '2020-04-19',
        bookingActive: false,
        bookingFinished: false
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
    
        const { getByText ,container } = render(<CreateBooking 
            formData={formDataObject}  
            setBookings={testFunction}  
            updateBookings={testFunction} 
            earlyBookings={earlyBookingObject}
            lateBookings={lateBookingObject}
            guestList= {guestList}
            bookings= {bookings}
        />)
            
        let buttonElement =container.querySelector("button")

        const divElement = getByText(/Jag godkänner att mina personuppgifter lagras/i);
    
        expect(divElement).toBeInTheDocument();
        expect(buttonElement).toBeInTheDocument();

    });

    test("Find the button", () => {
    
        const { container } = render(<CreateBooking 
            formData={formDataObject}  
            setBookings={testFunction}  
            updateBookings={testFunction} 
            earlyBookings={earlyBookingObject}
            lateBookings={lateBookingObject}
            guestList= {guestList}
            bookings= {bookings}
        />)
            
        let buttonElement =container.querySelector("button")
    
        expect(buttonElement).toBeInTheDocument();

    });

    
