import { TANZANIA_REGIONS } from '../utils/constants';

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface GeocodingResult {
  coordinates: Coordinates;
  confidence: number;
  address: string;
  region: string;
  district?: string;
}

export class GeocodingService {
  // Tanzania region coordinates (approximate centers)
  private static readonly REGION_COORDINATES: Record<string, Coordinates> = {
    'Dar es Salaam': { latitude: -6.7924, longitude: 39.2083 },
    'Mwanza': { latitude: -2.5164, longitude: 32.9175 },
    'Arusha': { latitude: -3.3869, longitude: 36.6830 },
    'Dodoma': { latitude: -6.1630, longitude: 35.7516 },
    'Mbeya': { latitude: -8.9094, longitude: 33.4607 },
    'Morogoro': { latitude: -6.8235, longitude: 37.6610 },
    'Tanga': { latitude: -5.0692, longitude: 39.0962 },
    'Kilimanjaro': { latitude: -3.3398, longitude: 37.3407 },
    'Tabora': { latitude: -5.0167, longitude: 32.8000 },
    'Kigoma': { latitude: -4.8761, longitude: 29.6269 },
    'Shinyanga': { latitude: -3.6667, longitude: 33.4167 },
    'Kagera': { latitude: -1.8000, longitude: 31.1667 },
    'Mtwara': { latitude: -10.2692, longitude: 40.1836 },
    'Ruvuma': { latitude: -10.7000, longitude: 35.0000 },
    'Iringa': { latitude: -7.7667, longitude: 35.6833 },
    'Lindi': { latitude: -9.9833, longitude: 39.7167 },
    'Singida': { latitude: -4.8167, longitude: 34.7500 },
    'Rukwa': { latitude: -7.4000, longitude: 31.0000 },
    'Katavi': { latitude: -6.5000, longitude: 31.0000 },
    'Njombe': { latitude: -9.3333, longitude: 34.7667 },
    'Simiyu': { latitude: -2.8000, longitude: 34.0000 },
    'Geita': { latitude: -2.8667, longitude: 32.2167 },
    'Songwe': { latitude: -9.2000, longitude: 33.4500 },
    'Manyara': { latitude: -3.5500, longitude: 35.5000 },
    'Pemba': { latitude: -5.0500, longitude: 39.7500 },
    'Unguja': { latitude: -6.1659, longitude: 39.2026 }
  };

  // Major cities and towns coordinates
  private static readonly CITY_COORDINATES: Record<string, Coordinates> = {
    // Dar es Salaam
    'Dar es Salaam': { latitude: -6.7924, longitude: 39.2083 },
    'Ilala': { latitude: -6.8161, longitude: 39.2803 },
    'Kinondoni': { latitude: -6.7500, longitude: 39.2167 },
    'Temeke': { latitude: -6.8500, longitude: 39.2833 },
    
    // Mwanza
    'Mwanza': { latitude: -2.5164, longitude: 32.9175 },
    'Ilemela': { latitude: -2.4833, longitude: 32.9167 },
    'Nyamagana': { latitude: -2.5167, longitude: 32.9000 },
    
    // Arusha
    'Arusha': { latitude: -3.3869, longitude: 36.6830 },
    'Moshi': { latitude: -3.3398, longitude: 37.3407 },
    
    // Other major towns
    'Dodoma': { latitude: -6.1630, longitude: 35.7516 },
    'Mbeya': { latitude: -8.9094, longitude: 33.4607 },
    'Morogoro': { latitude: -6.8235, longitude: 37.6610 },
    'Tanga': { latitude: -5.0692, longitude: 39.0962 },
    'Tabora': { latitude: -5.0167, longitude: 32.8000 },
    'Kigoma': { latitude: -4.8761, longitude: 29.6269 },
    'Mtwara': { latitude: -10.2692, longitude: 40.1836 },
    'Iringa': { latitude: -7.7667, longitude: 35.6833 },
    'Songea': { latitude: -10.6833, longitude: 35.6500 },
    'Sumbawanga': { latitude: -7.9667, longitude: 31.6167 },
    'Musoma': { latitude: -1.5000, longitude: 33.8000 },
    'Bukoba': { latitude: -1.3333, longitude: 31.8167 },
    'Shinyanga': { latitude: -3.6667, longitude: 33.4167 }
  };

