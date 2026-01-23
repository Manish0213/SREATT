import React from 'react'
import './Login.css';
import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <div class="login-page">
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
                        <input type="email" placeholder="admin@gmail.com" />
                    </div>

                    <div class="form-group">
                        <label>Password</label>
                        <input type="password" placeholder="********" />
                    </div>

                    <div class="forgot">Forgot Password ?</div>

                    <button class="btn-primary">Sign in</button>

                    <div class="divider">
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
                    </p>
                </div>

            </div>
        </div>

    )
}

export default Login