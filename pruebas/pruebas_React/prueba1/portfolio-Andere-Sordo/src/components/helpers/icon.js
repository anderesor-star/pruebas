import {
    faTrash, 
    faSignOutAlt, 
    faEdit, 
    faHurricane, 
    faFileCirclePlus
} from '@fortawesome/free-solid-svg-icons';
import {library} from '@fortawesome/fontawesome-svg-core';

const Icons = () => {
    return (library.add(faTrash, faSignOutAlt, faEdit, faHurricane, faFileCirclePlus));
};

export default Icons;