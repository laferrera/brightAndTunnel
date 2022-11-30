import Rete from "rete";
import { btNode } from "./btNode.jsx";
import { NumControl } from "./NumControl.jsx";
import { numSocket } from "./numSocket.js";
import { midiReceiveConfig } from "../renderer/nodeConfigs/midiRecieveConfig.js";
import { configBuilder, checkInputsAndSetData } from "./utils.js";
export class MonomeGridComponent extends Rete.Component {
  constructor() {
    super("Grid");
    this.data.component = btNode; // optional
  }

  builder(node) {
    var inpX = new Rete.Input("x", "X", numSocket);
    var inpY = new Rete.Input("y", "Y", numSocket);
    var inpState = new Rete.Input("state", "State", numSocket);
    var outX = new Rete.Output("x", "X", numSocket);
    var outY = new Rete.Output("y", "Y", numSocket);
    var outState = new Rete.Output("state", "State", numSocket);

    // inp1.addControl(new NumControl(this.editor, "num1", node));
    // inp2.addControl(new NumControl(this.editor, "num2", node));

    node.data.configType = Object.keys({ midiReceiveConfig }).pop()
    node.data.config = configBuilder(midiReceiveConfig);
    node.data.x = 0;
    node.data.y = 0;
    node.data.state = 0;
    return node
      .addInput(inpX)
      .addInput(inpY)
      .addInput(inpState)
      .addOutput(outX)
      .addOutput(outY)
      .addOutput(outState);
  }

  worker(node, inputs, outputs) {
    checkInputsAndSetData(inputs,node.data);

    outputs['x'] = node.data.x;
    outputs['y'] = node.data.y;
    outputs["state"] = node.data.state;
  }
}