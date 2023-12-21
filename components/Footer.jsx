import React from 'react';

function Footer() {
  return (
    <footer className="footer">
        <hr />
      <div className='footer-line'>
        <p>&copy; {new Date().getFullYear()} Jabir Ali</p>
        <p>All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;