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

        return(
            <React.Fragment>
                <div>{oneBooking?.date}</div>
           </React.Fragment>
    
        )
    }
