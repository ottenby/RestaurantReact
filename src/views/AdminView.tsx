import React from 'react';

import { Admin} from '../components/admin/Admin';
import { InfoTabel } from '../components/infoTable/InfoTabel';

export function AdminView() {


    return(
        <React.Fragment>
            <Admin></Admin>
            <InfoTabel></InfoTabel>
        </React.Fragment>
    )
}