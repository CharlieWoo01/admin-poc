
import React, { useState, useMemo, useEffect } from 'react';
import Card from '../../components/cards/Card';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Button from '../../components/ui/Button';
import Icon from '../../components/ui/Icon';
// Fix: Removed broken import for Modal component. The component is now defined locally in this file.
import { useQuery } from '../../hooks/useQuery';
import { fetchLeagues, fetchTeams, generateFixturesPreview } from '../../services/mockApi';
import Guard from '../../auth/Guard';
import type { Team } from '../../types';
import TournamentBracket from './TournamentBracket';

// Fix: Defined Modal component locally to resolve import issues from the misconfigured `types.ts` file.
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, footer }) => {
  if (!isOpen) return null;

  return (
    <div className="relative z-50" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity" onClick={onClose}></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-gray-800 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg border border-gray-700">
            <div className="bg-gray-800 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                  <h3 className="text-base font-semibold leading-6 text-white" id="modal-title">{title}</h3>
                  <div className="mt-4">
                    {children}
                  </div>
                </div>
              </div>
            </div>
            {footer && (
              <div className="bg-gray-800/50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 border-t border-gray-700">
                {footer}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

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

function isGroupedPreview(preview: FixturePreview | null): preview is Group[] {
    return !!preview && Array.isArray(preview) && preview.length > 0 && 'groupName' in preview[0];
}

const FixtureGenerationPage: React.FC = () => {
    const [tournamentName, setTournamentName] = useState('');
    const [selectedLeague, setSelectedLeague] = useState('');
    const [format, setFormat] = useState('round-robin');
    const [numGroups, setNumGroups] = useState(2);
    const [selectedTeams, setSelectedTeams] = useState<Set<string>>(new Set());
    
    const [preview, setPreview] = useState<FixturePreview | null>(null);
    const [isLoadingPreview, setIsLoadingPreview] = useState(false);
    const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
    
    const [config, setConfig] = useState({
        startDate: new Date().toISOString().split('T')[0],
        startTime: '18:00',
        gameDays: [1, 3, 5], // Mon, Wed, Fri (0=Sun, 1=Mon, ..., 6=Sat)
        timeBetweenGames: 90, // minutes
    });

    const { data: leagues, loading: leaguesLoading } = useQuery(fetchLeagues);
    const { data: allTeams, loading: teamsLoading } = useQuery(fetchTeams, selectedLeague);

    const handleLeagueChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedLeague(e.target.value);
        setSelectedTeams(new Set());
        setPreview(null);
    };

    const handleTeamSelection = (teamName: string) => {
        const newSelection = new Set(selectedTeams);
        if (newSelection.has(teamName)) {
            newSelection.delete(teamName);
        } else {
            newSelection.add(teamName);
        }
        setSelectedTeams(newSelection);
    };

    const isAllTeamsSelected = useMemo(() => {
        if (!allTeams || allTeams.length === 0) return false;
        return selectedTeams.size === allTeams.length;
    }, [selectedTeams, allTeams]);

    const handleSelectAllTeams = () => {
        if (isAllTeamsSelected) {
            setSelectedTeams(new Set());
        } else {
            setSelectedTeams(new Set(allTeams?.map(t => t.name)));
        }
    };
    
    const handlePreviewClick = async () => {
        setIsLoadingPreview(true);
        setPreview(null);
        try {
            const settings: any = {
                format,
                teams: Array.from(selectedTeams),
                ...config,
            };
            if (format === 'group-stage') {
                settings.numGroups = numGroups;
            }
            const generated = await generateFixturesPreview(settings);
            setPreview(generated);
        } catch (error) {
            console.error("Failed to generate fixture preview:", error);
        } finally {
            setIsLoadingPreview(false);
        }
    };

    const handleSaveClick = () => {
        alert(`Fixtures for "${tournamentName}" saved successfully!`);
        setPreview(null);
        setTournamentName('');
        setSelectedTeams(new Set());
        setSelectedLeague('');
    };

    const handleClearClick = () => {
        setPreview(null);
    };

    const handleConfigChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;
        if (type === 'checkbox') {
            const day = parseInt(value);
            const newGameDays = config.gameDays.includes(day)
                ? config.gameDays.filter(d => d !== day)
                : [...config.gameDays, day];
            setConfig(prev => ({ ...prev, gameDays: newGameDays.sort() }));
        } else {
            setConfig(prev => ({ ...prev, [name]: type === 'number' ? parseInt(value) : value }));
        }
    }
    
    const formatMatchTime = (dateTimeString?: string) => {
        if (!dateTimeString) return 'TBD';
        const date = new Date(dateTimeString);
        return date.toLocaleString(undefined, {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        });
    }

    return (
        <Guard roles={['ROLE_ADMIN']}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 flex flex-col gap-6">
                    <Card>
                        <div className="flex justify-between items-center mb-4 -mt-1">
                            <h3 className="text-base font-semibold leading-6 text-white">Generation Settings</h3>
                            <Button variant="ghost" size="sm" onClick={() => setIsSettingsModalOpen(true)} aria-label="Open settings">
                                <Icon name="settings" className="h-5 w-5" />
                            </Button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label htmlFor="tournamentName" className="block text-sm font-medium leading-6 text-gray-300 mb-1">Tournament Name</label>
                                <Input id="tournamentName" name="tournamentName" placeholder="e.g., Summer Split 2024" value={tournamentName} onChange={(e) => setTournamentName(e.target.value)} />
                            </div>
                             <div>
                                <label htmlFor="league" className="block text-sm font-medium leading-6 text-gray-300 mb-1">League</label>
                                <Select id="league" name="league" value={selectedLeague} onChange={handleLeagueChange} disabled={leaguesLoading}>
                                    <option value="">{leaguesLoading ? 'Loading...' : 'Select a league'}</option>
                                    {leagues?.map(league => <option key={league.id} value={league.id}>{league.name}</option>)}
                                </Select>
                            </div>
                            <div>
                                <label htmlFor="format" className="block text-sm font-medium leading-6 text-gray-300 mb-1">Format</label>
                                <Select id="format" name="format" value={format} onChange={(e) => setFormat(e.target.value)}>
                                    <option value="round-robin">Round Robin</option>
                                    <option value="group-stage">Group Stage</option>
                                    <option value="single-elimination">Single Elimination</option>
                                    <option value="swiss">Swiss</option>
                                </Select>
                            </div>
                             {format === 'group-stage' && (
                                <div>
                                    <label htmlFor="numGroups" className="block text-sm font-medium leading-6 text-gray-300 mb-1">Number of Groups</label>
                                    <Input id="numGroups" name="numGroups" type="number" min="2" value={numGroups} onChange={(e) => setNumGroups(Math.max(2, parseInt(e.target.value) || 2))} />
                                </div>
                            )}
                        </div>
                    </Card>

                    <Card className={!selectedLeague ? 'opacity-50 pointer-events-none' : ''}>
                        <h3 className="text-base font-semibold leading-6 text-white mb-2">
                          Select Teams
                        </h3>
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-400">
                                {selectedTeams.size} / {allTeams?.length || 0} selected
                            </span>
                            <Button variant="ghost" size="sm" onClick={handleSelectAllTeams} disabled={teamsLoading || !allTeams || allTeams.length === 0}>
                                {isAllTeamsSelected ? 'Deselect All' : 'Select All'}
                            </Button>
                        </div>
                        <div className="max-h-64 overflow-y-auto pr-2 border-t border-b border-gray-700 py-2">
                            {teamsLoading ? <p className="text-gray-400 text-center py-4">Loading teams...</p> : (
                                allTeams?.map(team => (
                                    <div key={team.id} className="flex items-center py-1.5">
                                        <input 
                                            id={`team-${team.id}`}
                                            type="checkbox" 
                                            checked={selectedTeams.has(team.name)}
                                            onChange={() => handleTeamSelection(team.name)}
                                            className="h-4 w-4 rounded bg-gray-700 border-gray-600 text-primary-600 focus:ring-primary-600 focus:ring-offset-gray-900"
                                        />
                                        <label htmlFor={`team-${team.id}`} className="ml-3 block text-sm font-medium text-gray-300 cursor-pointer">
                                            {team.name}
                                        </label>
                                    </div>
                                ))
                            )}
                        </div>
                        <div className="mt-4">
                            <Button onClick={handlePreviewClick} disabled={selectedTeams.size < 2 || isLoadingPreview} className="w-full">
                                {isLoadingPreview ? 'Generating...' : 'Preview Fixtures'}
                            </Button>
                        </div>
                    </Card>
                </div>

                <div className="lg:col-span-2">
                    <Card title="Fixture Preview">
                        <div className="min-h-[60vh] max-h-[75vh] overflow-y-auto pr-2">
                        {isLoadingPreview ? (
                            <div className="flex justify-center items-center h-full text-gray-400">Generating preview...</div>
                        ) : preview ? (
                            <div>
                                {format === 'single-elimination' && !isGroupedPreview(preview) ? (
                                    <TournamentBracket rounds={preview} />
                                ) : isGroupedPreview(preview) ? preview.map(group => (
                                    <div key={group.groupName} className="mb-8">
                                        <h4 className="text-lg font-bold text-primary-400 mb-3">{group.groupName}</h4>
                                        {group.rounds.map(({ round, matches }) => (
                                            <div key={round} className="mb-4">
                                                <h5 className="font-semibold text-gray-300 mb-2 border-b border-gray-700 pb-1">Round {round}</h5>
                                                <ul className="space-y-2 text-gray-400">
                                                    {matches.map((match, index) => (
                                                        <li key={index} className="flex items-center justify-between p-2.5 bg-gray-900 rounded-md">
                                                            <span className="font-medium text-right w-2/5 text-gray-200">{match.teamA}</span>
                                                            <span className="text-gray-500 text-xs">vs</span>
                                                            <span className="font-medium w-2/5 text-gray-200">{match.teamB}</span>
                                                            <span className="text-xs w-1/5 text-right">{formatMatchTime(match.dateTime)}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                )) : !isGroupedPreview(preview) && preview.map(({ round, matches }) => (
                                    <div key={round} className="mb-6">
                                        <h4 className="font-semibold text-primary-400 mb-2 border-b border-gray-700 pb-1">Round {round}</h4>
                                        <ul className="space-y-2 text-gray-400">
                                            {matches.map((match, index) => (
                                                 <li key={index} className="flex items-center justify-between p-2.5 bg-gray-900 rounded-md">
                                                    <span className="font-medium text-right w-2/5 text-gray-200">{match.teamA}</span>
                                                    <span className="text-gray-500 text-xs">vs</span>
                                                    <span className="font-medium w-2/5 text-gray-200">{match.teamB}</span>
                                                    <span className="text-xs w-1/5 text-right">{formatMatchTime(match.dateTime)}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                                <div className="mt-6 flex items-center space-x-3 border-t border-gray-700 pt-4">
                                    <Button onClick={handleSaveClick} disabled={!tournamentName}>Generate & Save</Button>
                                    <Button onClick={handleClearClick} variant="secondary">Clear Preview</Button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex justify-center items-center h-full text-gray-500">
                                Configure settings and click 'Preview Fixtures' to see the generated matches.
                            </div>
                        )}
                        </div>
                    </Card>
                </div>
            </div>
            <Modal 
                isOpen={isSettingsModalOpen} 
                onClose={() => setIsSettingsModalOpen(false)}
                title="Competition Configuration"
                footer={
                    <>
                        <Button onClick={() => setIsSettingsModalOpen(false)}>Save</Button>
                        <Button variant="secondary" onClick={() => setIsSettingsModalOpen(false)}>Cancel</Button>
                    </>
                }
            >
                <div className="space-y-4 text-gray-300">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="startDate" className="block text-sm font-medium leading-6 mb-1">Start Date</label>
                            <Input id="startDate" name="startDate" type="date" value={config.startDate} onChange={handleConfigChange} />
                        </div>
                        <div>
                            <label htmlFor="startTime" className="block text-sm font-medium leading-6 mb-1">Start Time</label>
                            <Input id="startTime" name="startTime" type="time" value={config.startTime} onChange={handleConfigChange} />
                        </div>
                    </div>
                    <div>
                       <label className="block text-sm font-medium leading-6 mb-2">Game Days</label>
                       <div className="flex flex-wrap gap-2 text-sm">
                           {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
                               <label key={day} className="flex-1 flex items-center justify-center space-x-2 p-2 bg-gray-700 rounded-md min-w-[60px]">
                                   <input type="checkbox" name="gameDays" value={index} checked={config.gameDays.includes(index)} onChange={handleConfigChange} className="h-4 w-4 rounded bg-gray-800 border-gray-600 text-primary-600 focus:ring-primary-600 focus:ring-offset-gray-900" />
                                   <span>{day}</span>
                               </label>
                           ))}
                       </div>
                    </div>
                    <div>
                        <label htmlFor="timeBetweenGames" className="block text-sm font-medium leading-6 mb-1">Time Between Games (minutes)</label>
                        <Input id="timeBetweenGames" name="timeBetweenGames" type="number" min="0" value={config.timeBetweenGames} onChange={handleConfigChange} />
                    </div>
                </div>
            </Modal>
        </Guard>
    );
};

export default FixtureGenerationPage;
