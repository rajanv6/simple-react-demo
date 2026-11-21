 import "../css/userForm.css"
 import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
 import {db} from "../firebase/config"
import { useEffect, useState } from "react";
import type { SubmitEvent } from 'react'
import { useNavigate, useParams } from "react-router";

export interface UserInfo {
    userId: string;
    firstname: string;
    lastname: string;
    age: number;
    sex: 'male' | 'female' | 'other';
    email: string;
    address: string;
    zipcode: number;
    city: string;
    state: string;
    country: string
}

const emptyForm = { firstname: '', lastname: '', age: '', sex: '', email: '', 
        address: '', zipcode: '', city: '', state: '', country: ''}

function UserForm() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState(emptyForm);
    const [error, setError] = useState('')
    const {id} = useParams();
    const isEdit = id !== undefined;
     
    
    useEffect(() => {
        if (!id) return;
        async function loadUser(userId: string) {
            const snap = await getDoc(doc(db, 'users', userId));
            if (!snap.exists()) return;
            const data = snap.data();
            setFormData({
                ...emptyForm,
                ...data,
                age: String(data.age),
                zipcode: String(data.zipcode)
            })
        }
        loadUser(id)
    }, [id])

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        setFormData({...formData, [e.target.name] : e.target.value})
    }

    async function handleSubmit(e: SubmitEvent) {
        e.preventDefault();
        const payload = {
            ...formData,
            age: Number(formData.age),
            zipcode: Number(formData.zipcode)
        }
        try {
            if (id !== undefined) {
                await updateDoc(doc(db, 'users', id), payload);
            } else {
                await addDoc(collection(db, 'users'), payload);
                setFormData(emptyForm)
            }
            navigate("/users")
        } catch(err) {
            setError('Could not save the form' + {err})
        }
    }
        
    if (error) return <p>{error}</p>

    return (
        <div className="form-container">
            <h2>{isEdit ? 'Update User' : 'Add User'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="form-group flex-1">
                        <label htmlFor="firstname">First Name</label>
                        <input type="text" id="firstname" name="firstname" value={formData.firstname} placeholder="John" required onChange={handleChange}></input>
                    </div>
                    <div className="form-group flex-1">
                        <label htmlFor="lastname">Last Name</label>
                        <input type="text" id="lastname" name="lastname" value={formData.lastname} placeholder="Doe" required onChange={handleChange}></input>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group size-small">
                        <label htmlFor="age">Age</label>
                        <input type="number" id="age" name="age" value={formData.age} min="0" max="120" placeholder="25" required onChange={handleChange}></input>
                    </div>
                    <div className="form-group flex-1">
                        <label>Sex</label>
                        <div className="radio-group">
                            <label className="radio-label">
                                <input type="radio" name="sex" value="male" checked={formData.sex === 'male'} required onChange={handleChange}/> Male
                            </label>
                            <label className="radio-label">
                                <input type="radio" name="sex" value="female" checked={formData.sex === 'female'} required onChange={handleChange}/> Female
                            </label>
                            <label className="radio-label">
                                <input type="radio" name="sex" value="other" checked={formData.sex === 'other'} required onChange={handleChange}/> Other
                            </label>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="text" id="email" name="email" value={formData.email} placeholder="john.doe@example.com" required onChange={handleChange}></input>
                </div>
                <div className="form-row">
                    <div className="form-group flex-2">
                        <label htmlFor="address">Address</label>
                        <input type="text" id="address" name="address" value={formData.address} placeholder="123 Main St" required onChange={handleChange}></input>
                    </div>
                    <div className="form-group size medium">
                        <label htmlFor="zipcode">Zip Code</label>
                        <input type="number" id="zipcode" name="zipcode" placeholder="123456" value={formData.zipcode} required onChange={handleChange}></input>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group flex-1">
                        <label htmlFor="city">City</label>
                        <input type="text" id="city" name="city" placeholder="New York" value={formData.city} required onChange={handleChange}></input>
                    </div>
                    <div className="form-group flex-1">
                        <label htmlFor="state">State</label>
                        <input type="text" id="state" name="state" placeholder="NY" value={formData.state} required onChange={handleChange}></input>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="country">Country</label>
                    <select id="country" name="country" value={formData.country} required onChange={handleChange}>
                        <option value="" disabled>Select your country</option>
                        <option value="usa">United States</option>
                        <option value="uk">United Kingdom</option>
                        <option value="canada">Canada</option>
                        <option value="australia">Australia</option>
                        <option value="india">India</option>
                    </select>
                </div>
                <div className="button-row">
                    <button type="button" className="reset-btn" onClick={() => setFormData(emptyForm)}>Reset</button>
                    <button type="submit" className="submit-btn">
                        {isEdit ? 'Update' : 'Submit'}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default UserForm;