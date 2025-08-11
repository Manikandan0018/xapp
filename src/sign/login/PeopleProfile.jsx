import bgProfile from '../../img/noProfile-bg.jpg';
import noProfile from '../../img/no-profile.png';
import { IoIosMore } from "react-icons/io";
import { IoMdSearch } from "react-icons/io";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import BaseUrl from '../../constant/Url';


export const PeopleProfile = ({ profileShow, setProfileShow, peopleAccount }) => {
  const [showFullImage, setShowFullImage] = useState(false);
  const [showProfileImage, setShowProfileImage] = useState(false);

 

  

 

  const { data: posts = [] } = useQuery({
    queryKey: ['posts', 'profile'],
    queryFn: async () => {
      const res = await fetch(`${BaseUrl}/api/posts/allPosts`, {
        method: 'GET',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Error fetching posts');
      }
      return res.json();
    },
  });

  const { data: FollowFollowingUsers = [] } = useQuery({
    queryKey: ['FollowFollowingUsers', peopleAccount._id],
    queryFn: async () => {
      const res = await fetch(`${BaseUrl}/api/users/getFollowFollowingProfile/${peopleAccount._id}`, {
        method: 'GET',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Error fetching follow/following users');
      }
      return res.json();
    },
  });

  const userPosts = posts?.filter(
    (post) =>
      post.user?._id?.toString() === peopleAccount._id ||
      post.user?.toString() === peopleAccount._id
  );

  return (
    <>
      <div className="ml-25 w-170">
        <div className="flex">
          <FaArrowLeftLong
            onClick={(e) => {
              e.preventDefault();
              setProfileShow(!profileShow);
            }}
            className="cursor-pointer mt-4 ml-4 text-xl"
          />
          <div className="ml-6">
            <p className="scale-80 text-gray-500">{userPosts.length} posts</p>
          </div>
        </div>

        {/* Cover & Profile image */}
        <div className="relative w-full">
          <img
            src={bgProfile}
            onClick={() => setShowFullImage(true)}
            className="w-full cursor-pointer h-50 object-cover"
            alt="Background"
          />
          <img
            src={posts?.user?.profileImg || noProfile}
            onClick={() => setShowProfileImage(true)}
            className="w-44 h-44 cursor-pointer absolute top-25 ml-10 bg-white rounded-full border-4 border-white object-cover"
            alt="Profile"
          />

          {showFullImage && (
            <div
              className="fixed inset-0 backdrop-blur-[5px] bg-opacity-80 flex items-center justify-center z-50"
              onClick={() => setShowFullImage(false)}
            >
              <img
                src={bgProfile}
                className="w-250 h-100 max-w-full max-h-full"
                alt="Full Profile"
              />
            </div>
          )}

          {showProfileImage && (
            <div
              className="fixed inset-0 backdrop-blur-[5px] bg-opacity-80 flex items-center justify-center z-60"
              onClick={() => setShowProfileImage(false)}
            >
              <img
                src={posts?.user?.profileImg || noProfile}
                className="max-w-full max-h-full"
                alt="Full Profile"
              />
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex justify-end gap-5 mt-2">
          <IoIosMore className="border cursor-pointer mt-2 border-gray-300 p-1.5 rounded-3xl w-9 h-9" />
          <IoMdSearch className="border cursor-pointer mt-2 p-1.5 border-gray-300 rounded-3xl w-9 h-9" />
          <button className="bg-black cursor-pointer text-white w-22 h-10 rounded-3xl">
            follow
          </button>
        </div>

        {/* User Info */}
        <div className="mt-4">
          {peopleAccount && (
            <>
              <p className="font-bold text-xl">{peopleAccount.fullname}</p>
              <p className="text-gray-600">@{peopleAccount.username}</p>
              <p className="text-gray-600">{peopleAccount.email}</p>
            </>
          )}

          <div className="flex mt-3">
            <p>Location</p>
            <p>Joined July 2017</p>
          </div>

          <div className="flex mt-3 gap-5">
            <p>
              {FollowFollowingUsers?.following?.length || 0}
              <span className="text-gray-400 ml-1">Following</span>
            </p>
            <p>
              {FollowFollowingUsers?.followers?.length || 0}
              <span className="text-gray-400 ml-1">Followers</span>
            </p>
          </div>
        </div>

        {/* Following list */}
        <div className="flex mt-3">
          <h1 className='font-bold'>Following</h1>
          <img src={noProfile} className="w-5 absolute ml-20 mt-0.5" alt="" />
          <div className='flex scale-75 space-x-1'>
            {FollowFollowingUsers?.following?.length > 0 ? (
              FollowFollowingUsers.following.map((user, index) => (
                <p
                  key={index}
                  className="text-gray-700 cursor-pointer truncate max-w-[50px] overflow-hidden whitespace-nowrap"
                  title={`@${user.username}`}
                >
                  @{user.username}
                </p>
              ))
            ) : (
              <p className="text-gray-400 ml-5">No users followed</p>
            )}
          </div>
        </div>

        {/* Posts */}
        {userPosts.length === 0 ? (
          <p className="ml-85 text-gray-500">NoPosts</p>
        ) : (
          <div className="mt-4 space-y-4">
            {userPosts.map((post) => (
              <div key={post._id} className="border p-3 rounded-lg shadow">
                {post.img && (
                  <img src={post.img} alt="User Post" className="w-full h-auto rounded-lg" />
                )}
                <p className="mt-2">{post.text}</p>
                <p className="mt-2">{post.user.email}</p>
              </div>
            ))}
          </div>
        )}
      </div>



  
   

    </>
  );
};


