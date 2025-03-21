// ProfileLayout.jsx
import { NavLink, Outlet } from "react-router-dom";

const ProfileLayout = () => {
  return (
    <div className="flex space-x-4 ml-5">
      <div className="w-1/4 bg-gray-100 p-4 rounded-lg">
        <nav className="space-y-2">
          <NavLink
            to="/profile"
            end
            className={({ isActive }) =>
              `block px-4 py-2 rounded-lg ${
                isActive
                  ? "bg-blue-500 text-white"
                  : "text-gray-700 hover:bg-blue-100"
              }`
            }
          >
            Account Info
          </NavLink>
          <NavLink
            to="/profile/orders"
            className={({ isActive }) =>
              `block px-4 py-2 rounded-lg ${
                isActive
                  ? "bg-blue-500 text-white"
                  : "text-gray-700 hover:bg-blue-100"
              }`
            }
          >
            Orders
          </NavLink>
        </nav>
      </div>

      <div className="w-3/4 p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default ProfileLayout;
