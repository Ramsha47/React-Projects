import { useEffect , useState } from "react";

export function useFetch(fetchFn,initialValue){

    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState();
    const [fetchedData,seFetchedData]=useState(initialValue)

    useEffect(() => {
        async function fetchData() {
          setIsFetching(true);
          try {
            const data = await fetchFn();
            seFetchedData(data);
          } catch (error) {
            setError({ message: error.message || 'Failed to fetch data.' });
          }
    
          setIsFetching(false);
        }
    
        fetchData();
      }, [fetchFn]);

      return{
        isFetching,
        error,
        seFetchedData,
        fetchedData
      }
}