import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface FetchResult<T> {
  data: T[];
  isLoading: boolean;
}

function useFetch<T>(URL: string, query: string=""): FetchResult<T> {
  const [data, setData] = useState<Array<T>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get<T[]>(`${URL}?${query}`);
        setData(data);
      } catch (error) {
        setData([]);
        if (error instanceof Error) {
          toast.error(error?.message || "An error occurred.");
        } else {
          console.error("An unknown error occurred");
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [URL, query]);

  return { data, isLoading };
}

export default useFetch;
