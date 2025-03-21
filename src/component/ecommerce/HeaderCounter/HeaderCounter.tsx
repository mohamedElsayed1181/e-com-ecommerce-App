import { useEffect, useState } from "react";
import styles from "../../ecommerce/HeaderBasket/styles.module.css";
import { useNavigate } from "react-router-dom";

type THeaderCounterProps = {
  totalQuantity: number;
  title: string;
  svgIcon: React.ReactNode;
  to: string;
};

function HeaderCounter({
  totalQuantity,
  title,
  svgIcon,
  to,
}: THeaderCounterProps) {
  const [isAnimate, setIsAnimate] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (totalQuantity > 0) {
      setIsAnimate(true);
      const timer = setTimeout(() => {
        setIsAnimate(false);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [totalQuantity]);

  return (
    <div
      className="flex items-center gap-2 p-2 cursor-pointer"
      onClick={() => navigate(to)}
    >
      <div className="relative flex items-center justify-center w-10 h-10 bg-teal-400 rounded-full shadow-md">
        {svgIcon}
        {totalQuantity > 0 && (
          <span
            className={`absolute -top-2 -right-2 flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-gradient-to-br from-teal-400 to-teal-600 rounded-full shadow-lg transform transition-all duration-300 ${
              isAnimate ? styles.pumpCartQuantity : ""
            }`}
          >
            {totalQuantity}
          </span>
        )}
      </div>
      <h2 className="text-gray-600">{title}</h2>
    </div>
  );
}

export default HeaderCounter;
