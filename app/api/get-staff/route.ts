import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    // Replace with actual merchantAdminId from auth context or token
    const merchantAdminId = searchParams.get("merchantAdminId") || "MERCHANT_ADMIN_ID"; // Placeholder
    const page = searchParams.get("page") || "1";
    const size = searchParams.get("size") || "10";

    if (!merchantAdminId || merchantAdminId === "MERCHANT_ADMIN_ID") {
      return NextResponse.json({ error: "Valid merchantAdminId is required" }, { status: 400 });
    }

    // Simplified query params; add back if supported by backend
    const apiUrl = `https://redcollection.onrender.com/api/v1/redtech/get-staff?merchantAdminId=${encodeURIComponent(merchantAdminId)}&page=${page}&size=${size}`;
    console.log("External API URL:", apiUrl);

    const res = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        Authorization: `Bearer ${request.headers.get("Authorization") || ""}`,
      },
    });

    let data;
    try {
      data = await res.json();
    } catch (error) {
      const rawResponse = await res.text();
      console.error("Raw response:", rawResponse);
      return NextResponse.json({ error: "Invalid JSON response from backend", rawResponse }, { status: res.status });
      console.log(error)
    }
    console.log("External API response:", JSON.stringify(data, null, 2));

    if (res.ok && data.status) {
       // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const mappedData = data.data.map((user: any, index: number) => ({
        sN: (parseInt(page) - 1) * parseInt(size) + index + 1,
        userID: user.id,
        fullName: `${user.firstName} ${user.lastName}`,
        email: user.email,
        role: user.userType,
        status: user.enabled ? "Enabled" : "Disabled",
        createdAt: user.createdAt || new Date().toLocaleDateString("en-US", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }).replace(/(\d+)\/(\d+)\/(\d+)/, "$2/$1/$3"),
        createdBy: user.createdBy || "System",
        lastLogin: user.lastLogin || "N/A",
        permissions: user.permissions || `${user.userType.toUpperCase()} SUPPORT`,
        ipAddress: user.ipAddress || "N/A",
        deviceInfo: user.deviceInfo || "Unknown Device",
        lastUpdated: user.lastUpdated || new Date().toLocaleDateString("en-US", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }).replace(/(\d+)\/(\d+)\/(\d+)/, "$2/$1/$3"),
      }));

      return NextResponse.json({
        success: true,
        data: mappedData,
        total: data.total || data.data.length,
      });
    } else {
      return NextResponse.json({ error: data.message || "Failed to fetch staff" }, { status: res.status });
    }
  } catch (error) {
    console.error("Fetch staff error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}