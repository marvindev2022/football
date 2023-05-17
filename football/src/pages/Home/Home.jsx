import { useEffect, useState, } from "react";
import { loadLeagues, loadTimeZones } from "../../utils/requisitions";
function Home() {
  const [render, setRender] = useState(false);
  const [timeZones, setTimeZones] = useState("");
  const [leagues, SetLeagues] = useState([]);

  useEffect(() => {
    async function fecthData() {
      const timeZones = await loadTimeZones(key);
      setTimeZones(timeZones);

      const key = sessionStorage.getItem("key");
      const leagues = await loadLeagues(key);
      SetLeagues(leagues);
    }
    setRender(false)
    fecthData();
  }, [render]);
  console.log(timeZones);
  console.log(leagues);
  return (
    <main>
      <section className="section-timezone">
        <h1>Timezone</h1>
      </section>
      <section className="section-leagues">
        <h1>League</h1>
      </section>
    </main>
  );
}
export default Home;
