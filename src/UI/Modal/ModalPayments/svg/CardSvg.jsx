const CardSvg = () => {
    return(
        <svg xmlns="http://www.w3.org/2000/svg" width="37" height="26" fill="none">
            <path fill="url(#a)" d="M37 5.85V5.2C37 2.275 34.698 0 31.738 0H5.427C2.467 0 0 2.275 0 5.2v.65h37Z"/>
            <path fill="url(#b)" d="M0 7.475v13.163C0 23.724 2.467 26 5.427 26h26.31C34.698 26 37 23.725 37 20.8V7.637H0v-.162Zm10.195 13.813H4.44c-.493 0-.822-.326-.822-.813 0-.488.329-.813.822-.813h5.755c.494 0 .823.326.823.813 0 .487-.494.813-.823.813Z"/><defs>
            <linearGradient id="a" x1="0" x2="37" y1="26" y2="0" gradientUnits="userSpaceOnUse"><stop stopColor="#fff"/><stop offset="1" stopColor="#fff" stopOpacity=".5"/></linearGradient>
            <linearGradient id="b" x1="0" x2="37" y1="26" y2="0" gradientUnits="userSpaceOnUse"><stop stopColor="#fff"/><stop offset="1" stopColor="#fff" stopOpacity=".5"/></linearGradient>
        </defs>
        </svg>
    )
}

export default CardSvg;