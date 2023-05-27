import { useEffect, useState } from "react";
import { loadTeamsCountries } from "../utils/requisitions";


export default function useDataProvider() {
  const key = sessionStorage.getItem("key");
  const [countryCode, setCountryCode] = useState("");
  const [teamsCountries, setTeamsCountries] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const teamsCountriesData = await loadTeamsCountries(key);
        if (teamsCountriesData) {
          setTeamsCountries(teamsCountriesData.response);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [key,countryCode]);

  return {
    countryCode,
    setCountryCode,
    teamsCountries,
    setTeamsCountries,
  };
}
