import React from "react";
import { FaEdit, FaRegEnvelope, FaLinkedin, FaGithub } from "react-icons/fa";
import profilbg from "../../images/bg-profil.png"; 
import profil from "../../images/profil.png"; 


const ProfileCard = ({ 
  name = "John Doe", 
  jobTitle = "Software Developer", 
  email = "john.doe@example.com", 
  bio = "A passionate software developer with a focus on front-end technologies.", 
  linkedin = "https://www.linkedin.com/in/johndoe", 
  github = "https://github.com/johndoe"
}) => {
  return (
    <div className="w-full max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden border">
      <div className="relative">
        <img
          className="w-full h-32 object-cover"
          src={profilbg}
          alt="Cover"
        />
        <div className="absolute top-24 left-4 flex items-center space-x-4">
          <img
            className="w-20 h-20 rounded-full border-4 border-white"
            src={profil} 
            alt="Profile"
          />
          <div>
            <h2 className="text-xl font-semibold text-gray-800">{name}</h2>
            <p className="text-sm text-gray-500">{jobTitle}</p>
          </div>
        </div>
      </div>

      {/* Contenu de la carte */}
      <div className="px-6 py-4">
      n<p className="text-gray-700 text-sm mt-4 mb-4">{bio}</p>


        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-2 text-gray-600">
            <FaRegEnvelope className="text-indigo-600" />
            <span>{email}</span>
          </div>

          <div className="flex items-center space-x-2 text-gray-600">
            <FaLinkedin className="text-blue-600" />
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              LinkedIn
            </a>
          </div>

          <div className="flex items-center space-x-2 text-gray-600">
            <FaGithub className="text-gray-800" />
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>

      {/* Footer avec un bouton d'édition */}
      <div className="bg-gray-100 p-4 flex justify-between items-center">
        <button className="text-indigo-600 flex items-center space-x-2">
          <FaEdit />
          <span>Edit Profile</span>
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;
