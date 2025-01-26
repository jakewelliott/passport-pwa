import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "./NOTINUSE/lib/queryClient.ts";
import App from "./App.tsx";
import { register as registerServiceWorker } from "./lib/utils/service-worker-registration.ts";
import "./styles/globals.css";
import "./styles/fonts.css";
import SplashScreen from "./components/splash-screen.tsx";

const rootElement = document.getElementById("root");

if (!rootElement) {
	throw new Error("Root element not found");
}

// TODO: Implement splash screen, lives here for now
let loaded = false;
setTimeout(() => {
	loaded = true;
}, 2000);
const AppSplash = () => (loaded ? <App /> : <SplashScreen />);

ReactDOM.createRoot(rootElement).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<AppSplash />
				<ReactQueryDevtools initialIsOpen={false} />
			</BrowserRouter>
		</QueryClientProvider>
	</React.StrictMode>,
);

registerServiceWorker();
