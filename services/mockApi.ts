import type { User, Award, Ban, Fixture, Stat, AdminLog, Role, Team, League } from '../types';

// Mock Data
const MOCK_USERS: User[] = Array.from({ length: 50 }, (_, i) => ({
  id: `user-${i + 1}`,
  username: `Player${i + 1}`,
  email: `player${i + 1}@mission.gg`,
  roles: i % 10 === 0 ? ['ROLE_ADMIN'] : i % 5 === 0 ? ['ROLE_MODERATOR'] : [],
  createdAt: new Date(Date.now() - (i * 1000 * 3600 * 24)).toISOString(),
  status: i % 15 === 0 ? 'banned' : 'active',
}));

const MOCK_AWARDS: Award[] = Array.from({ length: 20 }, (_, i) => ({
  id: `award-${i + 1}`,
  name: `Top Scorer Week ${10 - (i % 10)}`,
  recipient: `Player${(i * 3) % 50 + 1}`,
  recipe: 'top_scorer_w10',
  generatedAt: new Date(Date.now() - (i * 1000 * 3600 * 12)).toISOString(),
  imageUrl: `https://picsum.photos/seed/award${i}/200`,
}));

const MOCK_BANS: Ban[] = MOCK_USERS.filter(u => u.status === 'banned').map((user, i) => ({
  id: `ban-${i + 1}`,
  user: user.username,
  reason: 'Toxicity',
  expiresAt: i % 2 === 0 ? new Date(Date.now() + 1000 * 3600 * 24 * 7).toISOString() : null,
  bannedBy: 'AdminUser',
  createdAt: new Date(Date.now() - (i * 1000 * 3600 * 48)).toISOString(),
}));

const MOCK_FIXTURES: Fixture[] = Array.from({ length: 30 }, (_, i) => ({
  id: `fixture-${i + 1}`,
  week: (i % 5) + 1,
  stage: 'Group Stage',
  teamA: `Team ${String.fromCharCode(65 + i % 8)}`,
  teamB: `Team ${String.fromCharCode(65 + (i + 3) % 8)}`,
  scoreA: i < 15 ? Math.floor(Math.random() * 5) : null,
  scoreB: i < 15 ? Math.floor(Math.random() * 5) : null,
  status: i < 15 ? 'completed' : 'scheduled',
}));

const MOCK_STATS: Stat[] = Array.from({ length: 100 }, (_, i) => ({
    id: `stat-${i + 1}`,
    player: `Player${(i * 7) % 50 + 1}`,
    statName: ['Kills', 'Assists', 'Deaths', 'Headshots'][i % 4],
    value: Math.floor(Math.random() * 20),
    fixtureId: `fixture-${(i % 30) + 1}`,
    team: `Team ${String.fromCharCode(65 + i % 8)}`,
}));

const MOCK_LOGS: AdminLog[] = Array.from({ length: 20 }, (_, i) => ({
    id: `log-${i + 1}`,
    admin: ['SuperAdmin', 'AdminUser', 'ModUser'][i % 3],
    action: ['Banned user', 'Edited fixture', 'Lifted ban', 'Created user'][i % 4],
    target: `Player${(i * 2) % 50 + 1}`,
    timestamp: new Date(Date.now() - (i * 1000 * 60 * 15)).toISOString(),
}));

const MOCK_LEAGUES: League[] = [
    { id: 'league-1', name: 'Pro Circuit - Division 1' },
    { id: 'league-2', name: 'Challenger Series - Division 2' },
    { id: 'league-3', name: 'Open Ladder - Unranked' },
];

