import { useState } from "react";
import { GoPlusCircle } from "react-icons/go";
import { Link } from "react-router-dom";

const FixedMenu = () => {
    const [open, setOpen] = useState(false);



    return (
        <>
             <div className="fixed flex justify-center flex-col bottom-5 right-5 items-center">
                    <div className={`menu-drawer ${open ? 'open' : ''}`}>
                        <Link className='menu-item' to="/addDemo">প্রদর্শনী</Link>
                        <Link className='menu-item' to="/addTraining">প্রশিক্ষণ</Link>
                        <Link className='menu-item' to="/addFieldDay">মাঠদিবস</Link>
                        <Link className='menu-item' to="/addDistribution">বিতরণ</Link>
                        <Link className='menu-item' to="/add-dae-group-meeting">গ্রুপ সভা</Link>
                        <Link className='menu-item' to="/add-motivational-tour">ভ্রমণ</Link>
                        <Link className='menu-item' to="/add-school">স্কুল</Link>
                    </div>
                    <div className='mt-5 flex justify-center items-center flex-col'>
                        <GoPlusCircle
                            onClick={() => setOpen(!open)}
                            cursor={'pointer'}
                            color="green"
                            size={60}
                            className={`menu-icon ${open ? 'open' : ''}`}
                        />
                    </div>
                </div>
        </>
    )
}
export default FixedMenu;