function MovieComponent({title: title, director, duration, imageUrl, description, budget}: MovieProps) {
    return (
        <ul>
            <li><strong>Title:</strong> {title}</li>
            <li><strong>Director:</strong> {director}</li>
            <li><strong>Duration:</strong> {duration} minutes</li>
            {imageUrl && <li><img src={imageUrl}></img></li>}
            {description && <li><strong>Description:</strong> {description}</li>}
            {budget && <li><strong>Budget:</strong> ${budget.toLocaleString()}</li>}
        </ul>
    );
}

interface MovieProps {
    title:string,
    director:string,
    duration:number,
    imageUrl?:string,
    description?:string,
    budget?:number
}
export default MovieComponent;