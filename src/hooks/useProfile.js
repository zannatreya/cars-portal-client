import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";

const useProfile = (user) => {
  const navigate = useNavigate();
  const {
    data: usersProfile,
    isLoading: isUserLoading,
    refetch,
  } = useQuery(["usersProfile", user?.email], () =>
    fetch(
      ` https://car-parts-server-six.vercel.app/profile?email=${user?.email}`,
      {
        method: "GET",
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    ).then((res) => {
      // if (res.status === 401 || res.status === 403) {
      //   signOut(auth);
      //   localStorage.removeItem("accessToken");
      //   navigate("/login");
      // }
      return res.json();
    })
  );
  return [usersProfile, isUserLoading, refetch];
};

export default useProfile;

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const useProfile = (user) => {
//   const navigate = useNavigate();
//   const [usersProfile, setUsersProfile] = useState({});
//   const [isUserLoading, setIsUserLoading] = useState(false);

//   useEffect(() => {
//     const email = user?.email;
//     if (email) {
//       setIsUserLoading(true);
//       fetch(` https://car-parts-server-six.vercel.app/profile?email=${email}`, {
//         method: "GET",
// headers: {
//     authorization: `Bearer ${localStorage.getItem('accessToken')}`
// }
// }).then((res) => {
// if (res.status === 401 || res.status === 403) {
// signOut(auth)
// localStorage.removeItem('accessToken')
// navigate('/login')
// }
//   return res.json();
// });
// .then((data) => {
//   // console.log(data)
//   setUsersProfile(data);
//   setIsUserLoading(false);
// });
//     }
//   }, [navigate, user?.email]);
//   return [usersProfile, isUserLoading];
// };

// export default useProfile;

// using reactQuery
