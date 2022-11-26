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


export function getNumberOfDaysInGivenMonth(year, monthName) {
    switch (monthName) {
        case "January":
            return 31;
        case "February":
            return (Number(year) % 4 === 0 && Number(year) % 100 !== 0) || Number(year) % 400 === 0 ? 29 : 28;
        case "March":
            return 31;
        case "April":
            return 30;
        case "May":
            return 31;
        case "June":
            return 30;
        case "July":
            return 31;
        case "August":
            return 31;
        case "September":
            return 30;
        case "October":
            return 31;
        case "November":
            return 30;
        case "December":
            return 31;
        default:
            return -1;
    }
}

function getMonthNumberFromMonthName(monthName) {
    switch (monthName) {
        case "January":
            return 1;
        case "February":
            return 2;
        case "March":
            return 3;
        case "April":
            return 4;
        case "May":
            return 5;
        case "June":
            return 6;
        case "July":
            return 7;
        case "August":
            return 8;
        case "September":
            return 9;
        case "October":
            return 10;
        case "November":
            return 11;
        case "December":
            return 12;
        default:
            return -1;
    }
}

export function getNameOfWeekDayByDate(year, month, day) {
    const nameOfTheWeekFromDate = new Date(year + "-" + getMonthNumberFromMonthName(month) + "-" + day)
        .toLocaleDateString("en-us", { weekday: 'short' });
    return nameOfTheWeekFromDate;
}