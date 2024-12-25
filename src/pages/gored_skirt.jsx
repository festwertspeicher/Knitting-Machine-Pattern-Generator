import * as React from "react";
import { useState } from "react";
import { Measurements, Measurement } from "../lib/input";
import { Trapezoid, trapezoidChangeCadence } from "../lib/basic_blocks";

function HemShaping({ startWidth, endWidth, length, gaugeSt, gaugeRows }) {
  function shortRowCadence() {
    let sideCadence = trapezoidChangeCadence(
      length,
      startWidth,
      endWidth,
      gaugeSt,
      gaugeRows
    );
    let bottomCadence = (sideCadence * gaugeSt) / gaugeRows;
    // Multiply by two because each decrease is two rows.
    return Math.round(bottomCadence * 2);
  }

  function shortRowDistanceSt() {
    return Math.round((startWidth / 3) * gaugeSt);
  }
  return (
    <>
      <p>
        We're going to shape the hem with short rows. You can skip this step if
        you want a handkerchief style hem.
      </p>
      <p>
        Put {shortRowDistanceSt()} stitches into hold on the side of the bed
        away from the carriage. Knit one row. Put {shortRowDistanceSt()} {" "}
        stitches into hold on the other side.
      </p>
      <p>
        Wrap the last needle, knit one row. Wrap the last needle and put{" "}
        {shortRowCadence()} needles back into work on the opposite side.
      </p>
      <p>
        Wrap the last needle, knit one row. Put {shortRowCadence()} needles back
        into work on the opposite side of the carriage.
      </p>
      <p>Continue short rowing until all needles are back in work.</p>
    </>
  );
}

function Gores({
  waistCircumference,
  hipCircumference,
  totalNeedles,
  numGores,
  length,
  gaugeSt,
  gaugeRows,
}) {
  function getGoreHemWidth() {
    return totalNeedles / gaugeSt;
  }

  function endWidth() {
    return waistCircumference / numGores;
  }

  function goreHipWidth() {
    var waistToHip = 6;
    var flare = (getGoreHemWidth() - endWidth()) / 2;
    var hipFlare = (flare * waistToHip) / length;
    return (hipFlare * 2 + endWidth()) * numGores;
  }

  function renderHipShaping() {
    if (goreHipWidth() < hipCircumference) {
      return (
        <>
          <HemShaping
            startWidth={getGoreHemWidth()}
            endWidth={hipCircumference / numGores}
            length={length - 6}
            gaugeSt={gaugeSt}
            gaugeRows={gaugeRows}
          />
          <p>
            If you were to knit this as one trapezoid, it would be only{" "}
            {goreHipWidth().toFixed(1)} inches at your hip, so we're going to
            add some hip shaping to make sure this fits.
          </p>
          <Trapezoid
            gaugeSt={gaugeSt}
            gaugeRows={gaugeRows}
            startWidth={getGoreHemWidth()}
            endWidth={hipCircumference / numGores}
            length={length - 6}
          />
          <br />
          <Trapezoid
            gaugeSt={gaugeSt}
            gaugeRows={gaugeRows}
            startWidth={hipCircumference / numGores}
            endWidth={endWidth()}
            length={6}
          />
        </>
      );
    } else {
      return (
        <>
          <HemShaping
            startWidth={getGoreHemWidth()}
            endWidth={endWidth()}
            length={length}
            gaugeSt={gaugeSt}
            gaugeRows={gaugeRows}
          />
          <Trapezoid
            gaugeSt={gaugeSt}
            gaugeRows={gaugeRows}
            startWidth={getGoreHemWidth()}
            endWidth={endWidth()}
            length={length}
          ></Trapezoid>
        </>
      );
    }
  }

  return (
    <>
      <p>Cast on {totalNeedles} stitches. Knit one row.</p>
      {renderHipShaping()}
      <p>Cast off on waste yarn.</p>
      <p>Make {numGores} sections total.</p>
    </>
  );
}

export default function GoredSkirt() {
  const [waistCircumference, setWaistCircumference] = useState(30);
  const [hipCircumference, setHipCircumference] = useState(42);
  const [totalNeedles, setTotalNeedles] = useState(200);
  const [numGores, setNumGores] = useState(2);
  const [length, setLength] = useState(20);
  const [gaugeSt, setGaugeSt] = useState(9);
  const [gaugeRows, setGaugeRows] = useState(13);

  const measurements = [
    {
      label: "Waist circumference: ",
      name: "waistCircumference",
      value: waistCircumference,
      onChange: setWaistCircumference,
    },
    {
      label: "Hip circumference: ",
      name: "hipCircumference",
      value: hipCircumference,
      onChange: setHipCircumference,
    },
    {
      label: "Total needles (on your machine): ",
      name: "totalNeedles",
      value: totalNeedles,
      onChange: setTotalNeedles,
    },
    {
      label: "Number of gores: ",
      name: "numGores",
      value: numGores,
      onChange: setNumGores,
    },
    {
      label: "Skirt length: ",
      name: "skirtLength",
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
      <h1 className="title">Gored skirt</h1>
      <p>
        This is a pattern for a full gored skirt. You can configure the number
        of gores.
      </p>
      <p>
        This pattern doesn't include any hem finishing but you can easily add a
        folded hem to the cast on edge.
      </p>
      <h2>Measurements</h2>
      <Measurements measurements={measurements}></Measurements>
      <h2>Knit gores</h2>
      <Gores
        waistCircumference={waistCircumference}
        hipCircumference={hipCircumference}
        totalNeedles={totalNeedles}
        numGores={numGores}
        length={length}
        gaugeSt={gaugeSt}
        gaugeRows={gaugeRows}
      ></Gores>
      <h2>Create waistband</h2>
      <p>
        Rehang as many peices as you can on the machine, overlapping one stitch
        for easier seaming later.
      </p>
      <p>Knit {Math.round(gaugeRows * 2.5)} rows and cast off on waste yarn.</p>
      <p>
        Fold over waist band and attach to the last row of stitches from the
        main skirt.
      </p>
      <p>Repeat until all peices have a waistband.</p>
      <h2>Assembly</h2>
      <p>Attach all peices together until you only have one seam left.</p>
      <p>
        Cut a peice of one inch elastic to slightly smaller than your waist
        circumference. Thread it into the casing created by the waistband and
        attach the two ends together.
      </p>
      <p>Finish the last seam.</p>
    </>
  );
}
