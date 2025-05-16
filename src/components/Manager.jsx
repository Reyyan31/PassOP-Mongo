import React, { useRef, useState, useEffect } from 'react';
import { ToastContainer, toast, Slide } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid' 
import 'react-toastify/dist/ReactToastify.css';
const Manager = () => {
  const ref = useRef();
  const passwordref = useRef();
  const [passArrays, setpassArrays] = useState([]);
  const [form, setform] = useState({ site: '', username: '', password: '' });
const getPassword = async () => {
  let req = await fetch("http://localhost:3000/")
    
    let pass = await req.json();
    setpassArrays(pass);
    console.log(pass)
  
}  
const savePassword = async () => {
  if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
    toast('Saved Successfully!', {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      style: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        borderRadius: '8px',
        marginTop: '40px',
      },
      transition: Slide,
    });

    if (form.id) {
      // Edit existing password
      await fetch("http://localhost:3000/", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const updatedArrays = passArrays.map((item) => {
        if (item.id === form.id) {
          return form;
        } else {
          return item;
        }
      });

      setpassArrays(updatedArrays);
    } else {
      // Add new password
      const newId = uuidv4();
      const newForm = { ...form, id: newId };

      await fetch("http://localhost:3000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newForm),
      });

      const updatedArrays = [...passArrays, newForm];
      setpassArrays(updatedArrays);
    }

    setform({ site: '', username: '', password: '', id: undefined });
  } else {
    toast('Min-length should be 3 characters!', {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      style: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        borderRadius: '8px',
        marginTop: '40px',
      },
      transition: Slide,
    });
  }
};

  const deletePassword = async (id) => {
    toast('deleted Successfully!', {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      style: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        borderRadius: '8px',
        marginTop: '40px',
      },
      transition: Slide, // Using Slide transition, often more reliable
    });
    const updatedArrays = (passArrays.filter(item=>item.id!==id));
    setpassArrays(updatedArrays);
    // localStorage.setItem('pass', JSON.stringify(updatedArrays));
    let res = await fetch("http://localhost:3000/", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json", 
      },
      body: JSON.stringify({ id}),
    });
  };

  const editPassword = (id) => {
    toast('Editted Successfully!', {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      style: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        borderRadius: '8px',
        marginTop: '40px',
      },
      transition: Slide, // Using Slide transition, often more reliable
    });
  setform({...passArrays.filter(i=>i.id===id)[0],id : id})
    const updatedArrays = (passArrays.filter(item=>item.id!==id));
    setpassArrays(updatedArrays);
  };

  const showPassword = () => {
    passwordref.current.type = 'text';
    if (ref.current.src.includes('icons/hide.png')) {
      ref.current.src = 'icons/eye.png';
      passwordref.current.type = 'password';
    } else {
      ref.current.src = 'icons/hide.png';
      passwordref.current.type = 'text';
    }
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const copyText = (text) => {
    toast('Copied Successfully!', {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      style: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        borderRadius: '8px',
        marginTop: '40px',
      },
      transition: Slide, // Using Slide transition, often more reliable
    });
    navigator.clipboard.writeText(text);
  };

  return (
    <>


      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition = "Bounce"
      />

      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div>
      </div>
      <div className="px-2 md:px-0 max-w-6xl  md:mycontainer">
        <div className="logo font-bold text-xl text-center">
          <span className="text-lime-500"> &lt;</span>
          Pass
          <span className="text-lime-500">OP/&gt;</span>
        </div>
        <p className="text-lime-600 text-center">Your own Password Manager</p>
        <div className="flex flex-col p-2">
          <input
            value={form.site}
            onChange={handleChange}
            className="rounded-full border border-lime-600 px-2 py-[1px]"
            type="text"
            name="site"
            id="site"
            placeholder="Enter Website URL"
          />
        </div>
        <div className="flex flex-col md:flex-row  md:px-0 mx-2 my-2">
          <input
            value={form.username}
            onChange={handleChange}
            className="rounded-full md:mx-2 border w-[99%] md:w-1/2 lg:w-[30%]  border-lime-600 px-2 py-[1px] 2xl:ml-32"
            type="text"
            name="username"
            id="username"
            placeholder="Enter Username"
          />
          <div className="relative ">
            <input
              ref={passwordref}
              value={form.password}
              onChange={handleChange}
              className="rounded-full border w-[65%] xl:w-[80%] my-3 md:my-0 md:mx-36 border-lime-600 px-2 py-[1px]  lg:relative lg:left-60   
              "
              type="password"
              name="password"
              id="password"
              placeholder="Enter Password"
            />
            <span onClick={showPassword} className="lg:left-[350px]  ml-[-50px] md:ml-0 absolute md:right-16 bottom-3 md:bottom-0  cursor-pointer">
              <img className='lg:relative md:left-80' ref={ref} src="icons/eye.png" alt="" />
            </span>
          </div>
        </div>
        <div className="w-full text-center flex justify-center items-center">
          <button
            onClick={savePassword}
            className="flex ml-9  bg-lime-500 my-1 cursor-pointer hover:font-bold gap-2 hover:bg-lime-400 rounded-full border-2 border-green-600 px-4 py-1 "
          >
            <lord-icon src="https://cdn.lordicon.com/sbnjyzil.json" trigger="hover"></lord-icon>
            Save
          </button>
        </div>
        <div className="passwords">
          <h2 className="font-bold text-xl py-2 xl:mx-24">Your Data</h2>
          {passArrays.length === 0 && <div className='mx-40'>No Passwords To Show </div>}
          {passArrays.length !== 0 && (
            <table className="table-auto w-full  rounded-lg xl:w-[90%] xl:mx-10  
            max-[350px]:">
              <thead className="bg-lime-600 text-white">  
                <tr>
                  <th className="py-1 text-center">Site</th>
                  <th className="py-1 text-center">Username</th>
                  <th className="py-1 text-center">Password</th>
                  <th className="py-1 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-100">
                {passArrays.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="py-1 text-center relative">
                        <span className="flex items-center justify-center">
                          <a className="mx-2 " href={item.site} target="_blank" rel="noopener noreferrer">
                            {item.site}
                          </a>
                          <img onClick={() => copyText(item.site)} className="cursor-pointer ml-2 max-h-5 hidden md:block" src="icons/copy.png" alt="" />
                        </span>
                      </td>
                      <td className="py-1 text-center relative">
                        <span className="flex items-center justify-center">
                          {item.username}
                          <img onClick={() => copyText(item.username)} className="cursor-pointer ml-2 max-h-5 hidden md:block" src="icons/copy.png" alt="" />
                        </span>
                      </td>
                      <td className="py-1 text-center relative">
                        <span className="flex items-center justify-center">
                          {"*".repeat(item.password.length)}
                          <img onClick={() => copyText(item.password)} className="cursor-pointer ml-2 max-h-5 hidden md:block" src="icons/copy.png" alt="" />
                        </span>
                      </td>
                      <td className="py-1 text-center relative flex justify-center gap-2">
                        <span><img onClick={()=>{editPassword(item.id)}}  className='cursor-pointer' src="icons/edit.png" alt="" /></span>
                        <span><img onClick={()=>{deletePassword(item.id)}} className='cursor-pointer' src="icons/delete.png" alt="" /></span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;