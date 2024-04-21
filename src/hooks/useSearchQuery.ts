/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "react-query";
import axios from "axios";


interface SearchProps {
  searchTerm: string;
}
export const useSearchQuery = ({
  searchTerm,

}: SearchProps) => {
 
  const fetchData = async () => {
    let combinedResults: any= [];

    // Fetch data from the first API
    try {

      const response1 = await axios.get(
        import.meta.env.VITE_NEWS_API_URL + "/everything",
        {
          params: {
            q: searchTerm,
            apiKey: import.meta.env.VITE_NEWS_API_KEY
          }
        }
      );

      combinedResults = combinedResults.concat(response1.data.articles);
    } catch (error) {
      console.error("Error in News API request:", error);
    }
      
    
    // Fetch data from the second API
    try {
       
      const response2 = await axios.get(
        import.meta.env.VITE_GUARDIANS_API_URL + "/search",
        {
          params: {
            q: searchTerm,
            "api-key": import.meta.env.VITE_GUARDIANS_API_KEY
          }
        }
      );

      combinedResults = combinedResults.concat(response2.data.response.results);
    } catch (error) {
      console.error("Error in Guardians API request:", error);
    }

    // Fetch data from the third API
    try {
      const response3 = await axios.get(
        import.meta.env.VITE_NYTIMESTIME_ARTICLE_SEARCH_API_URL,
        {
          params: {
            q: searchTerm,
            "api-key": import.meta.env.VITE_NYTIMESTIME_ARTICLE_SEARCH_API_KEY
          }
        }
      );

      combinedResults = combinedResults.concat(response3.data.response.docs);
    } catch (error) {
      console.error("Error in NY Times API request:", error);
    }

    return combinedResults;
  };
  const { data, isLoading, isError, refetch,isRefetching } = useQuery({
    queryKey: ["multipleApis"],
    queryFn: fetchData
  });
  return {
    data,
    isLoading,
    isError,
    refetch,
    isRefetching
  };
};
