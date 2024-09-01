import { useReducer } from "react";
import "./App.css";

const DigitButton = ({ val, dispatch, className = "" }) => {
  return (
    <button
      className={className}
      onClick={() =>
        dispatch({ type: ACTIONS.ADD_DIGITS, payload: { digit: val } })
      }
    >
      {val}
    </button>
  );
};

const OperatorButtons = ({ operator, dispatch, className = "" }) => {
  return (
    <button
      className={className}
      onClick={() =>
        dispatch({
          type: ACTIONS.CHOOSE_OPERATION,
          payload: { operation: operator },
        })
      }
    >
      {operator}
    </button>
  );
};

const ACTIONS = {
  ADD_DIGITS: "add-digits",
  CLEAR: "clear",
  CHOOSE_OPERATION: "choose-operation",
  DELETE_DIGITS: "delete-digits",
  EVALUATE: "evaluate",
};

const evaluate = ({ previousOperand, currentOperand, operator }) => {
  const previous = parseFloat(previousOperand),
    current = parseFloat(currentOperand);
  switch (operator) {
    case "+":
      return previous + current;
    case "-":
      return previous - current;
    case "*":
      return previous * current;
    case "/":
      if (current === 0) {
        throw new Error("Cannot divide by zero");
      }
      return previous / current;
    case "%":
      return previous % current;
    default:
      throw new Error("Invalid operator");
  }
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case ACTIONS.ADD_DIGITS:
      if (state.currentOperand === "0" && payload.digit === "0") return state;
      if (state.currentOperand?.includes(".") && payload.digit === ".")
        return state;
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      };
    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentOperand === null && state.previousOperand === null)
        return state;
      if (state.previousOperand == null) {
        return {
          ...state,
          previousOperand: state.currentOperand,
          currentOperand: null,
          operator: payload.operation,
        };
      } else {
        return {
          ...state,
          previousOperand: evaluate(state),
          currentOperand: null,
          operator: payload.operation,
        };
      }
    case ACTIONS.CLEAR:
      return {};
  }
};
function App() {
  const [{ previousOperand, currentOperand, operator }, dispatch] = useReducer(
    reducer,
    {}
  );
  return (
    <div className="calculator">
      <div className="output">
        <div className="previous-operand">
          {previousOperand} {operator}
        </div>
        <div className="current-operand">{currentOperand}</div>
      </div>
      <button onClick={() => dispatch({ type: ACTIONS.CLEAR })}>AC</button>
      <button>DEL</button>
      <OperatorButtons operator={"%"} dispatch={dispatch} />
      <OperatorButtons operator={"/"} dispatch={dispatch} />
      <DigitButton val={"7"} dispatch={dispatch} />
      <DigitButton val={"8"} dispatch={dispatch} />
      <DigitButton val={"9"} dispatch={dispatch} />
      <OperatorButtons operator={"*"} dispatch={dispatch} />
      <DigitButton val={"4"} dispatch={dispatch} />
      <DigitButton val={"5"} dispatch={dispatch} />
      <DigitButton val={"6"} dispatch={dispatch} />
      <OperatorButtons operator={"+"} dispatch={dispatch} />
      <DigitButton val={"1"} dispatch={dispatch} />
      <DigitButton val={"2"} dispatch={dispatch} />
      <DigitButton val={"3"} dispatch={dispatch} />
      <OperatorButtons operator={"-"} dispatch={dispatch} />
      <DigitButton val={"0"} dispatch={dispatch} className={"span-two"} />
      <DigitButton val={"."} dispatch={dispatch} />
      <button className="span-teo">=</button>
    </div>
  );
}

export default App;
