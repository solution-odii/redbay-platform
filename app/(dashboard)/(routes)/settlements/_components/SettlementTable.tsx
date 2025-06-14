
"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Filter, Search, ChevronLeft, ChevronRight, CalendarIcon } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "@radix-ui/react-popover";
import { Calendar } from "@/components/ui/calendar";
import { useState, useEffect } from "react";
import { BsThreeDots } from "react-icons/bs";
import View from "@/components/svg Icons/View";
import Download from "@/components/svg Icons/Download";
import SettlementDetailsModal from "./SettlementDetailsModal";
import Empty from "@/components/svg Icons/Empty";

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
  id?: number;
  createdAt?: string;
  updatedAt?: string;
  merchantOrgId?: string;
  transactionRef?: string;
}

interface SettlementsResponse {
  statusCode: number;
  status: boolean;
  message: string;
  data: {
    totalElements: number;
    totalPages: number;
    size: number;
    content: Settlement[];
    number: number;
    first: boolean;
    last: boolean;
  };
}

export function SettlementTable() {
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState({
    sourceAccount: "",
    destinationAccount: "",
    transactionRef: "",
    reference: "",
    merchantName: "",
    merchantOrgId: "",
    startDate: "",
    endDate: "",
    status: "",
    sortBy: "createdAt", // Using createdAt as a safe default based on response schema
    ascending: true,
  });
  const [settlements, setSettlements] = useState<Settlement[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedSettlement, setSelectedSettlement] = useState<Settlement | null>(null);

  const fetchSettlements = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        size: "10",
        sortBy: filter.sortBy || "", // Fallback to empty if not set
        ascending: filter.ascending.toString(),
        ...Object.fromEntries(
          Object.entries(filter).filter(([, v]) => v && v !== "" && v !== true)
        ),
      }).toString();
      const res = await fetch(`/api/reports/settlements?${params}`);
      const data: SettlementsResponse = await res.json();
      if (data.status) {
        const mappedSettlements = data.data.content.map((s) => ({
          sN: s.id || data.data.number * 10 + data.data.content.indexOf(s) + 1,
          merchant: s.merchant || "",
          sourceAccount: s.sourceAccount || "",
          destinationAccount: s.destinationAccount || "",
          amount: s.amount || 0,
          status: s.status || "",
          timestamp: s.createdAt ? new Date(s.createdAt).toLocaleString("en-US", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }) : "",
          transactionID: s.transactionRef || "",
          sessionID: "",
          reference: s.reference || "",
          webhookStatus: "",
          transactionType: "",
          ipAddress: "",
          deviceInfo: "",
          processingTime: "",
          lastUpdated: s.updatedAt ? new Date(s.updatedAt).toLocaleString("en-US", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }) : "",
          id: s.id,
          createdAt: s.createdAt,
          updatedAt: s.updatedAt,
          merchantOrgId: s.merchantOrgId,
          transactionRef: s.transactionRef,
        }));
        setSettlements(mappedSettlements);
        setTotalPages(data.data.totalPages);
      }
    } catch (error) {
      console.error("Error fetching settlements:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettlements();
  }, [currentPage, filter]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 3) {
      for (let i = 0; i < totalPages; i++) pages.push(i);
    } else {
      pages.push(0);
      if (currentPage > 2) pages.push(currentPage - 1, currentPage);
      else pages.push(1);
      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages - 1);
    }
    return pages;
  };

  const getInitials = (name: string) => {
    const names = name.split(" ");
    return names.length > 1 ? names[0][0] + names[names.length - 1][0] : names[0][0];
  };

  const handleResetDate = () => setFilter((prev) => ({ ...prev, startDate: "", endDate: "" }));
  const handleResetStatus = () => setFilter((prev) => ({ ...prev, status: "" }));
  // const handleResetSort = () => setFilter((prev) => ({ ...prev, sortBy: "createdAt", ascending: true }));
  const handleResetAll = () => setFilter({
    sourceAccount: "",
    destinationAccount: "",
    transactionRef: "",
    reference: "",
    merchantName: "",
    merchantOrgId: "",
    startDate: "",
    endDate: "",
    status: "",
    sortBy: "createdAt",
    ascending: true,
  });

  const handleApplyFilters = () => {
    // Filtering is handled by API
  };

  function DatePicker({ id, date, onSelect, placeholder }: { id: string; date: string; onSelect: (date: string) => void; placeholder: string }) {
    const [open, setOpen] = useState(false);
    const [month, setMonth] = useState<Date | undefined>(date ? new Date(date) : undefined);

    const handleSelect = (selectedDate: Date | undefined) => {
      onSelect(selectedDate ? selectedDate.toISOString().split("T")[0] : "");
      if (selectedDate) setMonth(selectedDate);
      setOpen(false);
    };

    return (
      <div className="flex flex-col gap-1">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              id={id}
              variant="outline"
              className="w-full justify-start text-left font-normal pl-3 pr-10 py-2 border rounded-md text-sm bg-[#F8F8F8] dark:bg-gray-700"
            >
              <span>{date ? new Date(date).toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" }) : placeholder}</span>
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 z-30" align="start">
            <Calendar
              mode="single"
              selected={date ? new Date(date) : undefined}
              onSelect={handleSelect}
              month={month}
              className="rounded-md border"
            />
          </PopoverContent>
        </Popover>
      </div>
    );
  }

  return (
    <div className="w-full relative">
      <div className="flex justify-between items-center mb-4 space-x-4">
        <div className="flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2 bg-[#F8F8F8] dark:bg-background">
                <Filter className="h-4 w-4" />
                <span>Filter</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-84 bg-white dark:bg-background border rounded-lg shadow-lg p-4">
              <DropdownMenuLabel>Filter</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="space-y-4">
                <div className="flex flex-col space-y-2">
                  <div className="flex justify-between">
                    <label className="text-sm">Date Range</label>
                    <Button variant="link" className="text-red-500 p-0 h-auto" onClick={handleResetDate}>
                      Reset
                    </Button>
                  </div>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <label htmlFor="start-date" className="text-xs text-gray-400 dark:text-gray-100">
                        From:
                      </label>
                      <DatePicker
                        id="start-date"
                        date={filter.startDate}
                        onSelect={(date) => setFilter((prev) => ({ ...prev, startDate: date }))}
                        placeholder="YY/MM/DD"
                      />
                    </div>
                    <div className="relative flex-1">
                      <label htmlFor="end-date" className="text-xs text-gray-400 dark:text-gray-100">
                        To:
                      </label>
                      <DatePicker
                        id="end-date"
                        date={filter.endDate}
                        onSelect={(date) => setFilter((prev) => ({ ...prev, endDate: date }))}
                        placeholder="YY/MM/DD"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col space-y-2">
                  <div className="flex justify-between">
                    <label className="text-sm">Source Account</label>
                  </div>
                  <Input
                    value={filter.sourceAccount}
                    onChange={(e) => setFilter((prev) => ({ ...prev, sourceAccount: e.target.value }))}
                    placeholder="Source Account"
                    className="w-full bg-[#F8F8F8] dark:bg-gray-700 border-0 rounded"
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <div className="flex justify-between">
                    <label className="text-sm">Destination Account</label>
                  </div>
                  <Input
                    value={filter.destinationAccount}
                    onChange={(e) => setFilter((prev) => ({ ...prev, destinationAccount: e.target.value }))}
                    placeholder="Destination Account"
                    className="w-full bg-[#F8F8F8] dark:bg-gray-700 border-0 rounded"
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <div className="flex justify-between">
                    <label className="text-sm">Transaction Ref</label>
                  </div>
                  <Input
                    value={filter.transactionRef}
                    onChange={(e) => setFilter((prev) => ({ ...prev, transactionRef: e.target.value }))}
                    placeholder="Transaction Ref"
                    className="w-full bg-[#F8F8F8] dark:bg-gray-700 border-0 rounded"
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <div className="flex justify-between">
                    <label className="text-sm">Reference</label>
                  </div>
                  <Input
                    value={filter.reference}
                    onChange={(e) => setFilter((prev) => ({ ...prev, reference: e.target.value }))}
                    placeholder="Reference"
                    className="w-full bg-[#F8F8F8] dark:bg-gray-700 border-0 rounded"
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <div className="flex justify-between">
                    <label className="text-sm">Merchant Name</label>
                  </div>
                  <Input
                    value={filter.merchantName}
                    onChange={(e) => setFilter((prev) => ({ ...prev, merchantName: e.target.value }))}
                    placeholder="Merchant Name"
                    className="w-full bg-[#F8F8F8] dark:bg-gray-700 border-0 rounded"
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <div className="flex justify-between">
                    <label className="text-sm">Merchant Org ID</label>
                  </div>
                  <Input
                    value={filter.merchantOrgId}
                    onChange={(e) => setFilter((prev) => ({ ...prev, merchantOrgId: e.target.value }))}
                    placeholder="Merchant Org ID"
                    className="w-full bg-[#F8F8F8] dark:bg-gray-700 border-0 rounded"
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <div className="flex justify-between">
                    <label className="text-sm">Status</label>
                    <Button variant="link" className="text-red-500 p-0 h-auto" onClick={handleResetStatus}>
                      Reset
                    </Button>
                  </div>
                  <Select
                    value={filter.status}
                    onValueChange={(value) => setFilter((prev) => ({ ...prev, status: value }))}
                  >
                    <SelectTrigger className="w-full bg-[#F8F8F8] dark:bg-gray-700 border-0 rounded">
                      <SelectValue placeholder="Successful" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Successful"><span className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: "#4CAF50" }} /> Successful</SelectItem>
                      <SelectItem value="Failed"><span className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: "#FF4444" }} /> Failed</SelectItem>
                      <SelectItem value="Processing"><span className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: "#FF8C00" }} /> Processing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-between mt-4">
                  <Button variant="outline" onClick={handleResetAll}>
                    Reset All
                  </Button>
                  <Button className="bg-red-500 text-white hover:bg-red-600" onClick={handleApplyFilters}>
                    Apply Now
                  </Button>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="relative w-[300px]">
            <Input
              placeholder="Search Merchant, Source Account..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-3 pr-10 bg-[#F8F8F8] dark:bg-background border-0"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
        </div>
        <div className="flex items-center space-x-2 text-xs">
          <Button
            variant="outline"
            size="icon"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 0}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          {getPageNumbers().map((page, index) => (
            <span key={index}>
              {page === "..." ? (
                <span className="px-2">...</span>
              ) : (
                <Button
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePageChange(Number(page))}
                  disabled={page === "..." || page === currentPage}
                >
                  {Number(page) + 1}
                </Button>
              )}
            </span>
          ))}
          <Button
            variant="outline"
            size="icon"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= totalPages - 1}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <span>Go to Page:</span>
          <Select
            value={currentPage.toString()}
            onValueChange={(value) => handlePageChange(parseInt(value))}
          >
            <SelectTrigger className="w-[80px]">
              <SelectValue placeholder={currentPage.toString()} />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: totalPages }, (_, i) => i).map((page) => (
                <SelectItem key={page} value={page.toString()}>
                  {page + 1}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div>
        <Table>
          <TableHeader className="bg-[#F5F5F5] dark:bg-background">
            <TableRow>
              <TableHead>S/N</TableHead>
              <TableHead>Merchant</TableHead>
              <TableHead>Source Account</TableHead>
              <TableHead>Destination Account</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Timestamp</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={8}>Loading...</TableCell>
              </TableRow>
            ) : settlements.length > 0 ? (
              settlements.map((item) => (
                <TableRow key={item.sN}>
                  <TableCell>{item.sN}</TableCell>
                  <TableCell className="flex items-center space-x-2">
                    <Avatar>
                      <AvatarImage src="/public/images/avatar-placeholder.jpg" alt={item.merchant} />
                      <AvatarFallback>{getInitials(item.merchant)}</AvatarFallback>
                    </Avatar>
                    <span>{item.merchant}</span>
                  </TableCell>
                  <TableCell>{item.sourceAccount}</TableCell>
                  <TableCell>{item.destinationAccount}</TableCell>
                  <TableCell>₦{item.amount.toLocaleString()}</TableCell>
                  <TableCell>
                    <span className="flex items-center">
                      <span
                        className="w-2 h-2 rounded-full mr-2"
                        style={{
                          backgroundColor:
                            item.status === "Successful"
                              ? "#4CAF50"
                              : item.status === "Processing"
                              ? "#FF8C00"
                              : "#FF4444",
                        }}
                      />
                      <span
                        style={{
                          color:
                            item.status === "Successful"
                              ? "#4CAF50"
                              : item.status === "Processing"
                              ? "#FF8C00"
                              : "#FF4444",
                        }}
                      >
                        {item.status}
                      </span>
                    </span>
                  </TableCell>
                  <TableCell>{item.timestamp}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <BsThreeDots className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => setSelectedSettlement(item)}><View /> View</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => console.log("Download", item.sN)}><Download /> Download</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8}>
                  <div className="text-center flex flex-col items-center gap-4 m-3 p-3">   
                    <Empty/>
                    <p className="text-muted-foreground">No settlements found</p> 
                    </div>
               
                  </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <SettlementDetailsModal
        isOpen={!!selectedSettlement}
        onClose={() => setSelectedSettlement(null)}
        settlement={selectedSettlement}
        setSelectedSettlement={setSelectedSettlement}
      />
    </div>
  );
}