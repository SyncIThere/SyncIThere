import Avatar from "@mui/material/Avatar";
import { Cog, Pencil } from "lucide-react";
import test from "../assets/images/test.jpg";
import Drawer from "../components/Drawer";
import Menu from "../components/Menu";

const Account = () => {
  return (
    <>
      <div className="h-[100vh]">
        <Menu />
        <div className="md:flex md:justify-between">
          <Drawer />
          <main className="w-full">
            <h2 className="text-2xl m-5">Account</h2>
            <div className="flex flex-col items-center">
              <Avatar
                alt="Remy Sharp"
                src={test}
                style={{ width: 150, height: 150 }}
              />
              <div className="flex items-center justify-end w-full md:w-[350px]">
                <Pencil color="#EDEEF0" className="m-2" />
                <Cog color="#EDEEF0" className="m-2" />
              </div>

              <div>
                <h3 className="text-xl mt-5">Description:</h3>
                <p className=" bg-interactive p-2 w-[350px] rounded-lg border border-border">
                  {" "}
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Fugit, esse nobis. In necessitatibus tenetur assumenda facere
                  sed quo optio veritatis voluptatem ad temporibus ullam ex,
                  ipsum, rerum quidem nobis ipsa.
                </p>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Account;
