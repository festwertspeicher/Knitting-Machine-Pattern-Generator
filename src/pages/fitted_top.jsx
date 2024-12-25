import * as React from "react";
import { useState } from "react";
import { Measurements, Measurement } from "../lib/input";
import KnitBlock, { Trapezoid, MinHeightTrapezoid, HalfTrapezoid } from "../lib/basic_blocks";
import {SetInSleeveCrewBodyPanel} from "../lib/set_in_sleeve";

export function FittedTopBodyPanel({
  chestCircumference,
  shoulderWidth,
  hemCircumference,
  hemRibbingLength,
  armholeDepth,
  necklineFrontDepth,
  necklineWidth,
  inchesOfEase,
  length,
  gaugeSt,
  gaugeRows,
}) {
  function hemStitches() {
    return Math.round((hemCircumference / 2) * gaugeSt);
  }

  function hemRows() {
    return Math.round(hemRibbingLength * gaugeRows);
  }

  function shoulderSlope() {
    return 2;
  }

  function bodyLength() {
    return length - hemRibbingLength - armholeDepth - shoulderSlope();
  }

  function shelfSt() {
    // For the armhole
    return Math.round(1 * gaugeSt);
  }

  function armholeStartSt() {
    return Math.round((chestCircumference / 2) * gaugeSt) - 2 * shelfSt();
  }
  
  function backArmholeRows() {
    // Neckline is entirely shaped in the shoulder short rows.
    return Math.round(armholeDepth * gaugeRows);
  }
  
  function backNeckHoldSt() {
    
  }

  function renderHem() {
    if (hemRows()) {
      return (
        <>
          <p>
            Cast on {hemStitches()} for 1x1 ribbing. Knit {hemRows()} rows.
            Transfer all stitches to the main bed for plain knitting.
          </p>
        </>
      );
    } else {
      return (
        <>
          <p>Cast on {hemStitches()}.</p>
        </>
      );
    }
  }

  return (
    <>
      {renderHem()}
      <Trapezoid
        gaugeSt={gaugeSt}
        gaugeRows={gaugeRows}
        length={bodyLength()}
        startWidth={hemCircumference / 2}
        endWidth={chestCircumference / 2}
      ></Trapezoid>
      <p>
        Bind off {shelfSt()} on the side the carriage is on. Knit one row. Bind
        off {shelfSt()} on the other side. You should have about {armholeStartSt()} stitches.
      </p>
      <p>
        RC000
      </p>
      <MinHeightTrapezoid
          gaugeRows={gaugeRows}
          gaugeSt={gaugeSt}
          startWidth={(chestCircumference / 2) - 2.0}
          endWidth={shoulderWidth}
        ></MinHeightTrapezoid>
      <h3>Back</h3>
      <p>
        Continue knitting to RC{backArmholeRows()}.
      </p>
      <p>
        The back neckline is shaped along with the shoulder short rows.
      </p>
    </>
  );
}


export default function FittedTop() {
  const [chestCircumference, setChestCircumference] = useState(38);
  const [shoulderWidth, setShoulderWidth] = useState(14);
  const [hemCircumference, setHemCircumference] = useState(30);
  const [hemRibbingLength, setHemRibbingLength] = useState(2);
  const [armholeDepth, setArmholeDepth] = useState(6.5);
  const [necklineFrontDepth, setNecklineFrontDepth] = useState(3);
  const [necklineWidth, setNecklineWidth] = useState(7.5);
  const [inchesOfEase, setInchesOfEase] = useState(0);
  const [length, setLength] = useState(20);
  const [gaugeSt, setGaugeSt] = useState(7.5);
  const [gaugeRows, setGaugeRows] = useState(11);

  const measurements = [
    {
      label: "Chest circumference: ",
      name: "chestCircumference",
      value: chestCircumference,
      onChange: setChestCircumference,
    },
    {
      label: "Shoulder width: ",
      name: "shoulderWidth",
      value: shoulderWidth,
      onChange: setShoulderWidth,
    },
    {
      label: "Hem circumference: ",
      name: "hemCircumference",
      value: hemCircumference,
      onChange: setHemCircumference,
    },
    {
      label: "Hem ribbing length",
      name: "hemRibbingLength",
      value: hemRibbingLength,
      onChange: setHemRibbingLength,
    },
    {
      label: "Armhole depth: ",
      name: "armholeDepth",
      value: armholeDepth,
      onChange: setArmholeDepth,
    },
    {
      label: "Neckline front depth: ",
      name: "necklineFrontDepth",
      value: necklineFrontDepth,
      onChange: setNecklineFrontDepth,
    },
    {
      label: "Neckline width: ",
      name: "necklineWidth",
      value: necklineWidth,
      onChange: setNecklineWidth,
    },
    {
      label: "Inches of ease: ",
      name: "inchesOfEase",
      value: inchesOfEase,
      onChange: setInchesOfEase,
    },
    {
      label: "Finished length: ",
      name: "length",
      value: length,
      onChange: setLength,
    },
    {
      label: "Stitches per inch: ",
      name: "gaugeSt",
      value: gaugeSt,
      onChange: setGaugeSt,
    },
    {
      label: "Rows per inch: ",
      name: "gaugeRows",
      value: gaugeRows,
      onChange: setGaugeRows,
    },
  ];
  return (
    <>
      <h1 className="title">Fitted top</h1>
      <p>This is a fitted, sleeveless top.</p>
      <p>It is intended to be a crop top that stops at the waist.</p>
      <h2>Measurements</h2>
      <Measurements measurements={measurements}></Measurements>
      <h2>Body</h2>
      <SetInSleeveCrewBodyPanel
            gaugeSt={gaugeSt}
            gaugeRows={gaugeRows}
            width={
              chestCircumference / 2.0
            }
            length={length}
            armholeDepth={armholeDepth}
            shoulderWidth={shoulderWidth}
            hemWidth={hemCircumference / 2.0}
            hemLength={0}
            neckWidth={necklineWidth}
            neckDepth={necklineFrontDepth}
          ></SetInSleeveCrewBodyPanel>      
      <h2>Neckline ribbing</h2>
      <h2>Armhole ribbing</h2>
    </>
  );
}
