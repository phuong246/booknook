import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import {useRegisterMutation} from '../../redux/api/usersApiSlice';
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";

const Register = () => {
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [register, { isLoading }] = useRegisterMutation();
    const { userInfo } = useSelector((state) => state.auth);

    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get("redirect") || "/";

    useEffect(() => {
        if (userInfo) {
          navigate(redirect);
        }
      }, [navigate, redirect, userInfo]);


      const submitHandler = async (e) => {
        e.preventDefault();
    
        if (password !== confirmPassword) {
          toast.error("Mật khẩu không trùng khớp");
        } else {
          try {
            const res = await register({ username, email, password }).unwrap();
            dispatch(setCredentials({ ...res }));
            navigate(redirect);
            toast.success("Đăng kí thành công");
          } catch (err) {
            console.log(err);
            toast.error(err.data.message);
          }
        }
      };
  
  
  
    return (
        <section className="pl-[10rem] flex flex-wrap">
            <div className="mr-[4rem] mt-[3rem]">
                <h1 className="text-2xl font-semibold mb-4">Đăng kí</h1>

                <form onSubmit={submitHandler} className="container w-[30rem]">
                    <div className="my-[1rem]">
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-black"
                        >Tên tài khoản</label>
                        <input
                            type="text"
                            id="name"
                            className="mt-1 p-2 border rounded w-full"
                            value={username}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                    </div>

                    <div className="my-[1rem]">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-black"
                        >Email</label>
                        <input
                            type="email"
                            id="email"
                            className="mt-1 p-2 border rounded w-full"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="my-[1rem]">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-black"
                        >Mật khẩu</label>
                        <input
                            type="password"
                            id="password"
                            className="mt-1 p-2 border rounded w-full"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="my-[1rem]">
                        <label
                            htmlFor="confirmPassword"
                            className="block text-sm font-medium text-black"
                        >Xác nhận mật khẩu</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            className="mt-1 p-2 border rounded w-full"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>

                    <button
                        disabled={isLoading}
                        type="submit"
                        className="bg-pink-500 text-white px-4 py-2 rounded cursor-pointer my-[1rem]"
                    >
                        {isLoading ? "Đang đăng kí..." : "Đăng kí"}
                    </button>

                    {isLoading && <Loader />}
  
                </form>

                <div className="mt-4">
                    <p className="text-black">
                        Đã có tài khoản?{" "} 
                        <Link
                            to={redirect ? `/login?redirect=${redirect}` :"/login"}
                            className="text-pink-500 hover:underline"
                        >Đăng nhập</Link>
                    </p>
                </div>
            </div>

            
        </section>
  )
}

export default Register;