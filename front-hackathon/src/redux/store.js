import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import authSlice from './slices/authSlice';
 
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'], 
};

const rootReducer = combineReducers({
    auth: authSlice, // No persistReducer here
  });
  
  const persistedReducer = persistReducer(persistConfig, rootReducer);
  
  
const store = configureStore({
  reducer: persistedReducer,
})

const persistor = persistStore(store)
export default store;
export { persistor };
