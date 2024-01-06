const time = '2024-01-06T08:26';

const date = new Date(time);
console.log('date',date);

date.setTime(date.getTime() + 1000*60*60*9);
console.log('date',date);
