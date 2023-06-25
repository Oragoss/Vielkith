export default class Util {    
    constructor() {}
    
    daysBetween(startDate, endDate) {
        let millisecondsPerDay = 24 * 60 * 60 * 1000;
        return (this.treatAsUTC(endDate) - this.treatAsUTC(startDate)) / millisecondsPerDay;
   }

   treatAsUTC(date) {
        let result = new Date(date);
        result.setMinutes(result.getMinutes() - result.getTimezoneOffset());
        return result;
    }
}