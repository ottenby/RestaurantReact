import { Sitting } from "./Sitting";


export class Table {
    tableNumber: string = '';
    firstSitting: Sitting = {
        id: '', 
        guestName: '', 
        numOfPeople: '', 
        guestId: '', 
        active: false, 
        done: false, 
        booked: false
    };
    secondSitting: Sitting = {
        id: '', 
        guestName: '', 
        numOfPeople: '', 
        guestId: '', 
        active: false, 
        done: false, 
        booked: false
    };
    
}