import api from "../service/instance";
import { notifyError } from "./notify";

export async function loadTimeZones(key) {
  try {
    if (sessionStorage.getItem("token")) {
      const { data } = await api.get("/timezone", {
        headers: {
          "X-RapidAPI-Key": key,
          "X-APISports-Key": key,
          "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
        },
      });
      return data;
    }
  } catch (error) {
    notifyError(error.response.data);
  }
}
export async function loadLeagues(key) {
  try {
    if (sessionStorage.getItem("token")) {
      const { data } = await api.get("/league", {
        headers: {
          "X-RapidAPI-Key": key,
          "X-APISports-Key": key,
          "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
        },
      });
      return data;
    }
  } catch (error) {
    notifyError(error.response.data);
  }
}

export async function loadTeamsStatistcs(key, leagueInput, seasonInput, teamInput) {
  try {
    if (sessionStorage.getItem("token")) {
      const { data } = await api.get("/teams/statistics", {
        params: {
          league:leagueInput ,
          season:seasonInput ,
          team: teamInput,
        },

        headers: {
          "X-RapidAPI-Key": key,
          "X-APISports-Key": key,
          "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
        },
      });
      return data
    }
  } catch (error) {
    notifyError(error.response.data);
  }
}
