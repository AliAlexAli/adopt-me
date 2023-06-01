import {
    collection,
    doc,
    getDocs,
    getFirestore,
    limit,
    query,
    setDoc,
    updateDoc,
    where,
} from "firebase/firestore/lite";
import {
    deleteObject,
    getDownloadURL,
    getStorage,
    ref as storageRef,
    uploadBytes,
} from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import Owner, { ownerConverter } from "./dto/Owner";
import Pet, { petConverter, petToJSON } from "./dto/Pet";
import { app } from "./firebase-config";
import { FirebaseError } from "@firebase/util";

const db = getFirestore(app);
const ownersCol = collection(db, "owners");
const storage = getStorage(app);
const urlBase =
    "https://firestore.googleapis.com/v1/projects/adoptme-36e2a/databases/(default)/documents/pets";

export async function getPets() {
    let petList: Pet[] = [];

    const response = await fetch(urlBase);
    const data = await response.json();
    data.documents.forEach((element: any) => {
        petList.push(petConverter(element.fields));
    });

    return petList;
}

export async function getPetById(id: string) {
    const response = await fetch(`${urlBase}/${id}`);
    const data = await response.json();
    return petConverter(data.fields);
}

export async function addPet(pet: Pet) {
    await fetch(`${urlBase}?documentId=${pet.id}`, {
        method: "POST",
        body: petToJSON(pet),
    });
}

export async function modifyPet(pet: Pet) {
    await fetch(`${urlBase}/${pet.id}`, {
        method: "PATCH",
        body: petToJSON(pet),
    });
}

export async function deletePet(pet: Pet) {
    if (pet.image) await deleteObject(storageRef(storage, pet.image));

    await fetch(`${urlBase}/${pet.id}`, {method: "DELETE"});
}

export async function uploadImage(file: File) {
    const fileName =
        uuidv4() + file.type.substring(file.type.lastIndexOf("/") + 1);
    const imgRef = storageRef(storage, fileName);
    const url = await getDownloadURL((await uploadBytes(imgRef, file)).ref);
    return url;
}

export async function getOwner(id: string) {
    const q = query(ownersCol, where("id", "==", id), limit(1));
    const docSnapshot = await getDocs(q);

    const owner = docSnapshot.docs.pop();
    if (owner?.exists()) {
        return ownerConverter(owner.data());
    } else throw new FirebaseError("0", "A felhasználó nem található");
}

export async function getOwnerByEmail(email: string) {
    const q = query(ownersCol, where("email", "==", email), limit(1));
    const docSnapshot = await getDocs(q);

    const owner = docSnapshot.docs.pop();
    if (owner?.exists()) {
        return ownerConverter(owner.data());
    } else throw new FirebaseError("0", "A felhasználó nem található");
}

export async function createOwner(owner: Owner) {
    const id = uuidv4();
    const user = {
        ...owner,
        id: id,
    };
    await setDoc(doc(db, "owners", id), user);
    return user;
}

export async function modifyOwner(owner: Owner) {
    await updateDoc(doc(ownersCol, owner.id), {
        ...owner,
    });
}
