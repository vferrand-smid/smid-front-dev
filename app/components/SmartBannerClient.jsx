"use client";

import { useEffect, useState } from "react";
import { getGeolocationData } from "@/services/ipapi";
import SmartBanner from "./SmartBanner";

export default function SmartBannerClient() {
  const [isBannerVisible, setIsBannerVisible] = useState(false);
  const [originCountry, setOriginCountry] = useState("");

  useEffect(() => {
    const fetchOriginCountry = async () => {
      const data = await getGeolocationData();
      if (data?.country_code) {
        setOriginCountry(data.country_code);

        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: "page_view",
          origin_country: data.country_code,
        });
      }
    };
    fetchOriginCountry();
  }, []);

  return <SmartBanner onVisibilityChange={setIsBannerVisible} />;
}
