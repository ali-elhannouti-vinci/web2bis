import "./CinemaHeader.css";

const Header = (props:HeaderProps) => (
    <header>
        <img src={props.urlLogo} alt="logo" />
    </header>
)

interface HeaderProps{
    children?:React.ReactNode
    urlLogo:string
}

export default Header;