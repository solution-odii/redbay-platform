
"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { merchantData } from "@/lib/MockData";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import Loader from "@/components/svg Icons/loader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MerchantUsersTable } from "../../_components/MerchantUsersTable";
import { MerchantStaffsTable } from "../../_components/MerchantStaffTable";
import React from "react";


export default function MerchantProfilePage({ params }: { params: { id: string } }) {
  const router = useRouter();
     // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [merchant, setMerchant] = useState<any>(null);

  useEffect(() => {
    // Unwrap params.id using React.use() and fetch merchant data
    const id = params.id;
    const foundMerchant = merchantData.find((m) => m.sN === Number(id));
    if (foundMerchant) {
      setMerchant(foundMerchant);
    } else {
      router.push("/merchant"); // Redirect if not found
    }
  }, [router]);

  if (!merchant) return <div > <div className="relative w-17 p-4 h-17 mx-auto my-5">
  <div className="absolute inset-0 border-4 border-transparent border-t-[#C80000] rounded-full animate-spin"></div>
  <div className="absolute inset-0 flex items-center m-3 justify-center">
    <Loader />
  </div>
</div></div>;

  const getInitials = (name: string) => {
    const names = name.split(" ");
    return names.length > 1 ? names[0][0] + names[names.length - 1][0] : names[0][0];
  };

  return (
    <div className="min-h-screen mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
        <FaLongArrowAltLeft className="bg-[#F5F5F5] dark:bg-card p-1 w-5 h-5" onClick={() => router.push("/merchant")}/>
      <h1 className="text-sm font-medium "><span className="text-[#A5A5A5]">Merchants/</span>Merchant Profile</h1>
      </div>
      <Button>Export
      <Download className="h-4 w-4 mr-2" />
      </Button>
      </div>
      <div className="w-full flex justify-between mb-4">
        <div className="w-[30%] border rounded-t-lg bg-card">
        <div className="flex items-center gap-2 pl-4 py-4 border-b">
        <Avatar>
                    <AvatarImage src="/placeholder-avatar.jpg" alt={merchant.merchantName} className="rounded-full"/>
                    <AvatarFallback>{getInitials(merchant.merchantName)}</AvatarFallback>
                  </Avatar>
                <div>
                  <p className="font-medium text-sm">{merchant.merchantName}</p>
                </div>
              </div>
              
              <div className="pl-4">
                <div className="flex flex-col gap-2 mb-3 mt-2">
                    <span className="text-xs text-[#A5A5A5]">Status</span>
                    <span className={`ml-2 text-sm ${merchant.status === "Active" ? "text-green-500" : "text-red-500"}`}>
                      {merchant.status}
                    </span>
                </div>
                <div className="flex flex-col gap-2 mb-3">
                    <span className="text-xs text-[#A5A5A5]">Code</span>
                    <p className="text-sm ">{merchant.code}</p>
                </div>
                <div className="flex flex-col gap-2 mb-3">
                    <span className="text-xs text-[#A5A5A5]">Account Name</span>
                    <p className="text-sm"> {merchant.accountName}</p>
                </div>
                <div className="flex flex-col gap-2 mb-3">
                    <span className="text-xs text-[#A5A5A5]">Account Number</span>
                    <p className="text-sm">{merchant.accountNumber}</p>
                </div>
                <div className="flex flex-col gap-2 mb-3">
                    <span className="text-xs text-[#A5A5A5]">Primary Contact Email</span>
                    <p className="text-sm">{merchant.email}</p>
                </div>
                <div className="flex flex-col gap-2 mb-3">
                    <span className="text-xs text-[#A5A5A5]">BVN</span>
                    <p className="text-sm">{merchant.bvn}</p>
                </div>
                <div className="flex flex-col gap-2 mb-3">
                    <span className="text-xs text-[#A5A5A5]">Created At</span>
                    <p className="text-sm">{merchant.createdAt}</p>
                </div>
                </div>
              
        </div>
        <div className="w-[68%] border rounded-t-lg ">
            <div className="flex items-center justify-between gap-2 px-2 py-4 border-b bg-card">
                <div>
                    <span className="text-xs text-[#A5A5A5]">Total vNUBANs Distributed </span>
                    <p>{merchant.vnuban}</p>
                </div>
                <div>
                <span className="text-xs text-[#A5A5A5]">Total N0. of Users </span>
                <p>{merchant.noOfUsers}</p>
                </div>
                <div>
                <span className="text-xs text-[#A5A5A5]">Total Merchant Fees </span>
                <p>{merchant.vnuban}</p>
                </div>
            </div>
            <div className="pl-3 pt-3  mt-4 border-t bg-card">
            <Tabs defaultValue="merchant-staffs">
              <TabsList className="dark:bg-background">
                <TabsTrigger value="merchant-staffs">Merchant Staff</TabsTrigger>
                <TabsTrigger value="merchant-users">Merchant Users</TabsTrigger>
              </TabsList>
              <TabsContent value="merchant-staffs">
                <MerchantStaffsTable/>
              </TabsContent>
              <TabsContent value="merchant-users">
                <MerchantUsersTable/>
              </TabsContent>
            </Tabs>
            </div>
        </div>
      </div>
    </div>
  );
}