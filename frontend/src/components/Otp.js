import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { RiCloseCircleLine } from "react-icons/ri";

export const Otp = ({ values, handleInputChange, setOpenotp, setValue }) => {
  const { push } = useRouter();
  const registerHandler = (e) => {
    e.preventDefault();
    if (values.otp == "") {
      toast.warning("Otp field is empty");
      return;
    }
    //fetch function
    //you have to set  NEXT_PUBLIC_BACKEND_API_PATH in your .env.local file (in root directory of your app) where your port should be same as that of backend api port
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_PATH}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then((result) => {
        setOpenotp(false);
        if (result.register) {
          toast.success("Registration Successful!!");
          push("/login");
        }
        if (result.error) {
          toast.error(result.error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    setValue({
      ...values,
      otp: "",
    });
  };

  return (
    <div className="z-20 absolute  bg-white bg-opacity-60 backdrop-filter backdrop-blur-md flex flex-col justify-between   w-4/5 h-2/5 shadow-xl rounded-lg overflow-hidden xl:w-96 sm:w-2/5">
      <div
        onClick={() => setOpenotp(false)}
        className="flex justify-end items-start w-full p-2"
      >
        <RiCloseCircleLine className="text-3xl cursor-pointer" />
      </div>
      <div className="flex flex-col justify-around items-center  w-full h-4/5">
        <div className="text-xl">Enter otp</div>
        <form
          onSubmit={registerHandler}
          className="flex flex-col justify-around w-3/5 h-3/5"
        >
          <input
            name="otp"
            value={values.otp}
            type="text"
            onChange={handleInputChange}
            className="p-2 rounded-lg bg-black bg-opacity-70 text-white"
          />
          <div className="w-full flex justify-center">
            <button
              type="submit"
              className="w-3/5 py-2 text-white bg-blue-600 rounded-lg justify-self-center"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Otp;
