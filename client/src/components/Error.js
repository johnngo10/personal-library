import { Link } from 'react-router-dom';

const Error = () => {
  return (
    <div className='error-container'>
      <div className='error-content'>
        <h1>404</h1>
        <h3>Page Not Found</h3>
        <p>Sorry, the page that you are looking for was not found.</p>
        <Link to='/'>
          <button type='button' className='home-button'>
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Error;
