export const getDateTimeAsString = (date: Date | number | undefined | null) => {
    if (!date) {
        return "";
    } else {
        const newDate: Date = new Date(date)
        return getDateAsString(newDate) + " " + newDate.toLocaleTimeString();
    }
}

export const getDateAsString = (date: Date | undefined | null) => {
    if (!date) {
        return "";
    } else {
        const newDate: Date = new Date(date)
        return newDate.toISOString().split('T')[0];
    }
}
