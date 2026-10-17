import {
    faTrash, 
    faSignOutAlt, 
    faEdit, 
    faHurricane, 
    faFileCirclePlus,
    faEnvelope,
    faPhoneVolume,
    faHashtag,
    faLocationDot,
    faUserLock,
    faCircleUser
} from '@fortawesome/free-solid-svg-icons';
import {library} from '@fortawesome/fontawesome-svg-core';

const Icons = () => {
    return (library.add(
        faTrash, 
        faSignOutAlt, 
        faEdit, 
        faHurricane, 
        faFileCirclePlus, 
        faEnvelope,
        faPhoneVolume,
        faHashtag,
        faLocationDot,
        faUserLock,
        faCircleUser
    ));
};

export default Icons;