import Cookies from "universal-cookie";
import { createSlice } from "@reduxjs/toolkit";
import Pet from "../services/dto/Pet";

export interface filters {
  name?: Pet["name"];
  sex?: Pet["sex"];
  size?: Pet["size"];
  favorite?: boolean;
}

const initialState: {
  data: Pet[];
  filteredData: Pet[];
  filters: filters;
  owner: string;
} = {
  data: [],
  filters: {},
  filteredData: [],
  owner: "",
};

const petSlice = createSlice({
  name: "pet",
  initialState,
  reducers: {
    setData(state, action) {
      state.data = action.payload;
      state.filteredData = filterData(state.data, state.filters, state.owner);
    },
    setOwner(state, action) {
      state.owner = action.payload;
      state.filteredData = filterData(state.data, state.filters, state.owner);
    },
    applyFilters(state, action) {
      state.filters = { ...state.filters, ...action.payload };
      state.filteredData = filterData(state.data, state.filters, state.owner);
    },
    clearFilters(state) {
      state.filters = {};
      state.filteredData = filterData(state.data, state.filters, state.owner);
    },
  },
});

const filterData = (data: Pet[], filters: filters, owner: string) => {
  return data.filter((e) => {
    let acceptable = true;

    if (!!owner) {
      acceptable = e.owner === owner;
    }

    if (filters.favorite) {
      const cookies = new Cookies();
      if (!cookies.get("favorites")) return false;
      acceptable = acceptable && cookies.get("favorites").includes(e.id);
    }

    if (filters.name)
      acceptable =
        acceptable && e.name.toLowerCase().includes(filters.name.toLowerCase());

    if (filters.sex) acceptable = acceptable && e.sex === filters.sex;

    if (filters.size) acceptable = acceptable && e.size === filters.size;

    return acceptable;
  });
};

export const { applyFilters, clearFilters, setData, setOwner } =
  petSlice.actions;
export default petSlice.reducer;
