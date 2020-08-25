import React from 'react';
import { Form } from '../components/from/Form';
import { Tables } from '../components/guestTables/GusetTables';

export function GuestView() {

    return(
        <React.Fragment>
            <Form></Form>
            <Tables></Tables>
        </React.Fragment>
    )
}