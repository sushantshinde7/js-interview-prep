import { Outlet } from "react-router-dom";
import { AppProvider } from "./context/AppContext.jsx";
import MainNavbar from "./components/navigation/MainNavbar.jsx";

// Root layout — only MainNavbar lives here.
// TopicsNavbar belongs to TutorialsLayout.
// SubtopicsSidebar belongs to TopicLayout.
// Nothing here is tutorials-specific.

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-[#0d0d0f] text-[#e8e8f0]">

        <MainNavbar />

        {/* Each child route renders its own layout via Outlet */}
        <Outlet />

      </div>
    </AppProvider>
  );
}