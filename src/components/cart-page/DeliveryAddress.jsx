import React, { useEffect, useState } from "react";
import { philippineRegions } from "../../data/PhilippineRegions";
import { extractInsideParentheses } from "../../utils/helpers";
import { fetchSignInMethodsForEmail } from "firebase/auth/web-extension";

// province/{{code}}/municipality'
const API_URL = "https://psgc.cloud/api";

export default function DeliveryAddress() {
  const [formValue, setFormValue] = useState({
    fullname: "",
    mobile: "",
  });

  //   const [philippineCode, setPhilippineCode] = useState({
  //     region: "",
  //     municipality:"",
  //     barangay:""
  //   })
  const [regionCode, setRegionCode] = useState("0100000000");
  const [provincialCode, setProvincialCode] = useState("");
  const [municipalCode, setMunicipalCode] = useState("");
  const [provinces, setProvinces] = useState([]);
  const [municipalities, setMunicipalities] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    // Replace with the actual region code
    const fetchProvinces = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${API_URL}/regions/${regionCode}/provinces`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch provinces");
        }
        const data = await response.json();
        setProvinces(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    const ncrRegionCode = "130000000";

    const fetchNCRcities = async () => {
        if (regionCode === ncrRegionCode) {
            try { 
                const response = await fetch(
                `https://psgc.cloud/api/regions/${ncrRegionCode}/cities-municipalities`
              )
             const data = response.json()
             setCities(data)
            }  catch (err) {
                setError(err.message);
              } finally {
                setLoading(false);
              }
          }
    }
    

    const fetchMunicipalities = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${API_URL}/provinces/${provincialCode}/municipalities`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch provinces");
        }
        const data = await response.json();
        setMunicipalities(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    const fetchCities = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${API_URL}/province/${provincialCodeCode}/cities`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch provinces");
        }
        const data = await response.json();
        setCities(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
      
    };

   

    fetchProvinces();
    fetchMunicipalities();
    fetchCities();
    fetchNCRcities
  }, [regionCode, provincialCode]);
  console.log("provinces: ", provinces);
  console.log("municipalities ", municipalities);
  console.log("cities", cities);
  return (
    <div className="bg-customBrown-light p-5 ">
      <p className="font-semibold">2. Delivery Address</p>
      <p className="text-center text-sm">All Fields Required </p>
      <form action="" className="grid gap-2">
        <div className="grid">
          <label htmlFor="fullname">Full Name *</label>
          <input
            type="text"
            name="fullname"
            value={formValue.fullname}
            onChange={(e) => setFormValue({ fullname: e.target.value })}
            placeholder="Enter Full Name"
            className="w-full bg-customBrown outline-none py-1 px-2 placeholder:text-customBrown-dark"
          />
        </div>
        <div className="grid">
          <label htmlFor="mobile">Mobile Number *</label>
          <input
            type="tel"
            name="mobile"
            value={formValue.mobile}
            onChange={(e) => setFormValue({ mobile: e.target.value })}
            placeholder="09XXXXXXXXX"
            pattern="^(09|+639)d{9}$"
            maxLength={11}
            className="w-full bg-customBrown outline-none py-1 px-2 placeholder:text-customBrown-dark"
          />
        </div>
        <div className="grid">
          <label htmlFor="regions" className="">
            Region *
          </label>
          <select
            name="regions"
            id="regions"
            value={regionCode}
            onChange={(e) => setRegionCode(e.target.value)}
          >
            {philippineRegions.map((region, i) => (
              <option key={i} value={region.code}>
                {extractInsideParentheses(region.name)}
              </option>
            ))}
          </select>
        </div>
        <div className="grid">
          <label htmlFor="provinces" className="">
            Province *
          </label>
          <select
            name="provinces"
            id="provinces"
            value={provincialCode}
            onChange={(e) => setProvincialCode(e.target.value)}
          >
            {provinces?.map((prov, i) => (
              <option key={i} value={prov.code}>
                {prov.name}
              </option>
            ))}
          </select>
        </div>
        <div className="grid">
          <label htmlFor="municipalities" className="">
            Municipality *
          </label>
          <select
            name="municipalities"
            id="municipalities"
            value={provincialCode}
            onChange={(e) => setMunicipalCode(e.target.value)}
          >
            {municipalities?.map((mun, i) => (
              <option key={i} value={mun.code}>
                {mun.name}
              </option>
            ))}
          </select>
        </div>
      </form>
    </div>
  );
}
