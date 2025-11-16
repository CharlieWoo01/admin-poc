
export const GET_USERS = `
  query GetUsers($offset: Int, $limit: Int, $filter: UserFilter) {
    users(offset: $offset, limit: $limit, filter: $filter) {
      id
      username
      email
      roles
      createdAt
      status
    }
    userCount(filter: $filter)
  }
`;

export const GET_DASHBOARD_DATA = `
  query GetDashboardData {
    summaries {
      totalUsers
      activeBans
      fixturesThisWeek
      awardsGenerated
    }
    adminLogs(limit: 20) {
      id
      admin
      action
      target
      timestamp
    }
  }
`;

export const GET_ME = `
  query GetMe {
    me {
      id
      username
      roles
    }
  }
`;
