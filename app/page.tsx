"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';



export default function Home() {
  const router = useRouter();

 
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/login");
    }, 5000); 


    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex justify-center items-center h-screen bg-background">
      <div className="flex flex-col items-center">
      <DotLottieReact
      src="https://lottie.host/c2993260-1810-42b8-9130-5b44fe04cb51/VI9u6qPHe0.lottie"
      loop
      autoplay
      className="w-50 h-50"
    />
      </div>
    </div>
  );
}
