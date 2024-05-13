import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardHomePage from "./dashboard";
import ListTeams from "./teams/teams";
import CreateTeam from "./teams/createTeam";
import { ProtectedRoute } from "../../hoc";
import UpdateTeam from "./teams/updateTeam";
import ListPlayers from "./players/players";
import CreatePlayer from "./players/createPlayer";
import UpdatePlayer from "./players/updatePlayer";
import ListFixtures from "./fixtures/fixtures";
import CreateFixture from "./fixtures/createFixture";
import UpdateFixture from "./fixtures/updateFixture";
import ListStandings from "./standings/standings";
import CreateStanding from "./standings/createStanding";
import UpdateStanding from "./standings/updateStanding";
import ListResults from "./results/results";
import CreateResult from "./results/createResult";
import UpdateResult from "./results/updateResult";

function Dashboard() {
  return (
    <Routes>
      <Route exact element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardHomePage />} />
        <Route path="/dashboard/teams" element={<ListTeams />} />
        <Route path="/dashboard/teams/create" element={<CreateTeam />} />
        <Route path="/dashboard/teams/update/:id" element={<UpdateTeam />} />

        <Route path="/dashboard/players" element={<ListPlayers />} />
        <Route path="/dashboard/players/create" element={<CreatePlayer />} />
        <Route
          path="/dashboard/players/update/:id"
          element={<UpdatePlayer />}
        />

        <Route path="/dashboard/fixtures" element={<ListFixtures />} />
        <Route path="/dashboard/fixtures/create" element={<CreateFixture />} />
        <Route
          path="/dashboard/fixtures/update/:id"
          element={<UpdateFixture />}
        />

        <Route path="/dashboard/standings" element={<ListStandings />} />
        <Route
          path="/dashboard/standings/create"
          element={<CreateStanding />}
        />
        <Route
          path="/dashboard/standings/update/:id"
          element={<UpdateStanding />}
        />

        <Route path="/dashboard/results" element={<ListResults />} />
        <Route path="/dashboard/results/create" element={<CreateResult />} />
        <Route
          path="/dashboard/results/update/:id"
          element={<UpdateResult />}
        />
      </Route>
    </Routes>
  );
}

export default Dashboard;
