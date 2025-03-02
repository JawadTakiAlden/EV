import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { BaseProviderInterface } from "./ThemeProviders";

const client = new QueryClient();

const ReactQueryProvider = ({ children }: BaseProviderInterface) => {
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};

export default ReactQueryProvider;
