import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

// Import pages
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";
// Dashboard
import Overview from "../pages/dashboard/Overview";
import ReferralPerformance from "../pages/dashboard/ReferralPerformance";
// Referral
import ReferralAnalytics from "../pages/referral/ReferralAnalytics";
import ReferralGuide from "../pages/referral/ReferralGuide";
import MyReferrals from "../pages/referral/MyReferrals";
// Settings
import CompleteYourProfile from "../pages/settings/CompleteYourProfile";
import YourBankDetails from "../pages/settings/YourBankDetails";
import EditYourProfile from "../pages/settings/EditYourProfile";
import Notifications from "../pages/settings/Notifications";
import SecurityAndPrivacy from "../pages/settings/SecurityAndPrivacy";
import TermAndCondition from "../pages/settings/TermAndConditions";
// Wallet
import WalletOverview from "../pages/wallet/WalletOverview";
import RequestWithdraw from "../pages/wallet/RequestWithdraw";

import Profile from "../pages/settings/Profile";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/term-and-conditions" element={<TermAndCondition />} />
        </Route>

        {/* Restricted public routes (redirect to dashboard if logged in) */}
        <Route element={<PublicRoute restricted />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          {/* Dashboard */}
          <Route
            path="/dashboard"
            element={<Navigate to="/dashboard/overview" replace />}
          />
          <Route path="/dashboard/overview" element={<Overview />} />
          <Route
            path="/dashboard/referral-performance"
            element={<ReferralPerformance />}
          />

          {/* Referral */}
          <Route
            path="/referral"
            element={<Navigate to="/referral/my-referrals" replace />}
          />
          <Route path="/referral/my-referrals" element={<MyReferrals />} />
          <Route
            path="/referral/referral-analytics"
            element={<ReferralAnalytics />}
          />
          <Route path="/referral/referral-guide" element={<ReferralGuide />} />

          {/* Settings */}
          <Route
            path="/settings"
            element={<Navigate to="/settings/edit-your-profile" replace />}
          />
          <Route
            path="/settings/complete-your-profile"
            element={<CompleteYourProfile />}
          />
          <Route
            path="/settings/your-bank-details"
            element={<YourBankDetails />}
          />
          <Route
            path="/settings/edit-your-profile"
            element={<EditYourProfile />}
          />
          <Route path="/settings/notifications" element={<Notifications />} />
          <Route
            path="/settings/security-and-privacy"
            element={<SecurityAndPrivacy />}
          />
          <Route
            path="/settings/term-and-conditions"
            element={<TermAndCondition />}
          />
          <Route path="/settings/profile" element={<Profile />} />

          {/* Wallet */}
          <Route
            path="/wallet"
            element={<Navigate to="/wallet/wallet-overview" replace />}
          />
          <Route
            path="/wallet/wallet-overview"
            element={<WalletOverview />}
          />
          <Route path="/wallet/request-withdrawal" element={<RequestWithdraw />} />
        </Route>

        {/* 404 route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
