import { initializeApp } from "firebase/app";
import { getDocs, getFirestore } from "firebase/firestore";
import firebase from "firebase/compat/app";


import { collection, addDoc } from "firebase/firestore"; 

type collectionType = {
lat:string
lng:string
mobileNo: string
ownerName: string
restAddress: string
restName: string
}

const firebaseConfig = {
    apiKey: "AIzaSyDfL9B9MuQGpwkhAwdbUU02oTndv0QtZKo",
    authDomain: "foodtolls.firebaseapp.com",
    projectId: "foodtolls",
    storageBucket: "foodtolls.appspot.com",
    messagingSenderId: "780413382237",
    appId: "1:780413382237:web:660a52ba5e586e8a63e7b4",
    measurementId: "G-SEQ192S0DD"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const addVendor = async (data:collectionType) => {
    if(await checkExistingUser(data.mobileNo)){
try {
        const docRef = await addDoc(collection(db, "vendorpreonboard"), data);
        console.log("Document written with ID: ", docRef.id);
        return {status:0 , message:'Vendor Added'}
      } catch (e) {
        console.error("Error adding document: ", e);
        return {status:1 , message:'Error while Adding vendor. Please try again'}
      }
    } else {
        return {status:1 , message:'Vendor Already exits'}
    }
}


const checkExistingUser = async (mobileNumber:string)=> {
    const vendorCol = collection(db, 'vendorpreonboard');
    const vendorSnapshot = await getDocs(vendorCol);
    const vendorList = vendorSnapshot.docs.map(doc => doc.data());
    console.log(vendorList,mobileNumber)
    if(!vendorList) return null;
    if(vendorList.findIndex(vendor => vendor.mobileNo === mobileNumber) > -1){
        return false
    } else {
        return true
    }
    // return cityList;
  }