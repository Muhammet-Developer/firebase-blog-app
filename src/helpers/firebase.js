import { initializeApp } from "firebase/app";
import { getAuth,createUserWithEmailAndPassword,
    signInWithEmailAndPassword,onAuthStateChanged,signOut,
     updateProfile,GoogleAuthProvider, signInWithPopup  } from "firebase/auth";
// import {setContactList, setİsLoading} from "../redux/blog"
import { getDatabase,  onValue,  push, ref, remove, set, update } from "firebase/database";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../features/auth";
import { toastDeleteComment, toastDeleted, toastLoggedOut, toastLogin, toastNewBlog, toastSigIn, toastSignControl, toastThereIsUser, toastUpdate, toastUpdateComment } from "./toastNotify";
const useFirebase = () => {
        //! LOGİN AYARLARI
        const dispatch = useDispatch()
        const firebaseConfig = {
            apiKey: process.env.REACT_APP_apiKey,
            authDomain: process.env.REACT_APP_authDomain,
            projectId: process.env.REACT_APP_projectId,
           databaseURL: process.env.REACT_APP_databaseURL,    
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
                  toastSignControl("Your password or e-mail address is incorrect!")
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
                  //  console.log("user sign out")
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
          //! AddBlog
          const AddUser = (form,navigate)=>{
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
              displayName:form.displayName,
              calendar:form.calendar
            })
            navigate("/")
            toastNewBlog("New Blog Successfully Added")
            
          } catch (error) {
            console.log(error.message)
          }
          }
          const useRead = () =>{
            const [contactList,setContactList] = useState();
            const [isLoading,setIsLoading] = useState(true);
            useEffect(() => {
              try {
              const db = getDatabase(app);
              const userRef = ref(db,"blog/");
              onValue(userRef,(snapshot)=>{
                const data = snapshot.val();
                const blogArray = [];
                for(let id in data){
                  blogArray.push({id,...data[id]})
               } 
               setContactList(blogArray)
               setIsLoading(false)
              })
            } catch (error) {
                console.log(error);
              }
              
            }, [])
            return{contactList,isLoading,setContactList}
          }
          //! DELETE
          const deleteUser = (id,navigate) => {
            const db = getDatabase(app);
            const userRef = ref(db,"blog/");
            if(window.confirm("Will Be Deleted!")=== true){
              remove(ref(db,"blog/"+id))
              toastDeleted("Blog successfully deleted")
              navigate("/")
            }
          }
          
          //! UPDATE
          const updateUser = (card2,navigate) =>{
            const db = getDatabase(app);
            const userRef = ref(db,"blog/");
            const updates = {};
            updates["blog/"+card2.id]=card2;
            toastUpdate("Blog updated")
            navigate(-1)
            return update(ref(db), updates);
          }
          //?-------------------------------------------
          //-------------------------------------------
          //! ADD COMMENT USER
          const addUserComment = (comment,id)=>{
            const db = getDatabase();
            //blog sen databese ne oluşturduysan o linkin sonunda ne isim verdiysen o ismi vermelisin
            const userRef = ref(db,`blog/${id}/comment/`);
            const newBlogRef = push(userRef)
          try {
            set(newBlogRef,{
              text:comment.text,
              calendar:comment.calendar,
              displayName:comment.displayName,
              time:comment.time,
              email:comment.email,
              // id:comment.id
            })       
            toastNewBlog("yorum eklendi")
          } catch (error) {
            console.log(error.message)
          }
          }
      //! ADD COMMENT USER READ
      const useCommentRead = (id) =>{
        const [commentList,setCommentList] = useState();
        const [isLoading,setIsLoading] = useState(true);
        useEffect(() => {
          try {
          const db = getDatabase(app);
          const userRef = ref(db,`blog/${id}/comment/`);
          onValue(userRef,(snapshot)=>{
            const data = snapshot.val();
            const commentArray = [];
            for(let id in data){
              commentArray.push({id,...data[id]})
           } 
           setCommentList(commentArray)
           setIsLoading(false)
          })
        } catch (error) {
            console.log(error);
          }
          
        }, [])
        
        return{commentList,isLoading,setCommentList}
      }
      //! Delete Comment
      const commentDeleteUser = (idTypes,id) => {
        const db = getDatabase(app);
        const userRef = ref(db,`blog/${idTypes}/comment/${id}`);
        if(window.confirm("Will Be Deleted!")=== true){
          remove(ref(db,`blog/${idTypes}/comment/`+id))
          toastDeleteComment("Comment delete")
        }
      }
      
      //! UPDATE Comment
      const commentUpdateUser = (card2,navigate) =>{
        const db = getDatabase(app);
        const userRef = ref(db,"comment/");
        const updates = {};
        updates["comment/"+card2.id]=card2;
        toastUpdateComment("VERİN GÜNCELLENDİ")
        navigate(-1)
        return update(ref(db), updates);
      }

      return {createUser,useRead,AddUser,logout,observerUser,signIn,signUpWithGoogle,deleteUser,updateUser,addUserComment,useCommentRead,commentDeleteUser}
    }
    
    export default useFirebase

    
    