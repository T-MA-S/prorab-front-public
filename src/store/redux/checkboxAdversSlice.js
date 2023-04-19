import {createSlice} from "@reduxjs/toolkit";

let initialState = {
    isCheckAll: false,
    checkedArr: [],
    lengthArr: 0,
}
const checkboxAdversSlice = createSlice({
    name: "checkbox",
    initialState,
    reducers:
        {
            toggleMainCheckbox(state, action) {
                const ids = action.payload
                if (state.checkedArr.length > 0 || state.isCheckAll) {
                    state.checkedArr = [];
                    state.isCheckAll = false;
                } else {
                    state.isCheckAll = true;
                    let newArr = [];
                    ids.map((el) => newArr.push(el));
                    state.checkedArr = newArr;
                }
                return state;
            },
            changeCheckboxes(state, action){
                const id = action.payload;
                state.isCheckAll = false;
                state.checkedArr = state.checkedArr.includes(id) ? state.checkedArr.filter((el) => el !== id) : [...state.checkedArr, id];
                console.log(state.checkedArr.length)
                 if(state.checkedArr.length === state.lengthArr){
                    state.isCheckAll = true;
                 }
            },
            resetStates(state, action){
                state.lengthArr = action.payload;
                state.checkedArr = [];
                state.isCheckAll = false;
            }
        }
});

export default checkboxAdversSlice;