import React, { useEffect, useState } from "react";
import getClinicRequest from "../../utils/data/fetch/getClinicRequest";
import getClinicDetails from "../../utils/data/fetch/getClinicDetails";
import getClinicOwner from "../../utils/data/fetch/getClinicOwner";
import getClinicOwnerAddress from "../../utils/data/fetch/getClinicOwnerAddress";
import getClinicAddress from "../../utils/data/fetch/getClinicaddress";
import {
  getClinicPermit,
  getClinicBIR,
  getClinicPic,
} from "../../utils/data/fetch/getClinicFiles";

const useClinicDetails = () => {
  const [clinicReq, setClinicReq] = useState([]);
  const [clinicData, setClinicData] = useState([]);
  const [clinicOwner, setClinicOwner] = useState([]);
  const [clinicOwnerAddress, setClinicOwnerAddress] = useState([]);
  const [clinicAddress, setClinicAddress] = useState([]);

  const [idClinic, setIdClinic] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const requestData = await getClinicRequest();
        const clinicDetails = await getClinicDetails();
        const ownerDetails = await getClinicOwner();
        const ownerAddress = await getClinicOwnerAddress();
        const clinicAddress = await getClinicAddress();

        setClinicReq(requestData);
        setClinicData(clinicDetails);
        setClinicOwner(ownerDetails);
        setClinicOwnerAddress(ownerAddress);
        setClinicAddress(clinicAddress);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);

  const getOwnerFirstName = (ownerId) => {
    if (!clinicOwner || clinicOwner.length === 0) {
      return "No Clinic";
    }

    const firstname = clinicOwner.find((name) => name.id === Number(ownerId));

    return firstname ? firstname.first_name : "No first Name";
  };

  const getOwnerMiddleName = (ownerId) => {
    if (!clinicOwner || clinicOwner.length === 0) {
      return "No Clinic";
    }

    const middlename = clinicOwner.find((name) => name.id === Number(ownerId));

    return middlename ? middlename.middle_name : "No middle Name";
  };

  const getOwnerLastName = (ownerId) => {
    if (!clinicOwner || clinicOwner.length === 0) {
      return "No Clinic";
    }

    const lastname = clinicOwner.find((name) => name.id === Number(ownerId));

    return lastname ? lastname.last_name : "No last Name ";
  };

  const getOwnerExtName = (ownerId) => {
    if (!clinicOwner || clinicOwner.length === 0) {
      return "No Clinic";
    }

    const extname = clinicOwner.find((name) => name.id === Number(ownerId));

    return extname ? extname.ext_name : "No extension Name ";
  };

  const getOwnerGender = (ownerId) => {
    if (!clinicOwner || clinicOwner.length === 0) {
      return "No Clinic";
    }

    const gender = clinicOwner.find((gender) => gender.id === Number(ownerId));

    return gender ? gender.gender : "No Gender ";
  };

  const getOwnerNumber = (ownerId) => {
    if (!clinicOwner || clinicOwner.length === 0) {
      return "No Clinic";
    }

    const number = clinicOwner.find((number) => number.id === Number(ownerId));

    return number ? number.contact_num : "No contact number ";
  };

  const getOwnerEmail = (ownerId) => {
    if (!clinicOwner || clinicOwner.length === 0) {
      return "No Clinic";
    }

    const email = clinicOwner.find((email) => email.id === Number(ownerId));

    return email ? email.email : "No Email ";
  };

  const getOwnerRegion = (ownerId) => {
    if (!clinicOwnerAddress || clinicOwnerAddress.length === 0) {
      return "No Clinic";
    }

    const region = clinicOwnerAddress.find(
      (region) => region.owner_id === Number(ownerId)
    );

    return region ? region.region : "No Region ";
  };

  const getOwnerProvince = (ownerId) => {
    if (!clinicOwnerAddress || clinicOwnerAddress.length === 0) {
      return "No Clinic";
    }

    const province = clinicOwnerAddress.find(
      (province) => province.owner_id === Number(ownerId)
    );

    return province ? province.province : "No Province ";
  };

  const getOwnerCityMuni = (ownerId) => {
    if (!clinicOwnerAddress || clinicOwnerAddress.length === 0) {
      return "No Clinic";
    }

    const city_muni = clinicOwnerAddress.find(
      (city_muni) => city_muni.owner_id === Number(ownerId)
    );

    return city_muni ? city_muni.city_muni : "No City/Municipality ";
  };

  const getOwnerBarangay = (ownerId) => {
    if (!clinicOwnerAddress || clinicOwnerAddress.length === 0) {
      return "No Clinic";
    }

    const barangay = clinicOwnerAddress.find(
      (barangay) => barangay.owner_id === Number(ownerId)
    );

    return barangay ? barangay.barangay : "No Barangay ";
  };

  const getOwnerAddAddress = (ownerId) => {
    if (!clinicOwnerAddress || clinicOwnerAddress.length === 0) {
      return "No Clinic";
    }

    const add_address = clinicOwnerAddress.find(
      (add_address) => add_address.owner_id === Number(ownerId)
    );

    return add_address ? add_address.add_address : "No Additional Address ";
  };

  const getClinicName = (ownerId) => {
    if (!clinicData || clinicData.length === 0) {
      return "No Clinic";
    }

    const clinicName = clinicData.find(
      (name) => name.owner_id === Number(ownerId)
    );
    return clinicName ? clinicName.name : "No Clinic";
  };

  const getClinicID = (ownerId) => {
    if (!clinicData || clinicData.length === 0) {
      return "No Clinic";
    }

    const clinicId = clinicData.find(
      (clinic) => clinic.owner_id === Number(ownerId)
    );

    return clinicId ? clinicId.id : " ";
  };

  const getClinicRegion = (clinicID) => {
    if (!clinicAddress || clinicAddress.length === 0) {
      return "No Clinic";
    }

    const clinicReg = clinicAddress.find(
      (region) => region.clinic_id === Number(clinicID)
    );
    return clinicReg ? clinicReg.region : "No Clinic";
  };

  const getClinicProvince = (clinicID) => {
    if (!clinicAddress || clinicAddress.length === 0) {
      return "No Clinic";
    }

    const clinicProv = clinicAddress.find(
      (province) => province.clinic_id === Number(clinicID)
    );
    return clinicProv ? clinicProv.province : "No Clinic";
  };

  const getClinicCityMuni = (clinicID) => {
    if (!clinicAddress || clinicAddress.length === 0) {
      return "No Clinic";
    }

    const clinicCityMuni = clinicAddress.find(
      (city_muni) => city_muni.clinic_id === Number(clinicID)
    );
    return clinicCityMuni ? clinicCityMuni.city_muni : "No Clinic";
  };

  const getClinicBarangay = (clinicID) => {
    if (!clinicAddress || clinicAddress.length === 0) {
      return "No Clinic";
    }

    const clinicBrngy = clinicAddress.find(
      (barangay) => barangay.clinic_id === Number(clinicID)
    );
    return clinicBrngy ? clinicBrngy.barangay : "No Clinic";
  };

  const getClinicAddAddress = (clinicID) => {
    if (!clinicAddress || clinicAddress.length === 0) {
      return "No Clinic";
    }

    const clinicAddAddress = clinicAddress.find(
      (add_address) => add_address.clinic_id === Number(clinicID)
    );
    return clinicAddAddress ? clinicAddAddress.add_address : "No Clinic";
  };

  const getOwnerUID = (ownerId) => {
    if (!clinicOwner || clinicOwner.length === 0) {
      return "No Clinic";
    }

    const ownerUID = clinicOwner.find((uid) => uid.id === Number(ownerId));

    return ownerUID ? ownerUID.uid : " ";
  };

  const getPermit = (owner_uid) => {
    const permit = getClinicPermit(owner_uid);

    return permit ? permit.publicUrl : " ";
  };

  const getBIR = (owner_uid) => {
    const bir = getClinicBIR(owner_uid);

    return bir ? bir.publicUrl : " ";
  };

  const getPic = (owner_uid) => {
    const clinic_pic = getClinicPic(owner_uid);

    return clinic_pic ? clinic_pic.publicUrl : " ";
  };

  return {
    clinicReq,
    clinicData,
    getOwnerFirstName,
    getOwnerMiddleName,
    getOwnerLastName,
    getOwnerExtName,
    getOwnerGender,
    getOwnerNumber,
    getOwnerEmail,
    getOwnerRegion,
    getOwnerProvince,
    getOwnerCityMuni,
    getOwnerBarangay,
    getOwnerAddAddress,
    getClinicName,
    getClinicID,
    getClinicRegion,
    getClinicProvince,
    getClinicCityMuni,
    getClinicBarangay,
    getClinicAddAddress,
    getOwnerUID,
    getPermit,
    getBIR,
    getPic,
  };
};

export default useClinicDetails;