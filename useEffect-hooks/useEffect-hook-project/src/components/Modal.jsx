import {  useRef , useEffect } from 'react';
import { createPortal } from 'react-dom';

function Modal ({open, children ,onClose }) {
  const dialog = useRef();

  console.log('[Modal Rendered] open:', open);
  console.log('[Modal Rendered] dialog ref BEFORE useEffect:', dialog.current);

  useEffect(()=>{
    console.log('[useEffect 🔁] Running useEffect');
    console.log('[useEffect] open:', open);
    console.log('[useEffect] dialog ref:', dialog.current);
      if(open){
        console.log('[useEffect] calling showModal()');
        dialog.current.showModal()
      }
      else{
      console.log('[useEffect] calling close()');
      dialog.current.close()
      }
    },[open]
  )

  return createPortal(
    <dialog className="modal" ref={dialog}  onClose={onClose}>
      {children}
    </dialog>,
    document.getElementById('modal')
  );
};

export default Modal;


//use-case to use UseEffect
/*
  so how can we use useEffect to make sure that depending on the value of this open prop this dialog here is 
  shown or closed ??

  we are using the dialog ref to interact with jsx dialog but the first time this component executes this dialog 
  ref will not be set yet and therefore calling close fails initillay beacuse this ref is undefined

  UseEffect can help you syncronize state value or prop value  to DOM APIs and it executes after the compoennt executes
  the connection between ref dialog and jsx dialog will be esatblished at that time

*/