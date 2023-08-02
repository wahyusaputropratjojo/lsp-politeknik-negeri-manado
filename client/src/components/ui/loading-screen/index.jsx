import { useLocation, useNavigate } from "react-router-dom";

export const LoadingScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isLogout = location?.state?.is_logout;

  return (
    <div className="h-[100vh] w-[100vw] bg-black">
      <p>Loading Screen</p>
    </div>
  );
};
