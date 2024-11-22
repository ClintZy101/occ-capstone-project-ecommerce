import React, { useEffect, useState } from "react";
import { API_URL, ncrCities, philippineRegions } from "../../data/PhilippineRegions";
import { extractInsideParentheses } from "../../utils/helpers";

export default function DeliveryAddress() {
  const [formValue, setFormValue] = useState({
    fullname: "",
    mobile: "",
  });

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
          setCitiesMunicipalities(ncrCities);
          console.log(citiesMunicipalities)
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

//   // Fetch Municipalities
//   useEffect(() => {
//     const fetchMunicipalities = async () => {
//       if (!provincialCode) return;

//       setLoading(true);
//       setError("");
//       try {
//         const response = await fetch(`${API_URL}/provinces/${provincialCode}/municipalities`);
//         if (!response.ok) throw new Error("Failed to fetch municipalities");
//         const data = await response.json();
//         setMunicipalities(data);
//       } catch (err) {
//         setError(err.message || "An error occurred while fetching data.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMunicipalities();
//   }, [provincialCode]);



  // Fetch Cities-Municipalities
  useEffect(() => {
    const fetchCitiesMunicipalities = async () => {
      if (!provincialCode && regionCode === ncrRegionCode){
            setCitiesMunicipalities(ncrCities)
        return;
      } else {
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

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue((prev) => ({ ...prev, [name]: value }));
  };

  // Dropdown change handlers
  const handleRegionChange = (e) => setRegionCode(e.target.value);
  const handleProvinceChange = (e) => setProvincialCode(e.target.value);
  const handleMunicipalityChange = (e) => setMunicipalCode(e.target.value);
  const handleBarangayChange = (e) => setBarangayCode(e.target.value);

  return (
    <div className="bg-customBrown-light p-5">
      <p className="font-semibold">2. Delivery Address</p>
      <p className="text-center text-sm">All Fields Required</p>
      <form className="grid gap-2">
        {/* Full Name */}
        <div className="grid">
          <label htmlFor="fullname">Full Name *</label>
          <input
            type="text"
            name="fullname"
            value={formValue.fullname}
            onChange={handleChange}
            placeholder="Enter Full Name"
            className="w-full bg-customBrown outline-none py-1 px-2 placeholder:text-customBrown-dark"
          />
        </div>

        {/* Mobile */}
        <div className="grid">
          <label htmlFor="mobile">Mobile Number *</label>
          <input
            type="tel"
            name="mobile"
            value={formValue.mobile}
            onChange={handleChange}
            placeholder="09XXXXXXXXX"
            pattern="^(09|\\+639)\\d{9}$"
            maxLength={11}
            className="w-full bg-customBrown outline-none py-1 px-2 placeholder:text-customBrown-dark"
          />
        </div>

        {/* Region */}
        <div className="grid">
          <label htmlFor="regions">Region *</label>
          <select name="regions" id="regions" value={regionCode} onChange={handleRegionChange}>
            <option value="">Select Region</option>
            {philippineRegions.map((region, i) => (
              <option key={i} value={region.code}>
                {extractInsideParentheses(region.name)}
              </option>
            ))}
          </select>
        </div>

        {/* Province */}
          <div className="grid">
            <label htmlFor="provinces">Province *</label>
            <select
              name="provinces"
              id="provinces"
              value={provincialCode}
              onChange={handleProvinceChange}
            >
              <option value="">Select Province</option>
              {provinces.map((prov, i) => (
                <option key={i} value={prov.code}>
                  {prov.name}
                </option>
              ))}
            </select>
          </div>

        {/* Municipality or City */}
     
        <div className="grid">
          <label htmlFor="municipalities">Municipality/City *</label>
          <select
            name="municipalities"
            id="municipalities"
            value={municipalCode}
            onChange={handleMunicipalityChange}
          >
            <option value="">Select Municipality/City</option>
            {citiesMunicipalities.map((item, i) => (
              <option key={i} value={item.code}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        {/* Barangay */}
        <div className="grid">
          <label htmlFor="barangays">Barangay *</label>
          <select
            name="barangays"
            id="barangays"
            value={barangayCode}
            onChange={handleBarangayChange}
          >
            <option value="">Select Barangay</option>
            {barangays.map((bar, i) => (
              <option key={i} value={bar.code}>
                {bar.name}
              </option>
            ))}
          </select>
        </div>

        {/* Error Display */}
        {error && <p className="text-red-500 text-sm">{error}</p>}

        {/* Loading Spinner */}
        {loading && <p>Loading...</p>}
      </form>
    </div>
  );
}
