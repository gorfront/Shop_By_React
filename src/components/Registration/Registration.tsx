import React, { useEffect, useState } from "react";
import "./Registration.scss";
import { useAppDispatch } from "../../utils/hooks";
// import { addUser } from "../../store/slices/users/usersSlice";
import { fetchUsers } from "../../store/slices/users/usersAPi";
import { useNavigate } from "react-router-dom";
import { validateRegistrationForm } from "../../utils/validation";
import { addUser } from "../../store/slices/users/usersSlice";

const Registration: React.FC = () => {
  const [formData, setFormData] = useState({
    city: "",
    zipcode: "",
    email: "",
    username: "",
    password: "",
    name: {
      firstname: "",
      lastname: "",
    },
    phone: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setErrors((prev) => ({ ...prev, [name]: "" }));
    if (name === "firstname" || name === "lastname") {
      setFormData((prev) => ({
        ...prev,
        name: { ...prev.name, [name]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = validateRegistrationForm(formData);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      dispatch(addUser(formData));
      setFormData({
        city: "",
        zipcode: "",
        email: "",
        username: "",
        password: "",
        name: {
          firstname: "",
          lastname: "",
        },
        phone: "",
      });
      navigate("/authorization");
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="registration--form">
      <h2 className="registration--form__title">Registration Form</h2>

      <label className="registration--form__label">
        First Name:
        <input
          className="registration--form__input"
          type="text"
          name="firstname"
          value={formData.name.firstname}
          onChange={handleChange}
          required
        />
        {errors.firstname && <span className="error">{errors.firstname}</span>}
      </label>
      <br />

      <label className="registration--form__label">
        Last Name:
        <input
          className="registration--form__input"
          type="text"
          name="lastname"
          value={formData.name.lastname}
          onChange={handleChange}
          required
        />
        {errors.lastname && <span className="error">{errors.lastname}</span>}
      </label>
      <br />

      <label className="registration--form__label">
        Email:
        <input
          className="registration--form__input"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </label>
      <br />

      <label className="registration--form__label">
        Username:
        <input
          className="registration--form__input"
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        {errors.username && <span className="error">{errors.username}</span>}
      </label>
      <br />

      <label className="registration--form__label">
        Password:
        <input
          className="registration--form__input"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        {errors.password && <span className="error">{errors.password}</span>}
      </label>
      <br />

      <label className="registration--form__label">
        Phone:
        <input
          className="registration--form__input"
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        {errors.phone && <span className="error">{errors.password}</span>}
      </label>
      <br />

      <label className="registration--form__label">
        City:
        <input
          className="registration--form__input"
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          required
        />
        {errors.city && <span className="error">{errors.city}</span>}
      </label>
      <br />

      <label className="registration--form__label">
        Zipcode:
        <input
          className="registration--form__input"
          type="text"
          name="zipcode"
          value={formData.zipcode}
          onChange={handleChange}
          required
        />
      </label>
      <br />

      <button type="submit" className="registration--form__btn">
        Register
      </button>
    </form>
  );
};

export default Registration;
