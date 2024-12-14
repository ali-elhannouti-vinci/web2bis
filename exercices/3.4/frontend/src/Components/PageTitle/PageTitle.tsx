import './PageTitle.css';
const PageTitle = (props: PageTitleProps) => {
    return <h1>{props.title}</h1>;
};

interface PageTitleProps {
    title: string;
}

export default PageTitle;