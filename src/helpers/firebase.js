import { initializeApp } from "firebase/app";
import { getAuth,createUserWithEmailAndPassword,
    signInWithEmailAndPassword,onAuthStateChanged,signOut,
     updateProfile,GoogleAuthProvider, signInWithPopup  } from "firebase/auth";
// import {setContactList, setİsLoading} from "../redux/blog"
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../redux/auth";
import { toastLoggedOut, toastLogin, toastSigIn, toastThereIsUser } from "./toastNotify";
const useFirebase = () => {
        //! LOGİN AYARLARI
        const dispatch = useDispatch()
        const firebaseConfig = {
            apiKey: process.env.REACT_APP_apiKey,
            authDomain: process.env.REACT_APP_authDomain,
            projectId: process.env.REACT_APP_projectId,
            databaseURL: "https://blog-app-contact-default-rtdb.firebaseio.com",
            storageBucket: process.env.REACT_APP_storageBucket,
            messagingSenderId: process.env.REACT_APP_messagingSenderId,
            appId: process.env.REACT_APP_appId
          };    
          // Initialize Firebase
          const app = initializeApp(firebaseConfig);
          // Initialize Firebase Authentication and get a reference to the service
          const auth = getAuth(app);
          
          
          //! SİGN UP
           const createUser = async (email,password,navigate,displayName)=>{
              //?yeni bir kullanıcı oluştururken kullanılan firebase metodu
              //firebase sadece email ve password lazın olduğu için burdan gönderdik
          try {
             let userCredential = await createUserWithEmailAndPassword(auth, email, password)
             //Kullanıcı profilini güncellemek için kullandık
             await updateProfile(auth.currentUser, {
                 displayName: displayName,
                });
                console.log(userCredential)
                toastSigIn("Registration Successful")
              navigate("/login")
          } catch (error) {
              console.log(error.message)
              toastThereIsUser("THERE İS A USER")
          }
          }
          
          //! SİGN İN
          
           const signIn = async (email, password,navigate) => {
              try {
                  await signInWithEmailAndPassword(auth, email, password)
                  //? kullanıcı profilini güncellemek için kullanılan firebase metodu
                  navigate("/")
                  toastLogin("Logged in")
                } 
              
              catch (error) {
                  console.log(error.message)
                  alert(error.message)
              }
          }
           const observerUser = () =>{
              //kullanıcı signin olup olmadığı takip eden ve kullanıcının değiştinde kulklanıcıya
              //response olarak dönen firebase metodu bu otomatik yapıyor
              onAuthStateChanged(auth, (user) => {
                  if (user) {
                    const {email,displayName,photoURL} = user
                    dispatch(setCurrentUser({email,displayName,photoURL}))
                //   console.log(user);
                  } else {
                    dispatch(setCurrentUser(false))
                   console.log("user sign out")
                  }
                });
          
          }
          
          //! SİGN OUT
          
           const logout = () => {
              signOut(auth)
              toastLoggedOut("Logout")
          }

          //! GOOGLE
          //* => Authentication => settings => Authorized domains => add domain
          // Projeyi deploy ettikten sonra google sign-in çalışması için domain listesine deploy linkini ekle
          const signUpWithGoogle = (navigate)=>{
            const provider = new GoogleAuthProvider();

            //? açılır pencerede kullanılan google firebase methodu
            signInWithPopup(auth, provider)
                .then((result) => {
                    navigate("/")
                    console.log(result);
                    toastLogin("Google with is login done")
                }).catch((error) => {
                        console.log(error)
                });

          }

          // ---------------------------------------------
          
          const AddUser = (form)=>{
            const db = getDatabase();
            //blog sen databese ne oluşturduysan o linkin sonunda ne isim verdiysen o ismi vermelisin
            const userRef = ref(db,"blog/");
            const newBlogRef = push(userRef)
          try {
            set(newBlogRef,{
              title:form.title,
              imgUrl:form.imgUrl,
              explanation:form.explanation,
              email:form.email,
              displayName:form.displayName
            })
            console.log("bilgi yazdırıldı")
            
          } catch (error) {
            console.log(error.message)
          }
          
          }

          const useRead = () =>{
            const [contactList,setContactList] = useState();
            useEffect(() => {
              try {
              const db = getDatabase();
              const userRef = ref(db,"blog/");
              console.log("db",db)
              console.log("çalıştı")
             return onValue(userRef,(snapshot)=>{
                console.log("çalışmadı");
                const data = snapshot.val();
                const blogArray = [];
                for(let id in data){
                  blogArray.push({id,...data[id]})
              } 
                setContactList(blogArray)
              })
              } catch (error) {
                alert(error)
                console.log(error);
              }
              
            }, [])
            return{contactList}
          }

          
      return {createUser,useRead,AddUser,logout,observerUser,signIn,signUpWithGoogle}
    }
    
    export default useFirebase


    // TODO: Replace the following with your app's Firebase project configuration
    // See: https://firebase.google.com/docs/web/learn-more#config-object

    // const db = getDatabase(app);
    // const userRef = ref(db,"blog/");
    // onValue(userRef,(snapshot)=>{
    //   const data = snapshot.val();
    //   const userArray =[]
    //   for(let id in data){
    //     userArray.push({id,...data[id]})
    //   }
    //   setContactList(userArray)
    // })


