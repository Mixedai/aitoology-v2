import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider, Outlet, Navigate } from 'react-router-dom';
import { ErrorBoundary as RouteErrorBoundary } from '../components/ErrorBoundary';
import { useAuth } from '../contexts/AuthContext';

// Lazy load pages for code splitting
const NewModernHome = lazy(() => import('../components/home/NewModernHome').then(m => ({ default: m.NewModernHome })));
const ExploreFrame = lazy(() => import('../components/explore/ExploreFrame').then(m => ({ default: m.ExploreFrame })));
const ToolDetail = lazy(() => import('../components/tool-detail/ToolDetail').then(m => ({ default: m.ToolDetail })));
const ComparePage = lazy(() => import('../components/compare/ComparePage'));
const ModernDashboard = lazy(() => import('../components/tool-wallet/ModernDashboard').then(m => ({ default: m.ModernDashboard })));
const TutorialsFrame = lazy(() => import('../components/tutorials/TutorialsFrame').then(m => ({ default: m.TutorialsFrame })));
const NewsFrame = lazy(() => import('../components/news/NewsFrame').then(m => ({ default: m.NewsFrame })));
const NewsDetailFrame = lazy(() => import('../components/news/NewsDetailFrame').then(m => ({ default: m.NewsDetailFrame })));
const SignInFrame = lazy(() => import('../components/auth/SignInFrame').then(m => ({ default: m.SignInFrame })));
const AuthOnboarding = lazy(() => import('../components/auth/AuthOnboarding').then(m => ({ default: m.AuthOnboarding })));
const OnboardingStep1Frame = lazy(() => import('../components/auth/OnboardingStep1Frame').then(m => ({ default: m.OnboardingStep1Frame })));
const OnboardingStep2Frame = lazy(() => import('../components/auth/OnboardingStep2Frame').then(m => ({ default: m.OnboardingStep2Frame })));
const OnboardingStep3Frame = lazy(() => import('../components/auth/OnboardingStep3Frame').then(m => ({ default: m.OnboardingStep3Frame })));
const Settings = lazy(() => import('../components/settings/Settings').then(m => ({ default: m.Settings })));
const SubmitTool = lazy(() => import('../components/submit-tool/SubmitTool').then(m => ({ default: m.SubmitTool })));
const AdminPanel = lazy(() => import('../components/admin/AdminPanel').then(m => ({ default: m.AdminPanel })));
const NotFound = lazy(() => import('../components/error/NotFound').then(m => ({ default: m.NotFound })));

// Loading component
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="space-y-4 text-center">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>
  );
}

// Protected route wrapper
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  
  if (loading) return <PageLoader />;
  if (!user) return <Navigate to="/auth/signin" replace />;
  
  return <>{children}</>;
}

// Admin route wrapper
function AdminRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  
  if (loading) return <PageLoader />;
  if (!user) return <Navigate to="/auth/signin" replace />;
  // TODO: Check if user is admin
  // if (!user.isAdmin) return <Navigate to="/" replace />;
  
  return <>{children}</>;
}

// Layout component
function RootLayout() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Outlet />
    </Suspense>
  );
}

// Router configuration
export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFound onNavigate={() => {}} />,
    children: [
      {
        index: true,
        element: <NewModernHome />,
      },
      {
        path: 'explore',
        element: (
          <RouteErrorBoundary routeName="Explore">
            <ExploreFrame />
          </RouteErrorBoundary>
        ),
      },
      {
        path: 'tools',
        element: <Navigate to="/explore" replace />,
      },
      {
        path: 'tool/:toolId',
        element: (
          <RouteErrorBoundary routeName="Tool Detail">
            <ToolDetail />
          </RouteErrorBoundary>
        ),
      },
      {
        path: 'compare',
        element: (
          <RouteErrorBoundary routeName="Compare Tools">
            <ComparePage />
          </RouteErrorBoundary>
        ),
      },
      {
        path: 'wallet',
        element: (
          <ProtectedRoute>
            <RouteErrorBoundary routeName="Tool Wallet">
              <ModernDashboard />
            </RouteErrorBoundary>
          </ProtectedRoute>
        ),
      },
      {
        path: 'tutorials',
        element: (
          <RouteErrorBoundary routeName="Tutorials">
            <TutorialsFrame />
          </RouteErrorBoundary>
        ),
      },
      {
        path: 'news',
        element: (
          <RouteErrorBoundary routeName="News">
            <NewsFrame />
          </RouteErrorBoundary>
        ),
      },
      {
        path: 'news/:newsId',
        element: (
          <RouteErrorBoundary routeName="News Detail">
            <NewsDetailFrame />
          </RouteErrorBoundary>
        ),
      },
      {
        path: 'submit',
        element: (
          <ProtectedRoute>
            <RouteErrorBoundary routeName="Submit Tool">
              <SubmitTool />
            </RouteErrorBoundary>
          </ProtectedRoute>
        ),
      },
      {
        path: 'settings',
        element: (
          <ProtectedRoute>
            <RouteErrorBoundary routeName="Settings">
              <Settings />
            </RouteErrorBoundary>
          </ProtectedRoute>
        ),
      },
      {
        path: 'admin',
        element: (
          <AdminRoute>
            <RouteErrorBoundary routeName="Admin Panel">
              <AdminPanel />
            </RouteErrorBoundary>
          </AdminRoute>
        ),
      },
      // Auth routes
      {
        path: 'auth',
        children: [
          {
            index: true,
            element: <Navigate to="/auth/signin" replace />,
          },
          {
            path: 'signin',
            element: <SignInFrame />,
          },
          {
            path: 'signup',
            element: <AuthOnboarding />,
          },
          {
            path: 'onboarding',
            children: [
              {
                path: 'step1',
                element: (
                  <ProtectedRoute>
                    <OnboardingStep1Frame />
                  </ProtectedRoute>
                ),
              },
              {
                path: 'step2',
                element: (
                  <ProtectedRoute>
                    <OnboardingStep2Frame />
                  </ProtectedRoute>
                ),
              },
              {
                path: 'step3',
                element: (
                  <ProtectedRoute>
                    <OnboardingStep3Frame />
                  </ProtectedRoute>
                ),
              },
            ],
          },
        ],
      },
      // Catch all - 404
      {
        path: '*',
        element: <NotFound onNavigate={() => {}} />,
      },
    ],
  },
]);

// Router Provider Component
export function AppRouter() {
  return <RouterProvider router={router} />;
}