import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ChainId,ThirdwebProvider } from "@thirdweb-dev/react";
import { StateContextProvider } from "./context/index";

import { Sepolia } from "@thirdweb-dev/chains";
import { BrowserRouter} from "react-router-dom";
import "./index.css"



// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.

console.log(ChainId)

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
 
    <ThirdwebProvider desiredChainId={Sepolia}
    activeChain={Sepolia}>
    <StateContextProvider>
      <BrowserRouter><App /></BrowserRouter>
      
      </StateContextProvider>
    </ThirdwebProvider>

);
