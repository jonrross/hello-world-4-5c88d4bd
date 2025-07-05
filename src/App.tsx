import { BrowserRouter as Router } from "react-router-dom";
import { HelloWorldDisplay } from "@/components/HelloWorldDisplay";
import { Toaster } from "@/components/ui/sonner";

function App() {
  const baseUrl = import.meta.env.BASE_URL || "/";

  return (
    <Router basename={baseUrl}>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <HelloWorldDisplay />
        <Toaster />
      </div>
    </Router>
  );
}

export default App;