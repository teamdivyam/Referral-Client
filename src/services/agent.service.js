import api from "../config/axios";

const API_PATHS = {
    ME: "/agent/me",
    NOTIFICATIONS: "/agent/notifications",
    UPDATE_PROFILE: "/agent/update-profile",
    ADD_BANK_DETAILS: "/agent/add-bank-details",
    OVERVIEW: "/agent/dashboard",
    WITHDRAWAL_HISTORY: "/agent/withdrawal-history",
    BANK_DETAILS: "/agent/bank-details",
    REQUEST_WITHDRAWAL: "/agent/request-withdrawal",
    MARK_NOTIFICATION_READ: "/agent/mark-notification-read",
    REFERRALS: "/agent/referrals",
    SET_PRIMARY_ACCOUNT: "/agent/set-primary-account",
};

const agentService = {
    getMe: () => api.get(API_PATHS.ME),

    getNotifications: (page) =>
        api.get(API_PATHS.NOTIFICATIONS, {
            params: { page },
        }),

    updateProfile: (data) => api.put(API_PATHS.UPDATE_PROFILE, data),

    addBankDetails: (data) => api.put(API_PATHS.ADD_BANK_DETAILS, data),

    getOverview: () => api.get(API_PATHS.OVERVIEW),

    getWithdrawalHistory: () => api.get(API_PATHS.WITHDRAWAL_HISTORY),

    getBankDetails: () => api.get(API_PATHS.BANK_DETAILS),

    requestWithdrawal: (data) => api.post(REQUEST_WITHDRAWAL, data),

    markNotificationRead: () => api.put(MARK_NOTIFICATION_READ),

    getAgentReferrals: ({
        page = 1,
        limit = 20,
        referralStatusCode = "latest",
    }) =>
        api.get(REFERRALS, {
            params: { page, limit, "refer-code-status": referralStatusCode },
        }),

    setPrimaryAccount: (bankId) => api.put(SET_PRIMARY_ACCOUNT, { bankId }),
};

export default agentService;
