import Fab from "@mui/material/Fab";
import { ArrowUpFromDot } from "lucide-react";
import Drawer from "../components/Drawer";
import NavbarOnline from "../components/NavbarOnline";

const Conversation = () => {
  return (
    <>
      <div className="h-[100vh]">
        <div className="md:flex md:justify-between">
          <Drawer />
          <main className="w-full">
            <div className="flex justify-center">
              <div className="flex justify-between items-center w-[300px] absolute bottom-10">
                <input type="text" placeholder="Your message..." />
                <Fab size="small" color="primary" aria-label="add">
                  <ArrowUpFromDot size={16} color="#EDEEF0" />
                </Fab>
              </div>
            </div>
          </main>

          <NavbarOnline />
        </div>
      </div>
    </>
  );
};

export default Conversation;
