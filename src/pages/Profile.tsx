import Heading from "../../src/component/shared/Heading/Heading";
import { useAppSelector } from "../../src/store/hooks";

export default function Profile() {
  const accountInfo = useAppSelector((state) => state.auth.user);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 py-4 sm:py-8 px-4 sm:px-6 lg:px-8">
      {/* Heading */}
      <div className="max-w-3xl mx-auto text-center mb-6 sm:mb-8">
        <Heading>Account Info</Heading>
        <p className="mt-2 sm:mt-4 text-sm sm:text-lg text-gray-600">
          Here are your account details.
        </p>
      </div>

      {/* Account Info List */}
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md sm:shadow-xl overflow-hidden">
        <ul className="divide-y divide-gray-200">
          {/* First Name */}
          <li className="p-4 sm:p-6 hover:bg-gray-50 transition duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <span className="font-bold text-gray-700 text-sm sm:text-base">
                First Name:
              </span>
              <span className="text-gray-900 text-sm sm:text-base break-all">
                {accountInfo?.firistName || "N/A"}
              </span>
            </div>
          </li>

          {/* Second Name */}
          <li className="p-4 sm:p-6 hover:bg-gray-50 transition duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <span className="font-bold text-gray-700 text-sm sm:text-base">
                Second Name:
              </span>
              <span className="text-gray-900 text-sm sm:text-base break-all">
                {accountInfo?.secondName || "N/A"}
              </span>
            </div>
          </li>

          {/* Email */}
          <li className="p-4 sm:p-6 hover:bg-gray-50 transition duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <span className="font-bold text-gray-700 text-sm sm:text-base">
                Email:
              </span>
              <span className="text-gray-900 text-sm sm:text-base break-all">
                {accountInfo?.email || "N/A"}
              </span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
