import {configureStore} from "@reduxjs/toolkit";
import checkboxAdversSlice from './checkboxAdversSlice'
import adversStatus from './adversStatus'
import calendar from './calendar'

const store = configureStore({
    reducer: {
        checkboxes: checkboxAdversSlice.reducer,
        status: adversStatus.reducer,
        calendar: calendar.reducer,
    }
})

export const checkboxAction = checkboxAdversSlice.actions;
export const statusAction = adversStatus.actions;
export const calendarAction = calendar.actions;

export default store;