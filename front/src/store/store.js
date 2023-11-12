import { configureStore } from '@reduxjs/toolkit';
import flightSlice from '../features/flights/flightSlice';
import offerSlice from '../features/offers/offerSlice';
import searchSlice from '../features/search/searchSlice';
import ticketSlice from '../features/tickets/ticketSlice';
import userSlice from '../features/user/userSlice';

export const store = configureStore({
  reducer: {
    search: searchSlice,
    flight: flightSlice,
    offer: offerSlice,
    user: userSlice,
    ticket: ticketSlice,
  },
  devtools:
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__(),
});
