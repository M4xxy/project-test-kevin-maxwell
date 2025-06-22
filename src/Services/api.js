import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const getIdeas = (params) => {
  return apiClient.get('/ideas', {
    params: {
      'page[number]': params.pageNumber,
      'page[size]': params.pageSize,
      'append[]': ['small_image', 'medium_image'],
      'sort': params.sort,
    }
  });
};