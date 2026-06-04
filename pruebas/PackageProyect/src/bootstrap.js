import moment from "moment";

const rightNow = moment();

console.log(rightNow);


const cumple = moment('2006-09-19', 'YYYY-MM-DD');

console.log(cumple.format('dddd'));
console.log(cumple.fromNow());


const enDosSemanas = moment().add(14, 'days');

console.log(enDosSemanas.toString());