const MOCK_TEAMS: Team[] = [
    { id: 'team-1', name: 'QuantumLeap', leagueId: 'league-1' },
    { id: 'team-2', name: 'CyberWraiths', leagueId: 'league-1' },
    { id: 'team-3', name: 'FusionFury', leagueId: 'league-1' },
    { id: 'team-4', name: 'VortexVipers', leagueId: 'league-1' },
    { id: 'team-5', name: 'ShadowStrikers', leagueId: 'league-1' },
    { id: 'team-6', name: 'PhoenixRising', leagueId: 'league-1' },
    { id: 'team-7', name: 'GoliathGaming', leagueId: 'league-1' },
    { id: 'team-8', name: 'CelestialSentinels', leagueId: 'league-1' },
    { id: 'team-9', name: 'Ironclad', leagueId: 'league-2' },
    { id: 'team-10', name: 'NovaEsports', leagueId: 'league-2' },
    { id: 'team-11', name: 'AbyssReapers', leagueId: 'league-2' },
    { id: 'team-12', name: 'ZenithGuardians', leagueId: 'league-2' },
    { id: 'team-13', name: 'RogueWarriors', leagueId: 'league-3' },
    { id: 'team-14', name: 'TitanBrigade', leagueId: 'league-3' },
    { id: 'team-15', name: 'EclipseEnforcers', leagueId: 'league-3' },
    { id: 'team-16', name: 'PulsePioneers', leagueId: 'league-3' }
];


// API Simulation
const simulateNetwork = <T,>(data: T): Promise<T> => {
  return new Promise(resolve => setTimeout(() => resolve(data), 500 + Math.random() * 500));
};

export const fetchUsers = () => simulateNetwork(MOCK_USERS);
export const fetchAwards = () => simulateNetwork(MOCK_AWARDS);
export const fetchBans = () => simulateNetwork(MOCK_BANS);
export const fetchFixtures = () => simulateNetwork(MOCK_FIXTURES);
export const fetchStats = () => simulateNetwork(MOCK_STATS);
export const fetchAdminLogs = () => simulateNetwork(MOCK_LOGS);
export const fetchLeagues = () => simulateNetwork(MOCK_LEAGUES);
export const fetchTeams = (leagueId?: string) => {
    if (!leagueId) {
        return simulateNetwork([]);
    }
    return simulateNetwork(MOCK_TEAMS.filter(t => t.leagueId === leagueId));
};


export const fetchSummaries = () => simulateNetwork({
    totalUsers: MOCK_USERS.length,
    activeBans: MOCK_BANS.filter(b => b.expiresAt === null || new Date(b.expiresAt) > new Date()).length,
    fixturesThisWeek: MOCK_FIXTURES.filter(f => f.week === 3).length, // Mock "this week"
    awardsGenerated: MOCK_AWARDS.length,
});

interface GenerationSettings {
    format: string;
    teams: string[];
    numGroups?: number;
    startDate: string;
    startTime: string;
    gameDays: number[];
    timeBetweenGames: number;
}
interface Match {
  teamA: string;
  teamB: string | 'BYE';
  dateTime?: string;
}
interface Round {
  round: number;
  matches: Match[];
}
interface Group {
    groupName: string;
    teams: string[];
    rounds: Round[];
}
type FixturePreview = Round[] | Group[];

const scheduleMatches = (rounds: Round[], settings: GenerationSettings): Round[] => {
    const { startDate, startTime, gameDays, timeBetweenGames } = settings;
    const [year, month, day] = startDate.split('-').map(Number);
    const [hour, minute] = startTime.split(':').map(Number);

    let currentDateTime = new Date(year, month - 1, day, hour, minute);

    const advanceToNextGameDay = () => {
        currentDateTime.setDate(currentDateTime.getDate() + 1);
        while (!gameDays.includes(currentDateTime.getDay())) {
            currentDateTime.setDate(currentDateTime.getDate() + 1);
        }
        currentDateTime.setHours(hour, minute, 0, 0);
    };
    
    // Ensure the first day is a game day
    if (!gameDays.includes(currentDateTime.getDay())) {
        advanceToNextGameDay();
    }
    
    return rounds.map(round => {
        // Reset time for each new round to start of day, then advance to next game day
        if (round.round > 1) {
            advanceToNextGameDay();
        }

        const scheduledMatches = round.matches.map(match => {
            const scheduledMatch = { ...match, dateTime: currentDateTime.toISOString() };
            currentDateTime.setMinutes(currentDateTime.getMinutes() + timeBetweenGames);
            return scheduledMatch;
        });
        
        return { ...round, matches: scheduledMatches };
    });
};


