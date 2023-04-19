import CardSvg from "./svg/CardSvg";
import BankSvg from "./svg/BankSvg";

const PaymentBody = props => {
    return(
        <div>
            <h5 className="title">Пополнить кошелек</h5>
            <div className="modal_title__sub">Выберите удобный для Вас способ:</div>

            <div className="modal_payments__buttons">
                <button className="payment_button payment_online" onClick={() => props.setModalCheck(3)}>
                    <div className="icon">
                        <CardSvg/>
                    </div>
                    <span>Онлайн</span>
                </button>
                <button className="payment_button payment_check" onClick={() => props.setModalCheck(2)}>
                    <div className="icon">
                        <BankSvg/>
                    </div>
                    <span>Расчетный счет</span>
                </button>
            </div>
        </div>
    )
}

export default PaymentBody;