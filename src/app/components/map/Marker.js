import { BiMap } from 'react-icons/bi';


const Marker = ({ text }) => (
    <div className="pin">
      <BiMap  className="text-red-700 text-[30px] h-[100px]" />
      <p className="pin-text">{text}</p>
    </div>
  )

  export default Marker