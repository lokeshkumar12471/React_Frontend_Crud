import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";


const EditStudent = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [fetchEdit, setFetchEdit] = useState({
        name: "",
        mobile: "",
        email: "",
        description: "",
        image: "",
    });
    useEffect(() => {
        const fetchDataById = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/student/show/${id}`);
                setFetchEdit(response.data.student);
            } catch (error) {
                console.log(error);
            }
        }
        fetchDataById();
    }, [id]);

    const handleChange = (e) => {
        setFetchEdit({ ...fetchEdit, [e.target.name]: e.target.name === 'image' ? e.target.files[0] : e.target.value });
    }

    const SubmitHandle = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://127.0.0.1:8000/api/student/update/${id}`, fetchEdit);
            setMessage(response.data.message);
            setTimeout(() => {
                navigate('/students')
            }, 3000);
        } catch (error) {
            console.log(error);
        }

    }
    return (
        <div className='container mt-5'>
            <p className="text-success">{message}</p>
            <form onSubmit={SubmitHandle} encType='multipart/form-data'>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                    <input type="text" name='name' className="form-control" value={fetchEdit.name} id="exampleInputEmail1" aria-describedby="emailHelp" onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Mobile</label>
                    <input type="number" name='mobile' className="form-control" value={fetchEdit.mobile} id="exampleInputPassword1" onChange={handleChange} />
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Email</label>
                    <input type="email" name='email' className="form-control" value={fetchEdit.email} id="exampleInputPassword1" onChange={handleChange} />
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
                    <input type="text" name='description' className="form-control" value={fetchEdit.description} id="exampleInputPassword1" onChange={handleChange} />
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Image</label>
                    <img src={`http://127.0.0.1:8000/upload/images/${fetchEdit.image}`} alt="updating_image" width={50} height={50} onChange={handleChange} />
                    <input type="file" name="image" className="form-control" id="exampleInputPassword1" />
                </div>

                <button type="submit" className="btn btn-primary">Update</button>
            </form>
        </div>
    );
}

export default EditStudent;
