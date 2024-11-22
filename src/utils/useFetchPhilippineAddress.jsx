import React, {useState, useEffect} from 'react'
const useFetchPhilippineAddress = () => {
    const [regionCode, setRegionCode] = useState("");
    const ncrRegionCode = "130000000";
  
    const [provincialCode, setProvincialCode] = useState("");
    const [municipalCode, setMunicipalCode] = useState("");
    const [barangayCode, setBarangayCode] = useState("");
  
    const [provinces, setProvinces] = useState([]);
    const [municipalities, setMunicipalities] = useState([]);
    const [barangays, setBarangays] = useState([]);
    const [cities, setCities] = useState([]);
    const [citiesMunicipalities, setCitiesMunicipalities] = useState([])
  
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
  
    // Fetch Provinces or Cities (if NCR)
    useEffect(() => {
      const fetchProvincesOrCities = async () => {
        setLoading(true);
        setError("");
        try {
          if (regionCode === ncrRegionCode) {
            // Set NCR cities directly
            setCities(ncrCities);
            setProvinces([]);
          } else {
            // Fetch provinces for the selected region
            const response = await fetch(`${API_URL}/regions/${regionCode}/provinces`);
            if (!response.ok) throw new Error("Failed to fetch provinces");
            const data = await response.json();
            setProvinces(data);
            setCities([]);
          }
        } catch (err) {
          setError(err.message || "An error occurred while fetching data.");
        } finally {
          setLoading(false);
        }
      };
  
      if (regionCode) fetchProvincesOrCities();
    }, [regionCode]);
  
    // Fetch Municipalities
    useEffect(() => {
      const fetchMunicipalities = async () => {
        if (!provincialCode) return;
  
        setLoading(true);
        setError("");
        try {
          const response = await fetch(`${API_URL}/provinces/${provincialCode}/municipalities`);
          if (!response.ok) throw new Error("Failed to fetch municipalities");
          const data = await response.json();
          setMunicipalities(data);
        } catch (err) {
          setError(err.message || "An error occurred while fetching data.");
        } finally {
          setLoading(false);
        }
      };
  
      fetchMunicipalities();
    }, [provincialCode]);
  
  //   // Fetch Cities
  //   useEffect(() => {
  //     const fetchCities = async () => {
  //       if (!provincialCode) return;
  //       setLoading(true);
  //       setError("");
  //       try {
  //         const response = await fetch(`${API_URL}/provinces/${provincialCode}/cities`);
  //         if (!response.ok) throw new Error("Failed to fetch cities");
  //         const data = await response.json();
  //         setCities(data);
  //       } catch (err) {
  //         setError(err.message || "An error occurred while fetching data.");
  //       } finally {
  //         setLoading(false);
  //       }
  //     };
  
  //     fetchCities();
  //   }, [provincialCode]);
  
    // Fetch Cities-Municipalities
    useEffect(() => {
      const fetchCitiesMunicipalities = async () => {
        if (!provincialCode) return;
        setLoading(true);
        setError("");
        try {
          const response = await fetch(`${API_URL}/provinces/${provincialCode}/cities-municipalities`);
          if (!response.ok) throw new Error("Failed to fetch cities");
          const data = await response.json();
          setCitiesMunicipalities(data);
        } catch (err) {
          setError(err.message || "An error occurred while fetching data.");
        } finally {
          setLoading(false);
        }
      };
  
      fetchCitiesMunicipalities();
    }, [provincialCode]);
  
    // Fetch Barangays
    useEffect(() => {
      const fetchBarangays = async () => {
        if (!municipalCode) return;
  
        setLoading(true);
        setError("");
        try {
          const response = await fetch(`${API_URL}/cities-municipalities/${municipalCode}/barangays`);
          if (!response.ok) throw new Error("Failed to fetch barangays");
          const data = await response.json();
          setBarangays(data);
        } catch (err) {
          setError(err.message || "An error occurred while fetching data.");
        } finally {
          setLoading(false);
        }
      };
  
      fetchBarangays();
    }, [municipalCode]);

    return {

    }
}