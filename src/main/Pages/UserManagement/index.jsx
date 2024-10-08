import React, { useState } from "react";
import ContentTitle from "../../PageContent/ContentTitle";

import SearchBar from "../components/Search";
import { SelectClinic } from "../components/SelectClinic";
import { TbMenu2, TbX } from "react-icons/tb";
import { Separator } from "@/components/ui/separator";
import AddUser from "./components/AddUser";
import UserCard from "./components/userCard";
import { RoleFilter } from "../components/Filter";

const UserManagement = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <>
      <div className="">
        <div className="py-2 lg:py-4 flex justify-between items-center">
          <ContentTitle title={"User Management"} />
          <div className="relative flex ">
            <div className="flex items-center gap-2">
              <SearchBar />
              <div className="hidden lg:block">
                <div className="flex gap-3">
                  <AddUser />
                  <SelectClinic />
                </div>
              </div>
              <div className="relative">
                {showMenu ? (
                  <TbX className="w-8 h-8 lg:hidden" onClick={toggleMenu} />
                ) : (
                  <TbMenu2 className="w-8 h-8 lg:hidden" onClick={toggleMenu} />
                )}

                {showMenu && (
                  <div className="bg-primary-foreground shadow-md p-3 rounded-b-md absolute top-10 right-0 flex flex-col gap-3">
                    <div className="w-full">
                      <AddUser />
                    </div>
                    <div className="w-full">
                      <SelectClinic />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <Separator orientation="horizontal" className="w-full" />
        <div className="lg:p-5 ">
          <div className="flex justify-end w-full py-3">
            <RoleFilter />
          </div>
          <div className=" lg:p-5 max-h-full">
            <UserCard />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserManagement;
