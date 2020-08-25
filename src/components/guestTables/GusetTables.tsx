
import React from 'react';
import { Table } from "../../models/Table";
import  './Tables.css';


export function Tables() {

    let tables: Table[] = [
        {
            tableNumber: '1',
            firstSitting: {
                id: '23',
                guestName: 'Love',
                numOfPeople: '3',
                guestId: '1',
                active: true,
                done: false,
                booked: true
            },
            secondSitting: {
                id: '13',
                guestName: 'Ullis',
                numOfPeople: '4',
                guestId: '2',
                active: false,
                done: false,
                booked: true     
            }
        },
        {
            tableNumber: '2',
            firstSitting: {
                id: '12',
                guestName: 'Maria',
                numOfPeople: '5',
                guestId: '3',
                active: true,
                done: false,
                booked: true  
            },
            secondSitting: {
                id: '98',
                guestName: 'Sebastian',
                numOfPeople: '1',
                guestId: '4',
                active: false,
                done: false,
                booked: true     
            }  
        },
        {
            tableNumber: '3',
            firstSitting: {
                id: '',
                guestName: '',
                numOfPeople: '0',
                guestId: '',
                active: false,
                done: false,
                booked: false  
            },
            secondSitting: {
                id: '22',
                guestName: 'Gert',
                numOfPeople: '2',
                guestId: '5',
                active: true,
                done: false,
                booked: true    
            }
        },
        {
            tableNumber: '4',
            firstSitting: {
                id: '33',
                guestName: 'Lundberg',
                numOfPeople: '6',
                guestId: '7',
                active: true,
                done: false,
                booked: true  
            },
            secondSitting: {
                id: '',
                guestName: '',
                numOfPeople: '0',
                guestId: '',
                active: false,
                done: false,
                booked: false  
            }  
        },
        {
            tableNumber: '5',
            firstSitting: {
                id: '',
                guestName: '',
                numOfPeople: '0',
                guestId: '',
                active: false,
                done: false,
                booked: false  
            },
            secondSitting: {
                id: '',
                guestName: '',
                numOfPeople: '0',
                guestId: '',
                active: false,
                done: false,
                booked: false  
            }  
        },
        {
            tableNumber: '6',
            firstSitting: {
                id: '',
                guestName: '',
                numOfPeople: '0',
                guestId: '',
                active: false,
                done: false,
                booked: false  
            },
            secondSitting: {
                id: '',
                guestName: '',
                numOfPeople: '0',
                guestId: '',
                active: false,
                done: false,
                booked: false  
            }  
        },
        {
            tableNumber: '7',
            firstSitting: {
                id: '19',
                guestName: 'Vivi',
                numOfPeople: '5',
                guestId: '8',
                active: true,
                done: false,
                booked: false  
            },
            secondSitting: {
                id: '',
                guestName: '',
                numOfPeople: '0',
                guestId: '',
                active: false,
                done: false,
                booked: false  
            }  
        },
        {
            tableNumber: '8',
            firstSitting: {
                id: '',
                guestName: '',
                numOfPeople: '',
                guestId: '',
                active: false,
                done: false,
                booked: false  
            },
            secondSitting: {
                id: '',
                guestName: '',
                numOfPeople: '',
                guestId: '',
                active: false,
                done: false,
                booked: false  
            }  
        }
    ];

    let tableElements = tables.map((table)=> {
       
        return(
            <div className="table" key={table.tableNumber}>
                <h3> {`table nr. ${table.tableNumber}`} </h3>
                <div className="first-sitting sitting table-active">
                <h5>18.00</h5>
                    <p> {` ${table.firstSitting.guestName} - id: ${table.firstSitting.guestId}`} </p>
                    <p>{` ${table.firstSitting.numOfPeople}/6 `}</p>
                </div>

                <div className="second-sitting sitting table-active">
                    <h5>20.30</h5>
                    <p> {` ${table.secondSitting.guestName} - id: ${table.secondSitting.guestId}`} </p>

                    <p>{` ${table.secondSitting.numOfPeople}/6 `}</p>
                </div>

            </div>
            
        )
    }) 
 

    return(
        <React.Fragment>
            <div className="floor"> {tableElements} </div>
        </React.Fragment>
    )
}