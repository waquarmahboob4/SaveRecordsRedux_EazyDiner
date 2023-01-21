import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DataType } from "../View";
export interface CreateState {
  userData: DataType[];
}

const initialState: CreateState = {
  userData: [],
};

const createPageSlice = createSlice({
  name: "userDataSaved",
  initialState,
  reducers: {
    addUserDetails(state, action: PayloadAction<DataType>) {
      const { key, name, gender, email, mobile, technology, profilePicture } =
        action.payload;

      const fromData = {
        key,
        name,
        gender,
        email,
        mobile,
        technology,
        profilePicture,
      };
      fromData.key=state.userData.length+1;
      state.userData.push(fromData);
    },
    viewDetails(state){

         return state
    }
  },
});

export const { addUserDetails, viewDetails } = createPageSlice.actions;
export default createPageSlice.reducer;
