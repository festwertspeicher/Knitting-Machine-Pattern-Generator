import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./app.jsx";
import DropShoulderCutAndSewSweater from "./pages/drop_shoulder_cut_and_sew_sweater";
import BoxySleevelessTop from "./pages/boxy_sleeveless_top";
import CyclingSweater from "./pages/cycling_sweater";
import DogSweater from "./pages/dog_sweater";
import DropShoulderSweater from "./pages/drop_shoulder_sweater";
import FittedSkirt from "./pages/fitted_skirt";
import FittedTop from "./pages/fitted_top";
import GoredSkirt from "./pages/gored_skirt";
import Mittens from "./pages/mittens";
import RaglanCrewPullover from "./pages/raglan_crew_pullover";
import SetInSleeveCrewPullover from "./pages/set_in_sleeve_crew_pullover";
import SleeveSweater from "./pages/sleeve_sweater";
import Swoncho from "./pages/swoncho";
import Sock from "./pages/sock";
import SingleBedSock from "./pages/single_bed_sock";
import SingleBedHexagon from "./pages/single_bed_hexagon";
import RoundYokeSweater from "./pages/round_yoke";


ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<App />}>
        <Route path="dog_sweater" element={<DogSweater />} />
        <Route path="sock" element={<Sock />} />
        <Route path="drop_shoulder_sweater" element={<DropShoulderSweater />} />
        <Route path="sleeve_sweater" element={<SleeveSweater />} />
        <Route path="boxy_sleeveless_top" element={<BoxySleevelessTop />} />
        <Route path="set_in_sleeve_crew_pullover" element={<SetInSleeveCrewPullover />} />
        <Route path="swoncho" element={<Swoncho />}/>
        <Route path="raglan_crew_pullover" element={<RaglanCrewPullover />} />
        <Route path="fitted_skirt" element={<FittedSkirt />} />
        <Route path="cycling_sweater" element={<CyclingSweater />} />
        <Route path="drop_shoulder_cut_and_sew_sweater" element={<DropShoulderCutAndSewSweater />} />
        <Route path="gored_skirt" element={<GoredSkirt />} />
        <Route path="fitted_top" element={<FittedTop />} />
        <Route path="mittens" element={<Mittens />} />
        <Route path="single_bed_sock" element={<SingleBedSock />} />
        <Route path="single_bed_hexagon" element={<SingleBedHexagon />} />
        <Route path="round_yoke" element={<RoundYokeSweater />} />
      </Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://vitejs.dev/guide/api-hmr.html
if (import.meta.hot) {
  import.meta.hot.accept();
}
