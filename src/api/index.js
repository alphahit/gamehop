/* eslint-disable prettier/prettier */
import axios from 'axios';


const axiosCreate = axios.create({
    baseURL:'https://api.rawg.io/api',
    params: {
        key: 'f4c322b2b61048dc8efca03de26767cf'
      }
});

export const getGamesList = async () => {
    try {
      const response = await axiosCreate.get('/games');
      return response.data.results;  
    } catch (error) {
      console.error('Error fetching games:', error);
      return [];  
    }
  };