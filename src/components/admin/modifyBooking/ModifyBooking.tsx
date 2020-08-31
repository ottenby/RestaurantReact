import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { IBooking } from '../AdminParent';
    
    export function ModifyBooking() {

        const [oneBooking, setOneBooking] = useState<IBooking>();
        let {id} = useParams();

        useEffect(() => {
            axios.get("http://localhost:8000/admin/" + id).then(response => {
              let oneBooking: IBooking = response.data;
              setOneBooking(oneBooking);
            console.log(oneBooking)
            })
        },[id]);

        function deleteBooking() {
            axios.delete("http://localhost:8000/admin/delete/" + id).then(response => {
                console.log(response)
            })
        }

        return(
            <React.Fragment>
                <div>{oneBooking?.date} <button onClick={() =>{deleteBooking()}}>Ta bort bokning</button></div>
           </React.Fragment>
    
        )
    }
