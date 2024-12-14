import "./Footer.css";

const Footer = ({theme}:FooterProps) => {
    return(
    <footer className={theme+"-theme"}>
        <div><h1>Version 2024-2025</h1></div>
    </footer>
    )
}

interface FooterProps{
    children?:React.ReactNode
    urlLogo?:string
    theme:string,
}
export default Footer;