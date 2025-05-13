import Sidebar from './components/Sidebar';
import AdminHeader from './components/AdminHeader';
import AdminStats from './components/AdminStats';
import EventTable from './components/EventTable';

export default function AdminDashboard() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <AdminHeader />
        <AdminStats />
        <EventTable />
      </div>
    </div>
  );
}
