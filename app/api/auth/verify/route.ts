import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const otp = searchParams.get("otp");
  const from = searchParams.get("from"); // Get 'from' parameter for redirect

  console.log("Received OTP:", otp, "From:", from); // Debug log
  if (!otp) {
    return NextResponse.json({ error: "OTP is required" }, { status: 400 });
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const cookieStore: any = cookies();
    const tempAccessToken = cookieStore.get("tempAccessToken")?.value;
    console.log("Temp access token:", tempAccessToken); // Debug log
    if (!tempAccessToken) {
      return NextResponse.json({ error: "Session expired. Please log in again." }, { status: 401 });
    }

    const apiUrl = `https://redcollection.onrender.com/api/v1/redtech/auth/verify-login-otp?otp=${encodeURIComponent(otp)}`;
    console.log("External API URL:", apiUrl); // Debug log
    const res = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log("External API response:", JSON.stringify(data, null, 2)); // Debug log
    if (res.ok && data.status) {
      const redirectPath = from === "forgot-password" ? `/reset?email=${encodeURIComponent(data.data.email || "")}` : (from || "/dashboard");
      const response = NextResponse.json({ success: true, message: data.message, redirect: redirectPath });
      response.cookies.set("accessToken", data.data.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 3600, // 1 hour
      });
      if (data.data.refreshToken) {
        response.cookies.set("refreshToken", data.data.refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 7 * 24 * 3600, // 7 days
        });
      } else {
        console.warn("No refreshToken provided in API response");
      }
      response.cookies.delete("tempAccessToken");
      return response;
    } else {
      return NextResponse.json({ error: data.message || "Verification failed" }, { status: res.status });
    }
  } catch (error) {
    console.error("Verify error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}