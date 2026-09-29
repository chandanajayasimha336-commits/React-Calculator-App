// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// function ProductDetails() {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);

//   useEffect(() => {
//     fetch(`https://dummyjson.com/products/${id}`)
//       .then(res => res.json())
//       .then(data => setProduct(data))
//       .catch(err => console.log(err));
//   }, [id]);

//   if (!product) return <h2>Loading...</h2>;

//   return (
//     <div>
//       <img src={product.thumbnail} alt={product.title} width="300" />
//       <h2>{product.title}</h2>
//       <p>{product.description}</p>
//       <h3>Price: ₹ {product.price}</h3>
//     </div>
//   );
// }

// export default ProductDetails;