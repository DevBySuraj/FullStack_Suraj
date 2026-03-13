import React, { useState } from 'react';

function UserForm() {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        age: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault(); 
        console.log("Form Data:", formData);
        setSubmitted(true);
    };

    return (
        <div >
            <h2>User Info Form</h2>
            <form onSubmit={handleSubmit}>
                <input name="name" type="text" placeholder="Name" onChange={handleChange} required /><br/>
                <input name="email" type="email" placeholder="Email" onChange={handleChange} required /><br/>
                <input name="age" type="number" placeholder="Age" onChange={handleChange} required /><br/>
                <button type="submit">Submit</button>
            </form>

            {submitted && <p>Data Saved Successfully..</p>}
        </div>
    );
}

export default UserForm;
