import supabase from "../config/supabaseConfig";
import SmoothieCard from "../components/SmoothieCard";
import { useEffect, useState } from "react";

const Home = () => {
  const [fetchError, setFetchError] = useState(null);
  const [smoothies, setSmoothies] = useState(null);

  useEffect(() => {
    const fetchSmoothies = async () => {
      const { data, error } = await supabase.from("smoothies").select();

      if (error) {
        setFetchError("could not fetch the smoothies");
        setSmoothies(null);
        console.log("error", error);
      }
      if (data) {
        setSmoothies(data);
        setFetchError(null);
      }
    };
    fetchSmoothies();
  }, []);
  return (
    <div className="page home">
      {fetchError && <p>{fetchError}</p>}
      {smoothies && (
        <div className="smoothies">
          {/* order-by buttons */}
          <div className="smoothie-grid">
            {smoothies.map((smoothie) => {
              return <SmoothieCard smoothie={smoothie} />;
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
