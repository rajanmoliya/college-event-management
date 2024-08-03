//eslint-disable-next-line
const StatCard = ({ title, count }) => (
  <div className="bg-white shadow-md rounded-lg p-6">
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-3xl font-bold">{count}</p>
  </div>
);

export default StatCard;
