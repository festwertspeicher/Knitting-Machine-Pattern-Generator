import * as React from "react";
import KnitBlock, {
  Trapezoid,
  MinHeightTrapezoid,
  HalfTrapezoid,
} from "./basic_blocks";

export default class SetInSleeve extends KnitBlock {
  constructor(props) {
    super(props);
    console.log(this.props.armholeDepth)
  }

  startSt() {
    return this.convertToRows(
      this.props.gaugeSt,
      this.props.bottomCircumference
    );
  }

  lowerSleeveRows() {
    var total = this.totalRows();
    return total - this.sleeveCapRows();
  }

  totalRows() {
    return this.convertToRows(this.props.gaugeRows, this.props.length);
  }

  sleeveCapFinalWidth() {
    return 5.5;
  }

  sleeveCapStartWidth() {
    return this.props.bicepCircumference - 2;
  }

  sleeveCapHeight() {
    return this.props.armholeDepth - this.sleeveCapFinalWidth() / 2.0;
  }

  sleeveCapHeightRows() {
    return this.convertToRows(this.props.gaugeRows, 0.5);
  }

  sleeveCapShortRow() {
    var inches = this.sleeveCapFinalWidth() / 3;
    return Math.round(this.convertToRows(this.props.gaugeSt, inches)  / this.sleeveCapHeightRows());
  }
  
  gaugeRibbing() {
    if (this.props.gaugeRowsRibbing) {
      return this.props.gaugeRowsRibbing;
    } else {
      return this.props.gaugeRows;
    }
  }

  render() {
    return (
      <>
        <p>Cast on {this.startSt()} stitches for 1x1 ribbing.</p>
        <p>
          Knit {this.convertToRows(this.gaugeRibbing(), 2)} rows and transfer
          all stitches to main bed.
        </p>
        <Trapezoid
          gaugeRows={this.props.gaugeRows}
          gaugeSt={this.props.gaugeSt}
          length={this.props.length - this.sleeveCapHeight() - 2}
          startWidth={this.props.bottomCircumference}
          endWidth={this.props.bicepCircumference}
        ></Trapezoid>
        <p>
          Bind off {this.convertToRows(this.props.gaugeSt, 1)} stitches on the
          side the carriage is on. Knit one row, bind off{" "}
          {this.convertToRows(this.props.gaugeSt, 1)} stitches on the other
          side. You should have{" "}
          {this.convertToRows(this.props.gaugeSt, this.sleeveCapStartWidth())}{" "}
          stitches.
        </p>
        <Trapezoid
          gaugeRows={this.props.gaugeRows}
          gaugeSt={this.props.gaugeSt}
          length={this.sleeveCapHeight()}
          startWidth={this.sleeveCapStartWidth()}
          endWidth={this.sleeveCapFinalWidth()}
        ></Trapezoid>
        <p>
          From here you can bind off or you can shape the sleeve head with short
          rows.
        </p>
        <p>
          Bring {this.sleeveCapShortRow()} needles into hold on the opposite
          side of the carraige. Knit, wrap, bring {this.sleeveCapShortRow()}{" "}
          more into hold on the opposite side. Until you have{" "}
          {this.convertToRows(this.sleeveCapFinalWidth() / 3, this.props.gaugeSt)} in hold on
          each side.
        </p>
        <p>Bind off.</p>
      </>
    );
  }
}

export class SetInSleeveCrewBodyPanel extends KnitBlock {
  constructor(props) {
    super(props);
  }

  shoulderDepth() {
    return 1.0;
  }

  shoulderStartWidth() {
    return (this.props.shoulderWidth - this.neckWidth() / 2.0) / 2.0;
  }

  shoulderEndWidth() {
    return (this.props.shoulderWidth - this.neckWidth()) / 2.0;
  }

  shoulderShortRow() {
    var height = this.convertToRows(this.props.gaugeRows, this.shoulderDepth());
    var width = this.convertToRows(this.props.gaugeSt, this.shoulderEndWidth());
    return parseInt((width / height) * 2);
  }

  neckWidth() {
    return this.props.neckWidth;
  }

  neckDepth() {
    return this.props.neckDepth;
  }

  backNeckDepth() {
    return 1;
  }

  backNeckHoldSt() {
    var backSt = this.convertToRows(
      this.props.gaugeSt,
      this.props.shoulderWidth
    );
    var shoulderSt = this.convertToRows(
      this.props.gaugeSt,
      this.shoulderEndWidth()
    );
    return backSt - shoulderSt - 4;
  }

  bodyLength() {
    return (
      this.props.length -
      this.props.armholeDepth -
      this.shoulderDepth() -
      this.props.hemLength
    );
  }
  
  gaugeRibbing() {
    if (this.props.gaugeRowsRibbing) {
      return this.props.gaugeRowsRibbing;
    } else {
      return this.props.gaugeRows;
    }
  }
  
