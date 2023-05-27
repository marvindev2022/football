import { useEffect, useState } from "react";
import Table from "../../components/Table/Table";
import {
  loadLeagues,
  loadTeams,
  loadTeamsCountries,
} from "../../utils/requisitions";
import "./home-styles.css";
const Home = () => {
  const key = sessionStorage.getItem("key");
  const [countryCode, setCountryCode] = useState("");
  const [teamsCountries, setTeamsCountries] = useState([]);
  const [season, setSeason] = useState("");
  const [leagues, setLeagues] = useState([]);
  const [leagueId, setLeagueId] = useState("");
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const teamsCountriesData = await loadTeamsCountries(key);
      setTeamsCountries(teamsCountriesData?.response);
      if (countryCode) {
        const leaguesData = await loadLeagues(key, countryCode);
        setLeagues(leaguesData?.response);
      }

      if (leagueId && season) {
        const teamsData = await loadTeams(key, leagueId, season);
        setTeams(teamsData?.response);
      }
    };
    fetchData();
  }, [key, countryCode, leagueId, season]);

  return (
    <>
      <main className="home">
        <section className="section-teams Countries">
          <h1 className="metallic-effect">
            {!countryCode
                ? "Leagues and Season"
                : "league"
              }
          </h1>
          <select onChange={(event) => setCountryCode(event.target.value)}>
            <option>Select Country</option>
            {teamsCountries?.map((teamCountry, index) => (
              <option
                onSelect={() => setCountryCode(teamCountry.code)}
                key={index + 1}
                value={teamCountry.code}
              >
                {teamCountry.name}
              </option>
            ))}
          </select>
          {countryCode && (
            <>
              <select onChange={(event) => setLeagueId(event.target.value)}>
                <option>Select League</option>
                {leagues?.map((league, index) => (
                  <option
                    onSelect={() => {
                      setLeagueId(league.league.id);
                    }}
                    key={index + 1}
                    value={league.league.id}
                  >
                    {league.league.name}
                  </option>
                ))}
              </select>
              {leagueId && (
                <select onChange={(event) => setSeason(event.target.value)}>
                  <option>Select Season</option>
                  {leagues?.map((data) =>
                    data.league.id == leagueId
                      ? data.seasons.map((season, index) => (
                          <option
                            key={index + 1}
                            value={season.year}
                          >
                            {season.year}
                          </option>
                        ))
                      : null
                  )}
                </select>
              )}
            </>
          )}
          {teams.length > 0 && (
            <Table leagueId={leagueId} teams={teams} season={season} />
            )}
            </section>
      </main>
    </>
  );
};

export default Home;