  // Geocode address to coordinates
  static async geocodeAddress(
    address: string, 
    region: string, 
    district?: string
  ): Promise<GeocodingResult | null> {
    try {
      // Clean and normalize address
      const cleanAddress = address.trim().toLowerCase();
      const cleanRegion = region.trim();
      const cleanDistrict = district?.trim().toLowerCase();

      // Try exact city match first
      const cityKey = Object.keys(this.CITY_COORDINATES).find(city => 
        cleanAddress.includes(city.toLowerCase()) ||
        cleanDistrict?.includes(city.toLowerCase())
      );

      if (cityKey) {
        const coords = this.CITY_COORDINATES[cityKey];
        return {
          coordinates: {
            latitude: coords.latitude + (Math.random() - 0.5) * 0.01, // Add small random offset
            longitude: coords.longitude + (Math.random() - 0.5) * 0.01
          },
          confidence: 85,
          address: address,
          region: cleanRegion,
          district: district
        };
      }

      // Fall back to region center
      const regionCoords = this.REGION_COORDINATES[cleanRegion];
      if (regionCoords) {
        return {
          coordinates: {
            latitude: regionCoords.latitude + (Math.random() - 0.5) * 0.1, // Larger offset for region
            longitude: regionCoords.longitude + (Math.random() - 0.5) * 0.1
          },
          confidence: 60,
          address: address,
          region: cleanRegion,
          district: district
        };
      }

      return null;
    } catch (error) {
      console.error('Geocoding error:', error);
      return null;
    }
  }

  // Reverse geocode coordinates to address
  static async reverseGeocode(
    latitude: number, 
    longitude: number
  ): Promise<GeocodingResult | null> {
    try {
      // Find closest region
      let closestRegion = '';
      let minDistance = Infinity;

      Object.entries(this.REGION_COORDINATES).forEach(([region, coords]) => {
        const distance = this.calculateDistance(
          latitude, longitude,
          coords.latitude, coords.longitude
        );
        
        if (distance < minDistance) {
          minDistance = distance;
          closestRegion = region;
        }
      });

      if (closestRegion && minDistance < 200) { // Within 200km
        return {
          coordinates: { latitude, longitude },
          confidence: Math.max(20, 100 - minDistance),
          address: `Approximate location in ${closestRegion}`,
          region: closestRegion
        };
      }

      return null;
    } catch (error) {
      console.error('Reverse geocoding error:', error);
      return null;
    }
  }

  // Calculate distance between two points (Haversine formula)
  static calculateDistance(
    lat1: number, lng1: number,
    lat2: number, lng2: number
  ): number {
    const R = 6371; // Earth's radius in kilometers
    const dLat = this.toRadians(lat2 - lat1);
    const dLng = this.toRadians(lng2 - lng1);
    
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRadians(lat1)) * Math.cos(this.toRadians(lat2)) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  private static toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

  // Validate Tanzania coordinates
  static isValidTanzaniaCoordinates(latitude: number, longitude: number): boolean {
    // Tanzania bounds (approximate)
    const bounds = {
      north: -0.95,
      south: -11.75,
      east: 40.5,
      west: 29.3
    };

    return latitude >= bounds.south && 
           latitude <= bounds.north && 
           longitude >= bounds.west && 
           longitude <= bounds.east;
  }

  // Get region from coordinates
  static getRegionFromCoordinates(latitude: number, longitude: number): string | null {
    let closestRegion = '';
    let minDistance = Infinity;

    Object.entries(this.REGION_COORDINATES).forEach(([region, coords]) => {
      const distance = this.calculateDistance(
        latitude, longitude,
        coords.latitude, coords.longitude
      );
      
      if (distance < minDistance) {
        minDistance = distance;
        closestRegion = region;
      }
    });

    return minDistance < 150 ? closestRegion : null; // Within 150km
  }

  // Batch geocode multiple addresses
  static async batchGeocode(
    addresses: Array<{
      address: string;
      region: string;
      district?: string;
    }>
  ): Promise<Array<GeocodingResult | null>> {
    const results = await Promise.all(
      addresses.map(({ address, region, district }) =>
        this.geocodeAddress(address, region, district)
      )
    );

    return results;
  }

  // Get all supported regions with coordinates
  static getSupportedRegions(): Array<{
    name: string;
    coordinates: Coordinates;
  }> {
    return Object.entries(this.REGION_COORDINATES).map(([name, coordinates]) => ({
      name,
      coordinates
    }));
  }
}