import Appbar from "./components/layout/Appbar";
import Home from "./components/layout/Home";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store";

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <Appbar />
        <div className="container">
          <Home />
        </div>
      </div>
    </Provider>
  );
};

export default App;
