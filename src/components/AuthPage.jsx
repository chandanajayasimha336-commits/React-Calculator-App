// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const AuthPage = () => {
//   const navigate = useNavigate();
//   const [isLogin, setIsLogin] = useState(true);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!formData.email || !formData.password) return;

//     // ✅ MOCK AUTH SUCCESS
//      localStorage.setItem("isAuth", "true");

//     // 🔁 Redirect to Home
//     navigate("/");
//   };

//   return (
//     <div style={styles.container}>
//       <form onSubmit={handleSubmit} style={styles.form}>
//         <h2>{isLogin ? "Login" : "Sign Up"}</h2>

//         {!isLogin && (
//           <input
//             name="name"
//             placeholder="Name"
//             value={formData.name}
//             onChange={handleChange}
//             style={styles.input}
//           />
//         )}

//         <input
//           name="email"
//           placeholder="Email"
//           value={formData.email}
//           onChange={handleChange}
//           style={styles.input}
//         />

//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={formData.password}
//           onChange={handleChange}
//           style={styles.input}
//         />

//         <button style={styles.button}>
//           {isLogin ? "Login" : "Sign Up"}
//         </button>

//         <p onClick={() => setIsLogin(!isLogin)} style={styles.toggle}>
//           {isLogin ? "Create account" : "Already have an account?"}
//         </p>
//       </form>
//     </div>
//   );
// };

// const styles = {
//   container: { display: "flex", height: "100vh", justifyContent: "center", alignItems: "center" },
//   form: { width: "300px", padding: "30px", background: "#fff" },
//   input: { width: "100%", padding: "10px", marginBottom: "10px" },
//   button: { width: "100%", padding: "10px" },
//   toggle: { cursor: "pointer", color: "blue" },
// };

// export default AuthPage