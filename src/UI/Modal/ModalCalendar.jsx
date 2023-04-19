import {ru} from "date-fns/locale";
import {Calendar} from "react-nice-dates";
import {useContext} from "react";
import ModalCloseSvg from "./ModalSvg/ModalCloseSvg";
import ModalsContext from "../../store/modals-context";
import ButtonModal from "../Button/Button";
import SvgApply from "../Svg/SvgApply";
import SvgCancel from "../Svg/SvgCancel";
import {getDay, isSameDay} from "date-fns";
import {useDispatch, useSelector} from "react-redux";
import {calendarAction} from "../../store/redux";


const ModalCalendar = props => {
    const ctx = useContext(ModalsContext);

    const dispatch = useDispatch();
    const selector = useSelector(state => state.calendar)

    let modifiers = {
        disabled: (date) => date < new Date(new Date().setDate(new Date().getDate() - 1)) || (!selector.weekends ? getDay(date) === 6 || getDay(date) === 0 : null), // Disables past days
        selected: date => selector.calendarFront.some(selectedDate => isSameDay(selectedDate, date))
    };

    const handleDayClick = date => {
        let dates = +date;
        dispatch(calendarAction.getDates(dates));
    }


    const modifiersClassNames = {
        highlight: "-highlight",
    };


    const saveCalendar = async (event) => {
        event.preventDefault();
        await dispatch(calendarAction.sendMassiveToBackend())
        await ctx.closeModal();
    };

    const cancelCalendar = async (event) => {
        event.preventDefault();
        dispatch(calendarAction.cancelCalendar());
        // await ctx.closeModal();
    }


    return(

        <div className="modal modal_5">
            <div className="closeModal" onClick={async () => {
                await dispatch(calendarAction.closeCalendar())
                await ctx.closeModal()
            }}>
                <ModalCloseSvg />
            </div>
            <h5 className="title">Изменить дату работы</h5>
            <div className="look-calendar">
                <Calendar
                    locale={ru}
                    onDayClick={handleDayClick}
                    modifiers={modifiers}
                    modifiersClassNames={modifiersClassNames}
                />
            </div>
            <div className="not_working_day">
                <label className="container">
                    <span className="not_working_day_text">
                        Нерабочие дни (отметить)
                    </span>
                    <input type="checkbox" checked={true}/>
                        <span className="checkmark"></span>
                </label>
            </div>

            <div className="buttons__modal_calendar">
                <ButtonModal onClick={saveCalendar} className="btn_save" svg={<SvgApply />}>Сохранить</ButtonModal>
                <ButtonModal onClick={cancelCalendar} className="btn_cancel" svg={<SvgCancel />}>Отменить</ButtonModal>
            </div>
        </div>
    )
}

export default ModalCalendar;