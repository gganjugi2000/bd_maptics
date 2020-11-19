import moment from 'moment';

export function changeFormat (date, format) {
    if (moment(date).isValid()){
        return moment(date).format(format);
    } else {
        return null;
    }
}

