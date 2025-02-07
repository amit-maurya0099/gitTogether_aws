import { createSlice } from "@reduxjs/toolkit";


const connectionSlice=createSlice({
    name:"connections",
    initialState:{
        connections:null,
    },
    reducers:{
       addConnections:(state,action)=>{
        state.connections=action.payload;
       },
       removeConnections:(state,action)=>{
        state.connections=null;
       }
    }
})

export const {addConnections,removeConnections}=connectionSlice.actions;

export default connectionSlice.reducer;