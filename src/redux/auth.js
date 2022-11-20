import {createSlice} from "@reduxjs/toolkit";
        // initialState firstName lastName email password
// const [firstName, setFirstName] = useState("");
// const [lastName, setLastName] = useState("");
// const [email, setEmail] = useState("");
// const [password, setPassword] = useState("");
// const [currentUser, setcurrentUser] = useState(false);
// onChange={(e) => setLastName(e.target.value)}

const initialState={
    firstName:"",
    lastName:"",
    email:"",
    password:"",
    currentUser:false

}
console.log(initialState.currentUser)
const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        setFirstName :(state,{payload})=>{
            state.firstName = payload;
        },
        setLastName :(state,{payload})=>{
            state.lastName = payload;
        },
        setEmail :(state,{payload})=>{
            state.email = payload;
        },
        setPassword :(state,{payload})=>{
            state.password = payload;
        },
        setCurrentUser : (state,{payload})=>{
            state.currentUser =payload;
        }
    }
    
})

export const {setFirstName,setLastName,setEmail,setPassword,setCurrentUser} = authSlice.actions

export default authSlice.reducer