import { DocumentData } from "firebase/firestore/lite";

interface Owner {
  id?: string;
  address?: string;
  email: string;
  name: string;
  phone: string;
  website?: string;
}

export const ownerConverter = (element: DocumentData): Owner => {
  return {
    id: element.id,
    address: element.address,
    email: element.email,
    name: element.name,
    phone: element.phone,
    website: element.website,
  };
};

export default Owner;
