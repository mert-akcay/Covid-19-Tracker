import {createSlice} from '@reduxjs/toolkit'

const firstFourSlice = createSlice({
    name:'firstFour',
    initialState:{
        countryName : ['Global']
    },
    reducers:{
        setCases : (state,action) => {
            state.countryName = [action.payload]
        },

    }
})


export const {setCases} = firstFourSlice.actions;
export default firstFourSlice.reducer;