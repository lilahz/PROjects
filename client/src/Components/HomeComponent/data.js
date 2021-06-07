import { IoCheckmarkDoneOutline } from 'react-icons/io5';
import { GiSandsOfTime } from "react-icons/gi";
import { HiOutlineClipboardList } from "react-icons/hi";
import { MdAttachMoney } from "react-icons/md";
import { GoLaw } from "react-icons/go";
import { GrMoney } from "react-icons/gr";
import { BsGraphUp } from "react-icons/bs"; 
import { ImMobile } from "react-icons/im";
import { CgWebsite } from "react-icons/cg";
import { BiPaint } from "react-icons/bi";
import { RiPaintFill } from "react-icons/ri";

export const field_array = [{ value: 'marketing', label: 'שיווק', icon: <BsGraphUp size={18} style={{ strokeWidth: "1"}}/>},
            { value: 'appdev', label: 'פיתוח אפליקציות', icon: <ImMobile size={18}/>},
            { value: 'webdev', label: 'פיתוח אתרים', icon: <CgWebsite size={18}/>},
            { value: 'logodesign', label: 'עיצוב לוגו', icon: <BiPaint size={18}/>},
            { value: 'webdesign', label: 'עיצוב אתרים', icon: <RiPaintFill size={18}/>},
            { value: 'finance', label: 'סיוע כלכלי', icon: <MdAttachMoney size={18}/>},
            { value: 'legal', label: 'סיוע משפטי', icon: <GoLaw size={18}/>},
            { value: 'sales', label: 'מכירות', icon: <GrMoney size={18}/>}];

export const status_array = [{value: 'todo', label: ' חדש  ', icon: <HiOutlineClipboardList size={18}/>},
                            {value: 'inprogress', label: ' בתהליך', icon: <GiSandsOfTime size={18}/>},
                            {value: 'done', label: ' סיים', icon: <IoCheckmarkDoneOutline size={18}/>}]


