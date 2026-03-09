import React, { useState } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area 
} from 'recharts';
import { 
  Wallet, TrendingUp, TrendingDown, PiggyBank, Landmark, Plus, User, LogOut, Settings 
} from 'lucide-react';

// --- INITIAL DATA ---
const INITIAL_CATEGORIES = {
  income: ['Salary', 'Freelance', 'Investment'],
  spend: ['Food', 'Rent', 'Transport', 'Entertainment'],
  loan: ['Short Term', 'Long Term', 'Personal'],
  savings: ['Short Term', 'Long Term', 'Emergency Fund']
};

const MOCK_MONTHLY_DATA = [
  { name: 'Jan', income: 4000, spend: 2400, savings: 1000, loans: 500 },
  { name: 'Feb', income: 3000, spend: 1398, savings: 800, loans: 400 },
  { name: 'Mar', income: 5000, spend: 3800, savings: 1500, loans: 300 },
];

export default function FinanceApp() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);
  const [user, setUser] = useState({
    name: "Alex Doe",
    email: "alex@example.com",
    mobile: "+1 234 567 890",
    profession: "Software Engineer"
  });

  // --- UI COMPONENTS ---

  const LoginScreen = () => (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-6">
      <div className="bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-2xl w-full max-w-md border border-white/20">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-2">Welcome</h1>
        <p className="text-center text-gray-500 mb-8">Login to track your wealth</p>
        <div className="space-y-4">
          <input type="email" placeholder="Email" className="w-full p-4 rounded-xl bg-gray-100 border-none focus:ring-2 focus:ring-purple-400 outline-none" />
          <input type="password" placeholder="Password" className="w-full p-4 rounded-xl bg-gray-100 border-none focus:ring-2 focus:ring-purple-400 outline-none" />
          <button 
            onClick={() => setIsLoggedIn(true)}
            className="w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-xl shadow-lg hover:scale-[1.02] transition-transform"
          >
            Login Easily
          </button>
        </div>
      </div>
    </div>
  );

  const StatCard = ({ title, amount, icon: Icon, color }) => (
    <div className={`p-6 rounded-3xl bg-white shadow-sm border border-gray-100 flex items-center justify-between`}>
      <div>
        <p className="text-gray-500 text-sm font-medium">{title}</p>
        <h3 className="text-2xl font-bold text-gray-800">${amount}</h3>
      </div>
      <div className={`p-3 rounded-2xl ${color} text-white`}>
        <Icon size={24} />
      </div>
    </div>
  );

  const Dashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Monthly Income" amount="5,000" icon={TrendingUp} color="bg-emerald-500" />
        <StatCard title="Monthly Spend" amount="3,200" icon={TrendingDown} color="bg-rose-500" />
        <StatCard title="Total Savings" amount="12,400" icon={PiggyBank} color="bg-sky-500" />
        <StatCard title="Active Loans" amount="1,500" icon={Landmark} color="bg-amber-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold mb-4">Income vs Spend</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MOCK_MONTHLY_DATA}>
                <defs>
                  <linearGradient id="colorInc" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/><stop offset="95%" stopColor="#10b981" stopOpacity={0}/></linearGradient>
                  <linearGradient id="colorExp" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3}/><stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/></linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip />
                <Area type="monotone" dataKey="income" stroke="#10b981" fillOpacity={1} fill="url(#colorInc)" />
                <Area type="monotone" dataKey="spend" stroke="#f43f5e" fillOpacity={1} fill="url(#colorExp)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold mb-4">Loans & Savings</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={MOCK_MONTHLY_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip />
                <Line type="monotone" dataKey="savings" stroke="#0ea5e9" strokeWidth={3} dot={{ r: 6 }} />
                <Line type="monotone" dataKey="loans" stroke="#f59e0b" strokeWidth={3} dot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );

  const CategorySection = ({ type, title, color }) => {
    const [newItem, setNewItem] = useState("");
    const addCategory = () => {
      if (!newItem) return;
      setCategories({...categories, [type]: [...categories[type], newItem]});
      setNewItem("");
    };

    return (
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <h3 className={`text-xl font-bold mb-4 ${color}`}>{title}</h3>
        <div className="flex gap-2 mb-4">
          <input 
            value={newItem} 
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="Add category..." 
            className="flex-1 p-2 bg-gray-50 rounded-xl outline-none border border-gray-200"
          />
          <button onClick={addCategory} className="p-2 bg-gray-800 text-white rounded-xl"><Plus size={20}/></button>
        </div>
        <div className="flex flex-wrap gap-2">
          {categories[type].map((cat, i) => (
            <span key={i} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
              {cat}
            </span>
          ))}
        </div>
      </div>
    );
  };

  const ProfileView = () => (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
          <User size={48} />
        </div>
        <div>
          <h2 className="text-2xl font-bold">{user.name}</h2>
          <p className="text-gray-500">{user.profession}</p>
        </div>
      </div>
      <div className="mt-8 space-y-4">
        <div className="flex justify-between border-b pb-4">
          <span className="text-gray-500 font-medium">Email</span>
          <span className="text-gray-800">{user.email}</span>
        </div>
        <div className="flex justify-between border-b pb-4">
          <span className="text-gray-500 font-medium">Mobile</span>
          <span className="text-gray-800">{user.mobile}</span>
        </div>
      </div>
    </div>
  );

  if (!isLoggedIn) return <LoginScreen />;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar Navigation */}
      <nav className="w-20 md:w-64 bg-white border-r border-gray-200 flex flex-col p-4">
        <div className="flex items-center gap-3 px-2 mb-10">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white">
            <Wallet size={24} />
          </div>
          <span className="hidden md:block font-bold text-xl">SpendWise</span>
        </div>
        
        <div className="flex-1 space-y-2">
          {[
            { id: 'dashboard', icon: Wallet, label: 'Dashboard' },
            { id: 'categories', icon: Settings, label: 'Categories' },
            { id: 'profile', icon: User, label: 'Profile' }
          ].map(item => (
            <button 
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 p-3 rounded-2xl transition-all ${activeTab === item.id ? 'bg-indigo-50 text-indigo-600' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              <item.icon size={22} />
              <span className="hidden md:block font-medium">{item.label}</span>
            </button>
          ))}
        </div>

        <button 
          onClick={() => setIsLoggedIn(false)}
          className="flex items-center gap-3 p-3 text-rose-500 hover:bg-rose-50 rounded-2xl mt-auto"
        >
          <LogOut size={22} />
          <span className="hidden md:block font-medium">Logout</span>
        </button>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <header className="mb-8 flex justify-between items-center">
          <h2 className="text-3xl font-extrabold text-gray-800 capitalize">{activeTab}</h2>
          <div className="text-sm text-gray-500 font-medium bg-white px-4 py-2 rounded-full border border-gray-100">
            {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </div>
        </header>

        {activeTab === 'dashboard' && <Dashboard />}
        
        {activeTab === 'categories' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CategorySection type="income" title="Income Categories" color="text-emerald-600" />
            <CategorySection type="spend" title="Spending Categories" color="text-rose-600" />
            <CategorySection type="loan" title="Loan Categories" color="text-amber-600" />
            <CategorySection type="savings" title="Savings Categories" color="text-sky-600" />
          </div>
        )}

        {activeTab === 'profile' && <ProfileView />}
      </main>
    </div>
  );
}
