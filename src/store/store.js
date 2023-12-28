import { configureStore } from '@reduxjs/toolkit';
import prayerTimesReducer from './slices/prayerTimesSlice';
import iqamahTimesReducer from './slices/iqamahTimesSlice';

export const store = configureStore({
  reducer: {
    prayerTimes: prayerTimesReducer,
    iqamahTimes: iqamahTimesReducer
  },
});

export default store;