const generateRoundRobin = (teams: string[], settings: GenerationSettings): Round[] => {
    let teamsArr = [...teams];
    if (teamsArr.length % 2 !== 0) {
      teamsArr.push('BYE');
    }
    const numRounds = teamsArr.length - 1;
    const matchesPerRound = teamsArr.length / 2;
    const rounds: Round[] = [];
    const fixedTeam = teamsArr[0];
    let rotatingTeams = teamsArr.slice(1);
  
    for (let i = 0; i < numRounds; i++) {
      const roundMatches: Match[] = [];
      
      let teamA = fixedTeam;
      let teamB = rotatingTeams[rotatingTeams.length - 1];
      if (teamA !== 'BYE' && teamB !== 'BYE') {
        roundMatches.push({ teamA, teamB });
      }

      for (let j = 0; j < matchesPerRound - 1; j++) {
        teamA = rotatingTeams[j];
        teamB = rotatingTeams[rotatingTeams.length - 2 - j];
        if (teamA !== 'BYE' && teamB !== 'BYE') {
            roundMatches.push({ teamA, teamB });
        }
      }
      rounds.push({ round: i + 1, matches: roundMatches });
  
      // Rotate teams
      rotatingTeams.unshift(rotatingTeams.pop()!);
    }
    return scheduleMatches(rounds, settings);
}

const generateElimination = (teams: string[], settings: GenerationSettings): Round[] => {
    let teamsArr = [...teams];
    // Shuffle teams for random seeding
    for (let i = teamsArr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [teamsArr[i], teamsArr[j]] = [teamsArr[j], teamsArr[i]];
    }
    
    const rounds: Round[] = [];
    let roundNum = 1;
    let currentTeams = [...teamsArr];

    while (currentTeams.length > 1) {
        const matches: Match[] = [];
        const nextRoundTeams: string[] = [];
        
        while(currentTeams.length > 1) {
            const teamA = currentTeams.shift()!;
            const teamB = currentTeams.shift()!;
            matches.push({ teamA, teamB });
            nextRoundTeams.push(`Winner of ${teamA} vs ${teamB}`);
        }
        
        if (currentTeams.length === 1) {
            const teamA = currentTeams.shift()!;
            matches.push({ teamA, teamB: 'BYE' });
            nextRoundTeams.push(teamA);
        }
        
        rounds.push({ round: roundNum, matches });
        currentTeams = nextRoundTeams;
        roundNum++;
    }

    return scheduleMatches(rounds, settings);
}

const generateGroupStages = (teams: string[], numGroups: number, settings: GenerationSettings): Group[] => {
    const shuffledTeams = [...teams].sort(() => 0.5 - Math.random());
    const groups: string[][] = Array.from({ length: numGroups }, () => []);

    shuffledTeams.forEach((team, index) => {
        groups[index % numGroups].push(team);
    });

    return groups.map((groupTeams, index) => ({
        groupName: `Group ${String.fromCharCode(65 + index)}`,
        teams: groupTeams,
        rounds: generateRoundRobin(groupTeams, settings)
    }));
};

export const generateFixturesPreview = (settings: GenerationSettings): Promise<FixturePreview> => {
    let preview: FixturePreview = [];
    switch (settings.format) {
        case 'round-robin':
            preview = generateRoundRobin(settings.teams, settings);
            break;
        case 'single-elimination':
            preview = generateElimination(settings.teams, settings);
            break;
        case 'swiss':
            // Swiss R1 is just random pairings
            preview = generateElimination(settings.teams, settings); // Use same logic for R1
            break;
        case 'group-stage':
            if (settings.numGroups && settings.numGroups > 0 && settings.teams.length >= settings.numGroups) {
                preview = generateGroupStages(settings.teams, settings.numGroups, settings);
            }
            break;
        default:
            preview = [];
    }
    return simulateNetwork(preview);
};
