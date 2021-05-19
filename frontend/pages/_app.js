//redux
import { store, persistor } from "../redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//styles
import "../styles/globals.css";

const toastOptions = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ToastContainer {...toastOptions} />
        <App Component={Component} pageProps={pageProps} />
      </PersistGate>
    </Provider>
  );
}

const App = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default MyApp;
