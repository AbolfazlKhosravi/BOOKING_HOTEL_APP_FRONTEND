// import axios from "axios";
// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";

// interface FetchResult {
//   data: string;
//   isLoading: boolean;
// }

// function usePostData<T>(URL: string, query: string = ""): FetchResult<T> {
//   const [message, setMessage] = useState<string>("");
//   const [isLoading, setIsLoading] = useState<boolean>(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setIsLoading(true);
//         const {data} = await axios.post<string>(`${URL}${query}`);
//         setMessage(data);
//       } catch (error) {
//         setData(null);
//         if (error instanceof Error) {
//           toast.error(error?.message || "An error occurred.");
//         } else {
//           console.error("An unknown error occurred");
//         }
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchData();
//   }, [URL, query]);

//   return { data, isLoading };
// }

// export default usePostData;
