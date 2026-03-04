import React from 'react'
import './Login.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from './admin/components/Loading';
import Alert from './admin/components/Alert';

const Login = () => {
    const apiUrl = import.meta.env.VITE_API_URL;

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);     // 👈 loading state
    const [alertData, setAlertData] = useState(null);  // 👈 alert state

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setAlertData({ type: "error", message: "Please enter email and password" });
            setTimeout(() => setAlertData(null), 4000);
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post(
                `${apiUrl}/auth/login`,
                { email, password },
                { withCredentials: true } // important for cookie
            );

            const { accessToken, role } = response.data;

            // Save token + role
            localStorage.setItem("token", accessToken);
            localStorage.setItem("role", role);

            setAlertData({ type: "success", message: "Login successful ✅" });

            setTimeout(() => {
                setAlertData(null);

                // Redirect based on role
                if (role === "ADMIN") {
                    navigate("/admin/");
                } else {
                    navigate("/");
                }
            }, 1500);

            // Redirect based on role
            // if (role === "ADMIN") {
            //     navigate("/admin/create-product");
            // } else {
            //     navigate("/");
            // }

        } catch (error) {
            console.error("Login failed", error);

            let message = "Invalid email or password";

            if (error.response?.data?.errorMessage) {
                message = error.response.data.errorMessage;
            }

            setAlertData({ type: "error", message });

        } finally {
            setLoading(false);
        }
    };

    return (
        <div class="login-page">
            {loading && <Loading message="Signing in..." />}
            {alertData && <Alert type={alertData.type} message={alertData.message} onClose={() => setAlertData(null)} />}
            <div class="login-container">

                {/* LEFT IMAGE */}
                <div class="login-left">
                    <div class="overlay">
                        <h1>Welcome Back!!</h1>
                        <p>To keep connected with us please login with your personal info</p>
                    </div>
                </div>

                {/* RIGHT FORM */}
                <div class="login-right">
                    <h2>Login Your Account</h2>
                    <p class="subtitle">Securely log in to access your personalized experience.</p>

                    <div class="form-group">
                        <label>Email</label>
                        <input type="email" placeholder="user@gmail.com" onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <div class="form-group">
                        <label>Password</label>
                        <input type="password" placeholder="********" onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    {/* <div class="forgot">Forgot Password ?</div> */}

                    <button type="submit" class="btn-primary" onClick={handleLogin}>Sign in</button>

                    {/* <div class="divider">
                        <span></span>
                        <p>OR</p>
                        <span></span>
                    </div>

                    <button class="google-btn">
                        <i class="fa-brands fa-google"></i> Continue with Google
                    </button>

                    <p class="signup">
                        Didn’t have an Account?
                        <Link to="/sign-up"><span>Sign-up</span></Link>
                    </p> */}
                </div>

            </div>
        </div>

    )
}

export default Login