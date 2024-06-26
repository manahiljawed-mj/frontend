"use client";
import React from "react";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import { usePathname } from "next/navigation";
import logo from "@/assets/dashboard/images/logo_01.png";
import avatar from "@/assets/dashboard/images/avatar_01.jpg";
import profile_icon_1 from "@/assets/dashboard/images/icon/icon_23.svg";
import profile_icon_2 from "@/assets/dashboard/images/icon/icon_24.svg";
import profile_icon_3 from "@/assets/dashboard/images/icon/icon_25.svg";
import logout from "@/assets/dashboard/images/icon/icon_9.svg";
import nav_1 from "@/assets/dashboard/images/icon/icon_1.svg";
import nav_1_active from "@/assets/dashboard/images/icon/icon_1_active.svg";
import nav_2 from "@/assets/dashboard/images/icon/icon_2.svg";
import nav_2_active from "@/assets/dashboard/images/icon/icon_2_active.svg";
import nav_3 from "@/assets/dashboard/images/icon/icon_3.svg";
import nav_3_active from "@/assets/dashboard/images/icon/icon_3_active.svg";
import nav_4 from "@/assets/dashboard/images/icon/icon_4.svg";
import nav_4_active from "@/assets/dashboard/images/icon/icon_4_active.svg";
import nav_5 from "@/assets/dashboard/images/icon/icon_5.svg";
import nav_5_active from "@/assets/dashboard/images/icon/icon_5_active.svg";
import nav_6 from "@/assets/dashboard/images/icon/icon_6.svg";
import nav_6_active from "@/assets/dashboard/images/icon/icon_6_active.svg";
import nav_7 from "@/assets/dashboard/images/icon/icon_7.svg";
import nav_7_active from "@/assets/dashboard/images/icon/icon_7_active.svg";
import nav_8 from "@/assets/dashboard/images/icon/icon_8.svg";
import LogoutModal from "../../common/popup/logout-modal";
import { useState, useEffect } from "react";
import axios from "axios";

// nav data
const nav_data: {
  id: number;
  icon: StaticImageData;
  icon_active: StaticImageData;
  link: string;
  title: string;
}[] = [
  // {
  //   id: 1,
  //   icon: nav_1,
  //   icon_active: nav_1_active,
  //   link: "/dashboard/candidate-dashboard",
  //   title: "Dashboard",
  // },
  {
    id: 2,
    icon: nav_2,
    icon_active: nav_2_active,
    link: "/dashboard/candidate-dashboard/profile",
    title: "My Profile",
  },
  {
    id: 12,
    icon: nav_3,
    icon_active: nav_3_active,
    link: "/dashboard/candidate-dashboard/applied-jobs",
    title: "Applied Jobs",
  },
  // {
  //   id: 3,
  //   icon: nav_3,
  //   icon_active: nav_3_active,
  //   link: "/dashboard/candidate-dashboard/resume",
  //   title: "Resume",
  // },
  // {
  //   id: 8,
  //   icon: nav_3,
  //   icon_active: nav_3_active,
  //   link: "/dashboard/candidate-dashboard/resume-generator",
  //   title: "Resume Generator",
  // },
  // {
  //   id: 4,
  //   icon: nav_4,
  //   icon_active: nav_4_active,
  //   link: "/dashboard/candidate-dashboard/messages",
  //   title: "Messages",
  // },
  // {
  //   id: 5,
  //   icon: nav_5,
  //   icon_active: nav_5_active,
  //   link: "/dashboard/candidate-dashboard/job-alert",
  //   title: "Job Alert",
  // },
  {
    id: 6,
    icon: nav_6,
    icon_active: nav_6_active,
    link: "/dashboard/candidate-dashboard/saved-job",
    title: "Saved Job",
  },
  // {
  //   id: 7,
  //   icon: nav_7,
  //   icon_active: nav_7_active,
  //   link: "/dashboard/candidate-dashboard/setting",
  //   title: "Account Settings",
  // },
  {
    id: 9,
    icon: nav_3,
    icon_active: nav_3_active,
    link: "/dashboard/candidate-dashboard/recommended_courses",
    title: "Recommended Courses",
  },
  {
    id: 5,
    icon: nav_5,
    icon_active: nav_5_active,
    link: "/dashboard/candidate-dashboard/recommended_jobs",
    title: "Recommended Jobs",
  },
];
// props type 
type IProps = {
  isOpenSidebar: boolean,
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>
}

// const tokenA = localStorage.getItem("token");

