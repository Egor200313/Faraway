import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ajaxMainService } from '../../service/ajaxService';

const initialState = {
  offers: [],
};

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

export const getOffers = createAsyncThunk(
  'offers/getOffers',
  async (_, { dispatch }) => {
    ajaxMainService(`/offers/`).then((data) => {
      shuffle(data);
      dispatch(setOffers(data));
    });
  }
);

export const offerSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    setOffers: (state, action) => {
      state.offers = action.payload;
    },
  },
  extraReducers: {
    [getOffers.fulfilled]: (state) => {
      console.log('success');
    },
    [getOffers.pending]: (state) => {
      console.log('pending');
    },
    [getOffers.rejected]: (state) => console.log('rejected'),
  },
});

export const { setOffers } = offerSlice.actions;
export default offerSlice.reducer;
