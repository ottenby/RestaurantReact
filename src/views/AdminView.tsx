import React from 'react';
import { ModifyBooking } from '../components/admin/modifyBooking/ModifyBooking';
import { Tables } from '../components/admin/tables/Tables';


export function AdminView() {


    return(
        <React.Fragment>
            <ModifyBooking></ModifyBooking>
            <Tables></Tables>
        </React.Fragment>
    )
}