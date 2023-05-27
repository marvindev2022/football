import api from "../service/instance";
import { notifyError } from "./notify";

async function loadTeamsCountries(key) {
  try {
    const { data } = await api.get("/countries", {
      headers: {
        "x-rapidapi-key": key,
        "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
      },
    });
    return data;
  } catch (error) {
    notifyError(error.response.data);
  }
}

async function loadLeagues(key, countryCode) {
  if (!key || !countryCode) return;

  try {
    const { data } = await api.get(`/leagues?code=${countryCode}`, {
      headers: {
        "x-rapidapi-key": key,
        "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
      },
    });
    return data;
  } catch (error) {
    notifyError(error.response.data);
  }
}

async function loadTeams(key, leagueId, season) {
  try {
    const { data } = await api.get(
      `/teams?league=${leagueId}&season=${season}`,
      {
        headers: {
          "x-rapidapi-key": key,
          "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
        },
      }
    );
    return data;
  } catch (error) {
    notifyError(error.response.data);
  }
}
async function loadTeamStatistics(key, leagueId, season, teamId) {
  if (!key || !season || !teamId || !leagueId) return;

  try {
    const { data } = await api.get(
      `/teams/statistics?league=${leagueId}&season=${season}&team=${teamId}`,
      {
        headers: {
          "x-rapidapi-key": key,
          "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
        },
      }
    );
    return data;
  } catch (error) {
    notifyError(error.response.data);
  }
}
async function loadPlayers(key, season, teamId) {
  if(!key|| !season|| !teamId) return
  try {
    const { data } = await api.get(`/players?team=${teamId}&season=${season}`, {
      headers: {
        "x-rapidapi-key": key,
        "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
      },
    });
    return data;
  } catch (error) {
    notifyError(error.response.data);
  }
}

export {
  loadTeamsCountries,
  loadLeagues,
  loadTeams,
  loadPlayers,
  loadTeamStatistics,
};
