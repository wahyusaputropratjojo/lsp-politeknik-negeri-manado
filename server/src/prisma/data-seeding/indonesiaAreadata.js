import IdnArea from "idn-area-data";

const changePropertyNames = (arr, propertyChanges) => {
  for (let obj of arr) {
    for (let change of propertyChanges) {
      const { oldPropertyName, newPropertyName } = change;
      if (obj.hasOwnProperty(oldPropertyName)) {
        obj[newPropertyName] = obj[oldPropertyName];
        delete obj[oldPropertyName];
      }
    }
  }
  return arr;
};

const capitalizePropertyValue = (arr, propertyName) => {
  for (let obj of arr) {
    if (obj.hasOwnProperty(propertyName)) {
      const value = obj[propertyName].toLowerCase();
      const capitalizedValue = value.replace(/\b\w/g, (char) =>
        char.toUpperCase()
      );
      obj[propertyName] = capitalizedValue;
    }
  }
  return arr;
};

const addProperty = (arr, newPropertyName, sourcePropertyName) => {
  for (let obj of arr) {
    if (obj.hasOwnProperty(sourcePropertyName)) {
      const sourcePropertyValue = obj[sourcePropertyName];
      const lowercaseValue = sourcePropertyValue.toLowerCase();
      obj[newPropertyName] = lowercaseValue;
    }
  }
  return arr;
};

export const getProvinsi = async () => {
  const provinsi = await IdnArea.provinces();

  const propertyChanges = [
    { oldPropertyName: "code", newPropertyName: "id" },
    { oldPropertyName: "name", newPropertyName: "nama" },
  ];

  const dataPropertyChanged = changePropertyNames(provinsi, propertyChanges);

  const dataCapitalized = capitalizePropertyValue(dataPropertyChanged, "nama");

  return dataCapitalized;
};

export const getKotaKabupaten = async () => {
  const kabupaten = await IdnArea.regencies();

  const propertyChanges = [
    { oldPropertyName: "code", newPropertyName: "id" },
    { oldPropertyName: "province_code", newPropertyName: "id_provinsi" },
    { oldPropertyName: "name", newPropertyName: "nama" },
  ];

  const dataPropertyChanged = changePropertyNames(kabupaten, propertyChanges);

  const dataCapitalized = capitalizePropertyValue(dataPropertyChanged, "nama");

  return dataCapitalized;
};

export const getKecamatan = async () => {
  const kecamatan = await IdnArea.districts();

  const propertyChanges = [
    { oldPropertyName: "code", newPropertyName: "id" },
    { oldPropertyName: "regency_code", newPropertyName: "id_kota_kabupaten" },
    { oldPropertyName: "name", newPropertyName: "nama" },
  ];

  const dataPropertyChanged = changePropertyNames(kecamatan, propertyChanges);

  const dataCapitalized = capitalizePropertyValue(dataPropertyChanged, "nama");

  return dataCapitalized;
};

export const getKelurahanDesa = async () => {
  const desa = await IdnArea.villages();

  const propertyChanges = [
    { oldPropertyName: "code", newPropertyName: "id" },
    { oldPropertyName: "district_code", newPropertyName: "id_kecamatan" },
    { oldPropertyName: "name", newPropertyName: "nama" },
  ];

  const dataPropertyChanged = changePropertyNames(desa, propertyChanges);

  const dataCapitalized = capitalizePropertyValue(dataPropertyChanged, "nama");

  return dataCapitalized;
};
