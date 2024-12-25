import * as React from "react";

export default class KnitBlock extends React.Component {
  constructor(props) {
    super(props);
  }

  convertToRows(gaugeRows, length) {
    return parseInt(gaugeRows * length);
  }

  convertToSt(gaugeSt, width, easePct = 1.0) {
    return parseInt(gaugeSt * width * easePct);
  }
}

function convertToSt(gaugeSt, width, easePct = 1.0) {
  return parseInt(gaugeSt * width * easePct);
}

export function trapezoidChangeCadence(
  length,
  startWidth,
  endWidth,
  gaugeSt,
  gaugeRows,
  easePct = 1.0
) {
  let startSt = convertToSt(gaugeSt, startWidth, easePct);
  let delta = convertToSt(gaugeSt, startWidth - endWidth, easePct);
  let lengthRows = convertToSt(gaugeRows, length);
  let cadence = parseInt(lengthRows / (delta / 2));
  return cadence;
}

export class Trapezoid extends KnitBlock {
  /**
   * Expects properties
   * gaugeSt
   * gaugeRows
   * length
   * startWidth
   * endWidth
   * startRC
   */
  constructor(props) {
    super(props);
  }

  renderSquare(gaugeRows, length) {
    return <span>Knit {this.convertToRows(gaugeRows, length)} rows</span>;
  }

  renderTrapezoid(gaugeSt, gaugeRows, length, startWidth, endWidth, easePct) {
    let epsilon = 10;
    let startSt = this.convertToSt(gaugeSt, startWidth, easePct);
    let delta = this.convertToSt(gaugeSt, startWidth - endWidth, easePct);
    let change = delta > 0 ? "decrease" : "increase";
    let lengthRows = this.convertToRows(gaugeRows, length);
    let cadence = Math.abs(
      trapezoidChangeCadence(
        length,
        startWidth,
        endWidth,
        gaugeSt,
        gaugeRows,
        easePct
      )
    );
    let endSt = this.convertToSt(gaugeSt, endWidth, easePct);

    //let needsAdjustment = (cadence * (Math.abs(delta) / 2)) < (lengthRows - epsilon);
    let needsAdjustment = false;

    if (!needsAdjustment) {
      return (
        <span>
          Knit {lengthRows} rows, {change} one stitch each side every {cadence}{" "}
          rows to {endSt} stitches.
        </span>
      );
    }

    let yIncreases = parseInt(lengthRows - (cadence * Math.abs(delta)) / 2);
    let xIncreases = parseInt(delta / 2 - yIncreases);
    return (
      <span>
        {xIncreases}
        {yIncreases}
        <p>
          Knit {xIncreases * cadence} rows, {change} one stitch each side every{" "}
          {cadence} rows to {startSt - 2 * xIncreases} stitches.
        </p>
        <p>
          Knit {yIncreases * (cadence + 1)} rows, {change} one stitch each side
          every {cadence + 1} rows to {endSt} stitches.
        </p>
      </span>
    );
  }

  render() {
    let gaugeSt = this.props.gaugeSt;
    let gaugeRows = this.props.gaugeRows;
    let length = this.props.length;
    let startWidth = this.props.startWidth;
    let endWidth = this.props.endWidth || startWidth;
    let startRC = this.props.startRC || 0;
    let easePct = this.props.easePct || 1.0;

    if (startWidth == endWidth) {
      return this.renderSquare(gaugeRows, length);
    } else {
      return this.renderTrapezoid(
        gaugeSt,
        gaugeRows,
        length,
        startWidth,
        endWidth,
        easePct
      );
    }
  }
}

export class HalfTrapezoid extends KnitBlock {
  /**
   * Expects properties
   * gaugeSt
   * gaugeRows
   * length
   * startWidth
   * endWidth
   * startRC
   */
  constructor(props) {
    super(props);
  }

  renderTrapezoid(
    gaugeSt,
    gaugeRows,
    length,
    startWidth,
    endWidth,
    easePct,
    side
  ) {
    let delta = this.convertToSt(gaugeSt, startWidth - endWidth, easePct);
    let change = delta > 0 ? "decrease" : "increase";
    let lengthRows = this.convertToRows(gaugeRows, length);
    let cadence = parseInt(lengthRows / Math.abs(delta));
    let endSt = this.convertToSt(gaugeSt, endWidth, easePct);
    return (
      <span>
        Knit {lengthRows} rows, {change} one stitch on the {side} every{" "}
        {cadence} rows to {endSt} stitches.
      </span>
    );
  }

