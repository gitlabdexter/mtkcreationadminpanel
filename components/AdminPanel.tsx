

import React, { useState, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { INITIAL_DATA } from '../constants';
import { AppData, User, Server, ServerProtocol, Subscription, SubscriptionType, Banner, FAQ, Feedback } from '../types';
import {
    DashboardIcon,
    UsersIcon,
    ServerIcon,
    SubscriptionsIcon,
    SettingsIcon,
    LocationMarkerIcon,
    PhotographIcon,
    QuestionMarkCircleIcon,
    ChatAlt2Icon,
    DocumentTextIcon,
    AcademicCapIcon,
    SearchIcon,
    PlusIcon,
    DxvpnLogo
} from './Icons';

type AdminPage =
    'dashboard' |
    'banner' |
    'users' |
    'faq' |
    'feedback' |
    'termsAndConditions' |
    'privacyPolicy' |
    'eula' |
    'security' |
    'appSettings' |
    'subscriptions' |
    'servers';

interface AdminPanelProps {
    setIsAuthenticated: (isAuthenticated: boolean) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ setIsAuthenticated }) => {
    const [page, setPage] = useState<AdminPage>('dashboard');
    const [data, setData] = useLocalStorage<AppData>('dx-vpn-data', INITIAL_DATA);
    const [isGeneralExpanded, setIsGeneralExpanded] = useState(false);

    const menuItems = [
        {
            category: 'WEBSITE MANAGE',
            items: [
                { id: 'dashboard', label: 'Dashboard', icon: DashboardIcon },
                { id: 'banner', label: 'Banner', icon: PhotographIcon },
                { id: 'users', label: 'User', icon: UsersIcon },
                { id: 'faq', label: 'Faq', icon: QuestionMarkCircleIcon },
                { id: 'feedback', label: 'Feedback', icon: ChatAlt2Icon },
                {
                    id: 'general',
                    label: 'General',
                    icon: AcademicCapIcon,
                    subItems: [
                        { id: 'termsAndConditions', label: 'Terms And Condition', icon: DocumentTextIcon },
                        { id: 'privacyPolicy', label: 'Privacy Policy', icon: DocumentTextIcon },
                        { id: 'eula', label: 'EULA', icon: DocumentTextIcon },
                        { id: 'security', label: 'Security', icon: DocumentTextIcon },
                        { id: 'appSettings', label: 'Setting', icon: SettingsIcon },
                    ]
                },
            ]
        },
        {
            category: 'APP MANAGE',
            items: [
                { id: 'subscriptions', label: 'Subscription', icon: SubscriptionsIcon },
                { id: 'servers', label: 'Server', icon: ServerIcon },
            ]
        },
    ];

    const handleLogout = () => {
        setIsAuthenticated(false);
    };

    const renderContent = () => {
        switch(page) {
            case 'dashboard': return <Dashboard data={data} />;
            case 'banner': return <BannerManagement data={data} setData={setData} />;
            case 'users': return <UserManagement data={data} setData={setData} />;
            case 'faq': return <FaqManagement data={data} setData={setData} />;
            case 'feedback': return <FeedbackManagement data={data} setData={setData} />;
            case 'termsAndConditions': return <LegalContentEditor title="Terms And Condition" contentKey="termsAndConditions" data={data} setData={setData} />;
            case 'privacyPolicy': return <LegalContentEditor title="Privacy Policy" contentKey="privacyPolicy" data={data} setData={setData} />;
            case 'eula': return <LegalContentEditor title="EULA" contentKey="eula" data={data} setData={setData} />;
            case 'security': return <LegalContentEditor title="Security Notes" contentKey="securityNotes" data={data} setData={setData} />;
            case 'appSettings': return <AppSettingsManagement data={data} setData={setData} />;
            case 'subscriptions': return <SubscriptionManagement data={data} setData={setData} />;
            case 'servers': return <ServerManagement data={data} setData={setData} />;
            default: return <Dashboard data={data} />;
        }
    };

    const currentGeneralSubPage = menuItems
        .find(cat => cat.category === 'WEBSITE MANAGE')?.items
        .find(item => 'subItems' in item && item.id === 'general')
        ?.subItems?.find(subItem => subItem.id === page);

    return (
        <div className="flex flex-col md:flex-row min-h-[calc(100vh-68px)] bg-dx-light dark:bg-dx-dark">
            <aside className="w-full md:w-64 bg-dx-dark-2 p-4 md:p-6 shadow-lg md:overflow-y-auto flex-shrink-0">
                <div className="flex items-center gap-3 mb-8 px-3">
                    <DxvpnLogo className="h-8 w-8 text-dx-accent" />
                    <h2 className="text-xl font-bold tracking-wider text-white font-montserrat">Admin</h2>
                </div>
                <nav>
                    {menuItems.map((categoryGroup, index) => (
                        <div key={index} className="mb-6">
                            <h3 className="text-xs uppercase text-dx-gray-light font-semibold my-4 ml-3">{categoryGroup.category}</h3>
                            <ul className="flex flex-row md:flex-col gap-2 md:gap-1 flex-wrap">
                                {categoryGroup.items.map(item => (
                                    <li key={item.id} className="w-full">
                                        {'subItems' in item ? (
                                            <>
                                                <button
                                                    onClick={() => setIsGeneralExpanded(!isGeneralExpanded)}
                                                    className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all duration-200 ${isGeneralExpanded || item.subItems.some(sub => sub.id === page) ? 'bg-dx-accent/20 text-dx-accent shadow-dx-glow' : 'text-dx-gray hover:bg-dx-dark-3'}`}
                                                    aria-expanded={isGeneralExpanded}
                                                >
                                                    <item.icon className="h-5 w-5" />
                                                    <span>{item.label}</span>
                                                </button>
                                                {(isGeneralExpanded || item.subItems.some(sub => sub.id === page)) && (
                                                    <ul className="ml-6 mt-1 space-y-1">
                                                        {item.subItems.map(subItem => (
                                                            <li key={subItem.id}>
                                                                <button
                                                                    onClick={() => { setPage(subItem.id as AdminPage); setIsGeneralExpanded(true); }}
                                                                    className={`w-full flex items-center gap-3 p-2 rounded-lg text-left text-sm transition-all duration-200 ${page === subItem.id ? 'bg-dx-accent/10 text-dx-accent font-semibold' : 'text-dx-gray hover:bg-dx-dark-3'}`}
                                                                >
                                                                    <subItem.icon className="h-4 w-4" />
                                                                    {subItem.label}
                                                                </button>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </>
                                        ) : (
                                            <button
                                                onClick={() => { setPage(item.id as AdminPage); setIsGeneralExpanded(false); }}
                                                className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all duration-200 ${page === item.id ? 'bg-dx-accent/20 text-dx-accent shadow-dx-glow' : 'text-dx-gray hover:bg-dx-dark-3'}`}
                                            >
                                                <item.icon className="h-5 w-5" />
                                                <span>{item.label}</span>
                                            </button>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </nav>
            </aside>
            <main className="flex-1 p-4 md:p-8 overflow-y-auto bg-dx-light dark:bg-dx-dark text-dx-dark dark:text-dx-light">
                <div className="flex justify-between items-center mb-6">
                     {currentGeneralSubPage ? (
                        <h2 className="text-3xl font-bold text-dx-dark dark:text-dx-light">{currentGeneralSubPage.label}</h2>
                     ) : (
                        <h2 className="text-3xl font-bold text-dx-dark dark:text-dx-light">
                            {menuItems.flatMap(cat => cat.items).find(item => !('subItems' in item) && item.id === page)?.label || (page === 'dashboard' ? 'Dashboard' : '')}
                        </h2>
                     )}
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="pl-10 pr-4 py-2 rounded-full bg-dx-light-2 dark:bg-dx-dark-3 border border-dx-light-3 dark:border-dx-dark-3 focus:outline-none focus:border-dx-accent transition-colors"
                            />
                            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-dx-gray" />
                        </div>
                        <div className="relative">
                            <button
                                className="flex items-center gap-2 p-2 rounded-full bg-dx-light-2 dark:bg-dx-dark-3 hover:bg-dx-light-3 dark:hover:bg-dx-dark-4 transition-colors"
                                aria-label="Profile options"
                            >
                                <img src="https://via.placeholder.com/32/00ffff/0a0a1a?text=AD" alt="Admin Profile" className="h-8 w-8 rounded-full border-2 border-dx-accent" />
                                <span className="font-semibold hidden md:block">Profile</span>
                            </button>
                            {/* Profile Dropdown Placeholder */}
                            {/* <div className="absolute right-0 mt-2 w-48 bg-dx-light-2 dark:bg-dx-dark-3 rounded-lg shadow-xl py-2 z-10">
                                <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm hover:bg-dx-light-3 dark:hover:bg-dx-dark-4">Logout</button>
                            </div> */}
                        </div>
                    </div>
                </div>

                {renderContent()}
                <footer className="mt-8 text-center text-sm text-dx-gray pt-4 border-t border-dx-light-3 dark:border-dx-dark-3">
                    THIS APP IS CREATED BY CVCREATION
                </footer>
            </main>
        </div>
    );
};

// Sub-components for each admin page

const Dashboard: React.FC<{data: AppData}> = ({ data }) => {
    const stats = useMemo(() => {
        const totalBanners = data.banners.length;
        const totalUsers = data.users.length;
        const totalFaqs = data.faq.length;
        const totalFeedback = data.feedback.length;
        const totalServers = data.servers.length;
        const freeSubs = data.subscriptions.find(s => s.type === SubscriptionType.FREE);
        const freeSubUsers = data.users.filter(u => u.subscriptionId === freeSubs?.id).length;
        const paidSubUsers = totalUsers - freeSubUsers;

        const sumOfMainCounts = totalBanners + totalUsers + totalFaqs + totalFeedback + totalServers; // Including servers for percentage base if needed, or adjust
        const calculatePercent = (count: number, base: number) => base > 0 ? ((count / base) * 100).toFixed(0) : 0;

        return [
            { label: 'Banner', count: totalBanners, percent: calculatePercent(totalBanners, sumOfMainCounts) },
            { label: 'User', count: totalUsers, percent: calculatePercent(totalUsers, sumOfMainCounts) },
            { label: 'FAQ', count: totalFaqs, percent: calculatePercent(totalFaqs, sumOfMainCounts) },
            { label: 'Feedback', count: totalFeedback, percent: calculatePercent(totalFeedback, sumOfMainCounts) },
            { label: 'Server', count: totalServers, percent: calculatePercent(totalServers, sumOfMainCounts) },
            { label: 'Free Subscription', count: freeSubUsers, percent: calculatePercent(freeSubUsers, totalUsers) },
            { label: 'Paid Subscription', count: paidSubUsers, percent: calculatePercent(paidSubUsers, totalUsers) },
        ];
    }, [data]);

    const topBandwidthUsers = [...data.users].sort((a, b) => b.bandwidthUsage - a.bandwidthUsage).slice(0, 10);
    const topDataUsers = [...data.users].sort((a, b) => b.dataUsage - a.dataUsage).slice(0, 10);

    // Determine max values for bar chart scaling
    const maxBandwidth = Math.max(...topBandwidthUsers.map(u => u.bandwidthUsage), 1);
    const maxDataUsage = Math.max(...topDataUsers.map(u => u.dataUsage), 1);

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {stats.map(stat => (
                    <div key={stat.label} className="bg-dx-light-2 dark:bg-dx-dark-2 p-6 rounded-xl border border-dx-light-3 dark:border-dx-dark-3 shadow-sm dark:shadow-dx-accent/10">
                        <h3 className="text-sm text-dx-gray-light uppercase">{stat.label}</h3>
                        <p className="text-4xl font-bold my-2 text-dx-dark dark:text-dx-light">{stat.count}</p>
                        <div className="flex items-center gap-2">
                            <div className="h-2 w-full bg-dx-light-3 dark:bg-dx-dark-3 rounded-full">
                                <div className="h-full bg-dx-accent rounded-full" style={{ width: `${stat.percent}%` }}></div>
                            </div>
                            <span className="text-sm font-semibold text-dx-accent">{stat.percent}%</span>
                        </div>
                        <p className="text-xs text-dx-gray mt-1">of total</p>
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <UserBarChart title="Top 10 Users With Maximum Bandwidth" users={topBandwidthUsers} metric="bandwidthUsage" unit="GB" maxValue={maxBandwidth} barColor="bg-dx-accent" />
                <UserBarChart title="Top 10 Users With Maximum Data Use" users={topDataUsers} metric="dataUsage" unit="GB" maxValue={maxDataUsage} barColor="bg-dx-accent-2" />
            </div>
        </div>
    );
};

const UserBarChart: React.FC<{ title: string; users: User[]; metric: 'bandwidthUsage' | 'dataUsage', unit: string, maxValue: number, barColor: string }> = ({ title, users, metric, unit, maxValue, barColor }) => (
    <div className="bg-dx-light-2 dark:bg-dx-dark-2 p-6 rounded-xl border border-dx-light-3 dark:border-dx-dark-3 shadow-sm dark:shadow-dx-accent/10">
        <h3 className="text-xl font-semibold mb-4 text-dx-dark dark:text-dx-light">{title}</h3>
        <div className="overflow-x-auto">
            {users.length > 0 ? (
                <div className="space-y-4">
                    {users.map(user => (
                        <div key={user.id} className="flex items-center gap-4">
                            <span className="w-24 text-sm font-medium text-dx-gray-light truncate">{user.name}</span>
                            <div className="flex-1 h-6 bg-dx-light-3 dark:bg-dx-dark-3 rounded-md overflow-hidden">
                                <div
                                    className={`h-full ${barColor} transition-all duration-500 ease-out flex items-center justify-end pr-2 text-xs font-bold text-dx-dark`}
                                    style={{ width: `${(user[metric] / maxValue) * 100}%` }}
                                >
                                    {user[metric]} {unit}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="p-3 text-center text-dx-gray">No users found.</p>
            )}
        </div>
    </div>
);


const UserManagement: React.FC<{ data: AppData, setData: React.Dispatch<React.SetStateAction<AppData>> }> = ({ data, setData }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<User | Partial<User> | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [entriesPerPage, setEntriesPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    const filteredUsers = useMemo(() => {
        return data.users.filter(user =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [data.users, searchTerm]);

    const totalPages = Math.ceil(filteredUsers.length / entriesPerPage);
    const paginatedUsers = useMemo(() => {
        const startIndex = (currentPage - 1) * entriesPerPage;
        return filteredUsers.slice(startIndex, startIndex + entriesPerPage);
    }, [filteredUsers, currentPage, entriesPerPage]);

    const openModalForNew = () => {
        setEditingUser({ name: '', email: '', subscriptionId: data.subscriptions[0]?.id || '', bandwidthUsage: 0, dataUsage: 0 });
        setIsModalOpen(true);
    };

    const openModalForEdit = (user: User) => {
        setEditingUser(user);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setEditingUser(null);
        setIsModalOpen(false);
    };

    const handleSave = (userToSave: User | Partial<User>) => {
        if ('id' in userToSave && userToSave.id) { // Editing existing user
            setData(prev => ({
                ...prev,
                users: prev.users.map(u => u.id === userToSave.id ? { ...u, ...userToSave } as User : u)
            }));
        } else { // Creating new user
            const newUser: User = {
                id: `user-${Date.now()}`,
                name: userToSave.name || 'New User',
                email: userToSave.email || 'new@example.com',
                subscriptionId: userToSave.subscriptionId || data.subscriptions[0]?.id,
                bandwidthUsage: 0,
                dataUsage: 0,
            };
            setData(prev => ({ ...prev, users: [...prev.users, newUser] }));
        }
        closeModal();
    };

    const handleDelete = (userId: string) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            setData(prev => ({ ...prev, users: prev.users.filter(u => u.id !== userId) }));
        }
    };

    return (
        <div>
            <div className="flex justify-end mb-6">
                <button onClick={openModalForNew} className="bg-dx-accent text-dx-dark font-bold py-2 px-4 rounded-lg hover:opacity-80 transition-opacity flex items-center gap-2">
                    <PlusIcon className="h-5 w-5" /> Add New
                </button>
            </div>
            <div className="bg-dx-light-2 dark:bg-dx-dark-2 p-6 rounded-xl border border-dx-light-3 dark:border-dx-dark-3 shadow-sm dark:shadow-dx-accent/10">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
                    <div className="flex items-center gap-2">
                        <select
                            value={entriesPerPage}
                            onChange={(e) => { setEntriesPerPage(Number(e.target.value)); setCurrentPage(1); }}
                            className="bg-dx-light-3 dark:bg-dx-dark-3 p-2 rounded-lg border border-dx-light-3 dark:border-dx-dark-3 focus:outline-none focus:border-dx-accent appearance-none"
                        >
                            <option value={10}>10</option>
                            <option value={25}>25</option>
                            <option value={50}>50</option>
                        </select>
                        <span className="text-sm text-dx-gray">entries per page</span>
                    </div>
                    <div className="relative w-full sm:w-auto">
                        <input
                            type="text"
                            placeholder="Search records"
                            value={searchTerm}
                            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                            className="pl-10 pr-4 py-2 rounded-lg bg-dx-light-3 dark:bg-dx-dark-3 border border-dx-light-3 dark:border-dx-dark-3 focus:outline-none focus:border-dx-accent transition-colors w-full"
                        />
                        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-dx-gray" />
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="border-b border-dx-light-3 dark:border-dx-dark-3 text-dx-gray uppercase text-sm">
                            <tr>
                                <th className="p-3">Name</th>
                                <th className="p-3">Email</th>
                                <th className="p-3">Subscription</th>
                                <th className="p-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedUsers.length > 0 ? paginatedUsers.map(user => {
                                const sub = data.subscriptions.find(s => s.id === user.subscriptionId);
                                return (
                                    <tr key={user.id} className="border-b border-dx-light-3 dark:border-dx-dark-3 last:border-0 hover:bg-dx-light-3/50 dark:hover:bg-dx-dark-3/50">
                                        <td className="p-3 whitespace-nowrap">{user.name}</td>
                                        <td className="p-3 whitespace-nowrap">{user.email}</td>
                                        <td className="p-3 whitespace-nowrap">{sub?.name || 'N/A'}</td>
                                        <td className="p-3 text-right space-x-4 whitespace-nowrap">
                                            <button onClick={() => openModalForEdit(user)} className="text-dx-accent hover:opacity-80 font-semibold px-2 py-1 rounded-md bg-dx-accent/10">Edit</button>
                                            <button onClick={() => handleDelete(user.id)} className="text-red-500 hover:text-red-400 font-semibold px-2 py-1 rounded-md bg-red-500/10">Delete</button>
                                        </td>
                                    </tr>
                                );
                            }) : (
                                <tr>
                                    <td colSpan={4} className="p-3 text-center text-dx-gray">No users found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-between items-center mt-4">
                    <p className="text-sm text-dx-gray">Showing {((currentPage - 1) * entriesPerPage) + 1} to {Math.min(currentPage * entriesPerPage, filteredUsers.length)} of {filteredUsers.length} entries</p>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="px-3 py-1 rounded-lg bg-dx-light-3 dark:bg-dx-dark-3 text-dx-gray hover:bg-dx-light-2 dark:hover:bg-dx-dark-4 disabled:opacity-50"
                        >
                            Previous
                        </button>
                        {[...Array(totalPages)].map((_, i) => (
                            <button
                                key={i + 1}
                                onClick={() => setCurrentPage(i + 1)}
                                className={`px-3 py-1 rounded-lg ${currentPage === i + 1 ? 'bg-dx-accent text-dx-dark font-bold' : 'bg-dx-light-3 dark:bg-dx-dark-3 text-dx-gray hover:bg-dx-light-2 dark:hover:bg-dx-dark-4'}`}
                            >
                                {i + 1}
                            </button>
                        ))}
                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="px-3 py-1 rounded-lg bg-dx-light-3 dark:bg-dx-dark-3 text-dx-gray hover:bg-dx-light-2 dark:hover:bg-dx-dark-4 disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
            {isModalOpen && editingUser && (
                <UserModal
                    user={editingUser}
                    subscriptions={data.subscriptions}
                    onSave={handleSave}
                    onClose={closeModal}
                />
            )}
        </div>
    );
};

const UserModal: React.FC<{
    user: User | Partial<User>;
    subscriptions: Subscription[];
    onSave: (user: User | Partial<User>) => void;
    onClose: () => void;
}> = ({ user, subscriptions, onSave, onClose }) => {
    const [formData, setFormData] = useState(user);
    const [password, setPassword] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (password) {
            console.log(`Password for user ${formData.email} changed. In a real app, this would be hashed and saved securely.`);
        }
        onSave(formData);
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-opacity" role="dialog" aria-modal="true" aria-labelledby="user-modal-title">
            <div className="bg-dx-light dark:bg-dx-dark-2 p-8 rounded-2xl w-full max-w-md shadow-2xl border border-dx-light-3 dark:border-dx-dark-3 transform transition-all" onClick={e => e.stopPropagation()}>
                <h3 id="user-modal-title" className="text-2xl font-bold mb-6 text-dx-accent">{'id' in formData ? 'Edit User' : 'Add User'}</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="userName" className="block mb-1 text-dx-gray text-sm">Name</label>
                        <input id="userName" type="text" name="name" value={formData.name || ''} onChange={handleChange} required className="w-full bg-dx-light-2 dark:bg-dx-dark-3 p-2 rounded-lg border-2 border-transparent focus:border-dx-accent outline-none" />
                    </div>
                    <div>
                        <label htmlFor="userEmail" className="block mb-1 text-dx-gray text-sm">Email</label>
                        <input id="userEmail" type="email" name="email" value={formData.email || ''} onChange={handleChange} required className="w-full bg-dx-light-2 dark:bg-dx-dark-3 p-2 rounded-lg border-2 border-transparent focus:border-dx-accent outline-none" />
                    </div>
                    <div>
                        <label htmlFor="userPassword" className="block mb-1 text-dx-gray text-sm">Password</label>
                        <input id="userPassword" type="password" name="password" placeholder={'id' in formData ? 'Leave blank to keep current' : 'Enter password'} value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-dx-light-2 dark:bg-dx-dark-3 p-2 rounded-lg border-2 border-transparent focus:border-dx-accent outline-none" />
                    </div>
                    <div>
                        <label htmlFor="userSubscription" className="block mb-1 text-dx-gray text-sm">Subscription</label>
                        <select id="userSubscription" name="subscriptionId" value={formData.subscriptionId} onChange={handleChange} className="w-full bg-dx-light-2 dark:bg-dx-dark-3 p-2 rounded-lg border-2 border-transparent focus:border-dx-accent outline-none appearance-none">
                            {subscriptions.map(sub => (
                                <option key={sub.id} value={sub.id}>{sub.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex justify-end gap-4 pt-4">
                        <button type="button" onClick={onClose} className="py-2 px-5 rounded-lg bg-dx-light-3 dark:bg-dx-dark-3 text-dx-dark dark:text-dx-light hover:opacity-80 transition-opacity font-semibold">Cancel</button>
                        <button type="submit" className="py-2 px-5 rounded-lg bg-dx-accent text-dx-dark font-bold hover:opacity-80 transition-opacity">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const BannerManagement: React.FC<{data: AppData, setData: React.Dispatch<React.SetStateAction<AppData>>}> = ({data, setData}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingBanner, setEditingBanner] = useState<Banner | Partial<Banner> | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [entriesPerPage, setEntriesPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    const filteredBanners = useMemo(() => {
        return data.banners.filter(banner =>
            banner.imageUrl.toLowerCase().includes(searchTerm.toLowerCase()) ||
            banner.linkUrl.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [data.banners, searchTerm]);

    const totalPages = Math.ceil(filteredBanners.length / entriesPerPage);
    const paginatedBanners = useMemo(() => {
        const startIndex = (currentPage - 1) * entriesPerPage;
        return filteredBanners.slice(startIndex, startIndex + entriesPerPage);
    }, [filteredBanners, currentPage, entriesPerPage]);

    const openModalForNew = () => {
        setEditingBanner({ imageUrl: '', linkUrl: '', isActive: true });
        setIsModalOpen(true);
    };

    const openModalForEdit = (banner: Banner) => {
        setEditingBanner(banner);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setEditingBanner(null);
        setIsModalOpen(false);
    };

    const handleSave = (bannerToSave: Banner | Partial<Banner>) => {
        if ('id' in bannerToSave && bannerToSave.id) { // Editing existing banner
            setData(prev => ({
                ...prev,
                banners: prev.banners.map(b => b.id === bannerToSave.id ? { ...b, ...bannerToSave } as Banner : b)
            }));
        } else { // Creating new banner
            const newBanner: Banner = {
                id: `banner-${Date.now()}`,
                imageUrl: bannerToSave.imageUrl || 'https://via.placeholder.com/600x200?text=New+Banner',
                linkUrl: bannerToSave.linkUrl || '#',
                isActive: bannerToSave.isActive || false,
            };
            setData(prev => ({ ...prev, banners: [...prev.banners, newBanner] }));
        }
        closeModal();
    };

    const handleDelete = (bannerId: string) => {
        if (window.confirm('Are you sure you want to delete this banner?')) {
            setData(prev => ({ ...prev, banners: prev.banners.filter(b => b.id !== bannerId) }));
        }
    };

    return (
        <div>
            <div className="flex justify-end mb-6">
                <button onClick={openModalForNew} className="bg-dx-accent text-dx-dark font-bold py-2 px-4 rounded-lg hover:opacity-80 transition-opacity flex items-center gap-2">
                    <PlusIcon className="h-5 w-5" /> Add New
                </button>
            </div>
            <div className="bg-dx-light-2 dark:bg-dx-dark-2 p-6 rounded-xl border border-dx-light-3 dark:border-dx-dark-3 shadow-sm dark:shadow-dx-accent/10">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
                    <div className="flex items-center gap-2">
                        <select
                            value={entriesPerPage}
                            onChange={(e) => { setEntriesPerPage(Number(e.target.value)); setCurrentPage(1); }}
                            className="bg-dx-light-3 dark:bg-dx-dark-3 p-2 rounded-lg border border-dx-light-3 dark:border-dx-dark-3 focus:outline-none focus:border-dx-accent appearance-none"
                        >
                            <option value={10}>10</option>
                            <option value={25}>25</option>
                            <option value={50}>50</option>
                        </select>
                        <span className="text-sm text-dx-gray">entries per page</span>
                    </div>
                    <div className="relative w-full sm:w-auto">
                        <input
                            type="text"
                            placeholder="Search records"
                            value={searchTerm}
                            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                            className="pl-10 pr-4 py-2 rounded-lg bg-dx-light-3 dark:bg-dx-dark-3 border border-dx-light-3 dark:border-dx-dark-3 focus:outline-none focus:border-dx-accent transition-colors w-full"
                        />
                        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-dx-gray" />
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="border-b border-dx-light-3 dark:border-dx-dark-3 text-dx-gray uppercase text-sm">
                            <tr>
                                <th className="p-3">Image</th>
                                <th className="p-3">Link URL</th>
                                <th className="p-3">Active</th>
                                <th className="p-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedBanners.length > 0 ? paginatedBanners.map(banner => (
                                <tr key={banner.id} className="border-b border-dx-light-3 dark:border-dx-dark-3 last:border-0 hover:bg-dx-light-3/50 dark:hover:bg-dx-dark-3/50">
                                    <td className="p-3"><img src={banner.imageUrl} alt="Banner" className="w-24 h-auto rounded-md object-cover" /></td>
                                    <td className="p-3 whitespace-nowrap">{banner.linkUrl}</td>
                                    <td className="p-3">
                                        <span className={`px-2 py-1 text-xs font-bold rounded-full ${banner.isActive ? 'bg-green-400/10 text-green-400' : 'bg-red-400/10 text-red-400'}`}>
                                            {banner.isActive ? 'Yes' : 'No'}
                                        </span>
                                    </td>
                                    <td className="p-3 text-right space-x-4 whitespace-nowrap">
                                        <button onClick={() => openModalForEdit(banner)} className="text-dx-accent hover:opacity-80 font-semibold px-2 py-1 rounded-md bg-dx-accent/10">Edit</button>
                                        <button onClick={() => handleDelete(banner.id)} className="text-red-500 hover:text-red-400 font-semibold px-2 py-1 rounded-md bg-red-500/10">Delete</button>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={4} className="p-3 text-center text-dx-gray">No banners found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-between items-center mt-4">
                    <p className="text-sm text-dx-gray">Showing {((currentPage - 1) * entriesPerPage) + 1} to {Math.min(currentPage * entriesPerPage, filteredBanners.length)} of {filteredBanners.length} entries</p>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="px-3 py-1 rounded-lg bg-dx-light-3 dark:bg-dx-dark-3 text-dx-gray hover:bg-dx-light-2 dark:hover:bg-dx-dark-4 disabled:opacity-50"
                        >
                            Previous
                        </button>
                        {[...Array(totalPages)].map((_, i) => (
                            <button
                                key={i + 1}
                                onClick={() => setCurrentPage(i + 1)}
                                className={`px-3 py-1 rounded-lg ${currentPage === i + 1 ? 'bg-dx-accent text-dx-dark font-bold' : 'bg-dx-light-3 dark:bg-dx-dark-3 text-dx-gray hover:bg-dx-light-2 dark:hover:bg-dx-dark-4'}`}
                            >
                                {i + 1}
                            </button>
                        ))}
                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="px-3 py-1 rounded-lg bg-dx-light-3 dark:bg-dx-dark-3 text-dx-gray hover:bg-dx-light-2 dark:hover:bg-dx-dark-4 disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
            {isModalOpen && editingBanner && (
                <BannerModal
                    banner={editingBanner}
                    onSave={handleSave}
                    onClose={closeModal}
                />
            )}
        </div>
    );
};

const BannerModal: React.FC<{
    banner: Banner | Partial<Banner>;
    onSave: (banner: Banner | Partial<Banner>) => void;
    onClose: () => void;
}> = ({ banner, onSave, onClose }) => {
    const [formData, setFormData] = useState(banner);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-opacity" role="dialog" aria-modal="true" aria-labelledby="banner-modal-title">
            <div className="bg-dx-light dark:bg-dx-dark-2 p-8 rounded-2xl w-full max-w-md shadow-2xl border border-dx-light-3 dark:border-dx-dark-3 transform transition-all" onClick={e => e.stopPropagation()}>
                <h3 id="banner-modal-title" className="text-2xl font-bold mb-6 text-dx-accent">{'id' in formData ? 'Edit Banner' : 'Add Banner'}</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="bannerImageUrl" className="block mb-1 text-dx-gray text-sm">Image URL</label>
                        <input id="bannerImageUrl" type="text" name="imageUrl" value={formData.imageUrl || ''} onChange={handleChange} required className="w-full bg-dx-light-2 dark:bg-dx-dark-3 p-2 rounded-lg border-2 border-transparent focus:border-dx-accent outline-none" />
                    </div>
                    <div>
                        <label htmlFor="bannerLinkUrl" className="block mb-1 text-dx-gray text-sm">Link URL</label>
                        <input id="bannerLinkUrl" type="text" name="linkUrl" value={formData.linkUrl || ''} onChange={handleChange} required className="w-full bg-dx-light-2 dark:bg-dx-dark-3 p-2 rounded-lg border-2 border-transparent focus:border-dx-accent outline-none" />
                    </div>
                    <div className="flex items-center gap-2">
                        <input id="bannerIsActive" type="checkbox" name="isActive" checked={formData.isActive || false} onChange={handleChange} className="h-4 w-4 text-dx-accent rounded focus:ring-dx-accent bg-dx-light-2 dark:bg-dx-dark-3 border-dx-gray" />
                        <label htmlFor="bannerIsActive" className="text-dx-gray text-sm">Is Active</label>
                    </div>
                    <div className="flex justify-end gap-4 pt-4">
                        <button type="button" onClick={onClose} className="py-2 px-5 rounded-lg bg-dx-light-3 dark:bg-dx-dark-3 text-dx-dark dark:text-dx-light hover:opacity-80 transition-opacity font-semibold">Cancel</button>
                        <button type="submit" className="py-2 px-5 rounded-lg bg-dx-accent text-dx-dark font-bold hover:opacity-80 transition-opacity">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const FaqManagement: React.FC<{data: AppData, setData: React.Dispatch<React.SetStateAction<AppData>>}> = ({data, setData}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingFaq, setEditingFaq] = useState<FAQ | Partial<FAQ> | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [entriesPerPage, setEntriesPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    const filteredFaqs = useMemo(() => {
        return data.faq.filter(faq =>
            faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [data.faq, searchTerm]);

    const totalPages = Math.ceil(filteredFaqs.length / entriesPerPage);
    const paginatedFaqs = useMemo(() => {
        const startIndex = (currentPage - 1) * entriesPerPage;
        return filteredFaqs.slice(startIndex, startIndex + entriesPerPage);
    }, [filteredFaqs, currentPage, entriesPerPage]);

    const openModalForNew = () => {
        setEditingFaq({ question: '', answer: '' });
        setIsModalOpen(true);
    };

    const openModalForEdit = (faq: FAQ) => {
        setEditingFaq(faq);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setEditingFaq(null);
        setIsModalOpen(false);
    };

    const handleSave = (faqToSave: FAQ | Partial<FAQ>) => {
        if ('id' in faqToSave && faqToSave.id) { // Editing existing FAQ
            setData(prev => ({
                ...prev,
                faq: prev.faq.map(f => f.id === faqToSave.id ? { ...f, ...faqToSave } as FAQ : f)
            }));
        } else { // Creating new FAQ
            const newFaq: FAQ = {
                id: `faq-${Date.now()}`,
                question: faqToSave.question || 'New Question',
                answer: faqToSave.answer || 'New Answer',
            };
            setData(prev => ({ ...prev, faq: [...prev.faq, newFaq] }));
        }
        closeModal();
    };

    const handleDelete = (faqId: string) => {
        if (window.confirm('Are you sure you want to delete this FAQ?')) {
            setData(prev => ({ ...prev, faq: prev.faq.filter(f => f.id !== faqId) }));
        }
    };

    return (
        <div>
            <div className="flex justify-end mb-6">
                <button onClick={openModalForNew} className="bg-dx-accent text-dx-dark font-bold py-2 px-4 rounded-lg hover:opacity-80 transition-opacity flex items-center gap-2">
                    <PlusIcon className="h-5 w-5" /> Add New
                </button>
            </div>
            <div className="bg-dx-light-2 dark:bg-dx-dark-2 p-6 rounded-xl border border-dx-light-3 dark:border-dx-dark-3 shadow-sm dark:shadow-dx-accent/10">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
                    <div className="flex items-center gap-2">
                        <select
                            value={entriesPerPage}
                            onChange={(e) => { setEntriesPerPage(Number(e.target.value)); setCurrentPage(1); }}
                            className="bg-dx-light-3 dark:bg-dx-dark-3 p-2 rounded-lg border border-dx-light-3 dark:border-dx-dark-3 focus:outline-none focus:border-dx-accent appearance-none"
                        >
                            <option value={10}>10</option>
                            <option value={25}>25</option>
                            <option value={50}>50</option>
                        </select>
                        <span className="text-sm text-dx-gray">entries per page</span>
                    </div>
                    <div className="relative w-full sm:w-auto">
                        <input
                            type="text"
                            placeholder="Search records"
                            value={searchTerm}
                            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                            className="pl-10 pr-4 py-2 rounded-lg bg-dx-light-3 dark:bg-dx-dark-3 border border-dx-light-3 dark:border-dx-dark-3 focus:outline-none focus:border-dx-accent transition-colors w-full"
                        />
                        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-dx-gray" />
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="border-b border-dx-light-3 dark:border-dx-dark-3 text-dx-gray uppercase text-sm">
                            <tr>
                                <th className="p-3">Title</th>
                                <th className="p-3">Description</th>
                                <th className="p-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedFaqs.length > 0 ? paginatedFaqs.map(faq => (
                                <tr key={faq.id} className="border-b border-dx-light-3 dark:border-dx-dark-3 last:border-0 hover:bg-dx-light-3/50 dark:hover:bg-dx-dark-3/50">
                                    <td className="p-3 whitespace-nowrap">{faq.question}</td>
                                    <td className="p-3 max-w-sm overflow-hidden text-ellipsis whitespace-nowrap">{faq.answer}</td>
                                    <td className="p-3 text-right space-x-4 whitespace-nowrap">
                                        <button onClick={() => openModalForEdit(faq)} className="text-dx-accent hover:opacity-80 font-semibold px-2 py-1 rounded-md bg-dx-accent/10">Edit</button>
                                        <button onClick={() => handleDelete(faq.id)} className="text-red-500 hover:text-red-400 font-semibold px-2 py-1 rounded-md bg-red-500/10">Delete</button>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={3} className="p-3 text-center text-dx-gray">No FAQs found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-between items-center mt-4">
                    <p className="text-sm text-dx-gray">Showing {((currentPage - 1) * entriesPerPage) + 1} to {Math.min(currentPage * entriesPerPage, filteredFaqs.length)} of {filteredFaqs.length} entries</p>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="px-3 py-1 rounded-lg bg-dx-light-3 dark:bg-dx-dark-3 text-dx-gray hover:bg-dx-light-2 dark:hover:bg-dx-dark-4 disabled:opacity-50"
                        >
                            Previous
                        </button>
                        {[...Array(totalPages)].map((_, i) => (
                            <button
                                key={i + 1}
                                onClick={() => setCurrentPage(i + 1)}
                                className={`px-3 py-1 rounded-lg ${currentPage === i + 1 ? 'bg-dx-accent text-dx-dark font-bold' : 'bg-dx-light-3 dark:bg-dx-dark-3 text-dx-gray hover:bg-dx-light-2 dark:hover:bg-dx-dark-4'}`}
                            >
                                {i + 1}
                            </button>
                        ))}
                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="px-3 py-1 rounded-lg bg-dx-light-3 dark:bg-dx-dark-3 text-dx-gray hover:bg-dx-light-2 dark:hover:bg-dx-dark-4 disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
            {isModalOpen && editingFaq && (
                <FaqModal
                    faq={editingFaq}
                    onSave={handleSave}
                    onClose={closeModal}
                />
            )}
        </div>
    );
};

const FaqModal: React.FC<{
    faq: FAQ | Partial<FAQ>;
    onSave: (faq: FAQ | Partial<FAQ>) => void;
    onClose: () => void;
}> = ({ faq, onSave, onClose }) => {
    const [formData, setFormData] = useState(faq);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-opacity" role="dialog" aria-modal="true" aria-labelledby="faq-modal-title">
            <div className="bg-dx-light dark:bg-dx-dark-2 p-8 rounded-2xl w-full max-w-md shadow-2xl border border-dx-light-3 dark:border-dx-dark-3 transform transition-all" onClick={e => e.stopPropagation()}>
                <h3 id="faq-modal-title" className="text-2xl font-bold mb-6 text-dx-accent">{'id' in formData ? 'Edit FAQ' : 'Add FAQ'}</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="faqQuestion" className="block mb-1 text-dx-gray text-sm">Question</label>
                        <input id="faqQuestion" type="text" name="question" value={formData.question || ''} onChange={handleChange} required className="w-full bg-dx-light-2 dark:bg-dx-dark-3 p-2 rounded-lg border-2 border-transparent focus:border-dx-accent outline-none" />
                    </div>
                    <div>
                        <label htmlFor="faqAnswer" className="block mb-1 text-dx-gray text-sm">Answer</label>
                        <textarea id="faqAnswer" name="answer" value={formData.answer || ''} onChange={handleChange} required rows={4} className="w-full bg-dx-light-2 dark:bg-dx-dark-3 p-2 rounded-lg border-2 border-transparent focus:border-dx-accent outline-none"></textarea>
                    </div>
                    <div className="flex justify-end gap-4 pt-4">
                        <button type="button" onClick={onClose} className="py-2 px-5 rounded-lg bg-dx-light-3 dark:bg-dx-dark-3 text-dx-dark dark:text-dx-light hover:opacity-80 transition-opacity font-semibold">Cancel</button>
                        <button type="submit" className="py-2 px-5 rounded-lg bg-dx-accent text-dx-dark font-bold hover:opacity-80 transition-opacity">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const FeedbackManagement: React.FC<{data: AppData, setData: React.Dispatch<React.SetStateAction<AppData>>}> = ({data, setData}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [entriesPerPage, setEntriesPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    const filteredFeedback = useMemo(() => {
        return data.feedback.filter(fb => {
            const user = data.users.find(u => u.id === fb.userId);
            return (
                fb.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user?.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                String(fb.rating).includes(searchTerm)
            );
        });
    }, [data.feedback, data.users, searchTerm]);

    const totalPages = Math.ceil(filteredFeedback.length / entriesPerPage);
    const paginatedFeedback = useMemo(() => {
        const startIndex = (currentPage - 1) * entriesPerPage;
        return filteredFeedback.slice(startIndex, startIndex + entriesPerPage);
    }, [filteredFeedback, currentPage, entriesPerPage]);

    const handleDelete = (feedbackId: string) => {
        if (window.confirm('Are you sure you want to delete this feedback?')) {
            setData(prev => ({ ...prev, feedback: prev.feedback.filter(fb => fb.id !== feedbackId) }));
        }
    };

    return (
        <div>
            {/* Feedback doesn't have an "Add New" button in the screenshot */}
            <div className="bg-dx-light-2 dark:bg-dx-dark-2 p-6 rounded-xl border border-dx-light-3 dark:border-dx-dark-3 shadow-sm dark:shadow-dx-accent/10">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
                    <div className="flex items-center gap-2">
                        <select
                            value={entriesPerPage}
                            onChange={(e) => { setEntriesPerPage(Number(e.target.value)); setCurrentPage(1); }}
                            className="bg-dx-light-3 dark:bg-dx-dark-3 p-2 rounded-lg border border-dx-light-3 dark:border-dx-dark-3 focus:outline-none focus:border-dx-accent appearance-none"
                        >
                            <option value={10}>10</option>
                            <option value={25}>25</option>
                            <option value={50}>50</option>
                        </select>
                        <span className="text-sm text-dx-gray">entries per page</span>
                    </div>
                    <div className="relative w-full sm:w-auto">
                        <input
                            type="text"
                            placeholder="Search records"
                            value={searchTerm}
                            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                            className="pl-10 pr-4 py-2 rounded-lg bg-dx-light-3 dark:bg-dx-dark-3 border border-dx-light-3 dark:border-dx-dark-3 focus:outline-none focus:border-dx-accent transition-colors w-full"
                        />
                        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-dx-gray" />
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="border-b border-dx-light-3 dark:border-dx-dark-3 text-dx-gray uppercase text-sm">
                            <tr>
                                <th className="p-3">User Email</th>
                                <th className="p-3">Message</th>
                                <th className="p-3">Rating</th>
                                <th className="p-3">Date</th>
                                <th className="p-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedFeedback.length > 0 ? paginatedFeedback.map(fb => {
                                const user = data.users.find(u => u.id === fb.userId);
                                return (
                                    <tr key={fb.id} className="border-b border-dx-light-3 dark:border-dx-dark-3 last:border-0 hover:bg-dx-light-3/50 dark:hover:bg-dx-dark-3/50">
                                        <td className="p-3 whitespace-nowrap">{user?.email || 'N/A'}</td>
                                        <td className="p-3 max-w-sm overflow-hidden text-ellipsis whitespace-nowrap">{fb.message}</td>
                                        <td className="p-3 whitespace-nowrap">{fb.rating} / 5</td>
                                        <td className="p-3 whitespace-nowrap">{new Date(fb.timestamp).toLocaleDateString()}</td>
                                        <td className="p-3 text-right space-x-4 whitespace-nowrap">
                                            <button onClick={() => handleDelete(fb.id)} className="text-red-500 hover:text-red-400 font-semibold px-2 py-1 rounded-md bg-red-500/10">Delete</button>
                                        </td>
                                    </tr>
                                );
                            }) : (
                                <tr>
                                    <td colSpan={5} className="p-3 text-center text-dx-gray">No feedback received.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-between items-center mt-4">
                    <p className="text-sm text-dx-gray">Showing {((currentPage - 1) * entriesPerPage) + 1} to {Math.min(currentPage * entriesPerPage, filteredFeedback.length)} of {filteredFeedback.length} entries</p>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="px-3 py-1 rounded-lg bg-dx-light-3 dark:bg-dx-dark-3 text-dx-gray hover:bg-dx-light-2 dark:hover:bg-dx-dark-4 disabled:opacity-50"
                        >
                            Previous
                        </button>
                        {[...Array(totalPages)].map((_, i) => (
                            <button
                                key={i + 1}
                                onClick={() => setCurrentPage(i + 1)}
                                className={`px-3 py-1 rounded-lg ${currentPage === i + 1 ? 'bg-dx-accent text-dx-dark font-bold' : 'bg-dx-light-3 dark:bg-dx-dark-3 text-dx-gray hover:bg-dx-light-2 dark:hover:bg-dx-dark-4'}`}
                            >
                                {i + 1}
                            </button>
                        ))}
                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="px-3 py-1 rounded-lg bg-dx-light-3 dark:bg-dx-dark-3 text-dx-gray hover:bg-dx-light-2 dark:hover:bg-dx-dark-4 disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const LegalContentEditor: React.FC<{
    title: string;
    contentKey: keyof Pick<AppData, 'termsAndConditions' | 'privacyPolicy' | 'eula' | 'securityNotes'>;
    data: AppData;
    setData: React.Dispatch<React.SetStateAction<AppData>>;
}> = ({ title, contentKey, data, setData }) => {
    const [content, setContent] = useState(data[contentKey]);

    const handleSave = () => {
        setData(prev => ({ ...prev, [contentKey]: content }));
        alert(`${title} saved!`);
    };

    const handleCancel = () => {
        setContent(data[contentKey]); // Reset to original content
        alert('Changes cancelled.');
    };

    return (
        <div>
            <div className="bg-dx-light-2 dark:bg-dx-dark-2 p-6 rounded-xl border border-dx-light-3 dark:border-dx-dark-3 space-y-4 shadow-sm dark:shadow-dx-accent/10">
                {/* Simple rich text editor placeholder */}
                <div className="border border-dx-light-3 dark:border-dx-dark-3 rounded-lg overflow-hidden">
                    <div className="flex p-2 gap-2 bg-dx-light-3 dark:bg-dx-dark-3 rounded-t-lg border-b border-dx-light-3 dark:border-dx-dark-3">
                        <button className="p-1 rounded hover:bg-dx-light-2 dark:hover:bg-dx-dark-2 text-dx-gray" title="Bold" aria-label="Bold text">B</button>
                        <button className="p-1 rounded hover:bg-dx-light-2 dark:hover:bg-dx-dark-2 text-dx-gray" title="Italic" aria-label="Italic text">I</button>
                        <button className="p-1 rounded hover:bg-dx-light-2 dark:hover:bg-dx-dark-2 text-dx-gray" title="Underline" aria-label="Underline text">U</button>
                        {/* More editor controls can be added here */}
                    </div>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full h-64 p-4 bg-dx-light-2 dark:bg-dx-dark-3 rounded-b-lg border-2 border-transparent focus:border-dx-accent outline-none resize-y text-dx-dark dark:text-dx-light"
                        aria-label={`Edit ${title}`}
                    ></textarea>
                </div>
                <div className="flex justify-end gap-4 pt-4">
                    <button type="button" onClick={handleCancel} className="py-2 px-5 rounded-lg bg-dx-light-3 dark:bg-dx-dark-3 text-dx-dark dark:text-dx-light hover:opacity-80 transition-opacity font-semibold">Cancel</button>
                    <button type="button" onClick={handleSave} className="py-2 px-5 rounded-lg bg-dx-accent text-dx-dark font-bold hover:opacity-80 transition-opacity">Submit</button>
                </div>
            </div>
        </div>
    );
};

const ServerManagement: React.FC<{data: AppData, setData: React.Dispatch<React.SetStateAction<AppData>>}> = ({data, setData}) => {
    const [newServer, setNewServer] = useState<Partial<Server>>({
        protocol: ServerProtocol.WIREGUARD,
        provideTo: 'Free',
        countryCode: '',
        countryName: '',
        serverIp: '',
        latitude: 0,
        longitude: 0,
    });
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingServer, setEditingServer] = useState<Server | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [entriesPerPage, setEntriesPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    const filteredServers = useMemo(() => {
        return data.servers.filter(server =>
            server.countryName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            server.serverIp.toLowerCase().includes(searchTerm.toLowerCase()) ||
            server.protocol.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [data.servers, searchTerm]);

    const totalPages = Math.ceil(filteredServers.length / entriesPerPage);
    const paginatedServers = useMemo(() => {
        const startIndex = (currentPage - 1) * entriesPerPage;
        return filteredServers.slice(startIndex, startIndex + entriesPerPage);
    }, [filteredServers, currentPage, entriesPerPage]);


    const handleCreate = () => {
        if (!newServer.countryCode || !newServer.countryName || !newServer.serverIp) {
            alert('Please fill in all required fields (Country Code, Country Name, Server IP).');
            return;
        }

        const serverToAdd: Server = {
            id: `server-${Date.now()}`,
            countryCode: newServer.countryCode,
            countryName: newServer.countryName,
            protocol: newServer.protocol || ServerProtocol.WIREGUARD,
            serverIp: newServer.serverIp,
            provideTo: newServer.provideTo || 'Free',
            latitude: Number(newServer.latitude) || 0,
            longitude: Number(newServer.longitude) || 0,
            ...((newServer.protocol === ServerProtocol.IPSEC_EAP || newServer.protocol === ServerProtocol.IPSEC_PSK) && {
                remoteId: newServer.remoteId || '',
                localId: newServer.localId || '',
                secretKey: newServer.secretKey || '',
            }),
        } as Server; // Cast to Server to satisfy type inference after conditional props

        setData(prev => ({...prev, servers: [...prev.servers, serverToAdd]}));
        setNewServer({ protocol: ServerProtocol.WIREGUARD, provideTo: 'Free', countryCode: '', countryName: '', serverIp: '', latitude: 0, longitude: 0 }); // Reset form
    };

    const handleEdit = (server: Server) => {
        setEditingServer(server);
        setIsEditModalOpen(true);
    };

    const handleSaveEdit = (editedServer: Server) => {
        setData(prev => ({
            ...prev,
            servers: prev.servers.map(s => s.id === editedServer.id ? editedServer : s)
        }));
        setIsEditModalOpen(false);
        setEditingServer(null);
    };

    const handleDelete = (serverId: string) => {
        if (window.confirm('Are you sure you want to delete this server?')) {
            setData(prev => ({ ...prev, servers: prev.servers.filter(s => s.id !== serverId) }));
        }
    };

    return (
         <div>
            <div className="bg-dx-light-2 dark:bg-dx-dark-2 p-6 rounded-xl border border-dx-light-3 dark:border-dx-dark-3 mb-8 shadow-sm dark:shadow-dx-accent/10">
                 <h3 className="text-xl font-semibold mb-4 text-dx-dark dark:text-dx-light">Create New Server</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                     <select value={newServer.protocol} onChange={e => setNewServer({...newServer, protocol: e.target.value as ServerProtocol})} className="bg-dx-light-3 dark:bg-dx-dark-3 p-2 rounded-lg border border-dx-light-3 dark:border-dx-dark-3 focus:border-dx-accent outline-none text-dx-dark dark:text-dx-light">
                         {Object.values(ServerProtocol).map(p => <option key={p} value={p}>{p}</option>)}
                     </select>
                     <input type="text" placeholder="Country Code (e.g., US)" value={newServer.countryCode || ''} onChange={e => setNewServer({...newServer, countryCode: e.target.value})} className="bg-dx-light-3 dark:bg-dx-dark-3 p-2 rounded-lg border border-dx-light-3 dark:border-dx-dark-3 focus:border-dx-accent outline-none text-dx-dark dark:text-dx-light" required/>
                     <input type="text" placeholder="Country Name" value={newServer.countryName || ''} onChange={e => setNewServer({...newServer, countryName: e.target.value})} className="bg-dx-light-3 dark:bg-dx-dark-3 p-2 rounded-lg border border-dx-light-3 dark:border-dx-dark-3 focus:border-dx-accent outline-none text-dx-dark dark:text-dx-light" required/>
                     <input type="text" placeholder="Server IP" value={newServer.serverIp || ''} onChange={e => setNewServer({...newServer, serverIp: e.target.value})} className="bg-dx-light-3 dark:bg-dx-dark-3 p-2 rounded-lg border border-dx-light-3 dark:border-dx-dark-3 focus:border-dx-accent outline-none text-dx-dark dark:text-dx-light" required/>
                     <input type="number" placeholder="Latitude" value={newServer.latitude === 0 && newServer.latitude !== null ? '' : newServer.latitude || ''} onChange={e => setNewServer({...newServer, latitude: parseFloat(e.target.value)})} className="bg-dx-light-3 dark:bg-dx-dark-3 p-2 rounded-lg border border-dx-light-3 dark:border-dx-dark-3 focus:border-dx-accent outline-none text-dx-dark dark:text-dx-light"/>
                     <input type="number" placeholder="Longitude" value={newServer.longitude === 0 && newServer.longitude !== null ? '' : newServer.longitude || ''} onChange={e => setNewServer({...newServer, longitude: parseFloat(e.target.value)})} className="bg-dx-light-3 dark:bg-dx-dark-3 p-2 rounded-lg border border-dx-light-3 dark:border-dx-dark-3 focus:border-dx-accent outline-none text-dx-dark dark:text-dx-light"/>

                     {(newServer.protocol === ServerProtocol.IPSEC_EAP || newServer.protocol === ServerProtocol.IPSEC_PSK) && (
                         <>
                             <input type="text" placeholder="Remote ID" value={newServer.remoteId || ''} onChange={e => setNewServer({...newServer, remoteId: e.target.value})} className="bg-dx-light-3 dark:bg-dx-dark-3 p-2 rounded-lg border border-dx-light-3 dark:border-dx-dark-3 focus:border-dx-accent outline-none text-dx-dark dark:text-dx-light"/>
                             <input type="text" placeholder="Local ID" value={newServer.localId || ''} onChange={e => setNewServer({...newServer, localId: e.target.value})} className="bg-dx-light-3 dark:bg-dx-dark-3 p-2 rounded-lg border border-dx-light-3 dark:border-dx-dark-3 focus:border-dx-accent outline-none text-dx-dark dark:text-dx-light"/>
                             <input type="text" placeholder="Secret Key" value={newServer.secretKey || ''} onChange={e => setNewServer({...newServer, secretKey: e.target.value})} className="bg-dx-light-3 dark:bg-dx-dark-3 p-2 rounded-lg border border-dx-light-3 dark:border-dx-dark-3 focus:border-dx-accent outline-none text-dx-dark dark:text-dx-light"/>
                         </>
                     )}
                 </div>
                 <button onClick={handleCreate} className="mt-4 bg-dx-accent text-dx-dark font-bold py-2 px-4 rounded-lg hover:opacity-80 transition-opacity">Create Server</button>
            </div>

            <div className="bg-dx-light-2 dark:bg-dx-dark-2 p-6 rounded-xl border border-dx-light-3 dark:border-dx-dark-3 shadow-sm dark:shadow-dx-accent/10">
                 <h3 className="text-xl font-semibold mb-4 text-dx-dark dark:text-dx-light">All Servers</h3>
                 <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
                    <div className="flex items-center gap-2">
                        <select
                            value={entriesPerPage}
                            onChange={(e) => { setEntriesPerPage(Number(e.target.value)); setCurrentPage(1); }}
                            className="bg-dx-light-3 dark:bg-dx-dark-3 p-2 rounded-lg border border-dx-light-3 dark:border-dx-dark-3 focus:outline-none focus:border-dx-accent appearance-none"
                        >
                            <option value={10}>10</option>
                            <option value={25}>25</option>
                            <option value={50}>50</option>
                        </select>
                        <span className="text-sm text-dx-gray">entries per page</span>
                    </div>
                    <div className="relative w-full sm:w-auto">
                        <input
                            type="text"
                            placeholder="Search records"
                            value={searchTerm}
                            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                            className="pl-10 pr-4 py-2 rounded-lg bg-dx-light-3 dark:bg-dx-dark-3 border border-dx-light-3 dark:border-dx-dark-3 focus:outline-none focus:border-dx-accent transition-colors w-full"
                        />
                        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-dx-gray" />
                    </div>
                </div>
                 <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="border-b border-dx-light-3 dark:border-dx-dark-3 text-dx-gray uppercase text-sm">
                            <tr>
                                <th className="p-3">Country</th>
                                <th className="p-3">Server IP</th>
                                <th className="p-3">Protocol</th>
                                <th className="p-3">Type</th>
                                <th className="p-3">Location</th>
                                <th className="p-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedServers.length > 0 ? paginatedServers.map(server => (
                                <tr key={server.id} className="border-b border-dx-light-3 dark:border-dx-dark-3 last:border-0 hover:bg-dx-light-3/50 dark:hover:bg-dx-dark-3/50">
                                    <td className="p-3 whitespace-nowrap flex items-center gap-3">
                                        <img src={`https://flagcdn.com/w20/${server.countryCode.toLowerCase()}.png`} alt={server.countryName} className="w-5 h-auto rounded-sm" />
                                        {server.countryName}
                                    </td>
                                    <td className="p-3 whitespace-nowrap font-mono">{server.serverIp}</td>
                                    <td className="p-3 whitespace-nowrap">{server.protocol}</td>
                                    <td className="p-3 whitespace-nowrap">
                                        <span className={`px-2 py-1 text-xs font-bold rounded-full ${server.provideTo === 'Premium' ? 'bg-yellow-400/10 text-yellow-400' : 'bg-green-400/10 text-green-400'}`}>
                                            {server.provideTo}
                                        </span>
                                    </td>
                                    <td className="p-3 whitespace-nowrap">
                                        <div className="flex items-center gap-2 text-dx-gray">
                                            <LocationMarkerIcon className="w-4 h-4 text-dx-accent flex-shrink-0" />
                                            <span className="font-mono text-xs">{server.latitude.toFixed(2)}, {server.longitude.toFixed(2)}</span>
                                        </div>
                                    </td>
                                    <td className="p-3 text-right space-x-4 whitespace-nowrap">
                                        <button onClick={() => handleEdit(server)} className="text-dx-accent hover:opacity-80 font-semibold px-2 py-1 rounded-md bg-dx-accent/10">Edit</button>
                                        <button onClick={() => handleDelete(server.id)} className="text-red-500 hover:text-red-400 font-semibold px-2 py-1 rounded-md bg-red-500/10">Delete</button>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={6} className="p-3 text-center text-dx-gray">No servers found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-between items-center mt-4">
                    <p className="text-sm text-dx-gray">Showing {((currentPage - 1) * entriesPerPage) + 1} to {Math.min(currentPage * entriesPerPage, filteredServers.length)} of {filteredServers.length} entries</p>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="px-3 py-1 rounded-lg bg-dx-light-3 dark:bg-dx-dark-3 text-dx-gray hover:bg-dx-light-2 dark:hover:bg-dx-dark-4 disabled:opacity-50"
                        >
                            Previous
                        </button>
                        {[...Array(totalPages)].map((_, i) => (
                            <button
                                key={i + 1}
                                onClick={() => setCurrentPage(i + 1)}
                                className={`px-3 py-1 rounded-lg ${currentPage === i + 1 ? 'bg-dx-accent text-dx-dark font-bold' : 'bg-dx-light-3 dark:bg-dx-dark-3 text-dx-gray hover:bg-dx-light-2 dark:hover:bg-dx-dark-4'}`}
                            >
                                {i + 1}
                            </button>
                        ))}
                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="px-3 py-1 rounded-lg bg-dx-light-3 dark:bg-dx-dark-3 text-dx-gray hover:bg-dx-light-2 dark:hover:bg-dx-dark-4 disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
            {isEditModalOpen && editingServer && (
                <ServerModal
                    server={editingServer}
                    onSave={handleSaveEdit}
                    onClose={() => setIsEditModalOpen(false)}
                />
            )}
         </div>
    );
};

const ServerModal: React.FC<{
    server: Server;
    onSave: (server: Server) => void;
    onClose: () => void;
}> = ({ server, onSave, onClose }) => {
    const [formData, setFormData] = useState<Server>(server);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-opacity" role="dialog" aria-modal="true" aria-labelledby="server-modal-title">
            <div className="bg-dx-light dark:bg-dx-dark-2 p-8 rounded-2xl w-full max-w-md shadow-2xl border border-dx-light-3 dark:border-dx-dark-3 transform transition-all" onClick={e => e.stopPropagation()}>
                <h3 id="server-modal-title" className="text-2xl font-bold mb-6 text-dx-accent">Edit Server</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="serverProtocol" className="block mb-1 text-dx-gray text-sm">Protocol</label>
                        <select id="serverProtocol" name="protocol" value={formData.protocol} onChange={handleChange} className="w-full bg-dx-light-2 dark:bg-dx-dark-3 p-2 rounded-lg border-2 border-transparent focus:border-dx-accent outline-none text-dx-dark dark:text-dx-light">
                            {Object.values(ServerProtocol).map(p => <option key={p} value={p}>{p}</option>)}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="serverCountryCode" className="block mb-1 text-dx-gray text-sm">Country Code</label>
                        <input id="serverCountryCode" type="text" name="countryCode" value={formData.countryCode} onChange={handleChange} required className="w-full bg-dx-light-2 dark:bg-dx-dark-3 p-2 rounded-lg border-2 border-transparent focus:border-dx-accent outline-none" />
                    </div>
                    <div>
                        <label htmlFor="serverCountryName" className="block mb-1 text-dx-gray text-sm">Country Name</label>
                        <input id="serverCountryName" type="text" name="countryName" value={formData.countryName} onChange={handleChange} required className="w-full bg-dx-light-2 dark:bg-dx-dark-3 p-2 rounded-lg border-2 border-transparent focus:border-dx-accent outline-none" />
                    </div>
                    <div>
                        <label htmlFor="serverIp" className="block mb-1 text-dx-gray text-sm">Server IP</label>
                        <input id="serverIp" type="text" name="serverIp" value={formData.serverIp} onChange={handleChange} required className="w-full bg-dx-light-2 dark:bg-dx-dark-3 p-2 rounded-lg border-2 border-transparent focus:border-dx-accent outline-none" />
                    </div>
                    <div>
                        <label htmlFor="serverProvideTo" className="block mb-1 text-dx-gray text-sm">Provide To</label>
                        <select id="serverProvideTo" name="provideTo" value={formData.provideTo} onChange={handleChange} className="w-full bg-dx-light-2 dark:bg-dx-dark-3 p-2 rounded-lg border-2 border-transparent focus:border-dx-accent outline-none text-dx-dark dark:text-dx-light">
                            <option value="Free">Free</option>
                            <option value="Premium">Premium</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="serverLatitude" className="block mb-1 text-dx-gray text-sm">Latitude</label>
                        <input id="serverLatitude" type="number" name="latitude" value={formData.latitude} onChange={handleNumberChange} className="w-full bg-dx-light-2 dark:bg-dx-dark-3 p-2 rounded-lg border-2 border-transparent focus:border-dx-accent outline-none" />
                    </div>
                    <div>
                        <label htmlFor="serverLongitude" className="block mb-1 text-dx-gray text-sm">Longitude</label>
                        <input id="serverLongitude" type="number" name="longitude" value={formData.longitude} onChange={handleNumberChange} className="w-full bg-dx-light-2 dark:bg-dx-dark-3 p-2 rounded-lg border-2 border-transparent focus:border-dx-accent outline-none" />
                    </div>
                    {(formData.protocol === ServerProtocol.IPSEC_EAP || formData.protocol === ServerProtocol.IPSEC_PSK) && (
                        <>
                            <div>
                                <label htmlFor="serverRemoteId" className="block mb-1 text-dx-gray text-sm">Remote ID</label>
                                <input id="serverRemoteId" type="text" name="remoteId" value={formData.remoteId || ''} onChange={handleChange} className="w-full bg-dx-light-2 dark:bg-dx-dark-3 p-2 rounded-lg border-2 border-transparent focus:border-dx-accent outline-none" />
                            </div>
                            <div>
                                <label htmlFor="serverLocalId" className="block mb-1 text-dx-gray text-sm">Local ID</label>
                                <input id="serverLocalId" type="text" name="localId" value={formData.localId || ''} onChange={handleChange} className="w-full bg-dx-light-2 dark:bg-dx-dark-3 p-2 rounded-lg border-2 border-transparent focus:border-dx-accent outline-none" />
                            </div>
                            <div>
                                <label htmlFor="serverSecretKey" className="block mb-1 text-dx-gray text-sm">Secret Key</label>
                                <input id="serverSecretKey" type="text" name="secretKey" value={formData.secretKey || ''} onChange={handleChange} className="w-full bg-dx-light-2 dark:bg-dx-dark-3 p-2 rounded-lg border-2 border-transparent focus:border-dx-accent outline-none" />
                            </div>
                        </>
                    )}
                    <div className="flex justify-end gap-4 pt-4">
                        <button type="button" onClick={onClose} className="py-2 px-5 rounded-lg bg-dx-light-3 dark:bg-dx-dark-3 text-dx-dark dark:text-dx-light hover:opacity-80 transition-opacity font-semibold">Cancel</button>
                        <button type="submit" className="py-2 px-5 rounded-lg bg-dx-accent text-dx-dark font-bold hover:opacity-80 transition-opacity">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
};


const SubscriptionManagement: React.FC<{data: AppData, setData: React.Dispatch<React.SetStateAction<AppData>>}> = ({data, setData}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingSubscription, setEditingSubscription] = useState<Subscription | Partial<Subscription> | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [entriesPerPage, setEntriesPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    const filteredSubscriptions = useMemo(() => {
        return data.subscriptions.filter(sub =>
            sub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            sub.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
            String(sub.price || '').includes(searchTerm)
        );
    }, [data.subscriptions, searchTerm]);

    const totalPages = Math.ceil(filteredSubscriptions.length / entriesPerPage);
    const paginatedSubscriptions = useMemo(() => {
        const startIndex = (currentPage - 1) * entriesPerPage;
        return filteredSubscriptions.slice(startIndex, startIndex + entriesPerPage);
    }, [filteredSubscriptions, currentPage, entriesPerPage]);


    const openModalForNew = () => {
        setEditingSubscription({ name: '', type: SubscriptionType.FREE, price: 0, paymentApi: '' });
        setIsModalOpen(true);
    };

    const openModalForEdit = (subscription: Subscription) => {
        setEditingSubscription(subscription);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setEditingSubscription(null);
        setIsModalOpen(false);
    };

    const handleSave = (subToSave: Subscription | Partial<Subscription>) => {
        if ('id' in subToSave && subToSave.id) { // Editing existing subscription
            setData(prev => ({
                ...prev,
                subscriptions: prev.subscriptions.map(s => s.id === subToSave.id ? { ...s, ...subToSave } as Subscription : s)
            }));
        } else { // Creating new subscription
            const newSubscription: Subscription = {
                id: `sub-${Date.now()}`,
                name: subToSave.name || 'New Subscription',
                type: subToSave.type || SubscriptionType.FREE,
                price: subToSave.type === SubscriptionType.PREMIUM ? (subToSave.price || 0) : undefined,
                paymentApi: subToSave.type === SubscriptionType.PREMIUM ? (subToSave.paymentApi || '') : undefined,
            };
            setData(prev => ({ ...prev, subscriptions: [...prev.subscriptions, newSubscription] }));
        }
        closeModal();
    };

    const handleDelete = (subId: string) => {
        if (window.confirm('Are you sure you want to delete this subscription? This will affect users currently subscribed to it.')) {
            setData(prev => ({ ...prev, subscriptions: prev.subscriptions.filter(s => s.id !== subId) }));
        }
    };

    return (
        <div>
            <div className="flex justify-end mb-6">
                <button onClick={openModalForNew} className="bg-dx-accent text-dx-dark font-bold py-2 px-4 rounded-lg hover:opacity-80 transition-opacity flex items-center gap-2">
                    <PlusIcon className="h-5 w-5" /> Add New
                </button>
            </div>
            <div className="bg-dx-light-2 dark:bg-dx-dark-2 p-6 rounded-xl border border-dx-light-3 dark:border-dx-dark-3 shadow-sm dark:shadow-dx-accent/10">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
                    <div className="flex items-center gap-2">
                        <select
                            value={entriesPerPage}
                            onChange={(e) => { setEntriesPerPage(Number(e.target.value)); setCurrentPage(1); }}
                            className="bg-dx-light-3 dark:bg-dx-dark-3 p-2 rounded-lg border border-dx-light-3 dark:border-dx-dark-3 focus:outline-none focus:border-dx-accent appearance-none"
                        >
                            <option value={10}>10</option>
                            <option value={25}>25</option>
                            <option value={50}>50</option>
                        </select>
                        <span className="text-sm text-dx-gray">entries per page</span>
                    </div>
                    <div className="relative w-full sm:w-auto">
                        <input
                            type="text"
                            placeholder="Search records"
                            value={searchTerm}
                            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                            className="pl-10 pr-4 py-2 rounded-lg bg-dx-light-3 dark:bg-dx-dark-3 border border-dx-light-3 dark:border-dx-dark-3 focus:outline-none focus:border-dx-accent transition-colors w-full"
                        />
                        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-dx-gray" />
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="border-b border-dx-light-3 dark:border-dx-dark-3 text-dx-gray uppercase text-sm">
                            <tr>
                                <th className="p-3">Name</th>
                                <th className="p-3">Type</th>
                                <th className="p-3">Price</th>
                                <th className="p-3">Payment API</th>
                                <th className="p-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedSubscriptions.length > 0 ? paginatedSubscriptions.map(sub => (
                                <tr key={sub.id} className="border-b border-dx-light-3 dark:border-dx-dark-3 last:border-0 hover:bg-dx-light-3/50 dark:hover:bg-dx-dark-3/50">
                                    <td className="p-3 whitespace-nowrap">{sub.name}</td>
                                    <td className="p-3 whitespace-nowrap">
                                        <span className={`px-2 py-1 text-xs font-bold rounded-full ${sub.type === SubscriptionType.PREMIUM ? 'bg-yellow-400/10 text-yellow-400' : 'bg-green-400/10 text-green-400'}`}>
                                            {sub.type}
                                        </span>
                                    </td>
                                    <td className="p-3 whitespace-nowrap">{sub.price ? `$${sub.price.toFixed(2)}` : 'N/A'}</td>
                                    <td className="p-3 max-w-xs overflow-hidden text-ellipsis whitespace-nowrap">{sub.paymentApi || 'N/A'}</td>
                                    <td className="p-3 text-right space-x-4 whitespace-nowrap">
                                        <button onClick={() => openModalForEdit(sub)} className="text-dx-accent hover:opacity-80 font-semibold px-2 py-1 rounded-md bg-dx-accent/10">Edit</button>
                                        <button onClick={() => handleDelete(sub.id)} className="text-red-500 hover:text-red-400 font-semibold px-2 py-1 rounded-md bg-red-500/10">Delete</button>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={5} className="p-3 text-center text-dx-gray">No subscriptions found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-between items-center mt-4">
                    <p className="text-sm text-dx-gray">Showing {((currentPage - 1) * entriesPerPage) + 1} to {Math.min(currentPage * entriesPerPage, filteredSubscriptions.length)} of {filteredSubscriptions.length} entries</p>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="px-3 py-1 rounded-lg bg-dx-light-3 dark:bg-dx-dark-3 text-dx-gray hover:bg-dx-light-2 dark:hover:bg-dx-dark-4 disabled:opacity-50"
                        >
                            Previous
                        </button>
                        {[...Array(totalPages)].map((_, i) => (
                            <button
                                key={i + 1}
                                onClick={() => setCurrentPage(i + 1)}
                                className={`px-3 py-1 rounded-lg ${currentPage === i + 1 ? 'bg-dx-accent text-dx-dark font-bold' : 'bg-dx-light-3 dark:bg-dx-dark-3 text-dx-gray hover:bg-dx-light-2 dark:hover:bg-dx-dark-4'}`}
                            >
                                {i + 1}
                            </button>
                        ))}
                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="px-3 py-1 rounded-lg bg-dx-light-3 dark:bg-dx-dark-3 text-dx-gray hover:bg-dx-light-2 dark:hover:bg-dx-dark-4 disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
            {isModalOpen && editingSubscription && (
                <SubscriptionModal
                    subscription={editingSubscription}
                    onSave={handleSave}
                    onClose={closeModal}
                />
            )}
        </div>
    );
};

const SubscriptionModal: React.FC<{
    subscription: Subscription | Partial<Subscription>;
    onSave: (subscription: Subscription | Partial<Subscription>) => void;
    onClose: () => void;
}> = ({ subscription, onSave, onClose }) => {
    const [formData, setFormData] = useState(subscription);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: name === 'price' ? parseFloat(value) || 0 : value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-opacity" role="dialog" aria-modal="true" aria-labelledby="subscription-modal-title">
            <div className="bg-dx-light dark:bg-dx-dark-2 p-8 rounded-2xl w-full max-w-md shadow-2xl border border-dx-light-3 dark:border-dx-dark-3 transform transition-all" onClick={e => e.stopPropagation()}>
                <h3 id="subscription-modal-title" className="text-2xl font-bold mb-6 text-dx-accent">{'id' in formData ? 'Edit Subscription' : 'Add Subscription'}</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="subName" className="block mb-1 text-dx-gray text-sm">Name</label>
                        <input id="subName" type="text" name="name" value={formData.name || ''} onChange={handleChange} required className="w-full bg-dx-light-2 dark:bg-dx-dark-3 p-2 rounded-lg border-2 border-transparent focus:border-dx-accent outline-none" />
                    </div>
                    <div>
                        <label htmlFor="subType" className="block mb-1 text-dx-gray text-sm">Type</label>
                        <select id="subType" name="type" value={formData.type} onChange={handleChange} className="w-full bg-dx-light-2 dark:bg-dx-dark-3 p-2 rounded-lg border-2 border-transparent focus:border-dx-accent outline-none appearance-none text-dx-dark dark:text-dx-light">
                            <option value={SubscriptionType.FREE}>{SubscriptionType.FREE}</option>
                            <option value={SubscriptionType.PREMIUM}>{SubscriptionType.PREMIUM}</option>
                        </select>
                    </div>
                    {formData.type === SubscriptionType.PREMIUM && (
                        <>
                            <div>
                                <label htmlFor="subPrice" className="block mb-1 text-dx-gray text-sm">Price</label>
                                <input id="subPrice" type="number" name="price" value={formData.price || ''} onChange={handleChange} step="0.01" required className="w-full bg-dx-light-2 dark:bg-dx-dark-3 p-2 rounded-lg border-2 border-transparent focus:border-dx-accent outline-none" />
                            </div>
                            <div>
                                <label htmlFor="subPaymentApi" className="block mb-1 text-dx-gray text-sm">Payment API (Key/Identifier)</label>
                                <input id="subPaymentApi" type="text" name="paymentApi" value={formData.paymentApi || ''} onChange={handleChange} className="w-full bg-dx-light-2 dark:bg-dx-dark-3 p-2 rounded-lg border-2 border-transparent focus:border-dx-accent outline-none" />
                            </div>
                        </>
                    )}
                    <div className="flex justify-end gap-4 pt-4">
                        <button type="button" onClick={onClose} className="py-2 px-5 rounded-lg bg-dx-light-3 dark:bg-dx-dark-3 text-dx-dark dark:text-dx-light hover:opacity-80 transition-opacity font-semibold">Cancel</button>
                        <button type="submit" className="py-2 px-5 rounded-lg bg-dx-accent text-dx-dark font-bold hover:opacity-80 transition-opacity">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
};


const AppSettingsManagement: React.FC<{data: AppData, setData: React.Dispatch<React.SetStateAction<AppData>>}> = ({data, setData}) => {
    const [settings, setSettings] = useState(data.settings);

    const handleSave = () => {
        setData(prev => ({ ...prev, settings: settings }));
        alert('Settings saved!');
    };

    return (
        <div>
            <div className="bg-dx-light-2 dark:bg-dx-dark-2 p-6 rounded-xl border border-dx-light-3 dark:border-dx-dark-3 space-y-4 shadow-sm dark:shadow-dx-accent/10">
                {Object.entries(settings).map(([key, value]) => (
                    <div key={key}>
                        <label htmlFor={`setting-${key}`} className="capitalize block mb-1 text-dx-gray">{key.replace(/([A-Z])/g, ' $1')}</label>
                        <input
                            id={`setting-${key}`}
                            type="text"
                            value={value}
                            onChange={(e) => setSettings(s => ({ ...s, [key]: e.target.value }))}
                            className="w-full bg-dx-light-3 dark:bg-dx-dark-3 p-2 rounded-lg border border-dx-light-3 dark:border-dx-dark-3 focus:border-dx-accent outline-none text-dx-dark dark:text-dx-light"
                        />
                    </div>
                ))}
                <button onClick={handleSave} className="bg-dx-accent text-dx-dark font-bold py-2 px-6 rounded-lg hover:opacity-80 transition-opacity">Save Settings</button>
            </div>
        </div>
    );
};
