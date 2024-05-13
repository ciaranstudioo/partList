import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";

export const authProvider = {
  isAuthenticated: false,
  user: null,
  async signout() {
    await signOut(auth)
      .then(() => {
        // Sign-out successful.
        authProvider.isAuthenticated = false;
        authProvider.email = "";
        authProvider.password = "";
        authProvider.user = null;
        redirect("/");
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  },
  async signin(email, password) {
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        this.user = userCredential.user;
        this.isAuthenticated = true;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        this.signout();
      });
  },
};
