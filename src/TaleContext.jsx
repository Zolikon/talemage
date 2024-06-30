import { createContext, useContext, useReducer } from "react";
import PropTypes from "prop-types";

const TaleContext = createContext();

export const NOT_STARTED = "NOT_STARTED";
export const SELECT_GENRE = "SELECT_GENRE";
export const SELECT_AUDIENCE = "SELECT_AUDIENCE";
export const SELECT_CONTENT = "SELECT_CONTENT";
export const SELECT_LANGUAGE = "SELECT_LANGUAGE";
export const GENERATING = "GENERATING";
export const COMPLETED = "COMPLETED";

const STATUS_ORDER = [
  NOT_STARTED,
  SELECT_AUDIENCE,
  SELECT_GENRE,
  SELECT_CONTENT,
  SELECT_LANGUAGE,
  GENERATING,
  COMPLETED,
];

const initialState = {
  genre: "",
  audience: [],
  content: [],
  tale: "",
  title: "",
  language: "",
  status: NOT_STARTED,
};

function reducer(state, { type, payload }) {
  switch (type) {
    case "setGenre":
      return { ...state, genre: payload };
    case "setAudience":
      return { ...state, audience: payload };
    case "setContent":
      return { ...state, content: payload };
    case "setTale":
      return { ...state, tale: payload["tale"], title: payload["title"] };
    case "setLanguage":
      return { ...state, language: payload };
    case "setStatus":
      return { ...state, status: payload };
    default:
      throw new Error(type + " is not a valid action type");
  }
}

function TaleProvider({ children }) {
  const [value, dispatcher] = useReducer(reducer, initialState);

  const setGenre = function (value) {
    dispatcher({ type: "setGenre", payload: value });
  };

  const setAudience = function (value) {
    dispatcher({ type: "setAudience", payload: value });
  };

  const setContent = function (value) {
    dispatcher({ type: "setContent", payload: value });
  };

  const setLanguage = function (value) {
    dispatcher({ type: "setLanguage", payload: value });
  };

  const setTale = function (title, tale) {
    dispatcher({ type: "setTale", payload: { title, tale } });
  };

  const nextStatus = function () {
    const currentStatusIndex = STATUS_ORDER.indexOf(value.status);
    const nextStatusIndex = currentStatusIndex + 1;
    if (nextStatusIndex < STATUS_ORDER.length) {
      dispatcher({ type: "setStatus", payload: STATUS_ORDER[nextStatusIndex] });
    }
  };

  const getStatus = function () {
    return value.status;
  };

  const getGenre = function () {
    return value.genre;
  };

  const getFinalState = function () {
    return {
      genre: value.genre,
      audience: value.audience,
      content: value.content,
      language: value.language,
    };
  };

  const setToErrorState = function () {
    reset();
    dispatcher({ type: "setStatus", payload: "ERROR" });
  };

  const reset = function () {
    dispatcher({ type: "setStatus", payload: NOT_STARTED });
    dispatcher({ type: "setGenre", payload: "" });
    dispatcher({ type: "setAudience", payload: [] });
    dispatcher({ type: "setContent", payload: [] });
    dispatcher({ type: "setTale", payload: { tale: "", title: "" } });
    dispatcher({ type: "setLanguage", payload: "" });
  };

  return (
    <TaleContext.Provider
      value={{
        value,
        setGenre,
        setAudience,
        setContent,
        setLanguage,
        setTale,
        nextStatus,
        getStatus,
        getGenre,
        setToErrorState,
        reset,
        getFinalState,
        title: value.title,
        tale: value.tale,
      }}
    >
      {children}
    </TaleContext.Provider>
  );
}

TaleProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

function useTale() {
  return useContext(TaleContext);
}

export { TaleProvider, useTale };