  render() {
    let gaugeSt = this.props.gaugeSt;
    let gaugeRows = this.props.gaugeRows;
    let length = this.props.length;
    let startWidth = this.props.startWidth;
    let endWidth = this.props.endWidth || startWidth;
    let startRC = this.props.startRC || 0;
    let easePct = this.props.easePct || 1.0;
    let side = this.props.side || "right";

    return this.renderTrapezoid(
      gaugeSt,
      gaugeRows,
      length,
      startWidth,
      endWidth,
      easePct,
      side
    );
  }
}

export class MinHeightTrapezoid extends KnitBlock {
  /**
   * Expects properties
   * gaugeSt
   * gaugeRows
   * startWidth
   * endWidth
   * startRC
   */
  constructor(props) {
    super(props);
  }

  renderTrapezoid(gaugeSt, gaugeRows, startWidth, endWidth, easePct) {
    let delta = this.convertToSt(gaugeSt, startWidth - endWidth, easePct);
    let change = delta > 0 ? "decrease" : "increase";
    let lengthRows = Math.ceil(delta / 2);
    let cadence = parseInt(lengthRows / (Math.abs(delta) / 2));
    let endSt = this.convertToSt(gaugeSt, endWidth, easePct);

    return (
      <span>
        Knit {lengthRows} rows, {change} one stitch each side every row to{" "}
        {endSt} stitches.
      </span>
    );
  }

  render() {
    let gaugeSt = this.props.gaugeSt;
    let gaugeRows = this.props.gaugeRows;
    let startWidth = this.props.startWidth;
    let endWidth = this.props.endWidth;
    let startRC = this.props.startRC || 0;
    let easePct = this.props.easePct || 1.0;

    return this.renderTrapezoid(
      gaugeSt,
      gaugeRows,
      startWidth,
      endWidth,
      easePct
    );
  }
}

export class DropShoulderSweaterBodyPanel extends KnitBlock {
  constructor(props) {
    super(props);
  }

  widthSt() {
    return this.convertToRows(this.props.gaugeSt, this.props.width);
  }

  hemLength() {
    if (this.props.ribbingGaugeRows) {
      return this.props.hemLength;
    } else {
      return this.props.hemLength * 2;
    }
  }

  hemRC() {
    let hemRC = 0;
    if (this.props.ribbingGaugeRows) {
      hemRC = this.convertToRows(this.props.ribbingGaugeRows, this.hemLength());
    } else {
      hemRC = this.convertToRows(this.props.gaugeRows, this.hemLength());
    }
    return hemRC;
  }
  
  bodyRows() {
    let inches = this.props.length - this.props.hemLength - (this.props.sleeveWidth / 2);
    if (!this.props.cutAndSew) {
      inches = inches - 2;
    }
    return Math.round(inches * this.props.gaugeRows);
  }

  finalRC() {
    return (
      this.shoulderStartRC() +
      this.convertToRows(this.props.gaugeRows, this.shoulderDepth())
    );
  }

  shoulderDepth() {
    if (this.props.cutAndSew) {
      return 0;
    } else {
      return 2;
    }
  }

  shoulderStartRC() {
    let hemRC = this.hemRC();
    let bodyRC = this.convertToRows(
      this.props.gaugeRows,
      this.props.length - this.hemLength() - this.shoulderDepth()
    );
    return bodyRC + hemRC;
  }
  
  armholeRows() {
    return Math.round(this.props.gaugeRows * (this.props.sleeveWidth / 2))
  }

  shoulderSt() {
    // Head hole is 10 inches and we want one shoulder not both.
    let shoulderWidth = 0;
    if (this.props.cutAndSew) {
      shoulderWidth = (this.props.width - 7.5) / 2;
    } else {
      shoulderWidth = (this.props.width - 10.0) / 2;
    }
    return this.convertToRows(this.props.gaugeSt, shoulderWidth);
  }

