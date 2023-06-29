import {
    doc, getDoc, getDocs, updateDoc, addDoc,
    collection, serverTimestamp,
    query, orderBy, deleteDoc,
} from '@firebase/firestore'
import { database } from '../firebase-config'
import { errorSnackbar, successSnackbar } from '../services';

export const AddNewData = async (newData: object, fieldPath:string, message?:any) => {
    
    try {
        const dataRef = await addDoc(collection(database, fieldPath), { ...newData, createdAt: serverTimestamp() });
        successSnackbar(message)
        return dataRef.id
    }
    catch (error:any) {
        errorSnackbar(`Error adding document: ${error.message}`);
    }
}

export const GetSingleData = async (collection: any, uid: any) => {
    const snapshot = await getDoc(doc(database, collection, uid))
    const data = snapshot.data();
    if (data)
        data.id = snapshot.id
    return data
}

export const GetAllOrderedData = async (fieldPath: any, collectionName: any) => {
    const data: any = [];
    const dataCollection = collection(database, collectionName);
    const orderByCreatedQueryAndLimit = query(dataCollection, orderBy(fieldPath, 'desc'));
    const dataSnapshot = await getDocs(orderByCreatedQueryAndLimit);


    dataSnapshot.forEach((doc) => {
        const dataDoc = doc.data();
        dataDoc.id = doc.id
        data.push(dataDoc)
    })

    return data
}

export const GetAllUser = async () => {
    const users: any = [];
    const userCollection = collection(database, "users");
    const usersSnapshot = await getDocs(userCollection);

    usersSnapshot.forEach((doc) => {
        const userDoc = doc.data();
        userDoc.id = doc.id;
        users.push(userDoc)
    })

    return users
}

export const UpdateData = async (id: string, collection: string, newData: any, clearInputField: Function) => {
    try {
        await updateDoc(doc(database, collection, id), newData)
        clearInputField()
    } catch (error: any) {
        console.error("Error adding document: ", error.message);
    }
}