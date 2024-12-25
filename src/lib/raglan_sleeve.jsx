import * as React from "react";
import KnitBlock, {Trapezoid, MinHeightTrapezoid, HalfTrapezoid} from "./basic_blocks";

export default class RaglanSleeve extends KnitBlock {
  constructor(props) {
    super(props);
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
    return 2.0;
  }
  
  sleeveCapStartWidth() {
    return this.props.bicepCircumference - 2;
  }
  
  sleeveCapHeight() {
    return this.props.armholeDepth;
  }
  
  render() {
    return (
      <>
        <p>Cast on {this.startSt()} stitches for 1x1 ribbing.</p>
        <p>
          Knit {this.convertToRows(this.props.gaugeRows, 2)} rows and transfer all stitches to main bed.
        </p>
        <Trapezoid
          gaugeRows={this.props.gaugeRows}
          gaugeSt={this.props.gaugeSt}
          length={this.props.length - this.sleeveCapHeight() - 2}
          startWidth={this.props.bottomCircumference}
          endWidth={this.props.bicepCircumference}
          ></Trapezoid>
        <p>
          Bind off {this.convertToRows(this.props.gaugeSt, 1)} stitches on the side the carriage is on.
          Knit one row, bind off {this.convertToRows(this.props.gaugeSt, 1)} stitches on the other side. 
          You should have {this.convertToRows(this.props.gaugeSt, this.sleeveCapStartWidth())} stitches.
        </p>
        <Trapezoid
          gaugeRows={this.props.gaugeRows}
          gaugeSt={this.props.gaugeSt}
          length={this.sleeveCapHeight()}
          startWidth={this.sleeveCapStartWidth()}
          endWidth={this.sleeveCapFinalWidth()}
          ></Trapezoid>
        <p>
          Take the remaining stitches off on waste yarn.
        </p>
      </>
    );
  }
}

export class RaglanCrewBodyPanel extends KnitBlock {
  constructor(props) {
    super(props);
  }
  
  shoulderDepth() {
    return 1.0;
  }
  
  shoulderStartWidth() {
    return (this.props.shoulderWidth - (this.neckWidth() * ( 1.0 / 2.0))) / 2.0;
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
    return 7.5;
  }
  
  neckDepth() {
    return 3.0;
  }
  
  backNeckHoldSt() {
    var backSt = this.convertToRows(this.props.gaugeSt, this.props.shoulderWidth);
    var shoulderSt = this.convertToRows(this.props.gaugeSt, this.shoulderEndWidth());
    return backSt - shoulderSt - 4;
  }
  
  bodyLength() {
    return this.props.length - this.props.armholeDepth - this.shoulderDepth() - this.props.hemLength;
  }
  
  armholeDecreaseWidth() {
    return (this.props.width - 2 - (this.neckWidth() + 1)) / 2;
  }
  
  decreaseWidthBeforeNecklineShaping() {
    return (3 * (this.armholeDecreaseWidth() / 2)) / this.props.armholeDepth;
  }
  
  bodyWidthBeforeNecklineShaping() {
    return this.neckWidth() + 1 + (2 * this.decreaseWidthBeforeNecklineShaping());
  }

  render() {
    return (
      <>
        <p>Cast on {this.convertToRows(this.props.gaugeSt, this.props.width)} for 1x1 ribbing</p>
        <p>Knit {this.convertToRows(this.props.gaugeRows, this.props.hemLength)} rows and 
          transfer all stitches to the main bed.
        </p>
        <Trapezoid
          gaugeRows={this.props.gaugeRows}
          gaugeSt={this.props.gaugeSt}
          length={this.bodyLength()}
          startWidth={this.props.width}
          ></Trapezoid>
        <p>
          Bind off {this.convertToRows(this.props.gaugeSt, 1)} stitches on the side the carriage is on.
          Knit one row, bind off {this.convertToRows(this.props.gaugeSt, 1)} stitches on the other side. 
          You should have {this.convertToRows(this.props.gaugeSt, this.props.width - 2.0)} stitches.
        </p>
        
        <h2>Front shaping</h2>
        <p>
          The front neck shaping is tricky because you need to shape the shoulder edge and the neckline
          at the same time. Read all of the instructions before getting started.
        </p>
        <p>
          RC000
        </p>
        <Trapezoid
          gaugeRows={this.props.gaugeRows}
          gaugeSt={this.props.gaugeSt}
          length={this.props.armholeDepth - 3.0}
          startWidth={this.props.width - 2.0}
          endWidth={this.bodyWidthBeforeNecklineShaping()}
          ></Trapezoid>
        <p>
          Start shaping the neckline. 
          Bring {this.convertToRows(this.props.gaugeSt, this.props.shoulderWidth - this.shoulderStartWidth())} stitches
          to hold on the right side.
        </p>
        <HalfTrapezoid
          gaugeRows={this.props.gaugeRows}
          gaugeSt={this.props.gaugeSt}
          length={this.neckDepth() - this.shoulderDepth()}
          startWidth={this.shoulderStartWidth()}
          endWidth={this.shoulderEndWidth()}
          ></HalfTrapezoid>
        <p>
          This completes the neckline shaping.
        </p>
        <p>
          RC000
        </p>
        <p>
          Shape the shoulder with short rows. Don't forget to wrap the last needle.
          Bring {this.shoulderShortRow()} needles into hold on the left every other row. 
          Knit to RC {this.convertToRows(this.props.gaugeRows, this.shoulderDepth())}
        </p>
        <p>
          Bind off the shoulder stitches.
        </p>
        <p>
          Work the other shoulder in the same manner but mirrored.
        </p>
        <p>
          Take the center of the neckline off on waste yarn.
        </p>
        <h2>Back shaping</h2>
        <p>
          Knit the body in the same maner as the front. 
        </p>
        <p>
          Knit {this.convertToRows(this.props.gaugeRows, 2)} more rows.
        </p>
        <p>
          RC000
        </p>
        <p>
          Shape the shoulder and neckline with short rows. Don't forget to wrap the last needle.
          With carriage on the left, bring {this.backNeckHoldSt()} needles to hold on the right.
        </p>
        <p>
          Knit one row. Wrap the last needle. Bring {this.shoulderShortRow()} needles to hold on the left. 
        </p>
        <p>
          Knit one row. Wrap the last needle. Bring 2 more needles to hold on the right to shape the neckline.
        </p>
        <p>
          Knit one row. Wrap the last needle. Bring {this.shoulderShortRow()} needles to hold on the left. 
        </p>
        <p>
          Knit one row. Wrap the last needle. Bring 2 more needles to hold on the right to shape the neckline.
          This completes the neckline shaping.
        </p>
        <p>
          Keep knitting to RC
          {this.convertToRows(this.props.gaugeRows, this.shoulderDepth())} bringing {this.shoulderShortRow()} needles to hold on the left every other row.
        </p>
        <p>
          Bind off the shoulder stitches.
        </p>
        <p>
          Work the other back shoulder the same way but mirrored. 
        </p>
        <p>
          Take the center neckline off on waste yarn.
        </p>
      </>
    );
  }
}
