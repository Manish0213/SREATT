import React from 'react'
import './SignUp.css';
import { Link } from 'react-router-dom';

const SignUp = () => {
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
                    <h2>Create an Account</h2>
                    <p class="subtitle">Are you ready to join us! Let's create account</p>

                    <div class="form-group">
                        <label>Full name</label>
                        <input type="text" placeholder="Full name" />
                    </div>

                    <div class="form-group">
                        <label>Email</label>
                        <input type="email" placeholder="admin@gmail.com" />
                    </div>

                    <div class="form-group">
                        <label>Password</label>
                        <input type="password" placeholder="********" />
                    </div>

                    <div class="forgot">Forgot Password ?</div>

                    <button class="btn-primary">Create Account</button>

                    <div class="divider">
                        <span></span>
                        <p>OR</p>
                        <span></span>
                    </div>

                    <button class="google-btn">
                        <i class="fa-brands fa-google"></i> Continue with Google
                    </button>

                    <p class="signup">
                        Already have an Account?
                        <Link to="/login"><span>Sign-In</span></Link>
                    </p>
                </div>

            </div>
        </div>
    )
}

export default SignUp