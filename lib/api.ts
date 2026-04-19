import { middleOfEurope } from "./constants";

export type SupportedLanguage =
  | "en"
  | "de"
  | "es"
  | "pt-BR"
  | "fr"
  | "ja"
  | "zh-CN"
  | "ru";

export interface LocationResponse {
  status: string;
  country: string;
  countryCode: string;
  region: string;
  regionName: string;
  city: string;
  zip: string;
  lat: number;
  lon: number;
  timezone: string;
  isp: string;
  org: string;
  as: string;
  query: string;
}

export async function getUserLocation(): Promise<[number, number]> {
  try {
    const response = await fetch("http://ip-api.com/json/");
    const json = (await response.json()) as LocationResponse;
    if (typeof json.lat === "number" && typeof json.lon === "number") {
      return [json.lon, json.lat] as [number, number];
    }
    // eslint-disable-next-line no-empty
  } catch {}
  return middleOfEurope as [number, number];
}

// ALTERNATIVE TO LOCALIZATION. BETTER TO USE I18NEXT
// export async function getLocalization(lang: SupportedLanguage = "en"): Promise<LocationResponse | null> {
//   try {
//     const response = await fetch(`http://ip-api.com/json/?lang=${lang}`);
//     const json = (await response.json() as LocationResponse);
//     if (json.status === "success") {
//       return json;
//     }
//   } catch {
//     return null;
//   }
//   return null;
// }
