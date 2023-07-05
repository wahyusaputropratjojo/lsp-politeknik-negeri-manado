import IdnArea from "idn-area-data";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const updateProperties = (arr, propertyChanges) => {
  for (let obj of arr) {
    for (let change of propertyChanges) {
      const { oldPropertyName, newPropertyName } = change;
      if (obj.hasOwnProperty(oldPropertyName)) {
        const value = obj[oldPropertyName].toLowerCase();
        const capitalizedValue = value.replace(/\b\w/g, (char) =>
          char.toUpperCase(),
        );
        obj[newPropertyName] = capitalizedValue;
        obj["value"] = value; // Add the new "value" property
        if (oldPropertyName !== newPropertyName) {
          delete obj[oldPropertyName];
        }
      }
    }
  }
  return arr;
};

export const getProvince = async () => {
  const province = await IdnArea.provinces();

  const propertyChanges = [
    { oldPropertyName: "code", newPropertyName: "id" },
    { oldPropertyName: "name", newPropertyName: "nama" },
  ];

  const updateProvince = updateProperties(province, propertyChanges);

  await prisma.provinsi.createMany({
    data: updateProvince,
    skipDuplicates: true,
  });
};
