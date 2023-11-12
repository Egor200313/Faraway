import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ajaxService, ajaxTicketService } from '../../service/ajaxService';

const initialState = {
  flights: [],
  complete: 0,
};

export const getFlights = createAsyncThunk(
  'flights/getFlights',
  async (params, { dispatch }) => {
    dispatch(setComplete(0));

    ajaxTicketService(`/search/?` + new URLSearchParams(params)).then(
      (data) => {
        dispatch(setFlights(data));
        dispatch(setComplete(100));
      }
    );
  }
);

export const flightSlice = createSlice({
  name: 'flights',
  initialState,
  reducers: {
    setFlights: (state, action) => {
      state.flights = action.payload;
    },
    setComplete: (state, action) => {
      state.complete = action.payload;
    },
  },
  extraReducers: {
    [getFlights.fulfilled]: (state) => {
      console.log('success');
    },
    [getFlights.pending]: (state) => {
      console.log('pending');
    },
    [getFlights.rejected]: (state) => console.log('rejected'),
  },
});

export const { setFlights, setComplete } = flightSlice.actions;
export default flightSlice.reducer;
