import axios from "axios";

const baseUrl = 'http://localhost:3001/persons';

const getAll = async () => {
    return axios.get(baseUrl).then(response => response.data)
}

const create = async (newperson) => {
    return axios.post(baseUrl, newperson).then(response => response.data)
}

const deletePhonebook = async (id) => {
    const url = `${baseUrl}/${id}`;
    return axios.delete(url).then(response => response.statusText);
}

const update = async (id, updatePhonebook) => {
    const url = `${baseUrl}/${id}`;
    return axios.put(url, updatePhonebook).then(response => response.data)
}

const services = {
    getAll,
    create,
    deletePhonebook,
    update
}
export default services;