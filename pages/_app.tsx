import "../styles/globals.css";
import type { AppProps } from "next/app";
import { store } from "../redux/store";
import { Provider } from "react-redux";
import HeaderComponent from "../components/header";
import style from "../styles/pages/landing.module.css";
import Sidebar from "../components/sidebar";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <HeaderComponent />
      <Sidebar />
      <div className={style.container}>
        <div className={style.innerContainer}>
          <Component {...pageProps} />
        </div>
      </div>
    </Provider>
  );
}

export default MyApp;
