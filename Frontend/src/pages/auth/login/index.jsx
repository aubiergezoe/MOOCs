import React, { useState } from "react"
import "../style.scss"
import { ToastContainer, toast } from 'react-toastify';
import { MdOutlineVisibilityOff, MdOutlineVisibility } from "react-icons/md";
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { login } from "../../../utils/api/auth"
import Spinner from "../../../components/Spinner"

function Login() {
    const [toggleVisibility, setToggleVisibility] = useState(false);
    const [IsError, setError] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate()
    const location = useLocation()

    const loginHandler = async (event) => {
        setError(false)
        event.preventDefault();
        try {
            const formData = {
                email: event.target.email.value,
                password: event.target.password.value,

            }
            setLoading(true)
            await login(formData)
            navigate((location.state )?.redirect || '/dashboard')
        }
        catch (error) {
            setError(true)
            toast.error(error.message, {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 5000,
                theme: "colored"
            });
        } finally {
            setLoading(false)
        }

    }
    return (
        <>
        <div>
            <section className="forms-container forms">
         
                    <div className="form-content">
                        <h1>Login to MOOCs</h1>

                        <div className="media-options">
                            <a href="#" className="field google">
                                <img
                                    src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png"
                                    alt=""
                                    className="google-img"
                                />
                                <span>Login with Google</span>
                            </a>
                        </div>
                        <div className="line" />

                        <form onSubmit={loginHandler} method="POST">
                            <div className="field input-field">
                                <input type="email" name="email" placeholder="Email" required className={`${IsError && "error-input"}`} />
                            </div>

                            <div className="field input-field">
                            <input type={toggleVisibility?"text":"password"}
                                    placeholder="Password"
                                    required
                                    name="password"
                                    className={`${IsError && "error-input"}`}
                                />
                                <span className="eye-icon" onClick={() => setToggleVisibility(!toggleVisibility)}>
                                    {toggleVisibility ? <MdOutlineVisibility /> : <MdOutlineVisibilityOff />}</span>
                            </div>

                            <div className="field button-field">
                                <button>{isLoading ? <Spinner /> : "Login"}</button>

                            </div>
                        </form>
                        <div className="form-bottom">
                        <Link to="/forgot-password"  className="link "> forgot password?</Link>
                        <div className="form-link">
                            <span>
                                Don't have an account?{" "}
                                <Link to="/signup">
                                    Sign Up
                                </Link>
                            </span>
                        </div>
                        </div>


                    </div>
      
            </section>
        </div>
        <ToastContainer/>
        </>

    )
}

export default Login
