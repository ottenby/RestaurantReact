import './Tables.css'
import React from 'react';
import { IBooking } from '../AdminParent';

interface IpropsTable{
    bookings:IBooking[]
    earlyBookings?:IBooking[]
    lateBookings?:IBooking[]
    checkAvailability: () => void;
  
}


export function Tables(props:IpropsTable) {
 
 

    let tableEarlyBookings= props.earlyBookings?.map((table, i=parseInt(table.customerId))=> {
           
        return(
            <div className="table" key={i}>
                
                <div className="first-sitting sitting table-active">
                <h3>Tidig sittning</h3>
                    <h4> {`Datum: ${table.date}`} </h4>
                    <h5> {`Tid: ${table.time}`}</h5>
                    <h5> {`Gäster: ${table.amountOfGuests}/6`}</h5>
                    <p> {`- id:  ${table.customerId}`} </p>
                </div>
            </div>
            
        )
    }) 


    let tablelateBookings = props.lateBookings?.map((table, i=parseInt(table.customerId))=> {
       
 
           
        return(
            <div className="table" key={i}>
              
                <div className="first-sitting sitting table-active">
                    <h4>Sen sittning</h4>
                    <h5> {`Datum: ${table.date}`} </h5>
                    <h5> {`Tid: ${table.time}`}</h5>
                    <h5> {`Gäster: ${table.amountOfGuests}/6`}</h5>
                    <p> {`- id:  ${table.customerId}`} </p>
            

                </div>
            </div>
            
        )
    }) 
 
 

    return(
        <React.Fragment>
  
               <button onClick={() => props.checkAvailability()}>Bokningar</button> 
                <div> {tableEarlyBookings} </div> 
                <div> {tablelateBookings}</div>
        </React.Fragment>
    )
}