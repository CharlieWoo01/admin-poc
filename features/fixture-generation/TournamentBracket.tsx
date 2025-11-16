import React from 'react';

interface Match {
  teamA: string;
  teamB: string | 'BYE';
  dateTime?: string;
}

interface Round {
  round: number;
  matches: Match[];
}

interface TournamentBracketProps {
  rounds: Round[];
}

const MatchCard: React.FC<{ match: Match }> = ({ match }) => {
    const formattedDate = match.dateTime ? new Date(match.dateTime).toLocaleDateString(undefined, { month: 'short', day: 'numeric'}) : '';
    const formattedTime = match.dateTime ? new Date(match.dateTime).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', hour12: true }) : '';

    return (
        <div className="flex flex-col justify-center bg-gray-900 rounded-lg p-3 min-w-[180px] border border-gray-700">
            <div className="flex justify-between items-center text-sm">
                <span>{match.teamA}</span>
            </div>
            <div className="flex justify-between items-center my-2">
                <span className="text-xs text-gray-500 uppercase">{formattedDate}</span>
                <span className="text-xs text-gray-400">{formattedTime}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
                <span>{match.teamB}</span>
            </div>
        </div>
    )
};

const TournamentBracket: React.FC<TournamentBracketProps> = ({ rounds }) => {
  return (
    <div className="flex space-x-4 overflow-x-auto p-4 bg-gray-800/50 rounded-lg">
      {rounds.map((round, roundIndex) => (
        <div key={round.round} className="flex flex-col space-y-4 justify-around">
          <h4 className="text-lg font-bold text-primary-400 text-center">
            {round.matches.length === 1 ? 'Final' : round.matches.length === 2 ? 'Semi-Finals' : `Round ${round.round}`}
          </h4>
          <div className="flex flex-col gap-8 justify-around h-full">
            {round.matches.map((match, matchIndex) => (
              <div key={matchIndex} className="relative flex items-center">
                 <MatchCard match={match} />
                 {roundIndex < rounds.length - 1 && (
                     <div className="absolute left-full h-px w-6 bg-gray-600"></div>
                 )}
                 {roundIndex < rounds.length - 1 && (
                     <div 
                        className="absolute left-[calc(100%+24px)] w-px bg-gray-600"
                        style={{
                            height: matchIndex % 2 === 0 ? 'calc(100% + 32px + 50%)' : '0',
                            top: matchIndex % 2 === 0 ? '50%' : 'auto',
                            bottom: matchIndex % 2 !== 0 ? '50%' : 'auto',
                        }}
                     ></div>
                 )}
                 {roundIndex < rounds.length - 1 && matchIndex % 2 === 0 && (
                      <div className="absolute left-[calc(100%+24px)] h-px w-6 bg-gray-600" style={{ top: 'calc(50% + (100% + 32px)/2)' }}></div>
                 )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TournamentBracket;
