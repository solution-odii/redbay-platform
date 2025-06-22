
"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogOverlay, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function CreateMerchantModal({ isOpen, onClose, onAddMerchant }: { isOpen: boolean; onClose: () => void; onAddMerchant: (merchant: { merchantName: string; merchantBVN: string; contactName: string; contactEmail: string; accountName: string; accountNumber: string; status: string }) => void }) {
  const [formData, setFormData] = useState({
    merchantName: "",
    merchantBVN: "",
    contactName: "",
    contactEmail: "",
    accountName: "",
    accountNumber: "",
    status: "Active",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, status: value }));
  };

  const handleSubmit = () => {
    onAddMerchant(formData);
    setFormData({
      merchantName: "",
      merchantBVN: "",
      contactName: "",
      contactEmail: "",
      accountName: "",
      accountNumber: "",
      status: "Active",
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="backdrop-blur-xs bg-[#140000B2]" />
      <DialogContent className="sm:max-w-[571px] rounded-lg shadow-lg p-6">
        <DialogHeader className="border-b pb-4">
          <DialogTitle className="text-lg font-semibold text-gray-900">
            <h3 className="text-lg font-semibold">Create Merchant</h3>
            <p className="text-xs font-light text-gray-400 dark:text-gray-100">Fill the form to create a new merchant</p>
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6 mt-4">
          {/* Merchant Details */}
          <div>
            <h3 className="text-xs font-light text-gray-400 dark:text-gray-100 mb-3">Merchant Details</h3>
            <div className="space-y-4">
              <div>
                <Input
                  id="merchantName"
                  placeholder="Merchant Name"
                  value={formData.merchantName}
                  onChange={handleInputChange}
                  className="w-full h-10 bg-gray-100 border-0 rounded-md p-2 text-sm focus:outline-none focus:ring-1"
                />
              </div>
              <div>
                <Input
                  id="merchantBVN"
                  placeholder="Merchant BVN"
                  value={formData.merchantBVN}
                  onChange={handleInputChange}
                  className="w-full h-10 bg-gray-100 border-0 rounded-md p-2 text-sm focus:outline-none focus:ring-1"
                />
              </div>
            </div>
          </div>

          {/* Contact Person Details */}
          <div>
            <h3 className="text-xs font-light text-gray-400 dark:text-gray-100 mb-3">Contact Person Details</h3>
            <div className="space-y-4 flex gap-3">
              <div className="w-full">
                <Input
                  id="contactName"
                  placeholder="Name"
                  value={formData.contactName}
                  onChange={handleInputChange}
                  className="w-full h-10 bg-gray-100 border-0 rounded-md p-2 text-sm focus:outline-none focus:ring-1"
                />
              </div>
              <div className="w-full">
                <Input
                  id="contactEmail"
                  placeholder="Email"
                  value={formData.contactEmail}
                  onChange={handleInputChange}
                  className="w-full h-10 bg-gray-100 border-0 rounded-md p-2 text-sm focus:outline-none focus:ring-1"
                />
              </div>
            </div>
          </div>

          {/* Merchant Bank Details */}
          <div>
            <h3 className="text-xs font-light text-gray-400 dark:text-gray-100 mb-3">Merchant Bank Details</h3>
            <div className="space-y-4 flex gap-3">
              <div className="w-full">
                <Input
                  id="accountName"
                  placeholder="Account Name"
                  value={formData.accountName}
                  onChange={handleInputChange}
                  className="w-full h-10 bg-gray-100 border-0 rounded-md p-2 text-sm focus:outline-none focus:ring-1"
                />
              </div>
              <div className="w-full">
                <Input
                  id="accountNumber"
                  placeholder="Account Number"
                  value={formData.accountNumber}
                  onChange={handleInputChange}
                  className="w-full h-10 bg-gray-100 border-0 rounded-md p-2 text-sm focus:outline-none focus:ring-1"
                />
              </div>
            </div>
          </div>

          {/* Status */}
          <div>
            <h3 className="text-xs font-light text-gray-400 dark:text-gray-100 mb-3">Status</h3>
            <Select value={formData.status} onValueChange={handleSelectChange}>
              <SelectTrigger className="w-full h-10 bg-gray-100 border-0 rounded-md p-2 text-sm focus:outline-none focus:ring-1">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Active">
                  <span className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                    Active
                  </span>
                </SelectItem>
                <SelectItem value="Inactive">
                  <span className="flex items-center">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-2" />
                    Inactive
                  </span>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter className="mt-3 border-t pt-5">
          <Button variant="outline" onClick={onClose} className="rounded-md shadow-sm">Cancel</Button>
          <Button onClick={handleSubmit} className="bg-red-500 text-white hover:bg-red-600 rounded-md shadow-sm">Submit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}