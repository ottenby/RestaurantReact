import React from 'react';
import { Tables } from '../components/admin/tables/Tables';
import { GuestParent } from '../components/guest/GuestParent';


export function GuestView() {

    return(
        <React.Fragment>
            <GuestParent></GuestParent>
            <Tables></Tables>
        </React.Fragment>
    )
}