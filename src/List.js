const List=(props)=>{

const deleteHandler=()=>{
    props.delete(props.list);
}


    return(<div>
    <p>{props.list}{props.date.getDate()}/{props.date.getMonth()}/{props.date.getFullYear()}</p>
    <button>Edit</button>
    <button onClick={deleteHandler}> Delete</button>
    </div>); 
    
}

export default List;