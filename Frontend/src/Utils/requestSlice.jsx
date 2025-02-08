import { createSlice } from "@reduxjs/toolkit";

const requestSlice=createSlice({
    name:"requests",
    initialState:{
        requests:null,

    },
    reducers:{
        addRequests:(state,action)=>{
            state.requests=action.payload;

        },
        removeRequests:(state,action)=>{
            state.requests=null
        }
    }
})

export const {addRequests,removeRequests}=requestSlice.actions;

export default requestSlice.reducer;