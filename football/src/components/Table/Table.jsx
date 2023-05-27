import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import DialogTeam from "../DialogTeam/DialogTeam";
import "./table-styles.css";

function Table({ leagueId, teams, season }) {
  const [teamId, setTeamId] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const [bodySize, setBodySize] = useState(document.body.clientWidth);

  useEffect(() => {
    const handleResize = () => {
      setBodySize(document.body.clientWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {isOpen && (
        <DialogTeam
          setIsOpen={setIsOpen}
          leagueId={leagueId}
          season={season}
          teamId={teamId}
        />
      )}
      {!isOpen && (
        <>
          {bodySize <= 768 ? (
            <table className="table-home">
              <tbody className="tbody">
                {teams?.map((team) => (
                  <tr
                    key={Math.random()}
                    onClick={() => {
                      setTeamId(team.team.id);
                      setIsOpen(!isOpen);
                    }}
                    className="tr"
                  >
                    <td className="tbody-td logo">
                      <img
                        className="team-logo"
                        src={team?.team?.logo}
                        alt={team?.team?.name}
                      />
                    </td>
                    <td className="tbody-td team-id">
                      <span className="th-label">TimeID:</span> {team?.team?.id}
                    </td>
                    <td className="tbody-td">
                      <span className="th-label">Nome:</span> {team?.team?.name}
                    </td>
                    <td className="tbody-td">
                      <span className="th-label">Code:</span> {team?.team?.code}
                    </td>
                    <td className="tbody-td">
                      <span className="th-label">Founded:</span>{" "}
                      {team?.team?.founded}
                    </td>
                    <td className="tbody-td venue">
                      <span className="th-label">Venue Address:</span>{" "}
                      {team?.venue?.address}
                    </td>
                    <td className="tbody-td surface">
                      <span className="th-label">Venue Surface:</span>{" "}
                      {team?.venue?.city}
                    </td>
                    <td className="tbody-td">
                      <span className="th-label">Venue Capacity:</span>{" "}
                      {team?.venue?.capacity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table className="table-home">
                <thead>
                  <tr>
                    <th className="theader-th logo">Logo</th>
                    <th className="theader-th team-id">TimeID</th>
                    <th className="theader-th">Nome</th>
                    <th className="theader-th">Code</th>
                    <th className="theader-th">Founded</th>
                    <th className="theader-th venue">Venue Address</th>
                    <th className="theader-th surface">Venue Surface</th>
                    <th className="theader-th">Venue Capacity</th>
                  </tr>
                </thead>

                <div className="tbody">
                <tbody className="tbody">
                  {teams?.map((team) => (
                    <tr
                      key={Math.random()}
                      onClick={() => {
                        setTeamId(team.team.id);
                        setIsOpen(!isOpen);
                      }}
                      className="tr"
                    >
                      <td className="tbody-td logo">
                        <img
                          className="team-logo"
                          src={team?.team?.logo}
                          alt={team?.team?.name}
                        />
                      </td>
                      <td className="tbody-td team-id">{team?.team?.id}</td>
                      <td className="tbody-td">{team?.team?.name}</td>
                      <td className="tbody-td">{team?.team?.code}</td>
                      <td className="tbody-td">{team?.team?.founded}</td>
                      <td className="tbody-td venue">{team?.venue?.address}</td>
                      <td className="tbody-td surface">{team?.venue?.city}</td>
                      <td className="tbody-td">{team?.venue?.capacity}</td>
                    </tr>
                  ))}
                </tbody>
            </div>
              </table>
          )}
        </>
      )}
    </>
  );
}

Table.propTypes = {
  season: PropTypes.string.isRequired,
  leagueId: PropTypes.string.isRequired,
  teams: PropTypes.arrayOf(
    PropTypes.shape({
      team: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        code: PropTypes.string.isRequired,
        logo: PropTypes.string.isRequired,
        founded: PropTypes.number.isRequired,
      }).isRequired,
      venue: PropTypes.shape({
        address: PropTypes.string.isRequired,
        city: PropTypes.string.isRequired,
        capacity: PropTypes.number.isRequired,
      }).isRequired,
    })
  ).isRequired,
};

export default Table;
