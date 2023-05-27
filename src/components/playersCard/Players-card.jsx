import PropTypes from "prop-types";
import "./pLayers-styles.css";
function PlayerCard({setSelectedPlayer, leagueId, player }) {
  const playerStatistcs = player?.statistics.find(
    (statistic) => statistic.league.id == leagueId
  );
  return (
    <div className="player-card ">
      <span className="container-close">
        <p onClick={()=>{setSelectedPlayer(false)}} className="close">X</p>
      </span>
      <img
        className="img-player metallic-effect"
        src={player?.player?.photo}
        alt={player?.player?.name}
      />
      <div>
        <h2>{player?.player?.name}</h2>
        <p>Age: {player?.player?.age}</p>
        <p>Position: {playerStatistcs?.games?.position ?? "Indisponivel!"}</p>
        <p>Nationality: {player?.player?.nationality}</p>
      </div>
    </div>
  );
}

PlayerCard.propTypes = {
  player: PropTypes.object.isRequired,
  leagueId: PropTypes.string.isRequired,
  setSelectedPlayer:PropTypes.any.isRequired
};

export default PlayerCard;
