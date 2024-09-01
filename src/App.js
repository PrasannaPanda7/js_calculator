import React, { useReducer } from "react";
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

const OperatorButtons = ({ val, dispatch }) => {
  return (
    <button
      onClick={() =>
        dispatch({ type: ACTIONS.ADD_OPERATOR, payload: { operator: val } })
      }
    >
      {val}
    </button>
  );
};

const ACTIONS = {
  ADD_DIGITS: "addDigits",
  CLEAR: "clearDigits",
  ADD_OPERATOR: "addOperator",
  RESET_STATE: "resetState",
  EAVL: "evaluate",
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case ACTIONS.ADD_DIGITS:
      if (state.currentValue === "0" && payload.digit === "0") return state;
      if (state.currentValue?.includes(".") && payload.digit === ".")
        return state;
      return {
        ...state,
        currentValue: `${state?.currentValue || ""}${payload.digit}`,
      };
    case ACTIONS.ADD_OPERATOR:
      if (state.operator) {
        if (state.currentValue) {
          return {
            ...state,
            previousValue: eval(
              `${state.previousValue}${state.operator}${state.currentValue}`
            ),
            operator: payload.operator,
            currentValue: "",
          };
        } else {
          return {
            ...state,
            operator: payload.operator,
          };
        }
      } else {
        return {
          ...state,
          previousValue: state.currentValue,
          currentValue: "",
          operator: payload.operator,
        };
      }
    case ACTIONS.CLEAR:
      if (state.currentValue) {
        return {
          ...state,
          currentValue: state.currentValue.slice(0, -1) || "0",
        };
      } else {
        return {
          ...state,
          currentValue: "0",
          previousValue: "",
          operator: null,
        };
      }
    case ACTIONS.RESET_STATE:
      return {
        previousValue: "",
        currentValue: "0",
        operator: null,
      };
    case ACTIONS.EAVL:
      if (!state.operator || !state.previousValue || !state.currentValue)
        return state;
      const result = eval(
        `${state.previousValue}${state.operator}${state.currentValue}`
      );
      return {
        ...state,
        previousValue: "",
        currentValue: result.toString(),
        operator: null,
      };
    default:
      return state;
  }
};

function App() {
  const [{ previousValue, currentValue, operator }, dispatch] = useReducer(
    reducer,
    { previousValue: "", currentValue: "0", operator: null }
  );
  return (
    <div className="calculator">
      <div className="display">
        <div className="previous-operand">
          {previousValue} {operator}
        </div>
        <div className="current-operand">{currentValue}</div>
      </div>
      <button onClick={() => dispatch({ type: ACTIONS.RESET_STATE })}>
        AC
      </button>
      <button onClick={() => dispatch({ type: ACTIONS.CLEAR })}>DEL</button>
      <OperatorButtons val={"%"} dispatch={dispatch} />
      <OperatorButtons val={"/"} dispatch={dispatch} />
      <DigitButton val={"7"} dispatch={dispatch} />
      <DigitButton val={"8"} dispatch={dispatch} />
      <DigitButton val={"9"} dispatch={dispatch} />
      <OperatorButtons val={"*"} dispatch={dispatch} />
      <DigitButton val={"4"} dispatch={dispatch} />
      <DigitButton val={"5"} dispatch={dispatch} />
      <DigitButton val={"6"} dispatch={dispatch} />
      <OperatorButtons val={"+"} dispatch={dispatch} />
      <DigitButton val={"1"} dispatch={dispatch} />
      <DigitButton val={"2"} dispatch={dispatch} />
      <DigitButton val={"3"} dispatch={dispatch} />
      <OperatorButtons val={"-"} dispatch={dispatch} />
      <DigitButton className="span-two" val={"0"} dispatch={dispatch} />
      <DigitButton val={"."} dispatch={dispatch} />
      <button val={"="} onClick={() => dispatch({ type: ACTIONS.EAVL })}>
        =
      </button>
    </div>
  );
}

export default App;
