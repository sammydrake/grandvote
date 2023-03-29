import "../styles/globals.css";
import { ContextProvider } from "../context/Blockchain.services";
import { NavBar, Footer } from "../components/index_1";

const MyApp = ({ Component, pageProps }) => (
  <ContextProvider>
    <div>
      <NavBar />
      <div>
        <Component {...pageProps} />
      </div>

      <Footer />
    </div>
  </ContextProvider>
);

export default MyApp;
