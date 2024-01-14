import React, { useState, FormEvent } from "react";
import { NavLink, useNavigate } from "react-router-dom";

// State değişkenleri için tip tanımlamalarını içeren bir arayüz oluşturuyoruz
interface ILoginState {
  name: string;
  password: string;
  usernameIsIncorrect: string;
  passwordIsIncorrect: string;
}

const Login: React.FC = () => {
  // State değişkenlerini tanımladığımız arayüzü kullanarak oluşturuyoruz
  const [state, setState] = useState<ILoginState>({
    name: "",
    password: "",
    usernameIsIncorrect: "",
    passwordIsIncorrect: "",
  });

  const navigate = useNavigate();

  // Event parametresi için tip tanımını belirtiyoruz
  const authentication = (e: FormEvent) => {
    e.preventDefault();

    // State değişkenlerini ayrıştırıyoruz
    const { name, password } = state;

    // Hata mesajlarını sıfırlıyoruz
    setState((prevState) => ({
      ...prevState,
      usernameIsIncorrect: "",
      passwordIsIncorrect: "",
    }));

    if (name === "sinan" && password === "1234") {
      console.log("Giriş başarılı");
      navigate("/home");
    } else if (name === "sinan" && password !== "1234") {
      console.log("Şifre Hatalı");
      setState((prevState) => ({
        ...prevState,
        passwordIsIncorrect: "Şifre Hatalı",
      }));
    } else {
      console.log("Böyle bir kullanıcı bulunamadı");
      setState((prevState) => ({
        ...prevState,
        usernameIsIncorrect: "Böyle bir kullanıcı bulunamadı",
      }));
    }
  };

  return (
    <div>
      <div className="grid grid-cols-2 h-screen ">
        <div className="grid col-span-2 login:col-span-1 content-center place-content-center">
          <div className="text-center font-semibold text-[28px]">
            Yemek Sipariş
          </div>
          <form onSubmit={authentication}>
            <div className="sm:w-80 mt-6">
              <label className=" text-[13px] font-semibold">
                E-Posta Adresi
              </label>
              <input
                type="text"
                placeholder="E-Posta Adresi"
                onChange={(e) =>
                  setState((prevState) => ({
                    ...prevState,
                    name: e.target.value,
                  }))
                }
                className="bg-[#EFF4FA] w-full h-11 rounded-t-md mt-1 text-sm px-2"
                required
              />
              <div style={{ border: "solid 1px", color: "#d3d3d3" }}></div>
            </div>

            <div className="mt-2 sm:w-80">
              <label className=" text-[13px] font-semibold">Parola</label>
              <input
                type="password"
                placeholder="****"
                onChange={(e) =>
                  setState((prevState) => ({
                    ...prevState,
                    password: e.target.value,
                  }))
                }
                className="bg-[#EFF4FA] w-full h-11 rounded-t-md mt-1 text-sm px-2"
                required
              />
              <div style={{ border: "solid 1px", color: "#d3d3d3" }}></div>
              <p className="text-[13px] text-red-500 mt-2">
                {state.passwordIsIncorrect}
              </p>
              <p className="text-[13px] text-red-500 mt-2">
                {state.usernameIsIncorrect}
              </p>
            </div>
            <div className="mt-4 sm:w-80 ">
              <button
                type="submit"
                className="bg-blue-500 w-full text-white h-10 rounded-md"
              >
                Giriş Yap
              </button>

              <div className="flex sm:w-80 m-auto mt-4 text-[13px] text-blue-500 font-semibold">
                <div className="cursor-pointer">Parolamı Unuttum</div>
                <div className="flex-grow"> </div>
                <div className="cursor-pointer">Kayıt Ol</div>
              </div>
            </div>
          </form>
        </div>

        <div className="grid col-span-1 content-center place-content-center bg-[#FFD196] elma">
          <img
            className="h-screen object-contain"
            src="https://cdn.webrazzi.com/uploads/2019/11/shutterstock-781560955-880_hd.jpeg"
            alt="Elma"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
