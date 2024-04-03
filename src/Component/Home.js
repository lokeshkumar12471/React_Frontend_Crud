import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Home = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "",
        mobile: "",
        email: "",
        description: "",
        image: "",
    });
    const [message, setMessage] = useState('');
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.name === 'image' ? e.target.files[0] : e.target.value });
    }

    const SubmitHandle = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://127.0.0.1:8000/api/student/store`, form, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setMessage(response.data.message);
            setTimeout(() => {
                navigate('/students')
            }, 3000)
        } catch (error) {
            console.error(error);
        }

    }

    return (
        <div className='container mt-5'>
            <div className='text-success'>{message}</div>
            <form onSubmit={SubmitHandle} encType='multipart/form-data'>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                    <input type="text" name='name' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Mobile</label>
                    <input type="number" name='mobile' className="form-control" id="exampleInputPassword1" onChange={handleChange} />
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Email</label>
                    <input type="email" name='email' className="form-control" id="exampleInputPassword1" onChange={handleChange} />
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
                    <input type="text" name='description' className="form-control" id="exampleInputPassword1" onChange={handleChange} />
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Image</label>
                    <input type="file" name="image" className="form-control" id="exampleInputPassword1" onChange={handleChange} />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default Home;