  frontNecklineStartRows() {
    return this.convertToRows(
            this.props.gaugeRows,
            this.props.armholeDepth - this.neckDepth() + this.shoulderDepth()
          )
  }
  
  backNecklineExtraRows() {
    let frontNecklineRows = this.frontNecklineStartRows();
    let armholeDepthRows = this.convertToRows(this.props.gaugeRows, this.props.armholeDepth);
    return Math.round(armholeDepthRows - frontNecklineRows);
  }

  renderHem() {
    if (this.props.hemLength > 0) {
      return (
        <>
          <p>
            Cast on{" "}
            {this.convertToRows(this.props.gaugeSt, this.props.hemWidth)} for
            1x1 ribbing
          </p>
          <p>
            Knit{" "}
            {this.convertToRows(this.gaugeRibbing(), this.props.hemLength)}{" "}
            rows and transfer all stitches to the main bed.
          </p>
        </>
      );
    } else {
      return (
        <>
          <p>
            Cast on{" "}
            {this.convertToRows(this.props.gaugeSt, this.props.hemWidth)}{" "}
            stitches.
          </p>
        </>
      );
    }
  }

  render() {
    return (
      <>
        {this.renderHem()}

        <Trapezoid
          gaugeRows={this.props.gaugeRows}
          gaugeSt={this.props.gaugeSt}
          length={this.bodyLength()}
          startWidth={this.props.hemWidth}
          endWidth={this.props.width}
        ></Trapezoid>
        <p>
          Bind off {this.convertToRows(this.props.gaugeSt, 1)} stitches on the
          side the carriage is on. Knit one row, bind off{" "}
          {this.convertToRows(this.props.gaugeSt, 1)} stitches on the other
          side. You should have{" "}
          {this.convertToRows(this.props.gaugeSt, this.props.width - 2.0)}{" "}
          stitches.
        </p>
        <p>RC000</p>
        <MinHeightTrapezoid
          gaugeRows={this.props.gaugeRows}
          gaugeSt={this.props.gaugeSt}
          startWidth={this.props.width - 2.0}
          endWidth={this.props.shoulderWidth}
        ></MinHeightTrapezoid>
        <p>
          Continue knitting to RC
          {this.frontNecklineStartRows()}
          .
        </p>
        <h2>Front shaping</h2>
        <p>
          Start shaping the neckline. Bring{" "}
          {this.convertToRows(
            this.props.gaugeSt,
            this.props.shoulderWidth - this.shoulderStartWidth()
          )}{" "}
          stitches to hold on the right side.
        </p>
        <HalfTrapezoid
          gaugeRows={this.props.gaugeRows}
          gaugeSt={this.props.gaugeSt}
          length={this.neckDepth() - this.shoulderDepth()}
          startWidth={this.shoulderStartWidth()}
          endWidth={this.shoulderEndWidth()}
        ></HalfTrapezoid>
        <p>This completes the neckline shaping.</p>
        <p>RC000</p>
        <p>
          Shape the shoulder with short rows. Don't forget to wrap the last
          needle. Bring {this.shoulderShortRow()} needles into hold on the left
          every other row. Knit to RC{" "}
          {this.convertToRows(this.props.gaugeRows, this.shoulderDepth())}
        </p>
        <p>Bind off the shoulder stitches.</p>
        <p>Work the other shoulder in the same manner but mirrored.</p>
        <p>Take the center of the neckline off on waste yarn.</p>
        <h2>Back shaping</h2>
        <p>Knit the body in the same maner as the front.</p>
        <p>
          Knit {this.backNecklineExtraRows()} more rows.
        </p>
        <p>RC000</p>
        <p>
          Shape the shoulder and neckline with short rows. Don't forget to wrap
          the last needle. With carriage on the left, bring{" "}
          {this.backNeckHoldSt()} needles to hold on the right.
        </p>
        <p>
          Knit one row. Wrap the last needle. Bring {this.shoulderShortRow()}{" "}
          needles to hold on the left.
        </p>
        <p>
          Knit one row. Wrap the last needle. Bring 2 more needles to hold on
          the right to shape the neckline.
        </p>
        <p>
          Knit one row. Wrap the last needle. Bring {this.shoulderShortRow()}{" "}
          needles to hold on the left.
        </p>
        <p>
          Knit one row. Wrap the last needle. Bring 2 more needles to hold on
          the right to shape the neckline. This completes the neckline shaping.
        </p>
        <p>
          Keep knitting to RC
          {this.convertToRows(this.props.gaugeRows, this.shoulderDepth())}{" "}
          bringing {this.shoulderShortRow()} needles to hold on the left every
          other row.
        </p>
        <p>Bind off the shoulder stitches.</p>
        <p>Work the other back shoulder the same way but mirrored.</p>
        <p>Take the center neckline off on waste yarn.</p>
      </>
    );
  }
}
