import { useRecoilValue } from "recoil";
import Logo from "../assets/images/logo.svg";
// import Button from "../components/Button";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import authScreenAtom from "../atoms/authAtom";

const Home = () => {
  const authSreenState = useRecoilValue(authScreenAtom);
  // useSetRecoilState(authScreenAtom, "login");
  console.log(authSreenState);

  return (
    <>
      <main className="flex flex-col items-center justify-center h-[100vh]">
        <div className=" bg-interactiveOpacity shadow-lg mx-3 py-5 h-[90vh] w-full md:w-[400px] md:h-[50vh] border border-border rounded-lg flex flex-col justify-center">
          <div className="flex flex-col justify-center items-center">
            <img className="w-[100px] mb-[25px]" src={Logo} alt="logo" />
            <h1 className="text-3xl mb-[25px]">Connection</h1>

            <div className="h-[280px] flex flex-col items-center justify-between">
              <div className="flex flex-col justify-center">
                <label htmlFor="">Email</label>
                <input type="mail" placeholder="Email" />
              </div>

              <div className="flex flex-col justify-center">
                <label htmlFor="">Password</label>
                <input type="password" placeholder="Password" />
              </div>

              <Link to={"/friends"}>
                <Button
                  variant="contained"
                  color="primary"
                  className="text-text w-[150px]"
                >
                  Connect
                </Button>
              </Link>

              <div className="flex">
                <p>Do not have an account yet ? </p>
                <a href="/inscription">Register now</a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
