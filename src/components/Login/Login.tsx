import React, { useEffect, useState } from "react";
import "./Login.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import {
  selectUsers,
  setCurrentUser,
} from "../../store/slices/users/usersSlice";
import { fetchUsers } from "../../store/slices/users/usersAPi";

const Login: React.FC = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();
  const users = useAppSelector(selectUsers);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};
    if (!formData.email) newErrors.email = "Email is required.";
    if (!formData.password) newErrors.password = "Password is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const matchedUser = users.usersData.find(
      (user) =>
        user.email === formData.email && user.password === formData.password
    );

    if (!matchedUser) {
      setErrors({ general: "Invalid email or password." });
      return;
    }

    dispatch(
      setCurrentUser({ email: formData.email, password: formData.password })
    );
    setFormData({ email: "", password: "" });
    navigate("/");
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>

        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </label>

        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </label>

        <p>
          Haven't an account? <NavLink to="registration">Registration</NavLink>
        </p>

        {errors.general && <span className="error">{errors.general}</span>}

        <button>Login</button>
      </form>
    </div>
  );
};

export default Login;
