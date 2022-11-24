import List from './List'
import './App.css';
import {useRef,useState} from 'react';


function App() {
const val=useRef();
const [list,setList]=useState([]);



const submitHandler=(e)=>{
  e.preventDefault();
  // list.push(val.current.value);
  const newList = [ val.current.value ,...list];
  setList(newList);
}

const deleteHadler=(val)=>{
  console.log(val);
  const newList = list.filter((e)=>e!==val);
  console.log(newList);
  setList(newList);
}

const editHandler=(val)=>{

}


  return (
    <div className="App">
      <form onSubmit={submitHandler}>
        <label>Enter Your Actions</label><br/>
        <input ref={val}/><br/>
    <button >add</button><br/>
      </form>
    { list.map((e)=>{
      console.log(e);
      return<List list={e} date={new Date()} delete={deleteHadler} edit={editHandler}/>
    })}
      

    </div>
  );
}

export default App;
