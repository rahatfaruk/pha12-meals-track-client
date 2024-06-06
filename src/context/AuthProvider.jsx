import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, updateProfile, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from "../../firebaseConfig";
import Loading from "../comps/Loading";


export const AuthContext = createContext()

function AuthProvider({children}) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const createUserWithEP = async (email, password, name, photoURL) => {
    const credential = await createUserWithEmailAndPassword(auth, email, password)
    await updateProfile(credential.user, {displayName:name, photoURL})
    return credential
  }

  const signInWithEP = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  }
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider()
    return signInWithPopup(auth, provider)
  }

  const logout = async () => {
    return signOut(auth)
  }

  // onload page, check for user
  useEffect(() => {
    const fakeUser = 1 ? {displayName: 'ali', email: 'ali@mail.com', photoURL: 'https://dummyimage.com/100/000/fff&text=a'} : null
    setTimeout(() => {
      setUser(fakeUser)
      setIsLoading(false)
    }, 750)
    return

    const unsub = onAuthStateChanged(auth, currUser => {
      setUser(currUser)
      setIsLoading(false)
    })

    // cleanup func
    return unsub
  }, [])

  if (isLoading) {
    return <Loading />
  }
  return (  
    <AuthContext.Provider value={{isLoading, setIsLoading, user, setUser, createUserWithEP, signInWithEP, logout, signInWithGoogle}}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;