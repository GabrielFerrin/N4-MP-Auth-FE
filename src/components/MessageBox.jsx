import { useEffect, useState } from 'react';
import Checkmark from './icons/Checkmark';
import Ex from './icons/Ex';
import './MessageBox.css';

const MessageBox = ({ message }) => {
  const [allValid, setAllValid] = useState(false);
  useEffect(() => {
    const allItemsValid = message.every(item => item.valid)
    setAllValid(allItemsValid);
  }, [message]);
  return (
    <div className="message-box-cmp" style={{
      borderRight: allValid ? '8px solid green' : '8px solid red'
    }}>
      {/* pointer */}
      <svg className='pointer-message' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 12.26">
        <path className="cls-1" fill='#cdffac' d="M14,12.26H.33C.82,7.62,2.03,3.53,4.73,.61c4.16,2.3,6.89,6.72,9.26,11.66Z" />
        <path fill='none' stroke='#828282' strokeLinecap='round' strokeMiterlimit={10} className="cls-2" d="M.5,11.31C.89,9.3,1.27,4.32,4.73,.61c4.45,2.11,7.24,8.08,8.72,10.7" />
      </svg>
      {/* list of messages */}
      {message && message.map((item, index) => (
        <div className="item" key={index} >
          {item.valid ? <Checkmark key={index} /> :
            <Ex key={index} />}
          <span >{item.desc}</span>
        </div>
      ))}
    </div >
  );
};
export default MessageBox