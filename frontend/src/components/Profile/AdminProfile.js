
import './AdminProfile.css'
import { useRef } from 'react'
import dataSource from '../../dataSource';
import AvailableMeals from "../Meals/AvailableMeals";


const AdminProfile = () => {
    const formRef = useRef()
    const submitHandler = async (e) => {
        e.preventDefault();
        // Query all input fields
        const inputFields = formRef.current.querySelectorAll("input");
        // Generate json based on the input field
        const payload = new Object()
        for(let field of inputFields){
            payload[field.name] = field.value;
        }
        await dataSource.post({ source: "meal", options: { object: payload } });
        // Clear input fields
        for(let field of inputFields){
            field.value = "";
        }
    }
    return (
        <div className="container">
            <section className="adminProfile">
                <h3 className="admin">Admin</h3>
                <hr className="line" />
                <form className="form" onSubmit={submitHandler} ref={formRef}>
                    <div className="fieldsContainer">
                        <h3 className="additionalMeal">Add additional meal</h3>
                        <label htmlFor='new-meal-name'>Name</label>
                        <input type='text' id='new-meal-name' required name="name"/>
                        <label htmlFor='new-meal-name'>Description</label>
                        <input type='text' id='new-meal-description' required name="description"/>
                        <label htmlFor='new-meal-name'>Long Description</label>
                        <input type='text' id='new-meal-long-description' required name="long_description"/>
                        <label htmlFor='new-meal-name'>Image path</label>
                        <input type='text' id='new-meal-image-path' required name="image_path"/>
                        <label htmlFor='new-meal-name'>Price</label>
                        <input type='number' id='new-meal-price' required name="price"/>
                    </div>
                    <div className="submit">
                        <button>Submit</button>
                    </div>
                </form>
            </section>
        </div>
    );
};

export default AdminProfile;
