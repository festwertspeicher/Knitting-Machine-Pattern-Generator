import React from "react";
import {Link, Outlet} from "react-router-dom";
import ReactGA from "react-ga";

ReactGA.initialize("G-Y036GH106E");

// Import and apply CSS stylesheet
import "./styles/styles.css";

export default function App() {
  return (
    <div>
      <h1>Abstract Knit Factory Factory</h1>
      <nav>
        <ul>
          <li><Link to="/dog_sweater">Dog sweater</Link></li>
          <li><Link to="/sock">Sock</Link></li>
          <li><Link to="/drop_shoulder_sweater">Drop shoulder sweater</Link></li>
          <li><Link to="/sleeve_sweater">Sleeve sweater</Link></li>
          <li><Link to="/boxy_sleeveless_top">Boxy sleeveless top</Link></li>
          <li><Link to="/set_in_sleeve_crew_pullover">Set in sleeve crew pullover</Link></li>
          <li><Link to="/swoncho">Swoncho</Link></li>
          <li><Link to="/raglan_crew_pullover">Raglan sleeve crew neck pullover (work in progress)</Link></li>
          <li><Link to="/fitted_skirt">Fitted skirt</Link></li>
          <li><Link to="/cycling_sweater">Cycling sweater</Link></li>
          <li><Link to="/drop_shoulder_cut_and_sew_sweater">Drop shoulder cut and sew neckline sweater</Link></li>
          <li><Link to="/gored_skirt">Gored skirt</Link></li>
          <li><Link to="/fitted_top">Fitted top</Link></li>
          <li><Link to="/mittens">Mittens</Link></li>
          <li><Link to="/single_bed_sock">Single bed sock</Link></li>
          <li><Link to="/single_bed_hexagon">Single bed hexagon</Link></li>
          <li><Link to="/round_yoke">Round yoke sweater</Link></li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}