const CandidateAside = ({isOpenSidebar,setIsOpenSidebar}:IProps) => {
  // extract user details from jwt token
  const [userDetails, setUserDetails] = useState<any>({});
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [isError, setIsError] = useState<boolean>(false);
  // const [isSuccess, setIsSuccess] = useState<boolean>(false);
  // const [isShow, setIsShow] = useState<boolean>(false);
  // const [message, setMessage] = useState<string>("");

  const logoutCandidate = () => {
    const role = localStorage.getItem('roleC');
    console.log('Role:', role);
    if (role === 'candidate') {
      localStorage.removeItem('tokenA');
      localStorage.removeItem('roleC');
      window.location.href = 'http://localhost:3000';
    }
  }
  
  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/auth/candidateDetails', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          const { firstname, lastname } = response.data.data.candidate;
          setUserDetails({ firstname, lastname });
        }
      } catch (error) {
        // Handle errors
        console.error('Error fetching user details:', error);
      }
    };

    const fetchProfilePicture = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          'http://localhost:5000/api/auth/getProfilePicture',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // console.log('Profile Picture Path:', response.data.filePath);

        if (response.status === 200) {
          // Construct the full URL based on the relative path
          const fullUrl = `http://localhost:5000${response.data.filePath}`;

          // Update the profile picture state with the full URL
          setProfilePicture(fullUrl);
        }
      } catch (error) {
        console.error('Error fetching profile picture:', error);
      }
    };


    getUserDetails(), fetchProfilePicture();
  }, []);

  const pathname = usePathname();
  return (
    <>
    <aside className={`dash-aside-navbar ${isOpenSidebar?'show':''}`}>
      <div className="position-relative">
        <div className="logo text-md-center d-md-block d-flex align-items-center justify-content-between">
          <Link href="/dashboard/candidate-dashboard">
            {/* <Image src={logo} alt="logo" priority /> */}
          </Link>
          <button onClick={() => setIsOpenSidebar(false)} className="close-btn d-block d-md-none">
            <i className="bi bi-x-lg"></i>
          </button>
        </div>
        <div className="user-data">
          <div className="user-avatar online position-relative rounded-circle">
            {/* <Image src={profilePicture} alt="avatar" className="lazy-img" style={{height:'auto'}} /> */}
            {profilePicture ? (
              <img
                src={profilePicture}
                alt="profile-picture"
                className="lazy-img"
                style={{ height: 'auto' }}
              />
            ) : (
              <Image
                src={avatar}
                alt="avatar"
                className="lazy-img "
                style={{ height: 'auto' }}
              />
            )}
          </div>
          <div className="user-name-data">
            {userDetails.firstname && userDetails.lastname ? (
              <button
                className="user-name"
                type="button"
                id="profile-dropdown"
                data-bs-toggle="dropdown"
                data-bs-auto-close="outside"
                aria-expanded="false"
              >
                {userDetails.firstname} {userDetails.lastname}
              </button>

            ): (
              <p>Loading</p>
            )}
            {/* <ul className="dropdown-menu" aria-labelledby="profile-dropdown">
              <li>
                <Link
                  className="dropdown-item d-flex align-items-center"
                  href="/dashboard/candidate-dashboard/profile"
                >
                  <Image src={profile_icon_1} alt="icon" className="lazy-img" />
                  <span className="ms-2 ps-1">Profile</span>
                </Link>
              </li>
              <li>
                <Link
                  className="dropdown-item d-flex align-items-center"
                  href="/dashboard/candidate-dashboard/profile"
                >
                  <Image src={profile_icon_2} alt="icon" className="lazy-img" />
                  <span className="ms-2 ps-1">Account Settings</span>
                </Link>
              </li>
              <li>
                <a className="dropdown-item d-flex align-items-center" href="#">
                  <Image src={profile_icon_3} alt="icon" className="lazy-img" />
                  <span className="ms-2 ps-1">Notification</span>
                </a>
              </li>
            </ul> */}
          </div>
        </div>
        <nav className="dasboard-main-nav">
          <ul className="style-none">
            {nav_data.map((m) => {
              const isActive = pathname === m.link;
              return (
                <li key={m.id} onClick={() => setIsOpenSidebar(false)}>
                  <Link
                    href={m.link}
                    className={`d-flex w-100 align-items-center ${isActive ? "active" : ""}`}
                  >
                    <Image
                      src={isActive ? m.icon_active : m.icon}
                      alt="icon"
                      className="lazy-img"
                    />
                    <span>{m.title}</span>
                  </Link>
                </li>
              );
            })}
            {/* <li>
              <a
                href="#"
                className="d-flex w-100 align-items-center"
                data-bs-toggle="modal"
                data-bs-target="#deleteModal"
              >
                <Image src={nav_8} alt="icon" className="lazy-img" />
                <span>Delete Account</span>
              </a>
            </li> */}
          </ul>
        </nav>
        {/* <div className="profile-complete-status">
          <div className="progress-value fw-500">87%</div>
          <div className="progress-line position-relative">
            <div className="inner-line" style={{ width: "80%" }}></div>
          </div>
          <p>Profile Complete</p>
        </div> */}

        {/* <a href="#" className="d-flex w-100 align-items-center logout-btn" onClick={logoutCandidate}>
          <Image src={logout} alt="icon" className="lazy-img" />
          <span>Logout</span>
        </a> */}
      </div>
    </aside>
    {/* LogoutModal star */}
    {/* <LogoutModal/> */}
    {/* LogoutModal end */}
    </>
  );
};

export default CandidateAside;
