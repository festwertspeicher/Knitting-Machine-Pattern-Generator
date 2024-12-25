import * as React from "react";
import { useState } from "react";
import { Measurements, Measurement } from "../lib/input";
import { Trapezoid, trapezoidChangeCadence } from "../lib/basic_blocks";


export default function Mittens() {
  const [handCircumference, setHandCircumference] = useState(7.5);
  const [wristToFingertips, setWristToFingertips] = useState(7.5);
  const [gaugeSt, setGaugeSt] = useState(9);
  const [gaugeRows, setGaugeRows] = useState(13);

  const measurements = [
    {
      label: "Hand circumference: ",
      name: "handCircumference",
      value: handCircumference,
      onChange: setHandCircumference,
    },
    {
      label: "Wrist to fingertips: ",
      name: "wristToFingertips",
      value: wristToFingertips,
      onChange: setWristToFingertips,
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
  
  function thumbHeight() {
    return 0.40 * handCircumference;
  }
  
  function thumbLength() {
    return 0.24 * handCircumference;
  }
  
  function thumbWidth() {
    return 0.45 * handCircumference;
  }
  
  function handNeedles() {
    return Math.round(handCircumference * gaugeSt);
  }
  
  function fingertipHeight() {
    return (holdNeedles() * 2) / gaugeRows;
  }
  
  function handHeight() {
    return (Number(wristToFingertips) - thumbHeight() - fingertipHeight()) * 1.25;
  }
  
  function holdNeedles() {
    var halfNeedles = handNeedles() / 2;
    return Math.round(halfNeedles / 2) - 2;
  }
  
  return (
    <>
      <h1 className="title">Mittens</h1>
      <p>
        This is a pattern for mittens intended to be knit flat. The thumb is knit in a second step.
        The fingertips are shaped with short rows and grafted to the rest of the hand.
      </p>
      <p>
        Knit two, mirroring the instructions for the second mitten.
      </p>
      <h2>Measurements</h2>
      <Measurements measurements={measurements}></Measurements>
      <h2>Knit mittens</h2>
      <p>Cast on {Math.round(handCircumference * gaugeSt)} stitches for ribbing</p>
      <Trapezoid
        gaugeSt={gaugeSt}
        gaugeRows={gaugeRows}
        startWidth={handCircumference}
        length={2}
      ></Trapezoid>
      <p>
        Transfer all stitches to the main bed.
      </p>
      <Trapezoid
        gaugeSt={gaugeSt}
        gaugeRows={gaugeRows}
        startWidth={handCircumference}
        endWidth={Number(handCircumference) + thumbWidth()}
        length={thumbHeight()}
      ></Trapezoid>
      <p>
        Place {Math.round((thumbWidth() / 2) * gaugeSt)} stitches on to waste yarn on the side opposite the carriage.
        Knit one row.
      </p>
      <p>
        Place {Math.round((thumbWidth() / 2) * gaugeSt)} stitches on to waste yarn on the side opposite the carriage.
      </p>
      <p>
        The stitches on waste yarn are the thumb stitches.
      </p>
      <p>
        You should have {handNeedles()} needles in work.
      </p>
      <Trapezoid
        gaugeSt={gaugeSt}
        gaugeRows={gaugeRows}
        startWidth={handCircumference}
        length={handHeight()}
      ></Trapezoid>
      <h2>Shape the fingertips</h2>
      <p>
        Configure the carriage so it won't knit back from hold, we're going to short row the fingertips.
      </p>
      <p>
        Place {handNeedles() / 2} stitches into hold on the opposite side of the carriage.
      </p>
      <p>
        Knit one row, wrap the last needle. Bring two needles out into hold on the opposite side of the carriage.
      </p>
      <p>
        Knit one row, wrap the last needle. Bring two needles out into hold on the opposite side of the carriage.
      </p>
      <p>
        Continue until there are {holdNeedles()} needles in hold on each side.
      </p>
      <p>
        Put two needles back into work on the opposite side of the carriage. Knit one row. 
      </p>
      <p>
        Put two needles back into work on the opposite side of the carriage. Knit one row. 
      </p>
      <p>
        Continue until {handNeedles() / 2} needles are back in work.
      </p>
      <p>
        Scrap off.
      </p>
      <h2>Knit the thumb</h2>
      <p>
        Rehang the thumb stitches on the main bed, overlapping one stitch at the side seam.
        It doesn't matter which side the seam is going to be on.
      </p>
      <p>
        Knit {Math.round(thumbLength() * gaugeRows)} rows.  
      </p>
      <p>
        Cut a long tail and take off the live stitches onto it.
      </p>
      <h2>Assembly</h2>
      <p>
        Kitchener stitch the fingertip section to the rest of the hand.
      </p>
      <p>
        Gather up the thumb tip stitches and then mattress stitch the side seams.
      </p>
    </>
  );
}
