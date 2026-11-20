import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { PageBackground } from "./PageBackground";

export default function App() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <PageBackground />
      <Header />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
