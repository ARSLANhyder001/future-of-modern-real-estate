import { Suspense, lazy } from "react";
import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import AnimatedBackground from "@/components/common/animated-background";
import ErrorBoundary from "@/components/common/error-boundary";
import { PageLoading } from "@/components/common/loading-spinner";

// Lazy load pages for better performance
const Home = lazy(() => import("@/pages/home"));
const Projects = lazy(() => import("@/pages/projects"));
const Dashboard = lazy(() => import("@/pages/dashboard"));
const InvestorEducation = lazy(() => import("@/pages/philosophy"));
const FAQ = lazy(() => import("@/pages/faq"));
const NotFound = lazy(() => import("@/pages/not-found"));
const InvestorAITools = lazy(() => import("@/pages/InvestorAITools"));

// Loading component for lazy-loaded pages
function PageSuspense({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<PageLoading />}>
      {children}
    </Suspense>
  );
}

function Router() {
  return (
    <div className="min-h-screen bg-navy text-white">
      <AnimatedBackground />
      <Navbar />
      <main className="pt-20" role="main">
        <Switch>
          <Route path="/">
            <PageSuspense>
              <Home />
            </PageSuspense>
          </Route>
          <Route path="/projects">
            <PageSuspense>
              <Projects />
            </PageSuspense>
          </Route>
          <Route path="/dashboard">
            <PageSuspense>
              <Dashboard />
            </PageSuspense>
          </Route>
          <Route path="/education">
            <PageSuspense>
              <InvestorEducation />
            </PageSuspense>
          </Route>
          <Route path="/faq">
            <PageSuspense>
              <FAQ />
            </PageSuspense>
          </Route>
          <Route path="/investor-ai-tools">
            <PageSuspense>
              <InvestorAITools />
            </PageSuspense>
          </Route>
          <Route>
            <PageSuspense>
              <NotFound />
            </PageSuspense>
          </Route>
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
