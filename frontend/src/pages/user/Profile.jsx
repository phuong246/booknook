import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import { useProfileMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { Link } from "react-router-dom";

const Profile = () => {

    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
  
    const { userInfo } = useSelector((state) => state.auth);
  
    const [updateProfile, { isLoading: loadingUpdateProfile }] = useProfileMutation();
  
    useEffect(() => {
      setUserName(userInfo.username);
      setEmail(userInfo.email);
    }, [userInfo.email, userInfo.username]);

    const dispatch = useDispatch();


    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
          toast.error("Passwords do not match");
        } else {
          try {
            const res = await updateProfile({
              _id: userInfo._id,
              username,
              email,
              password,
            }).unwrap();
            dispatch(setCredentials({ ...res }));
            toast.success("Cập nhật thành công");
          } catch (err) {
            toast.error(err?.data?.message || err.error);
          }
        }
      };


  return (
    <div className="container mx-auto p-4 mt-[3rem]">
        <div className="flex justify-center align-center md:flex md:space-x-4">
            <div className="md:w-1/3">
                <h2 className="text-2xl font-semibold mb-4">Cập nhật tài khoản</h2>

                <form onSubmit={submitHandler} className="container w-[30rem]"> 
                    <div className="my-[1rem]">
                        <label className="block text-black mb-2">Tên người dùng</label>
                        <input
                            type="text"
                            className="mt-1 p-2 border rounded w-full"
                            value={username}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                    </div>

                    <div className="my-[1rem]">
                        <label className="block text-black mb-2">Email</label>
                        <input
                            type="email"
                            className="mt-1 p-2 border rounded w-full"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="my-[1rem]">
                        <label className="block text-black mb-2">Mật khẩu</label>
                        <input
                            type="password"
                            className="mt-1 p-2 border rounded w-full"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="my-[1rem]">
                        <label className="block text-black mb-2">Xác nhận mật khẩu</label>
                        <input
                            type="password"
                            className="mt-1 p-2 border rounded w-full"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>

                    <div className="flex justify-between">
                        <button
                            type="submit"
                            className="bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600"
                        >Cập nhật</button>

                        <Link 
                            to="/user-orders"
                            className="bg-pink-600 text-white py-2 px-4 rounded hover:bg-pink-700"
                        >Đơn đã đặt</Link>
                    </div>

                    {loadingUpdateProfile && <Loader />}

                </form>
            </div>
        </div>
    </div>
  )
};

export default Profile;
