//Redirect.tsx
import { useStoreClickMutation } from "@/services/click";
import { useGetByShortUrlQuery } from "@/services/url";
import { IClickStat } from "@/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UAParser } from "ua-parser-js";

const Redirect = () => {
  const [stat, setStat] = useState<IClickStat>({
    device: "",
    city: "",
    country: "",
  });
  const { id } = useParams();
  const { data, isSuccess } = useGetByShortUrlQuery(id || "");
  const [storeClick, storeResult] = useStoreClickMutation();

  const parser = new UAParser().getResult();
  const device = parser.device.type || "desktop";

  useEffect(() => {
    if (device) {
      setStat((prev) => ({
        ...prev,
        device,
      }));
    }
  }, [device]);

  useEffect(() => {
    const fetchStat = async () => {
      try {
        const resp = await fetch("https://ipapi.co/json");
        const result = await resp.json();
        setStat((prev) => ({
          ...prev,
          city: result.city,
          country: result.country_name,
        }));
      } catch (error) {
        console.log(error);
      }
    };
    fetchStat();
  }, []);

  useEffect(() => {
    if (stat.city && stat.country && stat.device && isSuccess && data) {
      storeClick({
        urlId: data._id,
        device: stat.device,
        city: stat.city,
        country: stat.country,
      });
    }
  }, [stat, isSuccess, data, storeClick]);

  useEffect(() => {
    if (storeResult.isSuccess && data) {
      window.location.href = data.original_url;
    }
  }, [storeResult, data]);

  return <div>Redirect</div>;
};

export default Redirect;
