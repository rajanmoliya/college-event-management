import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  ArrowRightStartOnRectangleIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import logo from "../../assets/logo.svg";
import { useEffect, useState } from "react";
import fetchUser from "../../api/fetchUser";
import { useSetRecoilState } from "recoil";
import { authState } from "../../recoil/authState";
import { logout } from "../../utils/auth";

const AdminNavbar = () => {
  const [user, setUser] = useState({});

  const [isOpen, setIsOpen] = useState(false);

  const location = useLocation();

  const navigate = useNavigate();

  //logout logic

  const setAuthState = useSetRecoilState(authState);

  const handleLogout = () => {
    logout(setAuthState);
    navigate("/");
  };

  const navItems = [
    { name: "Dashboard", path: "/admin" },
    { name: "Events", path: "/admin/events" },
    { name: "All Registrations", path: "/admin/all-registrations" },
    { name: "Calendar", path: "/calendar" },
  ];

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    fetchUser().then((data) => setUser(data));
  }, []);

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/admin">
                <img className="h-8 w-auto" src={logo} alt="Logo" />
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`${
                    location.pathname === item.path
                      ? "border-indigo-500 text-gray-900"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <div className="flex-1 flex justify-center px-2 lg:ml-6 lg:justify-end">
              <div className="max-w-lg w-full lg:max-w-xs">
                <label htmlFor="search" className="sr-only">
                  Search
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MagnifyingGlassIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </div>
                  <input
                    id="search"
                    name="search"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Search"
                    type="search"
                  />
                </div>
              </div>
            </div>

            <div className="ml-3 relative">
              {/* Profile DropDown Starts */}

              <div className="relative inline-block text-left">
                <button
                  id="dropdownUserAvatarButton"
                  onClick={toggleDropdown}
                  className="flex text-sm bg-gray-800 rounded-full md:me-0 "
                  type="button"
                >
                  <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-blue-100 rounded-full">
                    <span className="font-medium text-gray-600 uppercase">
                      {user.fullName?.charAt(0)}
                    </span>
                  </div>
                </button>

                {dropdownOpen && (
                  <div
                    id="dropdownAvatar"
                    className="absolute right-0 mt-2 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44"
                  >
                    <div className="px-4 py-3 text-sm ">
                      <div>{user?.fullName}</div>
                      <div className="font-medium truncate">{user?.email}</div>
                    </div>
                    <ul
                      className="py-2 text-sm "
                      aria-labelledby="dropdownUserAvatarButton"
                    >
                      <li>
                        <Link
                          to={"/profile/settings"}
                          className="block px-4 py-2 hover:bg-gray-100 "
                        >
                          Profile Settings
                        </Link>
                      </li>
                    </ul>
                    <div className="py-2">
                      <Link
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 "
                        onClick={handleLogout}
                      >
                        Log out
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Profile DropDown Ends */}
            </div>
          </div>
          <div className="flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500"
              aria-expanded="false"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className="hidden h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className={`${isOpen ? "block" : "hidden"} sm:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`${
                location.pathname === item.path
                  ? "bg-indigo-50 border-indigo-500 text-indigo-700"
                  : "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
              } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="pt-4 pb-3 border-t border-gray-200">
          <div className="px-2 space-y-1">
            <div className="flex items-center px-4">
              <div className="flex-shrink-0">
                <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-blue-100 rounded-full ">
                  <span className="font-medium text-gray-600 uppercase">
                    {user.fullName?.charAt(0)}
                  </span>
                </div>
              </div>
              <div className="ml-3 ">
                <div className="text-base font-medium text-gray-800">
                  {user.fullName}
                </div>
                <div className="text-sm font-medium text-gray-500">
                  {user.email}
                </div>
              </div>
            </div>
            <Link
              className="flex items-center px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
              onClick={handleLogout}
            >
              Logout <ArrowRightStartOnRectangleIcon className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
