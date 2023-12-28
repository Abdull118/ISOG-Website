import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

function convertTo12Hour(oldFormatTime) {
  var oldFormatTimeArray = oldFormatTime.split(":");

  var HH = parseInt(oldFormatTimeArray[0]);
  var min = oldFormatTimeArray[1];

  var AMPM = HH >= 12 ? "PM" : "AM";
  HH = HH % 12;  // Convert hour to 12-hour format
  HH = HH ? HH : 12; // If hour is 0, set it to 12

  // Pad the hour with a 0 if it's less than 10
  var hours = HH < 10 ? "0" + HH : HH;

  var newFormatTime = hours + ":" + min + " " + AMPM;
  return newFormatTime;
}


function convertTo12Hour2(oldFormatTime) {

  var oldFormatTimeArray = oldFormatTime.split(":");

  var HH = parseInt(oldFormatTimeArray[0]);
  var min = oldFormatTimeArray[1];

  var AMPM = HH >= 12 ? "PM" : "AM";
  var hours;
  if(HH == 0){
    hours = HH + 12;
  } else if (HH > 12) {
    hours = HH - 12;
  } else {
    hours = HH;
  }
  var newFormatTime = hours + ":" + min + " " + AMPM;
  return(newFormatTime)
}

// Async thunk for fetching prayer times from the Aladhan API
export const fetchAthanTimes = createAsyncThunk(
  'prayerTimes/fetchAthanTimes',
  async () => {
    try {
      const response = await fetch(`https://api.aladhan.com/v1/timingsByCity?city=Guelph&country=Canada&method=2`);
      const json = await response.json();
      return json.data.timings; // Return the prayer times data
    } catch (error) {
      throw error;
    }
  }
);

// Initial state
const initialState = {
  fajrAthan: null,
  shuruq: null,
  dhurAthan: null,
  asrAthan: null,
  maghribAthan: null,
  ishaAthan: null,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const prayerTimesSlice = createSlice({
  name: 'prayerTimes',
  initialState,
  reducers: {
    // Reducers to manually set each prayer time (if needed)
    setFajrAthan: (state, action) => {
      state.fajrAthan = action.payload;
    },
    setShuruq: (state, action) => {
      state.shuruq = action.payload;
    },
    setDhurAthan: (state, action) => {
      state.dhurAthan = action.payload;
    },
    setAsrAthan: (state, action) => {
      state.asrAthan = action.payload;
    },
    setMaghribAthan: (state, action) => {
      state.maghribAthan = action.payload;
    },
    setIshaAthan: (state, action) => {
      state.ishaAthan = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAthanTimes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAthanTimes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Convert and update state with the fetched prayer times
        state.fajrAthan = convertTo12Hour(action.payload.Fajr);
        state.shuruq = convertTo12Hour2(action.payload.Sunrise);
        state.dhurAthan = convertTo12Hour(action.payload.Dhuhr);
        state.asrAthan = convertTo12Hour(action.payload.Asr);
        state.maghribAthan = convertTo12Hour(action.payload.Maghrib);
        state.ishaAthan = convertTo12Hour(action.payload.Isha);
      })
      .addCase(fetchAthanTimes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

// Export actions
export const {
  setFajrAthan,
  setShuruq,
  setDhurAthan,
  setAsrAthan,
  setMaghribAthan,
  setIshaAthan,
} = prayerTimesSlice.actions;

// Export the reducer
export default prayerTimesSlice.reducer;
