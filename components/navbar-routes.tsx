"use client";


import Notification from "./svg Icons/Notifications";
// import { SearchInput } from "./search-input";


export const NavbarRoutes = ({

}) => {


  return (
    <div className="flex items-center justify-between gap-6 w-full p-4">
      <div className="hidden md:block max-w-md pl-4">
        {/* <SearchInput
         
        /> */}
        <h1 className="font-semibold">Virtual Account Service</h1>
      </div>
      <div className="flex items-center gap-3">
       <Notification />
       
      </div>
    </div>
  );
};