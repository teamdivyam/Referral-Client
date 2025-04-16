import api from "../config/axios";

const API_PATHS = {
  ME: "/agent/me",
  UPDATE_PROFILE: "/agent/update-profile",
  ADD_BANK_DETAILS: "/agent/add-bank-details",
  OVERVIEW: "/agent/dashboard",
  WITHDRAWAL_HISTORY: "/agent/withdrawal-history",
  BANK_DETAILS: "/agent/bank-details",
};

const agentService = {
  /**
   *
   * @function getCurrentUser
   * @description Get current logged in user data
   * @returns {AxiosPromise}
   */
  getMe: () => api.get(API_PATHS.ME),

  /**
   *
   * @function updateUserProfile
   * @description Update user profile
   * @param {Object} payload
   * @param {string} payload.addressLine1
   * @param {string} payload.addressLine2
   * @param {string} payload.city
   * @param {string} payload.state
   * @returns {AxiosPromise}
   */
  updateProfile: (data) => api.put(API_PATHS.UPDATE_PROFILE, data),

  /**
   *
   * @function updateUserBankDetails
   * @description Update user bank details
   * @param {Object} options
   * @param {Object} options.payload
   * @param {string} options.payload.accountHolderName
   * @param {string} options.payload.accountNumber
   * @param {string} options.payload.bankName
   * @param {string} options.payload.ifscCode
   * @returns {AxiosPromise}
   */
  addBankDetails: (data) => api.put(API_PATHS.ADD_BANK_DETAILS, data),

  /**
   *
   * @function getOverview
   * @description Get agent dashboard overview data
   * @returns {AxiosPromise}
   */
  getOverview: () => api.get(API_PATHS.OVERVIEW),

  /**
   *
   * @function getWithdrawalHistory
   * @description Get agent withdrawal history
   * @returns {AxiosPromise}
   */
  getWithdrawalHistory: () => api.get(API_PATHS.WITHDRAWAL_HISTORY),

  /**
   *
   * @function getWithdrawalHistory
   * @description Get agent bank details
   * @returns {AxiosPromise}
   */
  getBankDetails: () => api.get(API_PATHS.BANK_DETAILS),

  /**
   *
   * @function requestWithdrawal
   * @description Request withdrawal for agent
   * @param {Object} payload
   * @param {string} payload.amount
   * @returns {AxiosPromise}
   */
  requestWithdrawal: (data) => api.post("/agent/request-withdrawal", data),

  markNotificationRead: () => api.put("/agent/mark-notification-read"),

  getAgentReferrals: ({page = 1, limit = 20,  referralStatusCode = "latest"}) =>
    api.get("/referral/agent-referrals", {
      params: { page, limit, "refer-code-status": referralStatusCode },
    }),

  setPrimaryAccount: (bankId) => api.put("/agent/set-primary-account", { bankId }),
};

export default agentService;
