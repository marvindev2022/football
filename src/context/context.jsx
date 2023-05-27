import { createContext } from "react";
import ClientsProvider from "../hooks/hook";
import PropTypes from "prop-types";

export const DataContext = createContext({});

export function DataListProvider({ children }) {
  const valuesProvider = ClientsProvider();
  return (
    <DataContext.Provider value={valuesProvider}>
      {children}
    </DataContext.Provider>
  );
}

DataListProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
