import axios from "axios";
const searchMovie = async (keyword) => {
  let url = process.env.ESNODE+'/movies/_search'
  try {
    const query = {
      query: {
        match_phrase_prefix: {
          title: keyword
        },
      },
    };
    const response = await axios.post(
      url,
      query,
      { 
        headers:{
          'Content-type': 'application/json'
        },
        auth: {
          username: process.env.USERNAME,
          password: process.env.PASSWORD
        },
      }
    );
    return response;
  } catch (error) {
    return error;
  }
};

export default searchMovie;