  neckStartSt() {
    return this.widthSt() / 2 - this.shoulderSt();
  }

  shoulderRows() {
    return this.convertToRows(this.props.gaugeRows, this.shoulderDepth());
  }

  shoulderStep() {
    return Math.round((this.shoulderSt() / this.shoulderRows()) * 2);
  }

  renderHem() {
    if (this.props.ribbingGaugeRows) {
      return (
        <>
          <p>Knit {this.hemRC()} rows of ribbing</p>
          <p>Transfer all stitches to the main bed.</p>
        </>
      );
    } else {
      return <p>Knit {this.hemRC()} rows and rehang live stitches for hem.</p>;
    }
  }

  renderShoulders() {
    if (this.props.cutAndSew) {
      return (
        <>
          <p>
            Knit {this.armholeRows()} rows. This is a cut and sew neckline
            so there's no shoulder shaping.
          </p>
          <p>
            Place yarn markers at {this.shoulderSt()} on the left and right to
            mark the neckline.
          </p>
        </>
      );
    } else {
      return (
        <>
          <p>
            Knit {this.armholeRows()} rows. You can bind off here or you
            can keep going with the shoulder shaping instructions.
          </p>
          <p>
            The shoulders are shaped with short rows. You could do an
            incremental bind off, but short rows are easier.
          </p>
          <p>
            Set carriage to hold position. Bring {this.shoulderStep()} needles
            to hold on the edge of the work opposite from the carriage. Knit one
            row. Wrap the last needle in hold position. Bring{" "}
            {this.shoulderStep()} needles to hold on the other edge and knit one
            row.
          </p>
          <p>
            Repeat, bringing needles to hold and wrapping until there are{" "}
            {this.shoulderSt()} needles in hold on each side.
          </p>
          <p>
            Take the carriage out of hold postion and knit until all needles are
            back in work. Place markers at stitch {this.neckStartSt()} on the
            right and left. This is where the neckline starts.
          </p>
        </>
      );
    }
  }

  render() {
    return (
      <>
        <p>Cast on {this.widthSt()} stitches on waste yarn.</p>
        {this.renderHem()}
        <p>
          Knit {this.bodyRows()} rows
          place a yarn marker. This is where the sleeve will start.
        </p>
        {this.renderShoulders()}
        <p>Bind off.</p>
      </>
    );
  }
}

export class DropShoulderSweaterSleeve extends KnitBlock {
  constructor(props) {
    super(props);
  }

  startSt() {
    return this.convertToRows(
      this.props.gaugeSt,
      this.props.bottomCircumference
    );
  }

  endSt() {
    return this.convertToRows(this.props.gaugeSt, this.props.topCircumference);
  }

  cuffRows() {
    if (this.props.ribbingGaugeRows) {
      return this.convertToRows(this.props.ribbingGaugeRows, 2);
    } else {
      return this.convertToRows(this.props.gaugeRows, 4);
    }
  }

  totalRows() {
    let cuffRows = this.cuffRows();
    let sleeveRows = this.convertToRows(
      this.props.gaugeRows,
      this.props.length - 2
    );
    return sleeveRows;
  }

  increaseFrequency() {
    let totalRows = this.totalRows() - this.cuffRows();
    var diff = (this.endSt() - this.startSt()) / 2;
    return parseInt(totalRows / diff);
  }

  renderCuff() {
    if (this.props.ribbingGaugeRows) {
      return (
        <>
          <p>Knit {this.cuffRows()} in 1x1 ribbing.</p>
          <p>Transfer all stitches to the main bed.</p>
        </>
      );
    } else {
      return (
        <>
          <p>Knit {this.cuffRows()} rows and rehang live stitches for cuff.</p>
        </>
      );
    }
  }

  render() {
    return (
      <>
        <p>Cast on {this.startSt()} stitches on waste yarn.</p>
        {this.renderCuff()}
        <Trapezoid
          gaugeSt={this.props.gaugeSt}
          gaugeRows={this.props.gaugeRows}
          startWidth={this.props.bottomCircumference}
          endWidth={this.props.topCircumference}
          length={this.props.length - 2}
        ></Trapezoid>
      </>
    );
  }
}
