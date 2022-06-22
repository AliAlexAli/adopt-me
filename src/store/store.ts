import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import petReducer from "./petSlice";

const store = configureStore({
  reducer: {
    pet: petReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
