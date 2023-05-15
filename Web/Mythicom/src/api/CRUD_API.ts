import {
    doc, getDoc, getDocs, updateDoc, addDoc,
    collection, serverTimestamp,
    query, orderBy, deleteDoc,
} from '@firebase/firestore'
import { database } from '../firebase-config'

export const AddNewData = async (newData: object, clearInputField: any, fieldPath:string) => {
    
    try {
        const currentUserInfo = JSON.parse(localStorage.getItem('currentUser') || '')
        const dataRef = await addDoc(collection(database, fieldPath), { ...newData, createdAt: serverTimestamp() });
        const newUserData = {
            ...currentUserInfo,fieldPath: [
                ...currentUserInfo[fieldPath],
                dataRef.id
            ],
        }
        UpdateData(currentUserInfo.uid,'users',newUserData,() => {})
        localStorage.setItem('currentUser', JSON.stringify(newUserData))
        clearInputField()
    }
    catch (error:any) {
        console.error("Error adding document: ", error.message);
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