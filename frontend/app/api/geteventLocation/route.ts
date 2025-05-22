import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get("address");

  if (!address) {
    return NextResponse.json(
      { error: "Address parameter is required" },
      { status: 400 }
    );
  }

  try {
    const response = await axios.get(
      "https://api.opencagedata.com/geocode/v1/json",
      {
        params: {
          q: address,
          key: process.env.OPEN_CAGE_API_KEY,
          countrycode: "np",
          limit: 1,
        },
      }
    );

    if (response.data.results?.length > 0) {
      const result = response.data.results[0];
      return NextResponse.json({
        lat: result.geometry.lat,
        lng: result.geometry.lng,
        formattedAddress: result.formatted,
      });
    }

    return NextResponse.json({ error: "No results found" }, { status: 404 });
  } catch (error) {
    console.error("Geocoding error:", error);
    return NextResponse.json({ error: "Geocoding failed" }, { status: 500 });
  }
}
