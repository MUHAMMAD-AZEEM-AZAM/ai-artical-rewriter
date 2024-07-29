import { Button } from '@mui/material';
import React from 'react';

const ResetPassword = () => {
  return (
    <div>
      <form
        className="w-25 mx-auto border border-2 shadow-sm p-3  rounded"
        style={{ marginTop: 200 }}
      >
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            New Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            {/* We'll never share your email with anyone else. */}
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>

        <Button
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

export default ResetPassword;
