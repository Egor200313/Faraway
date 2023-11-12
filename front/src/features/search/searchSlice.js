import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  from: '',
  to: '',
  class: '',
  date: '',
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setInput: (state, action) => {
      state[action.payload.field] = action.payload.value;
    },
    resetInput: (state, action) => {
      state = initialState;
    },
  },
});

export const {setInput, resetInput } =
  searchSlice.actions;
export default searchSlice.reducer;
