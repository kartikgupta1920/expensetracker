import HomePage from "./Pages/HomePage";
import { SnackbarProvider } from "notistack";


function App() {
  return (
    <SnackbarProvider>
      <div>
        <HomePage />
      </div>
    </SnackbarProvider>
  );
}

export default App;
