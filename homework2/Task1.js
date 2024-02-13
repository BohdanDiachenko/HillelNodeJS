import axios from "axios";

const urls = [
    'https://jsonplaceholder.typicode.com/users?_limit=3',
    'https://fakestoreapi.com/users?limit=3',
    'https://api.escuelajs.co/api/v1/users?limit=3'
];

async function fetchData(url) {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error(`Error fetching data from ${url}: ${error.message}`);
        throw error; 
    }
}

async function getAllDataByArrayUrls(arrayUrls) {
    const results = [];

    for (const url of arrayUrls) {
        try {
            const data = await fetchData(url);
            results.push(data);
        } catch (error) {
            console.log(error);
        }
    }

    console.log(results);
}

getAllDataByArrayUrls(urls);
