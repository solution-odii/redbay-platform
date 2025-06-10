
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
import Vnu from "@/components/svg Icons/Vnu";
import Retry from "@/components/svg Icons/Retry";
import { Toaster, toast } from "sonner";
import { transactionData } from "@/lib/MockData";
import Download from "@/components/svg Icons/Download";

interface Transaction {
  sN: number;
  merchant: string;
  vNUBAN: string;
  amount: number;
  status: string;
  transactionID: string;
  webhookStatus: string | number;
  timestamp: string;
  action: string;
  email: string;
  sessionID: string;
  reference: string;
  transactionType: string;
  destination: { accountNumber: string; bank: string; name: string };
  ipAddress: string;
  deviceInfo: string;
  processingTime: string;
  lastUpdated: string;
}

interface TransactionDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: Transaction | null;
  setSelectedTransaction: (transaction: Transaction | null) => void; // Ensure this is defined
}

export default function TransactionDetailsModal({ isOpen, onClose, transaction, setSelectedTransaction }: TransactionDetailsModalProps) {
  console.log("setSelectedTransaction prop:", setSelectedTransaction); // Debug log
  if (!transaction || !isOpen) return null;

  const getInitials = (name: string) => {
    const names = name.split(" ");
    return names.length > 1 ? names[0][0] + names[names.length - 1][0] : names[0][0];
  };

  const webhookStatusText = typeof transaction.webhookStatus === "number"
    ? `Status Code: ${transaction.webhookStatus}`
    : transaction.webhookStatus;

  const handleExportDetails = async () => {
    try {
      const response = await fetch(`/api/export-transaction?transactionId=${transaction.transactionID}`, {
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
      console.log(error);
    }
  };

  const currentIndex = transactionData.findIndex((item) => item.sN === transaction.sN);
  const prevTransaction = currentIndex > 0 ? transactionData[currentIndex - 1] : null;
  const nextTransaction = currentIndex < transactionData.length - 1 ? transactionData[currentIndex + 1] : null;

  const handlePrev = () => {
    if (prevTransaction) {
      setSelectedTransaction(prevTransaction);
    }
  };

  const handleNext = () => {
    if (nextTransaction) {
      setSelectedTransaction(nextTransaction);
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
              <h2 className="text-sm font-semibold">Transaction Details</h2>
              <p className="text-xs text-gray-500 mb-4">Get complete oversight on platform operations</p>
            </div>
            <div className="">
              <Button variant="ghost" className="p-0 h-auto" onClick={onClose}>
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>
          <div className="flex justify-between border-b border-[#F8F8F8] py-3">
            <span className="text-red-500 font-medium text-sm">Transaction ID: <span className="text-primary text-sm font-light">{transaction.transactionID}</span></span>
            <div className="flex space-x-2">
              <Button variant="ghost" size="icon" onClick={handlePrev} disabled={!prevTransaction}>
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" onClick={handleNext} disabled={!nextTransaction}>
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
                  <AvatarImage src="/placeholder-avatar.jpg" alt={transaction.merchant} />
                  <AvatarFallback>{getInitials(transaction.merchant)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-sm">{transaction.merchant}</p>
                  <p className="text-xs text-gray-500">{transaction.email}</p>
                </div>
              </div>
              <div className="flex gap-3 items-center">
                <Button className="hover:bg-red-600 ml-auto">View Profile</Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="bg-[#F5F5F5] dark:bg-background rounded-sm">
                      <BsThreeDots />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {transaction.status === "Failed" ? (
                      <>
                        <DropdownMenuItem><Vnu /> Log Audit Trail</DropdownMenuItem>
                        <DropdownMenuItem onClick={handleExportDetails}><Download /> Export Details</DropdownMenuItem>
                        <DropdownMenuItem><Retry />Retry</DropdownMenuItem>
                      </>
                    ) : (
                      <>
                        <DropdownMenuItem><Vnu /> Log Audit Trail</DropdownMenuItem>
                        <DropdownMenuItem onClick={handleExportDetails}><Download /> Export Details</DropdownMenuItem>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <div className="flex justify-between text-sm border-b border-[#F8F8F8] pb-1">
              <div className="flex flex-col gap-2"><span className="text-xs text-gray-500">vNUBAN</span><span>{transaction.vNUBAN}</span></div>
              <div className="flex flex-col gap-2"><span className="text-xs text-gray-500">Amount</span><span>₦{transaction.amount.toLocaleString()}</span></div>
              <div className="flex flex-col gap-2"><span className="text-xs text-gray-500">Status</span><span style={{ color: transaction.status === "Successful" ? "#4CAF50" : transaction.status === "Pending" ? "#FF9800" : "#FF4444" }}>{transaction.status}</span></div>
              <div className="flex flex-col gap-2"><span className="text-xs text-gray-500">Timestamp</span><span>{transaction.timestamp} WAT</span></div>
            </div>
          </div>
          {/* Transaction Details */}
          <div className="space-y-4 ">
            <h3 className="text-xs text-gray-500">Transaction Details</h3>
            <div className="flex flex-col gap-4 text-sm">
              <span className="flex gap-2 border-b border-[#F8F8F8] pb-2"><p className="font-medium">Session ID:</p><p>{transaction.sessionID}</p></span>
              <span className="flex gap-2 border-b border-[#F8F8F8] pb-2"><p className="font-medium">Reference: </p><span>{transaction.reference}</span></span>
              <span className="flex gap-2 border-b border-[#F8F8F8] pb-2"><p className="font-medium">Webhook Status: </p><span>{webhookStatusText}</span></span>
              <span className="flex gap-2 border-b border-[#F8F8F8] pb-2"><p className="font-medium">Transaction Type: </p><span>{transaction.transactionType}</span></span>
              <span className="flex gap-2"><p className="font-medium">Destination: </p><span className="flex gap-4"><p>{transaction.destination.accountNumber}</p><p>{transaction.destination.bank}</p><p>{transaction.destination.name}</p></span></span>
            </div>
          </div>
          {/* Additional Metadata */}
          <div className="space-y-4 mt-6">
            <h3 className="text-xs text-gray-500">Additional Metadata</h3>
            <div className="flex flex-col gap-4 text-sm">
              <span className="flex gap-2"><p className="font-medium">IP Address: </p><span>{transaction.ipAddress}</span></span>
              <span className="flex gap-2"><p className="font-medium">Device Info: </p><span>{transaction.deviceInfo}</span></span>
              <span className="flex gap-2"><p className="font-medium">Processing Time: </p><span>{transaction.processingTime}</span></span>
            </div>
          </div>
          {/* Footer */}
          <div className="mt-auto pt-4 text-sm space-y-4">
            <h3 className="text-gray-500 text-xs">Footer</h3>
            <div>
              <span className="flex gap-2"><p className="text-medium">Last Updated:</p><span>{transaction.timestamp}</span></span>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
