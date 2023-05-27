import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { loadPlayers, loadTeamStatistics } from "../../utils/requisitions";
import PlayerCard from "../playersCard/Players-card";
import Goals from "../GoalsChart/Goals";
import "./dialog-styles.css";

function DialogTeam({ leagueId, season, teamId, setIsOpen }) {
  const [team, setTeam] = useState("");
  const [players, setPlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState("");
  const key = sessionStorage.getItem("key");

  useEffect(() => {
    const fetchData = async () => {
      const teamStatistic = await loadTeamStatistics(
        key,
        leagueId,
        season,
        teamId
      );
      setTeam(teamStatistic.response);

      const playersResponse = await loadPlayers(key, season, teamId);
      setPlayers(playersResponse.response);
    };

    fetchData();
  }, [key, leagueId, season, teamId]);

  const handleSelectPlayer = (playerId) => {
    const selectedPlayer = players.find(
      (player) => player?.player?.id === playerId
    );
    setSelectedPlayer(selectedPlayer);
  };

  return (
    <div className="dialog">
      <div className="container-dialog">
        <span
          onClick={() => {
            setIsOpen(false);
          }}
        >
          {"< Go back"}
        </span>
        <div className="container-statistics"></div>
        {!selectedPlayer && (
          <>
            {" "}
            <section className="statistics-card">
              <div>
                {team?.lineups?.length > 0 ? (
                  <div className="formations">
                    <h3>Most Used Formation:</h3>
                    {(() => {
                      const formationsCount = {};
                      team.lineups.forEach((lineup) => {
                        const formation = lineup?.formation;
                        if (formation) {
                          if (formationsCount[formation]) {
                            formationsCount[formation] += 1;
                          } else {
                            formationsCount[formation] = 1;
                          }
                        }
                      });

                      let mostUsedFormation = "";
                      let maxCount = 0;
                      for (const formation in formationsCount) {
                        if (formationsCount[formation] > maxCount) {
                          mostUsedFormation = formation;
                          maxCount = formationsCount[formation];
                        }
                      }

                      return mostUsedFormation ? (
                        <p>{mostUsedFormation}</p>
                      ) : (
                        <p>No formations available.</p>
                      );
                    })()}
                  </div>
                ) : (
                  <p>No lineups available.</p>
                )}
              </div>
            </section>
            <section className="statistics-card">
              <div className="results">
                <h3>Results</h3>
                <table>
                  <tbody>
                    <tr>
                      <td>Total</td>
                      <td>{team?.fixtures?.played.total}</td>
                    </tr>
                    <tr>
                      <td>Wins</td>
                      <td>{team?.fixtures?.wins.total}</td>
                    </tr>
                    <tr>
                      <td>Losses</td>
                      <td>{team?.fixtures?.loses.total}</td>
                    </tr>
                    <tr>
                      <td>Draws</td>
                      <td>{team?.fixtures?.draws.total}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          </>
        )}
        {selectedPlayer && (
          <PlayerCard
            setSelectedPlayer={setSelectedPlayer}
            leagueId={leagueId}
            player={selectedPlayer}
          />
        )}
        {!selectedPlayer && (
          <select
            onChange={(e) => handleSelectPlayer(parseInt(e.target.value))}
          >
            <option value="">Select a player</option>
            {players?.map((player) => (
              <option key={player?.player?.id} value={player?.player?.id}>
                {player?.player?.name}
              </option>
            ))}
          </select>
        )}
        {team && (
          <Goals
            key={Math.random()}
            data={Object.entries(team?.goals["for"].minute).filter(
              ([minute, data]) => !(!data.total || !minute)
            )}
          />
        )}
      </div>
    </div>
  );
}

DialogTeam.propTypes = {
  leagueId: PropTypes.string.isRequired,
  season: PropTypes.string.isRequired,
  teamId: PropTypes.number.isRequired,
  setIsOpen: PropTypes.any.isRequired,
};

export default DialogTeam;
