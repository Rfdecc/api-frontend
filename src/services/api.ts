import axios from 'axios'

import { SnackData } from '../interfaces/SnackData'
import { UserData } from '../interfaces/UserData'

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
})

export const getBurgers = () => api.get<SnackData[]>('/burgers')
export const getPizzas = () => api.get<SnackData[]>('/pizzas')
export const getDrinks = () => api.get<SnackData[]>('/drinks')
export const getIceCreams = () => api.get<SnackData[]>('/ice-creams')

export const getUsers = () => api.get<UserData[]>('/users')
export const saveUser = (user: UserData) => api.post<any>('/users', user)

export const saveOrder = (order: { username: string; order: SnackData[] }) =>
  api.post<any>('/orders', order)

export default api
