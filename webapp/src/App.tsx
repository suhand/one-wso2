import { Navigate, Route, Routes } from "react-router";
import AuthGuard from "@layouts/AuthGuard";
import AppLayout from "@layouts/AppLayout";
import PeopleOpsPage from "@features/people-ops/pages/PeopleOpsPage";
import MyProfilePage from "@features/my/pages/MyProfilePage";
import ServiceRequestsPage from "@features/service-requests/pages/ServiceRequestsPage";

export default function App() {
  return (
    <Routes>
      <Route element={<AuthGuard />}>
        <Route element={<AppLayout />}>
          {/* Default landing = People Ops (the home perspective). */}
          <Route index element={<Navigate to="/people-ops" replace />} />
          <Route path="people-ops" element={<PeopleOpsPage />} />
          <Route path="my" element={<MyProfilePage />} />
          <Route path="service-requests" element={<ServiceRequestsPage />} />
          {/* Catch-all → home */}
          <Route path="*" element={<Navigate to="/people-ops" replace />} />
        </Route>
      </Route>
    </Routes>
  );
}
