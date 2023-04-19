import "../cabinet.sass";

const CabinetSocToggle = (props) => {
    return (
        <div className="info_soc_toggle" key={props.key}>
            <div className={`info_soc_block ${props.className}`}>
                {props.src && <img src={props.src} alt="" />}

                <label className="switch" >
                    <input type="checkbox" onChange={props.toggle} checked={props.checked}/>
                    <span className="slider round"></span>
                </label>

                {props.text && <p>{props.text}</p>}
            </div>
        </div>
    );
};

export default CabinetSocToggle;
