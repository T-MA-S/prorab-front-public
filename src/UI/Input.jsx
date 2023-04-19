import React from "react";

const Input = React.forwardRef(( props ,ref) => {
    return(
        <div className={props.classNameParent}>
            {props.h6 &&
                <h6>{props.h6}</h6>
            }
            {props.srcLeft &&
                <div className="iconLeft">
                    <img src={props.srcLeft} alt="" />
                </div>
            }
            {props.className === 'textarea' ?
                <textarea
                    className={props.className}
                    placeholder={props.placeholder}
                    ref={ref}
                    defaultValue={props.defaultValue}
                    onChange={props.onChange}/>
                :
                <input
                    className={props.className}
                    type={props.type}
                    placeholder={props.placeholder}
                    ref={ref}
                    defaultValue={props.defaultValue}
                    onChange={props.onChange}/>
            }
            {props.src &&
                <div className="icon">
                    <img src={props.src} alt="" />
                </div>
            }
        </div>
    )
})

export default Input;