import "./App.scss";
import TableUsers from "./components/TableUsers";
import Header from "./components/Header";

function App() {
  return (
    <div className="app-container">
      <Header />
      <TableUsers />
    </div>
  );
}

export default App;
