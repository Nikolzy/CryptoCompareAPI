import {chunkArray, transformDate} from "@/utils/helpers";

export async function getCoinNames () {
    const url = 'https://min-api.cryptocompare.com/data/blockchain/list';
    const API_KEY = 'f9fa984c86c2d934edff8143cb905e0cb38d16a2b1465e567b8cef2a5c00dd67';

    let response = await fetch(`${url}?api_key=${API_KEY}`);
    let { Data } = await response.json();

    return Object.keys(Data).slice(100,120);
}

export async function getCoinInfo (coinNames) {
    const url = 'https://min-api.cryptocompare.com/data/blockchain/mining/calculator';
    const API_KEY = 'f9fa984c86c2d934edff8143cb905e0cb38d16a2b1465e567b8cef2a5c00dd67';

    let response = await fetch(`${url}?fsyms=${coinNames}&tsyms=USD&api_key=${API_KEY}`);
    const { Data } = await response.json();
    const array = Object.entries(Data).map(el => el[1]);

    return chunkArray(array, Math.ceil(array.length/4));
}

export async function getChartData (coinName) {
    const url = 'https://min-api.cryptocompare.com/data/v2/histoday';

    let response = await fetch(`${url}?fsym=${coinName}&tsym=USD&limit=130`);
    let { Data } = (await response.json()).Data;

    return Data.reduce((ac,el) => {
        ac.dates.push(transformDate(el.time))
        ac.data.push(el.open)
        return ac;
    }, { dates: [], data: [], coinName })
}