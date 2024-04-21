/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "react-query";
import axios from "axios";
import { newYorkTimesSource } from "../db/data";

export const useSourceQuery = () => {
 const fetchData = async () => {
   let combinedResults: any = [];
   combinedResults = combinedResults.concat(newYorkTimesSource);
   // Fetch data from the first API
   try {
     const response1 = await axios.get(
       import.meta.env.VITE_NEWS_API_URL + "/sources",
       {
         params: {apiKey: import.meta.env.VITE_NEWS_API_KEY }
       }
     );

     combinedResults = combinedResults.concat(response1.data.sources);
   } catch (error) {
     console.error("Error in News API request:", error);
   }

   // Fetch data from the second API
   try {
     const response2 = await axios.get(
       import.meta.env.VITE_GUARDIANS_API_URL + "/editions",
       {
         params: {
           "api-key": import.meta.env.VITE_GUARDIANS_API_KEY
         }
       }
     );

     combinedResults = combinedResults.concat(response2.data.response.results);
   } catch (error) {
     console.error("Error in Guardians API request:", error);
   }

   return combinedResults;
 };
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["source"],
    queryFn: fetchData,
  });
  return {
    data,
    isLoading,
    isError,
    refetch,
  };
};
