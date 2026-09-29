import { useState, useEffect} from "react";
import { useNavigate, useLocation } from "react-router-dom";

const getFavorites = () =>
  JSON.parse(localStorage.getItem("favorites")) || [];

const saveFavorites = (favorites) =>
  localStorage.setItem("favorites", JSON.stringify(favorites));


const HarrysHouse = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault(); 
    localStorage.setItem("username", name);
    navigate ("/home");
  };
   return(
     <div style={{ color: 'White', fontFamily: 'Papyrus, fantasy', fontSize: '40px', backgroundColor: 'Black', height: "100vh", display: "flex", justifyContent: "center", alignItems: "center",  }}>
       <form onSubmit={handleSubmit}>
          <div style={{display:"flex", flexDirection: "column", alignItems: "center", gap:"40px" }}>
        Drop your name
           <input
             type="text" style={{fontFamily: "Papyrus, fantasy", fontSize: "15px"}} 
             value={name}
             onChange={(e) => setName(e.target.value)}
             placeholder="Enter your name"
           />

      <button style={{padding: "8px 20px", fontFamily:"Papyrus, fantasy", fontSize:"16px"}} type="submit">Submit</button>
     
     </div>
     </form>
    </div>
    );

}

export const Home  = () => {
  const navigate = useNavigate();
  const name = localStorage.getItem("username");

  
  return(
    <div style={{color: "White", fontFamily: "Papyrus, fantasy", fontSize: "40px", backgroundColor: "Black"}}>
     <h1 style={{fontSize: "30px"}}>Welcome {name}</h1>
     <h2 style={{fontSize: "20px", gap: "10px"}}>The Artist</h2>
     <h3>HARRY STYLES</h3>
     <h4 style={{fontSize: "20px"}}>Albums</h4>
      <div style={{ border: "2px solid white", display: "grid", minHeight: "300px", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px"}}>
         <div style={{ border: "1px solid white", padding: "20px", backgroundColor: "Thistle"}} >
          HARRY STYLES
          <h1 style={{fontSize: "20px"}}>Album |12 May 2017|</h1>
          <button style={{fontFamily: "Papyrus, fantasy"}} onClick={() => navigate("/harrystyles")} styles={{fontFamily: "Papyrus, fantasy"}}>View Album</button>
         </div>
         <div style={{ border: "1px solid white", padding: "20px", backgroundColor: "Pink"}} >
          FINE LINE
          <h1 style={{fontSize: "20px"}}>Album |13 Dec 2019|</h1>
          <button style={{fontFamily: "Papyrus, fantasy"}} onClick={() => navigate("/fineline")} styles={{fontFamily: "Papyrus, fantasy"}}>View Album</button>
         </div>
         <div style={{ border: "1px solid white", padding: "20px", backgroundColor: "Yellow"}} >
          HARRY'S HOUSE
          <h1 style={{fontSize: "20px"}}>Album |20 May 2022|</h1>
          <button style={{fontFamily: "Papyrus, fantasy"}} onClick={() => navigate("/harryshouse")} styles={{fontFamily: "Papyrus, fantasy"}}>View Album</button>
         </div>
         <div style={{ border: "1px solid white", padding: "20px", backgroundColor: "Olive"}} >
          KISS ALL THE TIME. DISCO, OCCASIONALLY
          (NEW) 
          <h1 style={{fontSize: "20px"}}>Album |06 Mar 2026|</h1>
          <button style={{fontFamily: "Papyrus, fantasy"}} onClick={() => navigate("/disco")} styles={{fontFamily: "Papyrus, fantasy"}}>View Album</button>
         </div>
      </div>
      <button
  onClick={() => navigate("/favorites")}
  style={{ fontFamily: "Papyrus, fantasy", marginBottom: "20px" }}
>
  ⭐ View Favorites
</button>

   </div>
  );
}

const Song = ({ title }) => {
  const [favorites, setFavorites] = useState(getFavorites());

  const isFavorite = favorites.includes(title);

  const toggleFavorite = () => {
    let updated;
    if (isFavorite) {
      updated = favorites.filter(song => song !== title);
    } else {
      updated = [...favorites, title];
    }
    setFavorites(updated);
    saveFavorites(updated);
  };

  return (
    <div style={{ border: "1px solid white", padding: "20px", display: "flex", justifyContent: "space-between" }}>
      <span>{title}</span>
      <button onClick={toggleFavorite} style={{ fontFamily: "Papyrus, fantasy" }}>
        {isFavorite ? "Remove ⭐" : "Add ⭐"}
      </button>
    </div>
  );
};

export const Favorites = () => {
  const favorites = getFavorites();

  return (
    <div style={{ color: "White", backgroundColor: "Black", fontFamily: "Papyrus, fantasy", minHeight: "100vh" }}>
      <h2>Your Favorite Songs ⭐</h2>

      {favorites.length === 0 ? (
        <p>No favorites yet</p>
      ) : (
        favorites.map(song => (
          <div key={song} style={{ border: "1px solid white", padding: "15px" }}>
            {song}
          </div>
        ))
      )}
    </div>
  );
};

export const HarryStyles = () => {
  return(
    <div style={{ fontSize: "30px", color: "White", fontFamily: "Papyrus, fantasy", backgroundColor: "Black", border: "2px solid white", display: "grid", gridTemplateColumns: "repeat(1, 1fr)", gap: "10px"}}>
      
        <Song title="Meet Me in the Hallway" />
      
       <Song title="Sign of the Times" />
      
        <Song title="Carolina" />

     
        <Song title="Two Ghosts" />

      
        <Song title="Sweet Creature" />

      
        <Song title="Only Angel" />

     
        <Song title="Kiwi" />

      
      <Song title="Ever Since New York" />

      
        <Song title="Woman" />

      
        <Song title="From the Dining Table" />
      
      </div>
  )
}

export const FineLine = () => {
  return(
    <div style={{ fontSize: "30px", color: "White", fontFamily: "Papyrus, fantasy", backgroundColor: "Black", border: "2px solid white", display: "grid", gridTemplateColumns: "repeat(1, 1fr)", gap: "10px"}}>
      
        <Song title="Golden" />
      
        <Song title="Watermelon Sugar" />
      
        <Song title="Adore You" />

        <Song title="Lights Up" />

     
        <Song title="Cherry" />

      
        <Song title="Falling" />

     
        <Song title="To Be So Lonely" />

      
      <Song title="She" />

      
        <Song title="Sunflower, Vol.6" />

      
        <Song title="Canyon Moon" />
     
        <Song title="Treat People With Kindness" />
     
      
        <Song title="Fine Line" />
      

      </div>
  )
}

export const Harryshouse = () => {
  return(
    <div style={{ fontSize: "30px", color: "White", fontFamily: "Papyrus, fantasy", backgroundColor: "Black", border: "2px solid white", display: "grid", gridTemplateColumns: "repeat(1, 1fr)", gap: "10px"}}>
      
        <Song title="Music For a Sushi Restaurant" />
      
      
        <Song title="Late Night Talking" />
      
        <Song title="Grapejuice" />

      
        <Song title="As it Was" />

      
        <Song title="Daylight" />
      
        <Song title="Little Freak" />

      
        <Song title="Matilda" />

      
        <Song title="Cinema" />

      
        <Song title="Daydreaming" />

      
        <Song title="Keep Driving" />
      
        <Song title="Satellite" />
      
        <Song title="Boyfriends" />
     
        <Song title="Love Of My Life" />
      

      </div>
  )
}

export const DiscoTime = () => {
  return(
    <div style={{ fontSize: "30px", color: "White", fontFamily: "Papyrus, fantasy", backgroundColor: "Black", border: "2px solid white", display: "grid", gridTemplateColumns: "repeat(1, 1fr)", gap: "10px"}}>
      
        <Song title="Aperture" />
      
      
        <Song title="American Girls" />
      
        <Song title="Ready,Steady,Go" />

      
        <Song title="Are You Listening Yet" />

      
        <Song title="Taste Back" />
      
        <Song title="The Waiting Game" />

      
        <Song title="Season2 Weight Loss" />

      
        <Song title="Coming Up Roses" />

      
        <Song title="Pop" />

      
        <Song title="Dance No More" />
      
        <Song title="Paint By Numbers" />
      
        <Song title="Carla's Song" />
     

    </div>
  )

}

   
   

export default HarrysHouse;


