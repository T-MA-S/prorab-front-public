import { createSlice} from "@reduxjs/toolkit";
import moment from "moment/moment";


let initialState = {
    calendarFront: [],
    calendarBack: [],
    calendarSaved: [],
    weekends: false,
    fromCalendarSvg: false, // доделать в будущем
}


const calendar = createSlice({
    name: 'calendar',
    initialState,
    reducers: {
        getDates(state, action){
            if(!state.calendarFront.includes(action.payload)){
                state.calendarFront.push(action.payload);
            }else{
                state.calendarFront = state.calendarFront.filter(item => item !== action.payload);
            }
        },
        sendMassiveToBackend(state){
            state.calendarBack = [];
            state.calendarSaved = [];
            state.calendarFront.map((item) => {
                return state.calendarSaved.push(item)
            })
            state.calendarFront.map((item) => {
                return state.calendarBack = [...state.calendarBack, {
                    date: moment(item).format("YYYY-MM-DD"),
                    duration: 1
                }]
            })
        },
        workOnWeekends(state, action){
            state.weekends = action.payload;
        },
        cancelCalendar(state){
            state.calendarBack = [];
            state.calendarFront = [];
            state.calendarSaved = [];
        },
        closeCalendar(state){
            state.calendarFront = [];
                state.calendarSaved.map(item => {
                    state.calendarFront.push(item)
                })
        },
        fromBackToFront(state, action){
            action.payload?.map(item => {
                 state.calendarFront.push(
                    Number(new Date(item.date_from))
                )
            })
        },
        modalFetchBoolean(state, action){
            state.fromCalendarSvg = action.payload;
        }
    }
})

export default calendar;