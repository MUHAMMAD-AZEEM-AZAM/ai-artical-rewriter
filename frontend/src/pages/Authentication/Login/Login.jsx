import { Link } from '@mui/material';
import { React, useState } from 'react';
import { useLogin } from '../../../hooks/useLogin';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {login,error,isLoading}=useLogin()
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await login(email, password);
  console.log(response)
  navigate('/');
      if (response) {
        
      } else {
        // ... (handle server error) ...
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}
        className="w-25 mx-auto border border-2 shadow-sm p-3  rounded"
        style={{ marginTop: 180 }}
      >
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          {/* <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div> */}
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        {/* <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Check me out
          </label>
        </div> */}
        <button disabled={isLoading}
          className="mx-auto d-block mt-3"
          variant="contained"
          style={{
            borderRadius: 30,
            border: 'none',
            paddingInline: 25,
            paddingTop: 7,
            paddingBottom: 7,
            backgroundColor: 'black',
            color: 'white',
            fontSize: 15,
          }}
        >
          Login
        </button>
        {error && <div className='error'>{error}</div>}
      </form>

      {/* sign up   */}
      <div className="text-center mt-3">
        <Link href="/signup">Don't have an account? Sign Up</Link>
      </div>

      {/* forget password */}
      {/* <div className="text-center mt-3">
        <Link href="/forgetpassword">Forget Password?</Link>
      </div> */}
    </div>
  );
};

export default Login;
