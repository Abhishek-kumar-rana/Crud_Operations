
import { useEffect, useState } from 'react';
import './App.css'
import {MdClose} from "react-icons/md"
import axios from "axios"
import FormTable from './components/Formtable';

axios.defaults.baseURL = "https://crud-server-sand-ten.vercel.app/"
//8080 server port no. running on, 

function App() {

  const [addsection,setaddsection]= useState
  (false);

  const [editsection,seteditsection]=useState(false);
  const [formdata,setformdata]=useState({
    name:"",
    email:"",
    mobile:"",
  })
  const [formdataedit,setformdataedit]=useState({
    name:"",
    email:"",
    mobile:"",
    _id: ""
  })

  const [datalist,setdatalist]=useState([])

  const handleOnchange = (e)=>{
    const {value,name} = e.target
    setformdata((prev)=>{
      return{
        ...prev,
        [name]:value
      }
    })
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    const data = await axios.post("/create",formdata);

    // console.log(data);
    if(data.data.success){
      setaddsection(false);
    }
    // alert(data.data.message);
    getfetchdata()
  }

  //before display the data , fethch the data;
  const getfetchdata = async()=>{
    const data = await axios.get("/")
    // console.log(data);
    if(data.data.success){
      setdatalist(data.data.data);
      //if(data.data==true) store all the data in usestate
    }
  }
  useEffect(()=>{
    getfetchdata()
  },[])
// console.log(datalist);

const handledelete = async (id)=>{
  const data = await axios.delete("/delete/"+id);
  // alert(data.data.message);
  getfetchdata()
}

const handleUpdate = async(e)=>{
  e.preventDefault();
  const data= await axios.put("/update",formdataedit);
  if(data.data.success){
    getfetchdata()
  // alert(data.data.message);
  seteditsection(false);
  }

}
 
const handleEditOnchange=async(e)=>{

  const {value,name} = e.target
    setformdataedit((prev)=>{
      return{
        ...prev,
        [name]:value
      }
    })
}

const handleedit = (el)=>{
  setformdataedit(el);
  seteditsection(true)
}
  return (
    <>

    <div className='container'>
    <button className=' btn-add' onClick={()=>setaddsection(true)}>Add</button>

    <div  >
    {
      addsection && (
       <FormTable
       handleSubmit={handleSubmit}
       handleOnchange={handleOnchange}
       handleclose={()=>setaddsection(false)}
       rest={formdata}
       />
      )
    }
    {
      editsection && (
        <FormTable
        handleSubmit={handleUpdate}
        handleOnchange={handleEditOnchange}
        handleclose={()=>seteditsection(false)}
        rest={formdataedit}
        />
      )
    }

    <div className="tablecontainer">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>
              
            </th>
          </tr>
        </thead>
        <tbody>
          { datalist[0] ?(
            datalist.map((el)=>{
              return(
                <tr>
                  <td>{el.name}</td>
                  <td>{el.email}</td>
                  <td>{el.mobile}</td>
                  <td>
                  <button className='btn btn-edit' onClick={()=>handleedit(el)}>Edit</button>
              <button className='btn btn-delete'onClick={()=>handledelete(el._id)}>Delete</button>
                  </td>
                </tr>
              )
            }))
            : <p style={{textAlign: "center"}}>No data</p>
          }
        </tbody>
      </table>
    </div>
    
    </div>


    </div>

    </>
  )
}

export default App
