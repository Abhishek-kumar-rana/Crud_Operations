import { useEffect, useState } from 'react';
import './App.css'
import { MdClose } from "react-icons/md"
import axios from "axios"
import FormTable from './components/Formtable';
import { motion } from "framer-motion"

axios.defaults.baseURL = "https://crud-server-sand-ten.vercel.app/";

function App() {

  const [addsection, setaddsection] = useState(false);
  const [editsection, seteditsection] = useState(false);
  const [formdata, setformdata] = useState({
    name: "",
    email: "",
    mobile: "",
  });
  const [formdataedit, setformdataedit] = useState({
    name: "",
    email: "",
    mobile: "",
    _id: ""
  });
  const [datalist, setdatalist] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state

  const handleOnchange = (e) => {
    const { value, name } = e.target;
    setformdata((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await axios.post("/create", formdata);
    if (data.data.success) {
      setaddsection(false);
    }
    getfetchdata();
  }

  const getfetchdata = async () => {
    setLoading(true); // Start loading
    const data = await axios.get("/");
    if (data.data.success) {
      setdatalist(data.data.data);
    }
    setLoading(false); // End loading
  }

  useEffect(() => {
    getfetchdata();
  }, []);

  const handledelete = async (id) => {
    const data = await axios.delete("/delete/" + id);
    getfetchdata();
  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    const data = await axios.put("/update", formdataedit);
    if (data.data.success) {
      getfetchdata();
      seteditsection(false);
    }
  }

  const handleEditOnchange = async (e) => {
    const { value, name } = e.target;
    setformdataedit((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  const handleedit = (el) => {
    setformdataedit(el);
    seteditsection(true);
  }

  return (
    <div className='container'>
      <button className='btn-add' onClick={() => setaddsection(true)}>Add</button>

      <div>
        {addsection && (
          <FormTable
            handleSubmit={handleSubmit}
            handleOnchange={handleOnchange}
            handleclose={() => setaddsection(false)}
            rest={formdata}
          />
        )}
        {editsection && (
          <FormTable
            handleSubmit={handleUpdate}
            handleOnchange={handleEditOnchange}
            handleclose={() => seteditsection(false)}
            rest={formdataedit}
          />
        )}

        <div className="tablecontainer">
          {loading ? (
            <p>Loading...</p> // Display loading message
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Mobile</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {datalist.length ? (
                  datalist.map((el) => (
                    <motion.tr
                      key={el._id}
                      className='trborder'
                      drag
                      dragConstraints={{ top: -25, right: 25, left: -25, bottom: 25 }}
                      dragTransition={{ bounceStiffness: 600, bounceDamping: 10 }}
                    >
                      <td>{el.name}</td>
                      <td>{el.email}</td>
                      <td>{el.mobile}</td>
                      <td>
                        <button className='btn btn-edit' onClick={() => handleedit(el)}>Edit</button>
                        <button className='btn btn-delete' onClick={() => handledelete(el._id)}>Delete</button>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" style={{ textAlign: "center" }}>No data</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
