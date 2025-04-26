import { useState , useEffect } from 'react';
import Places from './Places.jsx';
import ErrorPage from './Error.jsx';
import sortPlacesByDistance from '../loc.js'
import { fetchAvailablePlaces } from '../http.js';

export default function AvailablePlaces({ onSelectPlace }) {
  // Fetch available places from backend API 
  const [isFetching , setIsFetching] = useState(false)
  const [availablePlaces , setAvailablePlaces] = useState([])
  const [error,setError] = useState()
   /* There is flaw in that http req sending this will create inifinite loop(executed everytime)
      A new req will be send when ever this component function executes
      SOLUTION : we need to wrap this code in useEffect to avoid infinite loops
   */
  useEffect(()=>{
    async function fetchPlaces(){
      setIsFetching(true)
      try {
         const places =  await fetchAvailablePlaces();
          navigator.geolocation.getCurrentPosition((position)=>{
            const sortedPlaces = sortPlacesByDistance(
              places, 
              position.coords.latitude,
              position.coords.longitude,
            );
            setAvailablePlaces(sortedPlaces)
            setIsFetching(false)
          })
          
       }catch(error){
        setError({
          message : 
          error.message || "Could not fetch places , please try again later.",
        })
      }
      setIsFetching(false)
    }
    fetchPlaces()
    //the useEffect executes immediately after this comp func executes but only if its depedency chnages
  },[]);

  if(error){
    return <ErrorPage title = "An error occurred!" message = {error.message} />
  }
   
  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading = {isFetching}
      loadingText = "Loading data ..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
