import { Timestamp } from "firebase/firestore/lite";

interface Pet {
  birth: Date;
  date: Date;
  description: string;
  id: string;
  image: string;
  name: string;
  owner: string;
  sex: "Szuka" | "Kan";
  size: "Kicsi" | "Közepes" | "Nagy";
}

export const printAge = (birthDate: Date): string => {
  let now = new Date();
  let age = now.getFullYear() - birthDate.getFullYear();
  let m = now.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < birthDate.getDate())) {
    age--;
  }
  if (age > 0) return `${age} éves`;
  if (
    now.getMonth() - birthDate.getMonth() === 0 ||
    now.getMonth() - birthDate.getMonth() === 12
  )
    return `${now.getDate() - birthDate.getDate()} napos`;
  if (now.getMonth() - birthDate.getMonth() > 0) {
    return `${now.getMonth() - birthDate.getMonth()} hónapos`;
  }
  return `${now.getMonth() - birthDate.getMonth() + 12} hónapos`;
};

export const petConverter = (element: any): Pet => {
  return {
    id: element.id.stringValue,
    description: element.description.stringValue,
    image: element.image.stringValue,
    name: element.name.stringValue,
    owner: element.owner.stringValue,
    sex: element.sex.stringValue,
    size: element.size.stringValue,
    birth: new Date(element.birth.timestampValue),
    date: new Date(element.date.timestampValue),
  };
};

export const petToJSON = (pet: Pet): string => {
  return JSON.stringify({
    fields: {
      id: { stringValue: pet.id },
      name: { stringValue: pet.name },
      owner: { stringValue: pet.owner },
      image: { stringValue: pet.image },
      size: { stringValue: pet.size },
      sex: { stringValue: pet.sex },
      description: { stringValue: pet.description },
      birth: { timestampValue: Timestamp.fromDate(pet.birth).toDate() },
      date: { timestampValue: Timestamp.fromDate(pet.birth).toDate() },
    },
  });
};
/*
{
    "name": "projects/adoptme-36e2a/databases/(default)/documents/pets/tz7nZrhdGEXxIJ2PMMq3",
    "fields": {
        "name": {
            "stringValue": "Teszt"
        },
        "owner": {
            "stringValue": "ZCRD9mHn11X0UPPGkeGw"
        },
        "image": {
            "stringValue": "https://firebasestorage.googleapis.com/v0/b/adoptme-36e2a.appspot.com/o/07fa2b09-56a6-4087-86f6-a6a1ac4e7040jpeg?alt=media&token=0e31f27e-0bbe-42ea-8b55-68f64369c2c0"
        },
        "id": {
            "stringValue": "teszt"
        },
        "birth": {
            "timestampValue": "2021-11-20T00:00:00Z"
        },
        "size": {
            "stringValue": "Nagy"
        },
        "description": {
            "stringValue": ""
        },
        "date": {
            "timestampValue": "2022-06-20T22:40:58.408Z"
        },
        "sex": {
            "stringValue": "Szuka"
        }
    },
    "createTime": "2022-06-21T14:27:53.137995Z",
    "updateTime": "2022-06-21T14:27:53.137995Z"
} */
export default Pet;
