import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Logo from "../assets/images/logo.svg";

const Inscription = () => {
  return (
    <>
      <main className="flex flex-col items-center justify-center h-[100vh]">
        <div className=" bg-interactiveOpacity shadow-lg mx-3 py-5 h-[95vh] w-full md:w-[500px] md:h-[70vh] border border-border rounded-lg flex flex-col justify-center">
          <div className="flex flex-col justify-center items-center">
            <img className="w-[100px] mb-[20px]" src={Logo} alt="logo" />
            <h1 className="text-3xl mb-[20px]">Inscription</h1>

            <div className="h-[400px] flex flex-col items-center justify-between">
              <div className="flex flex-col justify-center">
                <label htmlFor="">Pseudo</label>
                <input type="text" placeholder="Pseudo" />
              </div>
              <div className="flex flex-col justify-center">
                <label htmlFor="">Email</label>
                <input type="mail" placeholder="Email" />
              </div>

              <div className="flex flex-col justify-center">
                <label htmlFor="">Password</label>
                <input type="password" placeholder="Password" />
              </div>

              <div className="flex flex-col justify-center">
                <label htmlFor="">Confirm Password</label>
                <input type="password" placeholder="Confirm Password" />
              </div>

              <Link to={"/friends"}>
                <Button
                  variant="contained"
                  color="primary"
                  className="text-text w-[150px]"
                >
                  Inscription
                </Button>
              </Link>

              <div className="flex">
                <p>Already have an account ?</p>
                <a href="/">Log in</a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Inscription;
