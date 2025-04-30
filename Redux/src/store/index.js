// Using react-redux (not Redux Toolkit)  
// import { createStore } from 'redux';
import { configureStore } from '@reduxjs/toolkit'; // Here using redux toolkit
import authReducer from './auth';
import counterReducer from './counter'


// Create store
const store = configureStore({
    reducer: {counter: counterReducer , auth: authReducer}
})

export default store;






// WE SPLIT IT INTO FILES


// const initialCounterState = {
//     counter:0 , 
//     showCounter : true,
// }
// const initialAuthState = {
//     isAuthenticated : false
// }

// const counterSlice =createSlice({
//    name : 'Counter',
//    initialState:initialCounterState,
//    reducers: {
//       increment(state){
//         state.counter ++;
//       },
//       decrement(state){
//         state.counter --;
//       },
//       increase(state,action){
//         state.counter = state.counter + action.payload;
//       },
//       toggleCounter(state){
//         state.showCounter = !state.showCounter;
//       }
//     }
// });

// const authSlice = createSlice({
//     name : 'Authentication',
//     initialState : initialAuthState,
//     reducers:{
//         login(state){
//            state.isAuthenticated = true;
//         },
//         logout(state){
//             state.isAuthenticated = false
//         }
//     }
// })



// // Reducer function
// const counterReducer = (state = {initialState}, action) => {
//   if (action.type === 'increment') {
//     return {
//       counter: state.counter + 1,
//       showCounter: state.showCounter
//     };
//   }
//   if (action.type === 'increase') {
//     return {
//       counter: state.counter + action.amount,
//       showCounter: state.showCounter
//     };
//   }
//   if (action.type === 'decrement') {
//     return {
//       counter: state.counter - 1,
//       showCounter: state.showCounter
//     };
//   }
//   if(action.type === 'toggle'){
//     return{
//        showCounter: !state.showCounter,
//        counter: state.counter
//     }
//   }
//   return state;
// };
