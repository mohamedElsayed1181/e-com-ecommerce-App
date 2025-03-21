import { memo } from "react";

const Heading = memo(({ children }: { children: React.ReactNode }) => {
  return <h2 className="text-2xl font-bold text-gray-600 ml-5">{children}</h2>;
});

export default Heading;
