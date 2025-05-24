import React, { useRef, useState, useEffect } from 'react';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Manager = () => {
    const ref = useRef();
    const passwordref = useRef();
    const [passArrays, setPassArrays] = useState([]);
    const [form, setForm] = useState({ site: '', username: '', password: '' });
    const [editingMongoId, setEditingMongoId] = useState(null);

    const getPasswords = async () => {
        try {
            let req = await fetch("http://localhost:3000/");
            if (!req.ok) {
                throw new Error(`HTTP error! status: ${req.status}`);
            }
            let pass = await req.json();
            setPassArrays(pass);
        } catch (error) {
            console.error("Error fetching passwords:", error);
            toast.error("Failed to load passwords.");
        }
    };

    useEffect(() => {
        getPasswords();
    }, []);

    const savePassword = async () => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
            try {
                let response;
                let url = "http://localhost:3000/";
                let method = "POST";
                let bodyData = { ...form };

                if (editingMongoId) {
                    method = "PUT";
                    bodyData = { _id: editingMongoId, ...form };
                }

                response = await fetch(url, {
                    method: method,
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(bodyData),
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();
                if (result.success) {
                    toast(editingMongoId ? 'Updated Successfully!' : 'Saved Successfully!', {
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
                    setForm({ site: '', username: '', password: '' });
                    setEditingMongoId(null);
                    await getPasswords();
                } else {
                    toast.error(result.message || "Operation failed!");
                }
            } catch (error) {
                console.error("Error during save/update:", error);
                toast.error("An error occurred during save/update.");
            }
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

    const deletePassword = async (_id) => {
        try {
            const response = await fetch("http://localhost:3000/", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ _id }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            if (result.success) {
                toast('Deleted Successfully!', {
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
                await getPasswords();
            } else {
                toast.error(result.message || "Delete failed!");
            }
        } catch (error) {
            console.error("Error deleting password:", error);
            toast.error("An error occurred during delete.");
        }
    };

    const editPassword = (_id) => {
        const passwordToEdit = passArrays.find(item => item._id === _id);
        if (passwordToEdit) {
            setForm({
                site: passwordToEdit.site,
                username: passwordToEdit.username,
                password: passwordToEdit.password
            });
            setEditingMongoId(_id);
            toast('Loaded for editing!', {
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

    const showPassword = () => {
        passwordref.current.type = passwordref.current.type === 'password' ? 'text' : 'password';
        ref.current.src = passwordref.current.type === 'password' ? 'icons/eye.png' : 'icons/hide.png';
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
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
            transition: Slide,
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
                transition={Slide}
            />

            <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
                <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div>
            </div>
            <div className="px-2 md:px-0 max-w-6xl md:mycontainer">
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
                        className="rounded-full border border-lime-600 px-2 py-[1px] w-full"
                        type="text"
                        name="site"
                        id="site"
                        placeholder="Enter Website URL"
                    />
                </div>
                <div className="flex flex-col md:flex-row mx-2 my-2 w-full md:gap-4">
                    <input
                        value={form.username}
                        onChange={handleChange}
                        className="rounded-full border border-lime-600 px-2 py-[1px] w-full md:w-1/2"
                        type="text"
                        name="username"
                        id="username"
                        placeholder="Enter Username"
                    />
                    <div className="relative w-full md:w-[47%]">
                        <input
                            ref={passwordref}
                            value={form.password}
                            onChange={handleChange}
                            className="rounded-full border border-lime-600 px-2 py-[1px] w-full pr-10"
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Enter Password"
                        />
                        <span onClick={showPassword} className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer">
                            <img ref={ref} src="icons/eye.png" alt="" />
                        </span>
                    </div>
                </div>
                <div className="w-full text-center flex justify-center items-center">
                    <button
                        onClick={savePassword}
                        className="flex ml-9 bg-lime-500 my-1 cursor-pointer hover:font-bold gap-2 hover:bg-lime-400 rounded-full border-2 border-green-600 px-4 py-1"
                    >
                        <lord-icon src="https://cdn.lordicon.com/sbnjyzil.json" trigger="hover"></lord-icon>
                        Save
                    </button>
                </div>
                <div className="passwords">
                    <h2 className="font-bold text-xl py-2 xl:mx-24">Your Data</h2>
                    {passArrays.length === 0 && <div className='mx-40'>No Passwords To Show </div>}
                    {passArrays.length !== 0 && (
                        <table className="table-auto w-full rounded-lg xl:w-[90%] xl:mx-10">
                            <thead className="bg-lime-600 text-white">
                                <tr>
                                    <th className="py-1 text-center">Site</th>
                                    <th className="py-1 text-center">Username</th>
                                    <th className="py-1 text-center">Password</th>
                                    <th className="py-1 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-green-100">
                                {passArrays.map((item) => {
                                    return (
                                        <tr key={item._id}>
                                            <td className="py-1 text-center relative">
                                                <span className="flex items-center justify-center">
                                                    <a className="mx-2" href={item.site} target="_blank" rel="noopener noreferrer">
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
                                                <span><img onClick={() => { editPassword(item._id) }} className='cursor-pointer' src="icons/edit.png" alt="" /></span>
                                                <span><img onClick={() => { deletePassword(item._id) }} className='cursor-pointer' src="icons/delete.png" alt="" /></span>
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