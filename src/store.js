import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './CartSlice';

 const store = configureStore({
    reducer: {
        cart: cartReducer,
    },
},window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
export default store
