import { getData } from "country-list";

const changePropertyNames = async (array, propertyChanges) => {
  for (let object of array) {
    for (let change of propertyChanges) {
      const { oldPropertyName, newPropertyName } = change;
      if (object.hasOwnProperty(oldPropertyName)) {
        object[newPropertyName] = object[oldPropertyName];
        delete object[oldPropertyName];
      }
    }
  }
  return array;
};

export const getNegara = async () => {
  const countries = getData();

  const propertyChanges = [
    { oldPropertyName: "code", newPropertyName: "id" },
    { oldPropertyName: "name", newPropertyName: "nama" },
  ];

  const dataPropertyChanged = changePropertyNames(countries, propertyChanges);

  return dataPropertyChanged;
};
