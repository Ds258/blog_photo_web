import React, { useReducer, createContext, useEffect } from "react";
import Reducer from "./Reducer";

const userItem = localStorage.getItem("user");
const INITIAL_STATE = {
    user: userItem && userItem !== "undefined" ? JSON.parse(userItem) : null,
    isFetching: false,
    error: false,
};


export const Context = createContext(INITIAL_STATE);

export const ContextProvider = ({ children }) => {
    const[state, dispatch] = useReducer(Reducer, INITIAL_STATE);

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(state.user));
    }, [state.user]);

    return (
        <Context.Provider 
            value={{
                user: state.user,
                isFetching: state.isFetching,
                error: state.error,
                dispatch,
            }}>
            {children}
        </Context.Provider>
    )
};


