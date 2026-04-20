

import { db } from "../firebase/firebase";
import {
    collection,
    getDocs,
    addDoc,
    deleteDoc,
    doc,
    updateDoc,
    writeBatch
} from "firebase/firestore";

const COLLECTION = "planets";
const planetsRef = () => collection(db, COLLECTION);


export async function getPlanets() {
    const snapshot = await getDocs(planetsRef());
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
}


export async function addPlanet(planetData) {
    const docRef = await addDoc(planetsRef(), planetData);
    return { id: docRef.id, ...planetData };
}


export async function updatePlanet(id, planetData) {
    await updateDoc(doc(db, COLLECTION, id), planetData);
    return { id, ...planetData };
}


export async function deletePlanet(id) {
    await deleteDoc(doc(db, COLLECTION, id));
}


export async function importPlanets(planets) {
    const MAX_PER_BATCH = 500;
    for (let i = 0; i < planets.length; i += MAX_PER_BATCH) {
        const batch = writeBatch(db);
        const chunk = planets.slice(i, i + MAX_PER_BATCH);
        chunk.forEach((p) => {
            const newRef = doc(planetsRef());  // auto-id
            batch.set(newRef, p);
        });
        await batch.commit();
    }
}
