import * as React from "react";
import { useState } from "react";
import { Measurements, Measurement } from "../lib/input";
import KnitBlock, {
  Trapezoid,
  MinHeightTrapezoid,
  HalfTrapezoid,
} from "../lib/basic_blocks";

export default function SingleBedSock() {
  const [footCircumference, setFootCircumference] = useState(9);
  const [footLength, setFootLength] = useState(9.5);
  const [gaugeSt, setGaugeSt] = useState(7.5);
  const [gaugeRows, setGaugeRows] = useState(11);

  const ease = 0.9;

  const measurements = [
    {
      label: "Foot circumference: ",
      name: "footCircumference",
      value: footCircumference,
      onChange: setFootCircumference,
    },
    {
      label: "Foot length: ",
      name: "footLength",
      value: footLength,
      onChange: setFootLength,
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

  function footStitches() {
    return 2 * Math.round((footCircumference * gaugeSt * ease) / 2);
  }

  function halfFootStitches() {
    return footStitches() / 2;
  }

  function totalFootRows() {
    return Math.round(footLength * gaugeRows * ease);
  }

  function shortRowNeedles() {
    return Math.round(halfFootStitches() / 4.0);
  }

  function toeRows() {
    return Math.round(shortRowNeedles() * 2);
  }

  function heelRows() {
    return Math.round(shortRowNeedles() * 2);
  }

  function hemRows() {
    return Math.round(gaugeRows * 2);
  }

  return (
    <>
      <h1 className="title">Single bed sock</h1>
      <p>
        This is a basic ankle sock with a folded hem, intended to be knit flat
        on a single bed machine. This sock has 90% ease so it will be slightly
        smaller than the size of your foot.
      </p>
      <p>
        The folded hem and heel are knit at a slightly tighter tension for a
        better fit.
      </p>
      <p>
        The heel is shaped with short rows. The toe is also shaped with short
        rows and grafted to the rest of the sock above the toes.
      </p>
      <h2>Measurements</h2>
      <Measurements measurements={measurements}></Measurements>
      <h2>Hem</h2>
      <p>
        Cast on {footStitches()} stitches on to waste yarn. Knit {hemRows()}{" "}
        rows. Rehang live stitches for folded hem.
      </p>
      <p>Knit {Math.round(gaugeRows)} more rows.</p>
      <h2>Heel</h2>
      <p>
        Set the carriage so it won't knit back from hold. Put{" "}
        {halfFootStitches()} stitches into hold on the opposite side of the carriage,
        we're going to work the bottom of the foot on the other half.
      </p>
      <p>
        Bring one needle into hold on the opposite side of the carriage.
        Knit one row. Wrap the working yarn under the last needle in hold.
      </p>
      <p>
        Bring one needle into hold on the opposite side of the carriage.
        Knit one row. Wrap the working yarn under the last needle in hold.
      </p>
      <p>
        Continue until there are {shortRowNeedles()} needles in hold on each
        side of the heel.
      </p>
      <p>
        Push one needle back into work on the opposite side of the carriage.
        Knit one row.
      </p>
      <p>
        Push one needle back into work on the opposite side of the carriage.
        Knit one row.
      </p>
      <p>Continue until all of the heel needles are back in work.</p>
      <p>Put the rest of the needles back into work.</p>
      <h2>Foot</h2>
      <p>Knit {totalFootRows() - toeRows() - heelRows()} rows.</p>
      <h2>Toe</h2>
      <p>
        We want to shape the toe on the same half of the sock that we shaped the
        heel. If your carriage is on the wrong side of the work, knit one more
        row.
      </p>
      <p>
        Set the carriage so it won't knit back from hold. Put{" "}
        {halfFootStitches()} into hold on the opposite side of the carriage,
        we're going to work the toe of the foot on the other half.
      </p>
      <p>
        Bring one needle into hold on the opposite side of the carriage.
        Knit one row. Wrap the working yarn under the last needle in hold.
      </p>
      <p>
        Bring one needle into hold on the opposite side of the carriage.
        Knit one row. Wrap the working yarn under the last needle in hold.
      </p>
      <p>
        Continue until there are {shortRowNeedles()} needles in hold on each
        side of the toe.
      </p>
      <p>
        Push one needle back into work on the opposite side of the carriage.
        Knit one row.
      </p>
      <p>
        Push one needle back into work on the opposite side of the carriage.
        Knit one row.
      </p>
      <p>Continue until all of the toe needles are back in work.</p>
      <p>Take the sock off on waste yarn.</p>
      <h2>Finishing</h2>
      <p>
        Fold the sock in half and join the live stitches with a kitchner stitch
        above the toe.
      </p>
      <p>Sew up the side seam with a whip or edge stitch.</p>
    </>
  );
}
