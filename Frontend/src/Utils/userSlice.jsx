import { createSlice } from "@reduxjs/toolkit";





const userSlice=createSlice({
    name:'user',
    initialState:{
      isAuthenticated:false,
      user:null,
      isLoading:false
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
        setIsLoading:(state,action)=>{
            state.isLoading=action.payload;
        }
       
    }
})

export const {addUser,removeUser,setIsLoading}=userSlice.actions;
export default userSlice.reducer;