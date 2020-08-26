import React from 'react';
import { Form } from '../components/from/Form';
import { GuestTables } from '../components/guestTables/GusetTables';

export function GuestView() {

    return(
        <React.Fragment>
            <Form></Form>
            <GuestTables></GuestTables>
        </React.Fragment>
    )
}