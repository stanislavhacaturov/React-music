import React from 'react';

import './footer.css';

const Footer = ({ active }) => (
  <div className="footer">
    <span 
      className="amount">{`Count songs: ${active}`}
    </span>
  </div>
);

export default Footer;
