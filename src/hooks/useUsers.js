// import { signOut } from "firebase/auth";
import { useContext } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthProvider";
// import auth from "../authentication/firebase.init";

const useUsers = () => {
  const { logOut } = useContext(AuthContext);

  const navigate = useNavigate();
  const {
    data: users,
    isLoading,
    refetch,
  } = useQuery("users", () =>
    fetch(" https://car-parts-server-six.vercel.app/user", {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => {
      if (res.status === 401 || res.status === 403) {
        logOut();
        localStorage.removeItem("accessToken");
        navigate("/login");
      }
      return res.json();
    })
  );
  return [users, isLoading, refetch];
};

export default useUsers;
