
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {  X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BsThreeDots } from "react-icons/bs";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Toaster, toast } from "sonner";
import { vNUBANData } from "@/lib/MockData";
import Reactivate from "@/components/svg Icons/Reactivate";
import Download from "@/components/svg Icons/Download";
import Deactivate from "@/components/svg Icons/Deactivate";

interface VNUBAN {
  sN: number;
  merchant: string;
  vNUBAN: string;
  accountName: string;
  status: string;
  productType: string;
  customerReference: string;
  createdAt: string;
  email: string;
  accountType: string;
  creationIP: string;
  deviceInfo: string;
  processingTime: string;
}

interface VNUBANDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  vNUBAN: VNUBAN | null;
  setSelectedVNUBAN: (vNUBAN: VNUBAN | null) => void;
}

export default function VNUBANDetailsModal({ isOpen, onClose, vNUBAN, setSelectedVNUBAN }: VNUBANDetailsModalProps) {
  if (!vNUBAN || !isOpen) return null;

  const getInitials = (name: string) => {
    const names = name.split(" ");
    return names.length > 1 ? names[0][0] + names[names.length - 1][0] : names[0][0];
  };

  const handleExportDetails = async () => {
    try {
      // Simulate API call to export vNUBAN details
      const response = await fetch(`/api/export-vNUBAN?vNUBAN=${vNUBAN.vNUBAN}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Export failed");
      toast.success("Export successful! Check your downloads.");
      onClose(); // Close the modal on success
    } catch (error) {
      console.log(error)
      toast.error("Export failed. Please try again later.");
      onClose(); // Close the modal on failure
    }
  };

  const currentIndex = vNUBANData.findIndex((item) => item.sN === vNUBAN.sN);
  const prevVNUBAN = currentIndex > 0 ? vNUBANData[currentIndex - 1] : null;
  const nextVNUBAN = currentIndex < vNUBANData.length - 1 ? vNUBANData[currentIndex + 1] : null;

  const handlePrev = () => {
    if (prevVNUBAN) {
      setSelectedVNUBAN(prevVNUBAN); // Update to previous vNUBAN
    }
  };

  const handleNext = () => {
    if (nextVNUBAN) {
      setSelectedVNUBAN(nextVNUBAN); // Update to next vNUBAN
    }
  };

  return (
    <div className="fixed inset-0 z-[50] flex justify-end my-3 mr-3 ">
      <div
        className="fixed inset-0 bg-[#140000B2] backdrop-blur-xs"
        onClick={onClose}
      />
      <div
        className="h-full w-[45%] bg-card shadow-lg overflow-x-auto transform transition-transform duration-300 ease-in-out rounded-xl"
        style={{ transform: isOpen ? "translateX(0)" : "translateX(100%)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-full p-6 overflow-y-auto">
          {/* Header */}
          <div className="flex justify-between items-center border-b border-[#F8F8F8]">
            <div className="flex flex-col gap-0">
              <h2 className="text-sm font-semibold">vNUBAN Details</h2>
              <p className="text-xs text-gray-500 mb-4">Get complete oversight on platform operations</p>
            </div>
            <div className="">
              <Button variant="ghost" className="p-0 h-auto" onClick={onClose}>
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>
          <div className="flex justify-between border-b border-[#F8F8F8] py-3">
            <span className="text-red-500 font-medium text-sm">vNUBAN: <span className="text-primary text-sm font-light">{vNUBAN.vNUBAN}</span></span>
            <div className="flex space-x-2">
              <Button variant="ghost" size="icon" onClick={handlePrev} disabled={!prevVNUBAN}>
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" onClick={handleNext} disabled={!nextVNUBAN}>
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
          {/* Summary Section */}
          <div className="space-y-4 py-3">
            <h3 className="text-xs text-gray-500">Summary Section</h3>
            <div className="flex items-center justify-between space-x-1 pb-5 border-b border-[#F8F8F8]">
              <div className="flex items-center gap-2">
                <Avatar className="w-13 h-13">
                  <AvatarImage src="/placeholder-avatar.jpg" alt={vNUBAN.merchant} />
                  <AvatarFallback>{getInitials(vNUBAN.merchant)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-sm">{vNUBAN.merchant}</p>
                  <p className="text-xs text-gray-500">{vNUBAN.email}</p>
                </div>
              </div>
              <div className="flex gap-3 items-center">
                <Button className="bg-red-500 text-white hover:bg-red-600 ml-auto">View Profile</Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="bg-[#F5F5F5] dark:bg-background rounded-sm">
                      <BsThreeDots />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {vNUBAN.status === "Active" ? (
                      <>
                        <DropdownMenuItem><Deactivate /> Deactivate</DropdownMenuItem>
                        <DropdownMenuItem onClick={handleExportDetails}><Download /> Export Data</DropdownMenuItem>
                      </>
                    ) : (
                      <>
                        <DropdownMenuItem><Reactivate /> Reactivate</DropdownMenuItem>
                        <DropdownMenuItem onClick={handleExportDetails}><Download /> Export Data</DropdownMenuItem>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <div className="flex justify-between text-sm border-b border-[#F8F8F8] pb-1">
              <div className="flex flex-col gap-2"><span className="text-xs text-gray-500">Account Name</span><span>{vNUBAN.accountName}</span></div>
              <div className="flex flex-col gap-2"><span className="text-xs text-gray-500">Status</span><span style={{ color: vNUBAN.status === "Active" ? "#4CAF50" : "#FF4444" }}>{vNUBAN.status}</span></div>
              <div className="flex flex-col gap-2"><span className="text-xs text-gray-500">Created At</span><span>{vNUBAN.createdAt} WAT</span></div>
            </div>
          </div>
          {/* vNUBAN Details */}
          <div className="space-y-4 ">
            <h3 className="text-xs text-gray-500">vNUBAN Details</h3>
            <div className="flex flex-col gap-4 text-sm">
              <span className="flex gap-2 border-b border-[#F8F8F8] pb-2"><p className="font-medium">Account Type:</p><span>{vNUBAN.accountType}</span></span>
              <span className="flex gap-2 border-b border-[#F8F8F8] pb-2"><p className="font-medium">Customer Reference:</p><span>{vNUBAN.customerReference}</span></span>
              <span className="flex gap-2 border-b border-[#F8F8F8] pb-2"><p className="font-medium">Product Type:</p><span>{vNUBAN.productType}</span></span>
            </div>
          </div>
          {/* Additional Metadata */}
          <div className="space-y-4 mt-6">
            <h3 className="text-xs text-gray-500">Additional Metadata</h3>
            <div className="flex flex-col gap-4 text-sm">
              <span className="flex gap-2"><p className="font-medium">Creation IP:</p><span>{vNUBAN.creationIP}</span></span>
              <span className="flex gap-2"><p className="font-medium">Device Info:</p><span>{vNUBAN.deviceInfo}</span></span>
              <span className="flex gap-2"><p className="font-medium">Processing Time:</p><span>{vNUBAN.processingTime}</span></span>
            </div>
          </div>
          {/* Footer */}
          <div className="mt-auto pt-4 text-sm space-y-4">
            <h3 className="text-gray-500 text-xs">Footer</h3>
            <div>
              <span className="flex gap-2"><p className="text-medium">Last Updated:</p><span>{vNUBAN.createdAt} WAT</span></span>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
