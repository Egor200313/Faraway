import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ajaxMainService } from '../../service/ajaxService';

const initialState = {
  tickets: [],
};

export const getTickets = createAsyncThunk(
  'tickets/getTickets',
  async (_, { rejectWithValue, dispatch }) => {
    ajaxMainService(`/tickets/`).then((data) => {
      dispatch(setTickets(data));
    });
  }
);

export const ticketSlice = createSlice({
  name: 'ticket',
  initialState,
  reducers: {
    setTickets: (state, action) => {
      state.tickets = action.payload;
    },
  },
});

export const { setTickets } = ticketSlice.actions;
export default ticketSlice.reducer;
