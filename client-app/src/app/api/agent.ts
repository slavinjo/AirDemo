import axios, { AxiosResponse } from 'axios';
import { Hotel } from '../model/Hotel';

axios.defaults.baseURL = 'http://localhost:5000/api';

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T>(url: string) => axios.delete<T>(url).then(responseBody)
}

const Hotels = {
    hotelsList: (params: any) => requests.post<Hotel[]>(`/hotels`, params),
    list: () => requests.get<Hotel[]>('/hotels'),
    details: (id: string) => requests.get<Hotel>(`/activities/${id}`),
    create: (hotel: Hotel) => requests.post<Hotel>(`/activities`, hotel),
    update: (hotel: Hotel) => requests.put<void>(`/activities/${hotel.name}`, hotel),
    delete: (id: string) => requests.del<void>(`/activities/${id}`)
}

const Agent = {
    Hotels
}

export default Agent;