// import { initializeApp } from "firebase/app";
// import { getDatabase, push, ref, set } from "firebase/database";

// const firebaseConfig2 = {
//     apiKey: "AIzaSyDEyC0LKdmtQQE5lnlJSBGJum0akdNob2A",
//     authDomain: "blogg-contact-app.firebaseapp.com",
//     databaseURL: "https://blogg-contact-app-default-rtdb.firebaseio.com",
//     projectId: "blogg-contact-app",
//     storageBucket: "blogg-contact-app.appspot.com",
//     messagingSenderId: "861573295251",
//     appId: "1:861573295251:web:990f86faf35039c1d6f166"
//   };          
//   // Initialize Firebase
//   const app = initializeApp(firebaseConfig2);

//   export const AddUser = (form)=>{
//     const db = getDatabase(app);
//     //blog sen databese ne oluşturduysan o linkin sonunda ne isim verdiysen o ismi vermelisin
//     const userRef = ref(db,"kisiler");
//     const newBlogRef = push(userRef)
  
//     set(newBlogRef,{
//       title:form.title,
//       imgUrl:form.imgUrl,
//       explanation:form.explanation
      
//     })
//     console.log("bilgi yazdırıldı")
  
//   }