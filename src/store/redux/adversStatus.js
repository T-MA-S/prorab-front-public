import {createSlice} from "@reduxjs/toolkit";

let initialState = {
    status: 1,
    rerender: false,
}

const adversStatus = createSlice({
    name: "status",
    initialState,
    reducers: {
        toggleStatus(state, action){
            state.status = action.payload;
            console.log(state.status);
        },
        statusRerender(state){
            state.rerender = !state.rerender;
        }
    }
})

export default adversStatus;