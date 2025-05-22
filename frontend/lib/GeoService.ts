import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const OPENCAGE_API_URL = "https://api.opencagedata.com/geocode/v1/json";
const OPENROUTE_API_URL = "https://api.openrouteservice.org/v2";

interface GeoCoordinates {
  lat: number;
  lng: number;
}

interface GeocodeResult {
  lat: number;
  lng: number;
  formattedAddress: string;
}

interface RouteInfo {
  distance: number; // in km
  duration: number; // in minutes
}

class GeoService {
  private opencageKey: string;
  private openrouteKey: string;

  constructor() {
    this.opencageKey = process.env.OPEN_CAGE_API_KEY || ""; // OPEN_CAGE_API_KEY is the name of the environment variable
    this.openrouteKey = process.env.OPEN_ROUTE_SERVICE_API_KEY || ""; // OPEN_ROUTE_SERVICE_API_KEY is the name of the environment variable

    if (!this.opencageKey || !this.openrouteKey) {
      console.warn(
        "API keys for geocoding services are not properly configured"
      );
    }
  }

  async geocodeAddress(address: string): Promise<GeocodeResult> {
    try {
      const response = await axios.get(OPENCAGE_API_URL, {
        params: {
          q: address,
          key: this.opencageKey,
          countrycode: "np", // Focus on Nepal
          limit: 1,
        },
      });

      if (response.data.results && response.data.results.length > 0) {
        const result = response.data.results[0];
        return {
          lat: result.geometry.lat,
          lng: result.geometry.lng,
          formattedAddress: result.formatted,
        };
      }
      throw new Error(
        "Geocoding failed: " + (response.data.status.message || "No results")
      );
    } catch (error) {
      console.error("Geocoding error:", error);
      throw error;
    }
  }

  async calculateDistanceAndDuration(
    origin: GeoCoordinates,
    destination: GeoCoordinates
  ): Promise<RouteInfo> {
    try {
      const response = await axios.post(
        `${OPENROUTE_API_URL}/directions/driving-car`,
        {
          coordinates: [
            [origin.lng, origin.lat], // OpenRouteService uses [lng, lat]
            [destination.lng, destination.lat],
          ],
        },
        {
          headers: {
            Authorization: this.openrouteKey,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.routes && response.data.routes.length > 0) {
        const route = response.data.routes[0];
        return {
          distance: route.summary.distance / 1000, // Convert to km
          duration: route.summary.duration / 60, // Convert to minutes
        };
      }
      throw new Error("Route calculation failed");
    } catch (error) {
      console.error("Route calculation error:", error);
      throw error;
    }
  }
}

const geoService = new GeoService();
export default geoService;
