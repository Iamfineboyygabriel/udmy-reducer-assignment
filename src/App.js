import React, { useReducer } from "react";

const initialState = {
  balance: 0,
  loan: 0,
  isActive: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "openAccount":
      if (state.isActive) {
        return state;
      }
      return {
        ...state,
        balance: 500,
        isActive: true,
      };

    case "depositAmount":
      if (!state.isActive) {
        return state;
      }
      return {
        ...state,
        balance: state.balance + action.amount,
      }; 

    case "withdrawAmount":
      if (!state.isActive) {
        return state;
      }
      return {
        ...state,
        balance: state.balance - action.amount,
      };

    case "requestLoan":
      if (!state.isActive || state.loan > 0) {
        return state;
      }
      return {
        ...state,
        balance: state.balance + action.amount,
        loan: action.amount,
      };

    case "payLoan":
      if (!state.isActive) {
        return state;
      }

      return {
        ...state,
        balance: state.balance - state.loan,
        loan: 0,
      };

    case "closeAccount":
      if (!state.isActive) {
        return state;
      }
      return {
        balance: 0,
        loan: 0,
        isActive: false,
      };
    default:
      return state;
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="App">
      <h1>useReducer Bank Account</h1>
      <p>Balance: {state.balance}</p>
      <p>Loan: {state.loan}</p>
      <p>
        <button onClick={() => dispatch({ type: "openAccount" })} disabled={state.isActive}>
          Open account
        </button>
      </p>
      <p>
        <button onClick={() => dispatch({ type: "depositAmount", amount: 150 })} disabled={!state.isActive}>
          Deposit 150
        </button>
      </p>
      <p>
        <button onClick={() => dispatch({ type: "withdrawAmount", amount: 50 })} disabled={!state.isActive}>
          Withdraw 50
        </button>
      </p>
      <p>
        <button onClick={() => dispatch({ type: "requestLoan", amount: 5000 })} disabled={!state.isActive || state.loan > 0}>
          Request a loan of 5000
        </button>
      </p>
      <p>
        <button onClick={() => dispatch({ type: "payLoan" })} disabled={!state.isActive || state.loan === 0}>
          Pay loan
        </button>
      </p>
      <p>
        <button onClick={() => dispatch({ type: "closeAccount" })} disabled={!state.isActive}>
          Close account
        </button>
      </p>
    </div>
  );
}
