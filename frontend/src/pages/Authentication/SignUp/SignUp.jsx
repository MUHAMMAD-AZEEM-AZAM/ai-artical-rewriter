import {React,useState} from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { useSignup } from '../../../hooks/useSignup';

const SignUp = () => {
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const {signup,error,isLoading}=useSignup()
  const navigate=useNavigate()
  
  const handleSubmit=async (e)=>{
    e.preventDefault()
    await signup(email,password)
    if(!error){
      navigate('/entercode')
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="w-25 mx-auto border border-2 shadow-sm p-3  rounded" style={{marginTop:170}}>
        <div className="mb-3">
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={(e)=>setEmail(e.target.value)}
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
            onChange={(e)=>setPassword(e.target.value)}
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
        <button  disabled={isLoading}
className='mx-auto d-block mt-3'
              variant="contained"
              style={{
                borderRadius: 30,
                paddingInline: 25,
                border:'none',
                paddingTop: 7,
                paddingBottom: 7,
                backgroundColor: 'black',
                color:'white',
                fontSize: 15,
              }}
            >
              Sign Up
            </button>
            {error && <div className='error'>{error}</div>}
      </form>

      {/* sign up   */}
      <div className="text-center mt-3">
        <Link to="/login">Already have account? Sign In</Link>
      </div>
    </div>
  );
};

export default SignUp;
