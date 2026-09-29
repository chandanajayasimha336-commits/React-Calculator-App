import { BrowserRouter, Routes, Route, } from "react-router-dom";
import HarrysHouse from "./webelongtogether/HarrysHouse";
import { Home } from "./webelongtogether/HarrysHouse";
import { HarryStyles } from "./webelongtogether/HarrysHouse";
import { FineLine } from "./webelongtogether/HarrysHouse";
import { Harryshouse } from "./webelongtogether/HarrysHouse";
import { DiscoTime } from "./webelongtogether/HarrysHouse";
import { Favorites } from "./webelongtogether/HarrysHouse";
import { Song } from "./webelongtogether/HarrysHouse"; 


 const App = () => {
  return(
    <BrowserRouter>
     <Routes>
          <Route path="/" element={<HarrysHouse />} />
           <Route path="/home" element={<Home />} />
           <Route path="/harrystyles" element={<HarryStyles />} />  
           <Route path="/fineline" element={<FineLine />} /> 
           <Route path="/harryshouse" element={<Harryshouse />} /> 
           <Route path="/disco" element={<DiscoTime />} /> 
           <Route path="/favorites" element={<Favorites />} />

            </Routes>
    </BrowserRouter>
  );
};


export default App;