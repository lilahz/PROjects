import { IoCheckmarkDoneOutline } from 'react-icons/io5';
import { AiFillCamera , AiFillNotification} from "react-icons/ai";
import { HiOutlineClipboardList } from "react-icons/hi";
import { MdAttachMoney } from "react-icons/md";
import { GoLaw } from "react-icons/go";
import { GiReceiveMoney , GiSandsOfTime} from "react-icons/gi";
import { BsGraphUp, BsFillCameraVideoFill } from "react-icons/bs"; 
import { ImMobile } from "react-icons/im";
import { CgWebsite } from "react-icons/cg";
import { BiPaint } from "react-icons/bi";
import { RiPaintFill } from "react-icons/ri";
import { FaTheaterMasks } from "react-icons/fa";


export const field_array = [{ value: 'projectmanager', label: 'ניהול פרוייקט', icon: <AiFillNotification size={18}/>},
            { value: 'marketing', label: 'שיווק', icon: <BsGraphUp size={18} style={{ strokeWidth: "1"}}/>},
            { value: 'appdev', label: 'פיתוח אפליקציות', icon: <ImMobile size={18}/>},
            { value: 'webdev', label: 'פיתוח אתרים', icon: <CgWebsite size={18}/>},
            { value: 'logodesign', label: 'עיצוב לוגו', icon: <BiPaint size={18}/>},
            { value: 'uiux', label: 'UI / UX', icon: <RiPaintFill size={18}/>},
            { value: 'finance', label: 'ייעוץ כלכלי', icon: <MdAttachMoney size={18}/>},
            { value: 'legal', label: 'ייעוץ משפטי', icon: <GoLaw size={18}/>},
            { value: 'sales', label: 'מכירות', icon: <GiReceiveMoney size={18}/>},
            { value: 'media', label: 'מדיה', icon: <BsFillCameraVideoFill size={18}/>},
            { value: 'film', label: 'צילום', icon: <AiFillCamera size={18}/>},
            { value: 'acting', label: 'משחק', icon: <FaTheaterMasks size={18}/>}];

export const status_array = [{value: 'todo', label: ' חדש  ', icon: <HiOutlineClipboardList size={18}/>},
                            {value: 'inprogress', label: ' בתהליך', icon: <GiSandsOfTime size={18}/>},
                            {value: 'done', label: ' סיים', icon: <IoCheckmarkDoneOutline size={18}/>}]


