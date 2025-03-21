import Heading from "../../src/component/shared/Heading/Heading";
import { useAppSelector } from "../../src/store/hooks";

export default function Profile() {
  const accountInfo = useAppSelector((state) => state.auth.user);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 py-8 px-4 sm:px-6 lg:px-8 rounded-lg">
      {/* Heading */}
      <div className="max-w-3xl mx-auto text-center mb-8">
        <Heading>Account Info</Heading>
        <p className="mt-4 text-lg text-gray-600">
          Here are your account details.
        </p>
      </div>

      {/* Account Info List */}
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
        <ul className="divide-y divide-gray-200">
          {/* First Name */}
          <li className="p-6 hover:bg-gray-50 transition duration-300">
            <div className="flex items-center space-x-4">
              <span className="font-bold text-gray-700 flex-shrink-0">
                First Name:
              </span>
              <span className="text-gray-900">{accountInfo?.firistName}</span>
            </div>
          </li>

          {/* Second Name */}
          <li className="p-6 hover:bg-gray-50 transition duration-300">
            <div className="flex items-center space-x-4">
              <span className="font-bold text-gray-700 flex-shrink-0">
                Second Name:
              </span>
              <span className="text-gray-900">{accountInfo?.secondName}</span>
            </div>
          </li>

          {/* Email */}
          <li className="p-6 hover:bg-gray-50 transition duration-300">
            <div className="flex items-center space-x-4">
              <span className="font-bold text-gray-700 flex-shrink-0">
                Email:
              </span>
              <span className="text-gray-900">{accountInfo?.email}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
