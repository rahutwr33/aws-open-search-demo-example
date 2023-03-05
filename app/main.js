import searchMovie from "./es";
import searchTextHL from 'search-text-highlight'

const parseData = (data) => {
  const totalRecord = data?.hits?.total?.value;
  const record = data.hits.hits;
  const timeTaken = data?.took
  const result = [];
  for (let index = 0; index < record?.length; index++) {
    const element = record[index];
    result.push(element._source);
  }
  return {
    result,
    totalRecord,
    timeTaken
  };
};

const transformRecord = (record,keyword) =>{
    const finalString = []
    record.forEach(val => {
        finalString.push({
          title: searchTextHL.highlight(val.title, keyword),
          genres: searchTextHL.highlight(val.genres.replace(/|/g, ' '), keyword)
        })
    });
    return finalString
}

export const searchMovies = async (keyword) => {
  const response = await searchMovie(keyword);
  const parseResponse = parseData(response.data);
  let transformrecord = []
  if(parseResponse?.result?.length){
    transformrecord = transformRecord(parseResponse.result, keyword)
  }
  return {transformrecord, totalRecord: transformrecord.length,  timeTaken: parseResponse.timeTaken};
};
