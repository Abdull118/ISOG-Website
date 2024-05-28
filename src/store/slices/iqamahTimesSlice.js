// iqamahTimesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for fetching prayer times
export const fetchPrayerTimes = createAsyncThunk(
  'iqamahTimes/fetchPrayerTimes',
  async () => {
    const response = await fetch(`/api/prayers`);
    const data = await response.json();
    return data; // Return the prayer times data
  }
);

// Initial state
const initialState = {
  fajr: null,
  dhuhr: null,
  asr: null,
  maghrib: null,
  isha: null,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// Slice
const iqamahTimesSlice = createSlice({
  name: 'iqamahTimes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPrayerTimes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPrayerTimes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.fajr = action.payload.fajr;
        state.dhuhr = action.payload.dhuhr;
        state.asr = action.payload.asr;
        state.maghrib = action.payload.maghrib;
        state.isha = action.payload.isha;
      })
      .addCase(fetchPrayerTimes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

// Export the reducer
export default iqamahTimesSlice.reducer;
