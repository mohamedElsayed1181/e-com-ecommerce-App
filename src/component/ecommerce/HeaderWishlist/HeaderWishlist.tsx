// import LogoWishlist from "../../../assets/svg/wishList.svg?react";
// import { useEffect, useState } from "react";
// import styles from "../../ecommerce/HeaderBasket/styles.module.css";
// import { useNavigate } from "react-router-dom";
// import { useAppSelector } from "../../../store/hooks";

// function HeaderWishlist() {
//   const [isAnimate, setIsAnimate] = useState(false); // استخدم التسمية المناسبة للحالة
//   //هنا انا حطيت الايتمز ايدى  دوت ينس علشان الايتمز ايدى اراى
//   const totalQuantity = useAppSelector((state) => state.wishlist.itemsId.length);
//   //أما لو itemsId هو Object وبيحتوي على IDs، يبقى الحل كالتالي:
//   // const totalQuantity = useAppSelector((state) => Object.keys(state.wishlist.itemsId).length);

//   const navigate = useNavigate();

//   useEffect(() => {
//     if (totalQuantity > 0) {
//       setIsAnimate(true);
//       const timer = setTimeout(() => {
//         setIsAnimate(false);
//       }, 300); // زمن الأنيميشن في CSS هو 300ms

//       return () => clearTimeout(timer);
//     }
//   }, [totalQuantity]);

//   return (
//     <div
//       className="flex items-center gap-2 p-2 cursor-pointer"
//       onClick={() => navigate("/wishlist")}
//     >
//       <div className="relative flex items-center justify-center w-10 h-10 bg-teal-400 rounded-full shadow-md">
//         <LogoWishlist title="Cart Icon" className="w-5 h-5 text-white" />
//         {totalQuantity > 0 && (
//           <span
//             className={`absolute -top-2 -right-2 flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-gradient-to-br from-teal-400 to-teal-600 rounded-full shadow-lg transform transition-all duration-300 ${
//               isAnimate ? styles.pumpCartQuantity : ""
//             }`}
//           >
//             {totalQuantity}
//           </span>
//         )}
//       </div>
//     </div>
//   );
// }

// export default HeaderWishlist;
