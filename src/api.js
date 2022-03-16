import axios from 'axios';

export const getPosts = () => {
    return axios.get('https://jsonplaceholder.typicode.com/posts').then(response => response.data);
}

export const getUsers = () => {
    return axios.get('https://jsonplaceholder.typicode.com/users').then(response => response.data);
}
