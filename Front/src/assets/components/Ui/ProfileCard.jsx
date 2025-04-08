import React from "react";
import { FaEdit, FaRegEnvelope,FaPhone,FaAddressCard, FaLinkedin, FaGithub } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";

import profilbg from "../../images/bg-profil.png"; 
import profil from "../../images/profil.png"; 
import { useAuth } from "../../utils/AuthContext"; 



const ProfileCard = ({ 
  name = "John Doe", 
  jobTitle = "Software Developer", 
  email = "john.doe@example.com", 
  bio = "A passionate software developer with a focus on front-end technologies.", 
  linkedin = "https://www.linkedin.com/in/johndoe", 
  github = "https://github.com/johndoe",
  number = '+2126635259159',
}) => {

  const { user,logout } = useAuth();
  return (
    <div className="w-sm mx-auto bg-neutral-100 dark:bg-neutral-800 shadow-lg rounded-lg overflow-hidden border">
      <div className="relative">
        <img
          className="w-full h-32 object-cover"
          src={profilbg}
          alt="Cover"
        />
        <div className="absolute top-24 left-4 flex items-center space-x-4">
          <img
            className="w-20 h-20 rounded-full border-4 border-white dark:border-neutral-950"
            src={profil} 
            alt="Profile"
          />
          <div>
            <h2 className="text-xl pt-6 font-semibold text-neutral-800 dark:text-neutral-200">{user.username}</h2>
          </div>
        </div>
      </div>

      {/* Contenu de la carte */}
      <div className="px-6 py-4 pt-14">


        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-2 text-gray-600">
            <FaRegEnvelope className="text-indigo-600" />
            <span>{user.email}</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600">
            <FaAddressCard className="text-indigo-600" />
            <span>{user.CIN}</span>
          </div>
          {user.number && <div className="flex items-center space-x-2 text-gray-600">
            <FaPhone className="text-indigo-600" />
            <span>{user.number}</span>
          </div>}

        </div>
      </div>

      {/* Footer avec un bouton d'édition */}
      <div className="bg-neutral-200 dark:bg-neutral-900/50 p-4 flex justify-between items-center">
        <a href="/dash/settings" className="text-indigo-600 flex items-center duration-200 space-x-2 cursor-pointer hover:text-indigo-800 dark:hover:text-indigo-400 hover:-translate-y-0.5">
          <FaEdit />
          <span>Edit Profile</span>
        </a>
        <a onClick={logout} className="text-indigo-600 flex items-center duration-200 space-x-2 cursor-pointer hover:text-indigo-800 dark:hover:text-indigo-400 hover:-translate-y-0.5">
          <LuLogOut />
          <span>Logout</span>
        </a>
      </div>
    </div>
  );
};

export default ProfileCard;
