import { useEffect, useState } from 'react';

const STATUS_OPTIONS = [
  { value: 'pending', label: 'Menunggu' },
  { value: 'diproses', label: 'Diproses' },
  { value: 'dikirim', label: 'Dikirim' },
  { value: 'selesai', label: 'Selesai' },
];

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notif, setNotif] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/orders');
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      setNotif({ type: 'error', message: 'Gagal mengambil data pesanan.' });
    }
    setLoading(false);
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const res = await fetch(`http://localhost:5000/api/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setNotif({ type: 'success', message: 'Status pesanan berhasil diupdate.' });
        fetchOrders();
      } else {
        setNotif({ type: 'error', message: 'Gagal update status pesanan.' });
      }
    } catch (err) {
      setNotif({ type: 'error', message: 'Gagal update status pesanan.' });
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-16 px-4">
      <h2 className="text-2xl font-bold mb-8">Daftar Pesanan (Admin)</h2>
      {notif && (
        <div className={`mb-4 p-3 rounded ${notif.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {notif.message}
        </div>
      )}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">ID</th>
                <th className="p-2 border">Nama</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Jenis</th>
                <th className="p-2 border">Ukuran</th>
                <th className="p-2 border">Jumlah</th>
                <th className="p-2 border">Alamat</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 && (
                <tr><td colSpan="9" className="text-center p-4">Belum ada pesanan.</td></tr>
              )}
              {orders.map(order => (
                <tr key={order.id_order}>
                  <td className="p-2 border">{order.id_order}</td>
                  <td className="p-2 border">{order.customer_nama}</td>
                  <td className="p-2 border">{order.customer_email}</td>
                  <td className="p-2 border">{order.jenis_bunga}</td>
                  <td className="p-2 border">{order.ukuran}</td>
                  <td className="p-2 border">{order.jumlah}</td>
                  <td className="p-2 border">{order.alamat}</td>
                  <td className="p-2 border font-semibold">{STATUS_OPTIONS.find(s => s.value === order.status)?.label || order.status}</td>
                  <td className="p-2 border">
                    <select
                      value={order.status}
                      onChange={e => handleStatusChange(order.id_order, e.target.value)}
                      className="border rounded px-2 py-1"
                    >
                      {STATUS_OPTIONS.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminOrders; 