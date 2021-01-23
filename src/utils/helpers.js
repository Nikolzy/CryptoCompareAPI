export function transformDate (value) {
    const date = new Date(value);

    const year = date.getFullYear();
    const month = correctDate(date.getMonth() + 1);
    const day = date.getDate();

    const hours = correctDate(date.getHours())
    const minutes = correctDate(date.getMinutes())
    const seconds = correctDate(date.getSeconds())

    return `${day}.${month}.${year} - ${hours}:${minutes}:${seconds}`
}

export function correctDate (value) {
    return value < 10 ? `0${value}` : value;
}

export function chunkArray (value, chunk) {
    const array = [];
    for (let i = 0; i < value.length; i += chunk) {
        array.push(value.slice(i, i + chunk));
    }
    return array;
}