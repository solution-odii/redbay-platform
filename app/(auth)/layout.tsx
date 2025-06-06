
import Frame from "@/public/Frame.svg"
import Image from "next/image";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      {/* Left Side: Red Background with Globe and Text */}
      <div className="w-1/2 bg-red-600 flex items-center justify-center relative overflow-hidden">
        <Image src={Frame} alt=""/>
      </div>
      {/* Right Side: Auth Form Area */}
      <div className="w-1/2 flex items-center justify-center ">
        {children}
      </div>
    </div>
  );
}