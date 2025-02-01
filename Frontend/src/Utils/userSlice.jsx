import { createSlice } from "@reduxjs/toolkit";





const userSlice=createSlice({
    name:'user',
    initialState:{
      isAuthenticated:false,
      user:null
    },
    reducers:{
        addUser:(state,action)=>{
            state.isAuthenticated=true;
            state.user=action.payload
        },
        removeUser:(state,action)=>{
            state.isAuthenticated=false
            state.user=null
        },
        setIsAuthenticated:(state,action)=>{
            isAuthenticated=action.payload;
        }
    }
})

export const {addUser,removeUser,setIsAuthenticated}=userSlice.actions;
export default userSlice.reducer;