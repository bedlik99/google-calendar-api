window.standardRequestConfig = {
    url: undefined,
    params: {
        method: 'GET',
        body: undefined,
        headers: {
            'Content-Type': 'application/json'
        }
    }
};

window.addScriptToHtmlHead = (url, type) => {
    const htmlHeaders = Array.from(document.head.children);
    let doesHeaderExists = false, htmlHeaderSrcSubpath;
    for (const htmlHeader of htmlHeaders) {
        if (htmlHeader.src === undefined) {
            continue;
        }
        htmlHeaderSrcSubpath = String(htmlHeader.src).split("/")
            .filter((el, index) => index > 2)
            .map(el => el = "/" + el)
            .toString()
            .replace(new RegExp(",/", 'g'), "/");
        if (htmlHeader.type === type && url === htmlHeaderSrcSubpath) {
            doesHeaderExists = true;
            break;
        }
    }

    if (!doesHeaderExists) {
        const script = document.createElement('script');
        script.type = type;
        script.src = url;
        document.head.appendChild(script);
    }
}

const monthsDetails = new Map()
    .set("January", { orderNum: 1, numberOfDays: 31, previousMonth: null, nextMonth: "February" })
    .set("February", { orderNum: 2, numberOfDays: undefined, previousMonth: "January", nextMonth: "March" })
    .set("March", { orderNum: 3, numberOfDays: 31, previousMonth: "February", nextMonth: "April" })
    .set("April", { orderNum: 4, numberOfDays: 30, previousMonth: "March", nextMonth: "May" })
    .set("May", { orderNum: 5, numberOfDays: 31, previousMonth: "April", nextMonth: "June" })
    .set("June", { orderNum: 6, numberOfDays: 30, previousMonth: "May", nextMonth: "July" })
    .set("July", { orderNum: 7, numberOfDays: 31, previousMonth: "June", nextMonth: "August" })
    .set("August", { orderNum: 8, numberOfDays: 31, previousMonth: "July", nextMonth: "September" })
    .set("September", { orderNum: 9, numberOfDays: 30, previousMonth: "August", nextMonth: "October" })
    .set("October", { orderNum: 10, numberOfDays: 31, previousMonth: "September", nextMonth: "November" })
    .set("November", { orderNum: 11, numberOfDays: 30, previousMonth: "October", nextMonth: "December" })
    .set("December", { orderNum: 12, numberOfDays: 31, previousMonth: "November", nextMonth: null });

export function getNumberOfDaysInGivenMonth(year, monthName) {
    if (monthName === "February") {
        return (Number(year) % 4 === 0 && Number(year) % 100 !== 0) || Number(year) % 400 === 0 ? 29 : 28;
    }
    return monthsDetails.get(monthName).numberOfDays;
}

export function getNameOfWeekDayByDate(year, month, day) {
    const nameOfTheWeekFromDate = new Date(year + "-" + monthsDetails.get(month).orderNum + "-" + day)
        .toLocaleDateString("en-us", { weekday: 'short' });
    return nameOfTheWeekFromDate;
}

export function getNextOrPreviousMonthName(currentMonth, directionFlag) {
    if (directionFlag) {
        return monthsDetails.get(currentMonth).nextMonth;
    }
    return monthsDetails.get(currentMonth).previousMonth;
}