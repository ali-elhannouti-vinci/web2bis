import "./Footer.css";

const Footer = (props:FooterProps) => (
    <footer>
        <div><h1>Version 2024-2025</h1></div>
    </footer>
)

interface FooterProps{
    children?:React.ReactNode
    urlLogo?:string
}
export default Footer;