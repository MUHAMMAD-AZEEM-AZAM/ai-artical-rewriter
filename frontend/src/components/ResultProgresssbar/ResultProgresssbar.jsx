import React from 'react';

const ResultProgresssbar = () => {
  return (
    <div>
      <div className="d-flex justify-content-center gap-4 mt-3">
        <div>
          <div className="progress">
            <div
              className="progress-bar"
              role="progressbar"
              style={{ width: '10%' }}
              aria-valuenow={10}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>

          <h3 className='text-center'>Plagrisam</h3>
          <h1 className='text-center'>10 %</h1>
        </div>



      
      </div>
    </div>
  );
};

export default ResultProgresssbar;
