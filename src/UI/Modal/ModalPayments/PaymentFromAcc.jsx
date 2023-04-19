import RequestRubleSvg from "../ModalSvg/RequestRubleSvg";

const PaymentFromAcc = () => {
    return(
        <>
            <h5 className="title">Расчетный счет</h5>
            <div className="modal_title__sub">Введите сумму:</div>

            <div className="input input_payment">
                <div className="icon">
                    <RequestRubleSvg />
                </div>
                <input type="text"
                       placeholder="Введите стоимость"
                />
            </div>
            <button className='payment__button_apply'>
                Отправить
            </button>

            <div className="payment_info_text">
                Нажимая на кнопку "Отправить", вы принимаете условия <span> </span>
                <a href="/userTerm" target="_blank">публичной оферты</a> <span> </span>
                и даете согласие на обработку <span> </span>
                <a href="/agreement"> персональных данных</a>.
            </div>
        </>
    )
}

export default PaymentFromAcc;