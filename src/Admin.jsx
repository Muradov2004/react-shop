import React from 'react';
import {Link, Outlet} from 'react-router-dom';
import {Button} from 'antd';

const Admin = ({isLinkClicked, setIsLinkClicked}) => {


  const handleClick = () => {
    setIsLinkClicked(true);
  };

  return (
    <div style={{textAlign: 'center', paddingTop: '20px'}}>
      {!isLinkClicked && (
        <div>
          <h1>Admin</h1>
          <Link to='products'>
            <Button onClick={handleClick} size="large" style={{margin: '10px'}}>
              Products
            </Button>
          </Link>
          <Link to='orders'>
            <Button onClick={handleClick} size="large" style={{margin: '10px'}}>
              Orders
            </Button>
          </Link>
        </div>
      )}

      <Outlet/>
    </div>
  );
};

export default Admin;
