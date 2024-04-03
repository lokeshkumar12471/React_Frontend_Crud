import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
const Students = () => {
    const [formDataShow, setformDataShow] = useState([]);
    const [message, setMessage] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/student`);
                setformDataShow(response.data.student);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);
    const deleteHandle = async (id) => {
        try {
            const removedata = await axios.get(`http://127.0.0.1:8000/api/student/delete/${id}`);
            if (removedata.status === 200) {
                setMessage(removedata.data.message);
                setTimeout(() => {
                    navigate('/')
                }, 3000);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='container mt-5'>
            <p className='text-danger'>{message}</p>
            <Link to={'/'} className='btn btn-primary float-end'>Add Student</Link>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">S.no</th>
                        <th scope="col">Name</th>
                        <th scope="col">Mobile</th>
                        <th scope="col">Email</th>
                        <th scope="col">Description</th>
                        <th scope="col">Image</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {formDataShow.map((student, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{student.name}</td>
                            <td>{student.mobile}</td>
                            <td>{student.email}</td>
                            <td>{student.description}</td>
                            <td>
                                {student.image && <img src={`http://127.0.0.1:8000/upload/images/${student.image}`} alt="student_image" width={50} height={50} />}
                            </td>
                            <td>
                                <Link to={`/student/${student.id}/edit`} className="btn btn-success">Edit</Link>
                                <button onClick={() => deleteHandle(student.id)} className='btn btn-danger'>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Students;
