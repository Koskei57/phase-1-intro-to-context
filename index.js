// Your code here
let createEmployeeRecord = function(employee) {
    return {
        firstName: employee[0],
        familyName: employee[1],
        title: employee[2],
        payPerHour: employee[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(rows) {
    return rows.map((records) => {
        return createEmployeeRecord(records)
    })
}

function createTimeInEvent(employeeObject, dateStamp) {
    const [date, hour] = dateStamp.split("")
    employeeObject.timeInEvents.push({
        type: 'TimeIn',
        hour: parseInt(hour, 10),
        date,
    })
    return employeeObject;
}

function createTimeOutEvent(employeeObject, dateStamp) {
    const [date, hour] = dateStamp.split("")
    employeeObject.timeOutEvents.push({
        type: 'TimeIn',
        hour: parseInt(hour, 10),
        date,
    })
    return employeeObject;

}

function hoursWorkedOnDate(employeeObject, dateGiven) {
    let timeIn = employeeObject.timeInEvents.find(event =>
        event.date == dateGiven)
    let timeOut = employeeObject.timeOutEvents.find(event =>
        event.date == dateGiven)
    let totalTime = (timeOut.hour - timeIn.hour) / 100
    return totalTime;
}

function wagesEarnedOnDate(employeeObject, dateGiven) {
    let hours = hoursWorkedOnDate(employeeObject, dateGiven)
    return employeeObject.payPerHour * hours;
}

function allWagesFor(employeeObject) {
    return employeeObject.timeInEvents.reduce((total, event) => {
        return total + wagesEarnedOnDate(employeeObject, event.date)

    }, 0)
}

function calculatePayroll(employeeRecord) {
    return employeeRecord.reduce((total, employee) =>

        { return total + allWagesFor(employee) }, 0)
}