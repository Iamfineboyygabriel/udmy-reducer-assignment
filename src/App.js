import React, { useReducer } from "react";
import "./App.css";
import { type } from "@testing-library/user-event/dist/type";

// const initialState = {
//   balance: 0,
//   loan: 0,
//   isActive: false,
// };

// function reducer(state, action) {
//   switch (action.type) {
//     case "openAccount":
//       if (state.isActive) {
//         return state;
//       }
//       return {
//         ...state,
//         balance: 500,
//         isActive: true,
//       };

//     case "depositAmount":
//       if (!state.isActive) {
//         return state;
//       }
//       return {
//         ...state,
//         balance: state.balance + action.amount,
//       };

//     case "withdrawAmount":
//       if (!state.isActive) {
//         return state;
//       }
//       return {
//         ...state,
//         balance: state.balance - action.amount,
//       };

//     case "requestLoan":
//       if (!state.isActive || state.loan > 0) {
//         return state;
//       }
//       return {
//         ...state,
//         balance: state.balance + action.amount,
//         loan: action.amount,
//       };

//     case "payLoan":
//       if (!state.isActive) {
//         return state;
//       }

//       return {
//         ...state,
//         balance: state.balance - state.loan,
//         loan: 0,
//       };

//     case "closeAccount":
//       if (!state.isActive) {
//         return state;
//       }
//       return {
//         balance: 0,
//         loan: 0,
//         isActive: false,
//       };
//     default:
//       return state;
//   }
// }

// export default function App() {
//   const [state, dispatch] = useReducer(reducer, initialState);

//   return (
//     <div className="App">
//       <h1>useReducer Bank Account</h1>
//       <p>Balance: {state.balance}</p>
//       <p>Loan: {state.loan}</p>
//       <p>
//         <button onClick={() => dispatch({ type: "openAccount" })} disabled={state.isActive}>
//           Open account
//         </button>
//       </p>
//       <p>
//         <button onClick={() => dispatch({ type: "depositAmount", amount: 150 })} disabled={!state.isActive}>
//           Deposit 150
//         </button>
//       </p>
//       <p>
//         <button onClick={() => dispatch({ type: "withdrawAmount", amount: 50 })} disabled={!state.isActive}>
//           Withdraw 50
//         </button>
//       </p>
//       <p>
//         <button onClick={() => dispatch({ type: "requestLoan", amount: 5000 })} disabled={!state.isActive || state.loan > 0}>
//           Request a loan of 5000
//         </button>
//       </p>
//       <p>
//         <button onClick={() => dispatch({ type: "payLoan" })} disabled={!state.isActive || state.loan === 0}>
//           Pay loan
//         </button>
//       </p>
//       <p>
//         <button onClick={() => dispatch({ type: "closeAccount" })} disabled={!state.isActive}>
//           Close account
//         </button>
//       </p>
//     </div>
//   );
// }

const initialState = {
  balance: 0,
  loan: 0,
  isActive: false,
};

function reducer(state, action) {
  if (!state.isActive && action.type !== "openAccount") return state;

  switch (action.type) {
    case "openAccount":
      return {
        ...state,
        balance: 500,
        isActive: true,
      };

    case "deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
      };

    case "withdraw":
      return {
        ...state,
        balance: state.balance - action.payload,
      };

    case "requestLoan":
      if (state.loan > 0) return state;
      return {
        ...state,
        balance: state.balance + action.payload,
        loan: action.payload,
      };

    case "payLoan":
      return {
        ...state,
        loan: 0,
        balance: state.balance - state.loan,
      };

    case "closeAccount":
      if (state.loan > 0 || state.balance !== 0) return state;
      return initialState;

    default:
      return state;
  }
}

export default function App() {
  const [{ balance, loan, isActive }, dispatch] = useReducer(
    reducer,
    initialState
  );

  return (
    <div className="App">
      <h1>useReducer Bank Account</h1>
      <p>Balance: {balance}</p>
      <p>Loan: {loan}</p>

      <p>
        <button
          onClick={() => dispatch({ type: "openAccount" })}
          disabled={isActive}
        >
          Open account
        </button>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: "deposit", payload: 150 })}
          disabled={!isActive}
        >
          Deposit 150
        </button>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: "withdraw", payload: 50 })}
          disabled={!isActive}
        >
          Withdraw 50
        </button>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: "requestLoan", payload: 5000 })}
          disabled={!isActive}
        >
          Request a loan of 5000
        </button>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: "payLoan" })}
          disabled={!isActive}
        >
          Pay loan
        </button>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: "closeAccount" })}
          disabled={!isActive}
        >
          Close account
        </button>
      </p>
    </div>
  );
}
