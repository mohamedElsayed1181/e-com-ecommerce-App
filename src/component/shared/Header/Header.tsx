import { NavLink } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { authLogOut } from "../../../store/auth/authSlice";
import HeaderCounter from "../../ecommerce/HeaderCounter/HeaderCounter";
import LogoWishlist from "../../../assets/svg/wishList.svg?react";
import Logo from "../../../assets/svg/cart.svg?react";
import { FiMenu, FiX } from "react-icons/fi";

function Header() {
  const dispatch = useAppDispatch();
  const { accessToken, user } = useAppSelector((state) => state.auth);
  const wishlistTotalQuantity = useAppSelector(
    (state) => state.wishlist.itemsId.length
  );
  const cartItems = useAppSelector((state) => state.cart.items);
  const cartTotalQuantity = Object.values(cartItems).reduce(
    (accumulator, current) => accumulator + current,
    0
  );
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <NavLink to="/" className="flex items-center">
              <svg
                className="h-8 w-8 text-teal-600"
                viewBox="0 0 28 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.41 10.3847C1.14777 7.4194 2.85643 4.7861 5.2639 2.90424C7.6714 1.02234 10.6393 0 13.695 0C16.7507 0 19.7186 1.02234 22.1261 2.90424C24.5336 4.7861 26.2422 7.4194 26.98 10.3847H25.78C23.7557 10.3549 21.7729 10.9599 20.11 12.1147C20.014 12.1842 19.9138 12.2477 19.81 12.3047H19.67C19.5662 12.2477 19.466 12.1842 19.37 12.1147C17.6924 10.9866 15.7166 10.3841 13.695 10.3841C11.6734 10.3841 9.6976 10.9866 8.02 12.1147C7.924 12.1842 7.8238 12.2477 7.72 12.3047H7.58C7.4762 12.2477 7.376 12.1842 7.28 12.1147C5.6171 10.9599 3.6343 10.3549 1.61 10.3847H0.41ZM23.62 16.6547C24.236 16.175 24.9995 15.924 25.78 15.9447H27.39V12.7347H25.78C24.4052 12.7181 23.0619 13.146 21.95 13.9547C21.3243 14.416 20.5674 14.6649 19.79 14.6649C19.0126 14.6649 18.2557 14.416 17.63 13.9547C16.4899 13.1611 15.1341 12.7356 13.745 12.7356C12.3559 12.7356 11.0001 13.1611 9.86 13.9547C9.2343 14.416 8.4774 14.6649 7.7 14.6649C6.9226 14.6649 6.1657 14.416 5.54 13.9547C4.4144 13.1356 3.0518 12.7072 1.66 12.7347H0V15.9447H1.61C2.39051 15.924 3.154 16.175 3.77 16.6547C4.908 17.4489 6.2623 17.8747 7.65 17.8747C9.0377 17.8747 10.392 17.4489 11.53 16.6547C12.1468 16.1765 12.9097 15.9257 13.69 15.9447C14.4708 15.9223 15.2348 16.1735 15.85 16.6547C16.9901 17.4484 18.3459 17.8738 19.735 17.8738C21.1241 17.8738 22.4799 17.4484 23.62 16.6547ZM23.62 22.3947C24.236 21.915 24.9995 21.664 25.78 21.6847H27.39V18.4747H25.78C24.4052 18.4581 23.0619 18.886 21.95 19.6947C21.3243 20.156 20.5674 20.4049 19.79 20.4049C19.0126 20.4049 18.2557 20.156 17.63 19.6947C16.4899 18.9011 15.1341 18.4757 13.745 18.4757C12.3559 18.4757 11.0001 18.9011 9.86 19.6947C9.2343 20.156 8.4774 20.4049 7.7 20.4049C6.9226 20.4049 6.1657 20.156 5.54 19.6947C4.4144 18.8757 3.0518 18.4472 1.66 18.4747H0V21.6847H1.61C2.39051 21.664 3.154 21.915 3.77 22.3947C4.908 23.1889 6.2623 23.6147 7.65 23.6147C9.0377 23.6147 10.392 23.1889 11.53 22.3947C12.1468 21.9165 12.9097 21.6657 13.69 21.6847C14.4708 21.6623 15.2348 21.9135 15.85 22.3947C16.9901 23.1884 18.3459 23.6138 19.735 23.6138C21.1241 23.6138 22.4799 23.1884 23.62 22.3947Z"
                  fill="currentColor"
                />
              </svg>
              <div className="flex items-center ml-2">
                <span className="text-2xl font-bold text-gray-800">OUR</span>
                <span className="text-2xl font-bold text-white bg-teal-600 px-1 ml-1 rounded">
                  e-Com
                </span>
              </div>
            </NavLink>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center ">
            <NavLink
              to="/"
              className="text-gray-700 hover:text-teal-600 px-3 py-2 text-sm font-medium transition-colors"
            >
              Home
            </NavLink>
            <NavLink
              to="/categories"
              className="text-gray-700 hover:text-teal-600 px-3 py-2 text-sm font-medium transition-colors"
            >
              Categories
            </NavLink>
          </nav>

          {/* Desktop Icons and Auth */}
          <div className="hidden md:flex items-center">
            <NavLink
              to="/wishlist"
              className="flex items-center p-2 rounded-full hover:bg-gray-50 transition-colors"
            >
              <HeaderCounter
                to="/wishlist"
                totalQuantity={wishlistTotalQuantity}
                svgIcon={
                  <LogoWishlist className="w-5 h-5 text-gray-700 hover:text-teal-600 transition-colors" />
                }
                title="Wishlist"
              />
            </NavLink>
            <NavLink
              to="/cart"
              className="flex items-center p-2 rounded-full hover:bg-gray-50 transition-colors"
            >
              <HeaderCounter
                to="/cart"
                totalQuantity={cartTotalQuantity}
                svgIcon={
                  <Logo className="w-5 h-5 text-gray-700 hover:text-teal-600 transition-colors" />
                }
                title="Cart"
              />
            </NavLink>

            {!accessToken ? (
              <>
                <NavLink
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-teal-600 hover:text-teal-700 transition-colors"
                >
                  Sign In
                </NavLink>
                <NavLink
                  to="/rigister"
                  className="px-4 py-2 text-sm font-medium text-white bg-teal-600 rounded-md hover:bg-teal-700 transition-colors shadow-sm"
                >
                  Sign Up
                </NavLink>
              </>
            ) : (
              <div ref={menuRef} className="relative">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  <span className="font-medium text-gray-700">
                    {user?.firistName} {user?.secondName}
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${
                      isOpen ? "transform rotate-180" : ""
                    }`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                  >
                    <div className="py-1">
                      <NavLink
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsOpen(false)}
                      >
                        Profile
                      </NavLink>
                      <NavLink
                        to="/profile/orders"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsOpen(false)}
                      >
                        My Orders
                      </NavLink>
                      <button
                        onClick={() => {
                          dispatch(authLogOut());
                          setIsOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        Sign Out
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden ml-4">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-teal-600 hover:bg-gray-50 focus:outline-none transition-colors"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <FiX className="h-6 w-6" />
              ) : (
                <FiMenu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu - shown only on small screens */}
        <div className="md:hidden">
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="pt-2 pb-3 space-y-1">
                <NavLink
                  to="/"
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded-md"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </NavLink>
                <NavLink
                  to="/categories"
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded-md"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Categories
                </NavLink>
              </div>
              <div className="pt-4 pb-2 border-t border-gray-200">
                <div className="flex flex-col px-4 space-y-4">
                  <NavLink
                    to="/wishlist"
                    className="p-2 rounded-full hover:bg-gray-50 w-full"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <HeaderCounter
                      to="/wishlist"
                      totalQuantity={wishlistTotalQuantity}
                      svgIcon={
                        <LogoWishlist className="w-5 h-5 text-gray-700" />
                      }
                      title="Wishlist"
                    />
                  </NavLink>
                  <NavLink
                    to="/cart"
                    className="p-2 rounded-full hover:bg-gray-50 w-full"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <HeaderCounter
                      to="/cart"
                      totalQuantity={cartTotalQuantity}
                      svgIcon={<Logo className="w-5 h-5 text-gray-700" />}
                      title="Cart"
                    />
                  </NavLink>
                </div>
              </div>

              <div className="pt-4 pb-2 border-t border-gray-200">
                {!accessToken ? (
                  <div className="space-y-3 px-4">
                    <NavLink
                      to="/login"
                      className="block w-full px-4 py-2 text-center text-base font-medium text-teal-600 hover:text-teal-700 rounded-md"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Sign In
                    </NavLink>
                    <NavLink
                      to="/register"
                      className="block w-full px-4 py-2 text-center text-base font-medium text-white bg-teal-600 hover:bg-teal-700 rounded-md shadow-sm"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Sign Up
                    </NavLink>
                  </div>
                ) : (
                  <div className="px-4">
                    <div className="flex items-center">
                      <div className="ml-3">
                        <div className="text-base font-medium text-gray-800">
                          {user?.firistName} {user?.secondName}
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 space-y-1">
                      <NavLink
                        to="/profile"
                        className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded-md"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Profile
                      </NavLink>
                      <NavLink
                        to="/profile/orders"
                        className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded-md"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        My Orders
                      </NavLink>
                      <button
                        onClick={() => {
                          dispatch(authLogOut());
                          setIsMobileMenuOpen(false);
                        }}
                        className="block w-full text-left px-3 py-2 text-base font-medium text-red-600 hover:bg-red-50 rounded-md"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
