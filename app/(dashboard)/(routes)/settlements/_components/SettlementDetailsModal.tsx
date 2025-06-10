
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
import View from "@/components/svg Icons/View";
import {  toast } from "sonner";
import { settlementData } from "@/lib/MockData";
import Retry from "@/components/svg Icons/Retry";
import Download from "@/components/svg Icons/Download";

interface Settlement {
  sN: number;
  merchant: string;
  sourceAccount: string;
  destinationAccount: string;
  amount: number;
  status: string;
  timestamp: string;
  transactionID: string;
  sessionID: string;
  reference: string;
  webhookStatus: string;
  transactionType: string;
  ipAddress: string;
  deviceInfo: string;
  processingTime: string;
  lastUpdated: string;
}

interface SettlementDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settlement: Settlement | null;
  setSelectedSettlement: (settlement: Settlement | null) => void;
}

export default function SettlementDetailsModal({ isOpen, onClose, settlement, setSelectedSettlement }: SettlementDetailsModalProps) {
  if (!settlement || !isOpen) return null;

  const getInitials = (name: string) => {
    const names = name.split(" ");
    return names.length > 1 ? names[0][0] + names[names.length - 1][0] : names[0][0];
  };

  const handleExportDetails = async () => {
    try {
      const response = await fetch(`/api/export-settlement?settlementId=${settlement.sN}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Export failed");
      toast.success("Export successful! Check your downloads.");
      onClose();
    } catch (error) {
      toast.error("Export failed. Please try again later.");
      onClose();
      console.log(error)
    }
  };

  const currentIndex = settlementData.findIndex((item) => item.sN === settlement.sN);
  const prevSettlement = currentIndex > 0 ? settlementData[currentIndex - 1] : null;
  const nextSettlement = currentIndex < settlementData.length - 1 ? settlementData[currentIndex + 1] : null;

  const handlePrev = () => {
    if (prevSettlement) {
      setSelectedSettlement(prevSettlement);
    }
  };

  const handleRetry = () => {
    if (settlement.status === "Failed") {
      toast.success(`Retry initiated for Settlement ID ${settlement.sN}`);
      // Add retry logic here (e.g., API call)
      console.log(`Retry attempted for Settlement ID ${settlement.sN}`);
    }
  };

  const handleNext = () => {
    if (nextSettlement) {
      setSelectedSettlement(nextSettlement);
    }
  };

  return (
    <div className="fixed inset-0 z-[50] flex justify-end my-3 mr-3">
      <div
        className="fixed inset-0 bg-[#140000B2] backdrop-blur-xs dark:bg-black/50"
        onClick={onClose}
      />
      <div
        className="h-full w-[45%] bg-background shadow-lg overflow-x-auto transform transition-transform duration-300 ease-in-out rounded-xl"
        style={{ transform: isOpen ? "translateX(0)" : "translateX(100%)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-full p-6 overflow-y-auto">
          {/* Header */}
          <div className="flex justify-between items-center border-b border-[#F8F8F8] dark:border-[#2A2A2A]">
            <div className="flex flex-col gap-0">
              <h2 className="text-sm font-semibold">Settlement Details</h2>
              <p className="text-xs text-gray-500 mb-4">Get complete oversight on platform operations</p>
            </div>
            <div className="">
              <Button variant="ghost" className="p-0 h-auto" onClick={onClose}>
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>
          <div className="flex justify-between border-b border-[#F8F8F8] dark:border-[#2A2A2A] py-3">
            <span className="text-red-500 font-medium text-sm">Transaction ID: <span className="text-primary text-sm font-light">{settlement.transactionID}</span></span>
            <div className="flex space-x-2">
              <Button variant="ghost" size="icon" onClick={handlePrev} disabled={!prevSettlement}>
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" onClick={handleNext} disabled={!nextSettlement}>
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
          {/* Summary Section */}
          <div className="space-y-4 py-3">
            <h3 className="text-xs text-gray-500">Summary Section</h3>
            <div className="flex items-center justify-between space-x-1 pb-5 border-b border-[#F8F8F8] dark:border-[#2A2A2A]">
              <div className="flex items-center gap-2">
                <Avatar className="w-13 h-13">
                  <AvatarImage src="/placeholder-avatar.jpg" alt={settlement.merchant} />
                  <AvatarFallback>{getInitials(settlement.merchant)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-sm">{settlement.merchant}</p>
                  <p className="text-xs text-gray-500">{settlement.merchant.toLowerCase().replace(/\s/g, '') + "@gmail.com"}</p>
                </div>
              </div>
              <div className="flex gap-3 items-center">
                <Button className="hover:bg-red-600 ml-auto">View Profile</Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="bg-[#F5F5F5] dark:bg-card rounded-sm">
                      <BsThreeDots />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem><View /> Log Audit Trail</DropdownMenuItem>
                    <DropdownMenuItem onClick={handleExportDetails}><Download /> Export Details</DropdownMenuItem>
                    {settlement.status === "Failed" && (
                      <DropdownMenuItem onClick={handleRetry}><Retry/> Retry</DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <div className="flex justify-between text-sm border-b border-[#F8F8F8] dark:border-[#2A2A2A] pb-1">
              <div className="flex flex-col gap-2"><span className="text-xs text-gray-500">Source Account</span><span>{settlement.sourceAccount}</span></div>
              <div className="flex flex-col gap-2"><span className="text-xs text-gray-500">Amount</span><span>₦{settlement.amount.toLocaleString()}</span></div>
              <div className="flex flex-col gap-2"><span className="text-xs text-gray-500">Destination Account</span><span>{settlement.destinationAccount}</span></div>
              <div className="flex flex-col gap-2"><span className="text-xs text-gray-500">Status</span><span style={{ color: settlement.status === "Successful" ? "#4CAF50" : settlement.status  ===  "Processing"  ? "#FF9800" : "#FF4444"}}>{settlement.status}</span></div>
            </div>
          </div>
          {/* Settlement Details */}
          <div className="space-y-4">
            <h3 className="text-xs text-gray-500">Transaction Details</h3>
            <div className="flex flex-col gap-4 text-sm">
              <span className="flex gap-2 border-b border-[#F8F8F8] dark:border-[#2A2A2A] pb-2"><p className="font-medium">Timestamp:</p><span>{settlement.timestamp}</span></span>
              <span className="flex gap-2 border-b border-[#F8F8F8] dark:border-[#2A2A2A] pb-2"><p className="font-medium">Session ID:</p><span>{settlement.sessionID}</span></span>
              <span className="flex gap-2 border-b border-[#F8F8F8] dark:border-[#2A2A2A] pb-2"><p className="font-medium">Reference:</p><span>{settlement.reference}</span></span>
              <span className="flex gap-2 border-b border-[#F8F8F8] dark:border-[#2A2A2A] pb-2"><p className="font-medium">Webhook Status:</p><span>{settlement.webhookStatus}</span></span>
              <span className="flex gap-2 border-b border-[#F8F8F8] dark:border-[#2A2A2A] pb-2"><p className="font-medium">Transaction Type:</p><span>{settlement.transactionType}</span></span>
            </div>
          </div>
          {/* Additional Metadata */}
          <div className="space-y-4">
            <h3 className="text-xs text-gray-500">Additional Metadata</h3>
            <div className="flex flex-col gap-4 text-sm">
              <span className="flex gap-2 border-b border-[#F8F8F8] dark:border-[#2A2A2A] pb-2"><p className="font-medium">IP Address:</p><span>{settlement.ipAddress}</span></span>
              <span className="flex gap-2 border-b border-[#F8F8F8] dark:border-[#2A2A2A] pb-2"><p className="font-medium">Device Info:</p><span>{settlement.deviceInfo}</span></span>
              <span className="flex gap-2 border-b border-[#F8F8F8] dark:border-[#2A2A2A] pb-2"><p className="font-medium">Processing Time:</p><span>{settlement.processingTime}</span></span>
            </div>
          </div>
          {/* Footer */}
          <div className="space-y-4 pt-6">
            <h3 className="text-xs text-gray-500">Footer</h3>
            <div>
            <span className="flex gap-2 border-b border-[#F8F8F8] dark:border-[#2A2A2A] pb-2 text-sm"><p className="font-medium">Last Updated:</p><span>{settlement.lastUpdated}</span></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
