
export const BAN_USER = `
  mutation BanUser($userId: ID!, $reason: String!, $duration: Int) {
    banUser(userId: $userId, reason: $reason, duration: $duration) {
      id
      user
      reason
      expiresAt
    }
  }
`;

export const CREATE_USER = `
  mutation CreateUser($username: String!, $email: String!, $roles: [String!]) {
    createUser(username: $username, email: $email, roles: $roles) {
      id
      username
      email
    }
  }
`;

export const UPDATE_FIXTURE_RESULT = `
  mutation UpdateFixtureResult($fixtureId: ID!, $scoreA: Int!, $scoreB: Int!) {
    updateFixtureResult(fixtureId: $fixtureId, scoreA: $scoreA, scoreB: $scoreB) {
      id
      status
      scoreA
      scoreB
    }
  }
`;
