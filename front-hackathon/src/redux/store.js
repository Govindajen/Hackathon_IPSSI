import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';



const store = configureStore({
    reducer: {
        auth: authSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store