import { useRef, useState } from 'react';

import Places from './components/Places.jsx';
import { AVAILABLE_PLACES } from './data.js';
import Modal from './components/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import logoImg from './assets/logo.png';
import { sortPlacesByDistance } from './loc.js';
import { useEffect } from 'react';

function App() {
  const [modalIsOpen , setModalIsOpen] = useState(false)
  const selectedPlace = useRef();
  const [AvailablePlaces, setAvailablePlaces] = useState([])
  const [pickedPlaces, setPickedPlaces] = useState([]);

  // Lesson no 1:
  // React will execute this use effect after the function component is done executing
  // use Effect is a solution to infinite problem of side effect
  useEffect(()=>{
    //get the location users website  this func will be called by th browser(sideffect)
      navigator.geolocation.getCurrentPosition((position)=>{
        const sortedplaces = sortPlacesByDistance(
          AVAILABLE_PLACES,
          position.coords.latitude,
          position.coords.longitude
      );
      setAvailablePlaces(sortedplaces)
    });
  },[]); //with empty dependecies this use effect will execute only once after the component execution is done

  function handleStartRemovePlace(id) {
    setModalIsOpen(true)
    selectedPlace.current = id;
  }

  function handleStopRemovePlace() {
   setModalIsOpen(false)
  }

  // Lesson no 2: Not all side effects requires usage of useEffect
  // This storage here is totally unrelated 
  // we cant use use Effect in inside of func we use it at root level
  /* we also dont need use Effect here bcz this code executed when some user click
     on handleSelectPlace  and this code does not get the problem of infinite loop 
     bcz we are not updating any state here 
  */
  
  function handleSelectPlace(id) {
    setPickedPlaces((prevPickedPlaces) => {
      if (prevPickedPlaces.some((place) => place.id === id)) {
        return prevPickedPlaces;
      }
      const place = AVAILABLE_PLACES.find((place) => place.id === id);
      return [place, ...prevPickedPlaces];
    });
    // we want to store the selected places in browser storage
    const storedIds = JSON.parse(localStorage.getItem('selectedPlaces')) || []
    // Also want to ensure that the exisiting ids dont store again in this list
    if(storedIds.indexOf(id)=== -1){
      localStorage.setItem(
          'selectedPlaces', 
          JSON.stringify([id , ...storedIds])
      );
    }
    
  }

  function handleRemovePlace() {
    setPickedPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current)
    );
    setModalIsOpen(false)
  }

  return (
    <>
      <Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        <Places
          title="I'd like to visit ..."
          fallbackText={'Select the places you would like to visit below.'}
          places={pickedPlaces}
          onSelectPlace={handleStartRemovePlace}
        />
        <Places
          title="Available Places"
          places={AVAILABLE_PLACES}
          fallbackText="Sorting places by distance ..."
          onSelectPlace={handleSelectPlace}
        />
      </main>
    </>
  );
}

export default App;