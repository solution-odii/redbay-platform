
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";
import { useState } from "react";
import { Toaster, toast } from "sonner";

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddUserModal({ isOpen, onClose, onSuccess }: AddUserModalProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [role, setRole] = useState<string | null>(null); // Initialize as null, but will be set via Select
  const [status, setStatus] = useState("Enabled");

  const handleSubmit = async () => {
    if (!firstName || !lastName || !email || !role) {
      toast.error("First Name, Last Name, Email, and Role are required.");
      return;
    }

    const accessToken = localStorage.getItem("accessToken");
    const organizationId = localStorage.getItem("organizationId");

    if (!accessToken) {
      toast.error("Session expired. Please log in again.");
      return;
    }
    if (!organizationId) {
      toast.error("Organization ID not found. Please log in again.");
      return;
    }

    try {
      const res = await fetch("/api/invite-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          organizationId,
          userId: `USR-${Date.now()}`, // Generate unique userId
          firstName,
          lastName,
          email,
          role: null, // Force role to null regardless of selection
          phoneNumber: phoneNumber || undefined, // Optional
          message: `Welcome, ${firstName}! You've been invited as a ${role || "new user"}.`,
        }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("User invited successfully!");
        onSuccess();
        onClose();
        setFirstName("");
        setLastName("");
        setEmail("");
        setPhoneNumber("");
        setRole(null); // Reset to null
        setStatus("Enabled");
      } else {
        toast.error(data.error || "Failed to send invite");
      }
    } catch (error) {
      toast.error("Failed to send invite");
      console.error("Invite error:", error);
    }
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 backdrop-blur-xs bg-[#140000B2] dark:bg-black/50 z-[50] flex items-center justify-center"
      onClick={handleOverlayClick}
    >
      <div className="bg-white dark:bg-background p-6 rounded-lg shadow-lg w-[400px]">
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <h2 className="text-sm font-medium">Add New User</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        <p className="text-xs text-gray-500 mb-4">Fill the form to add a new user to the admin team</p>
        <div className="space-y-4">
          <h3 className="text-sm font-medium">User Personal Details</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Input
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full bg-gray-100 dark:bg-card border-0 rounded-md"
              />
            </div>
            <div>
              <Input
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full bg-gray-100 dark:bg-card border-0 rounded-md"
              />
            </div>
            <div>
              <Input
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-100 dark:bg-card border-0 rounded-md"
              />
            </div>
            <div>
              <Input
                placeholder="Phone Number"
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full bg-gray-100 dark:bg-card border-0 rounded-md"
              />
            </div>
          </div>
          <div>
            <Select value={role || ""} onValueChange={(value) => setRole(value || null)}>
              <SelectTrigger className="w-full bg-gray-100 dark:bg-card border-0 rounded-md">
                <SelectValue placeholder="Select Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Super Admin">Super Admin</SelectItem>
                <SelectItem value="Admin">Admin</SelectItem>
                <SelectItem value="Collections Team Member">Collections Team Member</SelectItem>
                <SelectItem value="Merchant Access Authorizer">Merchant Access Authorizer</SelectItem>
                <SelectItem value="Merchant Access Initiator">Merchant Access Initiator</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-full bg-gray-100 dark:bg-card border-0 rounded-md">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Enabled">Enabled</SelectItem>
                <SelectItem value="Disabled">Disabled</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button className="bg-red-500 text-white hover:bg-red-600" onClick={handleSubmit}>
              Submit
            </Button>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}