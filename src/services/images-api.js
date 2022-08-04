import axios from 'axios';
import PropTypes from 'prop-types';

// const axios = require('axios');
const API_URL = 'https://pixabay.com/api/';

const API_KEY = '27971983-b3c7a3ee1797ece32c4360e82';

export default async function fetchImages(searchQuery, page) {
  const API_PARAMS = {
    key: API_KEY,
    q: searchQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 12,
    page,
  };
  const response = await axios.get(API_URL, {
    params: API_PARAMS,
  });
  console.log(response.data);
  return response.data;
}

fetchImages.propTypes = {
  searchQuery: PropTypes.string,
  page: PropTypes.number,
};
