import { IoIosHome, IoIosNotifications, IoIosContact } from "react-icons/io";
import { CiCircleMore } from "react-icons/ci";
import { useQuery } from '@tanstack/react-query';
import { Logout } from './Logout.jsx';
import logo from '../../img/twitter-logo.png';
import BaseUrl from "../../constant/Url.jsx";

export const Settings = ({ setNoti, noti, showSidebar,setShowSidebar }) => {
  const fetchAuthUser = async () => {
    const res = await fetch(`${BaseUrl}/api/auth/getMe`, {
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) throw new Error("Failed to fetch auth user");
    return res.json();
  };

  const { data: authUser, isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: fetchAuthUser,
  });

  if (isLoading || !authUser) return <p>Loading...</p>;

  const fname = authUser.username?.[0]?.toUpperCase() || '?';

  return (
    <div className="fixed ">
      <div className={`
        fixed top-0 left-0  h-full z-50 bg-white
        transform transition-transform pt-20 lg:mt-0 duration-300 ease-in-out
        ${showSidebar ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static 
      `}>
        <img src={logo} className='w-8  lg:mt-10  ml-4 lg:ml-8' alt="logo" />
        <div className='flex flex-col h-full justify-between'>
          <div className='mt-7 flex flex-col gap-3 items-center lg:items-start lg:ml-8'>
            <div className='flex items-center gap-2 lg:gap-5'>
              <IoIosHome onClick={(e) => {
              e.preventDefault();
              setShowSidebar(!showSidebar)
              setNoti(false);
            }} className='text-2xl' />
              <p className='hidden lg:block scale-150 font-bold'>Home</p>
            </div>
            <div onClick={(e) => {
              e.preventDefault();
              setShowSidebar(!showSidebar)
              setNoti(!noti);
            }} className='flex items-center gap-2 lg:gap-5 cursor-pointer hover:bg-gray-200 w-12 lg:w-50 h-10 pt-2 pl-3 rounded-3xl'>
              <IoIosNotifications onClick={(e) => {
              e.preventDefault();
              setShowSidebar(!showSidebar)
            }}  className='text-2xl' />
              <p className='hidden lg:block scale-130'>Notification</p>
            </div>
            <div className='flex items-center gap-2 lg:gap-5 cursor-pointer hover:bg-gray-200 w-12 lg:w-50 h-10 pt-2 pl-3 rounded-3xl'>
              <IoIosContact  onClick={(e) => {
              e.preventDefault();
              setShowSidebar(!showSidebar)
            }} className='text-2xl' />
              <p className='hidden lg:block scale-130'>Profile</p>
            </div>
            <div className='flex items-center gap-2 lg:gap-5 cursor-pointer hover:bg-gray-200 w-12 lg:w-50 h-10 pt-2 pl-3 rounded-3xl'>
              <CiCircleMore onClick={(e) => {
              e.preventDefault();
              setShowSidebar(!showSidebar)
            }}  className='text-2xl' />
              <p className='hidden lg:block scale-130'>More</p>
            </div>
          </div>

          <div className=' items-center lg:flex justify-center lg:ml-5 mb-7 p-3 w-full lg:w-70 bg-gray-100 gap-3 group'>
            <p className='bg-fuchsia-950 text-white  w-6 h-6 flex justify-center items-center  lg:h-8    pt-0.5 rounded text-center'>{fname}</p>
            <div className=' lg:block'>
            <p className="truncate max-w-[40px] lg:max-w-full lg:scale-100 scale-90" title={authUser.username}>
            {authUser.username}
            </p>
              <p className="font-bold hidden lg:block">{authUser.email}</p>
            </div>
            <div className="relative ml-0.5 lg:block">
              <Logout />
              <p className='absolute hidden group-hover:block top-6 left-0 text-sm bg-gray-200 p-1 rounded'>Logout</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
