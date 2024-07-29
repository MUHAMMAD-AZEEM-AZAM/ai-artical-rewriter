import { Button } from '@mui/material';
import { React, useState } from 'react';
import { url } from '../../../config/config';

const EnterCode = () => {
  const [otp, setOTP] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Retrieve the stored userId from local storage
    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.error('User ID not found. Please sign up or log in first.');
      return;
    }

    try {
      const response = await fetch(`${url}/verifyOTP`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, otp }) // Include userId in the request body
      });
      const json = await response.json();

      if (json.statusbar === "FAILURE") {
        setError(json.message); // Set error message if OTP verification fails
      } else {
        // Save the token to local storage
        localStorage.setItem('token', json.token);
        // Optionally, you can store the entire user object
        // localStorage.setItem('user', JSON.stringify(json.user));

        // Redirect to the desired page after successful verification
        window.location.href = '/login';
      }
    } catch (error) {
      console.error('OTP verification failed:', error);
      setError('An error occurred during OTP verification.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="w-25 mx-auto border border-2 shadow-sm p-3 rounded" style={{ marginTop: 200 }}>
        <div className="mb-3">
          <label htmlFor="otpInput" className="form-label">
            Enter Code
          </label>
          <input
            type="text"
            className="form-control"
            id="otpInput"
            onChange={(e) => setOTP(e.target.value)}
            value={otp}
          />
        </div>
        {error && <div className="alert alert-danger" role="alert">{error}</div>}
        <Button
          type="submit"
          className="mx-auto d-block mt-3"
          variant="contained"
          style={{
            borderRadius: 30,
            paddingInline: 25,
            paddingTop: 7,
            paddingBottom: 7,
            backgroundColor: 'black',
            fontSize: 15,
          }}
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default EnterCode;
