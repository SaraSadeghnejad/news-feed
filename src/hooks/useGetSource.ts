import { useMutation } from "react-query";
import axios from "axios";
interface SourceProps {
  sourceTerm: string;
}
export const useGetSource = ({ sourceTerm }: SourceProps) => {
  const fetchData = async () => {
    let combinedResults: string[] = [];
    // Fetch data from the first API
    try {
      const response1 = await axios.get(
        import.meta.env.VITE_NEWS_API_URL + "/top-headlines",
        {
          params: {
            source: sourceTerm,
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
            q: sourceTerm,
            "api-key": import.meta.env.VITE_GUARDIANS_API_KEY
          }
        }
      );

      combinedResults = combinedResults.concat(response2.data.response.results);
    } catch (error) {
      console.error("Error in Guardians API request:", error);
    }

    //Fetch data from the third API
    try {
      const response3 = await axios.get(
        import.meta.env.VITE_NYTIMESTIME_ARTICLE_SEARCH_API_URL,
        {
          params: {
            fq: sourceTerm,
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
  const { data, isLoading, isError, mutate } = useMutation(fetchData);
  return {
    data,
    isLoading,
    isError,
    mutate
  };
};
