import axios, { AxiosResponse } from 'axios';
import { Hotel } from '../model/Hotel';

axios.defaults.baseURL = 'http://localhost:5000/api';

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const randomNumber = 5;
const imageWidth = 480;
const imageHeight = 480;
const collectionID = 1163637;

const requests = {
    get: <T>(url: string) => axios.get<T>(url),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
}

const Hotels = {
    hotelsList: (params: any) => requests.post<Hotel[]>(`/hotels`, params),
    photos: () => requests.get<string>(`https://source.unsplash.com/collection/${collectionID}/${imageWidth}x${imageHeight}/?sig=${randomNumber}`)
}

const Agent = {
    Hotels
}

export default Agent;