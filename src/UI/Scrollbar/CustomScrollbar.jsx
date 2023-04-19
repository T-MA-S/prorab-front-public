import { Scrollbars } from "react-custom-scrollbars-2";

function renderThumb({ style, ...props }) {
    const thumbStyle = {
        background: "#546EDB",
        borderRadius: "20px",
    };
    return <div style={{ ...style, ...thumbStyle }} {...props} />;
}

function renderThumbHorizontal({ style, ...props }) {
    const thumbStyle = {
        background: "#B6BFE7",
        borderRadius: "20px",
        width: '100%',
        bottom: '0'
    };
    return <div style={{ ...style, ...thumbStyle }} {...props} />;
}

function renderTrack({ style, ...props }) {
    const track = {
        background: "#E7EAF5",
        borderRadius: "20px",
        height: "100%",
        right: "0",
    };
    return <div style={{ ...style, ...track }} {...props} />;
}

function renderTrackHorizontal({ style, ...props }) {
    const track = {
        background: "#546EDB",
        borderRadius: "20px",
        right: "0",
    };
    return <div style={{ ...style, ...track }} {...props} />;
}

const CustomScrollbar = (props) => {
    return (
        <Scrollbars
            style={props.style}
            renderThumbVertical={renderThumb}
            autoHide
            renderTrackVertical={props.renderTrack || renderTrack}
        >
            {props.children}
        </Scrollbars>
    );
};
export const CustomScrollbarHorizontal = (props) => {
    return (
        <Scrollbars
            style={props.style}
            renderTrackHorizontal={renderThumbHorizontal}
            renderThumbHorizontal={renderTrackHorizontal}
        >
            {props.children}
        </Scrollbars>
    );
};

export default CustomScrollbar;
