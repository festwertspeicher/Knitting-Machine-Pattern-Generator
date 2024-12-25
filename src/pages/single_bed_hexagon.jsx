import * as React from "react";
import { useState } from "react";
import { Measurements, Measurement } from "../lib/input";
import KnitBlock, {
  Trapezoid,
  MinHeightTrapezoid,
  HalfTrapezoid,
} from "../lib/basic_blocks";

export default function SingleBedHexagon() {
  const [hexagonWidth, setHexagonWidth] = useState(3);
  const [gaugeSt, setGaugeSt] = useState(7.5);
  const [gaugeRows, setGaugeRows] = useState(11);

  const ease = 0.9;

  const measurements = [
    {
      label: "Hexagon width (at the widest point): ",
      name: "hexagonWidth",
      value: hexagonWidth,
      onChange: setHexagonWidth,
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

  function hexagonSide() {
    return hexagonWidth / 2;
  }

  function hexagonStartStitches() {
    return Math.round(hexagonWidth * gaugeSt);
  }

  function hexagonSideStitches() {
    return Math.round(hexagonSide() * gaugeSt);
  }

  function shortRowHeight() {
    return (hexagonWidth / 4) * Math.sqrt(3);
  }

  function shortRowRows() {
    return Math.floor(shortRowHeight() * gaugeRows);
  }

  function totalShortRowNeedles() {
    return Math.floor((hexagonStartStitches() - hexagonSideStitches()) / 2);
  }

  function shortRowCadence() {
    let decreases = totalShortRowNeedles();
    let rows = shortRowRows() / 2;
    return Math.max(Math.round(decreases / rows), 1);
  }

  function shortRowCadenceRows() {
    let decreases = totalShortRowNeedles();
    let rows = shortRowRows();
    if (rows > decreases * 2) {
      return Math.round(rows / decreases);
    } else {
      return 2;
    }
  }

  function extraRows() {
    let rowsKnit = (totalShortRowNeedles() - 1) * shortRowCadenceRows() + 1;
    let rows = shortRowRows();
    return rows - rowsKnit;
  }

  function renderShortRowIn() {
    if (shortRowCadenceRows() % 2 == 0) {
      return (
        <>
          <p>
            Bring {shortRowCadence()} needle(s) into hold on the opposite side
            of the carriage. Knit {shortRowCadenceRows() / 2} row(s).
          </p>
          <p>
            Bring {shortRowCadence()} needle(s) into hold on the opposite side
            of the carriage. Knit {shortRowCadenceRows() / 2} row(s).
          </p>
          <p>
            Continue until there are {totalShortRowNeedles()} needles in hold on
            each side.
          </p>
        </>
      );
    } else {
      return (
        <>
          <p>
            You need to knit an odd number of rows between each new needle put
            into hold on each side. The instructions get tricky, pay close
            attention.
          </p>
          <p>
            Bring 1 needle into hold on the opposite side of the carriage. Knit
            one row.
          </p>
          <p>
            Bring 1 needle into hold on the opposite side of the carraige. Knit{" "}
            {shortRowCadenceRows() - 1} rows.
          </p>
          <p>
            Bring 1 needle into hold on the opposite side of the carriage. Knit
            one row.
          </p>
          <p>
            Bring 1 needle into hold on the opposite side of the carriage. Knit{" "}
            {shortRowCadenceRows() - 1} rows.
          </p>
          <p>
            Continue until there are {totalShortRowNeedles()} needles in hold on
            each side.
          </p>
        </>
      );
    }
  }

  function renderShortRowOut() {
    if (shortRowCadenceRows() % 2 == 0) {
      return (
        <>
          <p>
            Return {shortRowCadence()} needle(s) into work on the opposite side
            of the carriage. Knit {shortRowCadenceRows() / 2} row(s).
          </p>
          <p>
            Return {shortRowCadence()} needle(s) into work on the opposite side
            of the carriage. Knit {shortRowCadenceRows() / 2} row(s).
          </p>
          <p>Continue until all needles are back in work.</p>
        </>
      );
    } else {
      return (
        <>
          <p>
            You need to knit an odd number of rows between each new needle put
            into hold on each side. The instructions get tricky, pay close
            attention.
          </p>
          <p>
            Return 1 needle into work on the opposite side of the carriage. Knit
            one row.
          </p>
          <p>
            Return 1 needle into work on the opposite side of the carraige. Knit{" "}
            {shortRowCadenceRows() - 1} rows.
          </p>
          <p>
            Return 1 needle into work on the opposite side of the carriage. Knit
            one row.
          </p>
          <p>
            Return 1 needle into work on the opposite side of the carraige. Knit{" "}
            {shortRowCadenceRows() - 1} rows.
          </p>
          <p>Continue until all needles are back in work.</p>
        </>
      );
    }
  }

  function renderExtraRowsMiddle() {
    if (extraRows() > 2) {
      return (
        <>
          <h3>Knit extra rows</h3>
          <p>
            These extra rows are needed because there's a little remainder in
            the math for the short rows. You can skip them if you want.
          </p>
          <p>Knit {extraRows() * 2} more rows.</p>
        </>
      );
    }
  }
  
  function renderExtraRowsEnd() {
    if (extraRows() > 2) {
      return (
        <>
          <h3>Knit extra rows</h3>
          <p>
            These extra rows are needed because there's a little remainder in
            the math for the short rows. You can skip them if you want.
          </p>
          <p>Knit {extraRows() - 1} more rows.</p>
        </>
      );
    }
  }

  return (
    <>
      <h1 className="title">Single bed hexagon</h1>
      <p>
        This is a pattern for a hexagon knit from the middle out with short
        rows, intended to be stuffed with waste yarn or polyfill and kitchener
        stitched closed.
      </p>
      <h2>Measurements</h2>
      <Measurements measurements={measurements}></Measurements>
      <h2>Hexagon</h2>
      <p>Cast on {hexagonStartStitches()} stitches on to waste yarn.</p>
      <p>Knit one row.</p>
      
      {renderExtraRowsEnd()}

      <h3>Short row in</h3>
      {renderShortRowIn()}

      <h3>Short row out</h3>
      {renderShortRowOut()}

      {renderExtraRowsMiddle()}

      <h3>Short row in</h3>
      {renderShortRowIn()}

      <h3>Short row in</h3>
      {renderShortRowOut()}
      
      {renderExtraRowsEnd()}

      <h2>Finishing</h2>
      <p>
        Scrap off.
      </p>
      <p>
        Stuff with waste yarn or polyfill.
      </p>
      <p>
        Join the start row to the end row with a kitchner stitch.
      </p>
      <p>Remove waste yarn and weave in ends.</p>
    </>
  );
}
