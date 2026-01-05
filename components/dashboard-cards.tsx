interface DashboardCardsProps {
  role: "admin" | "employee";
}

export default function DashboardCards({ role }: DashboardCardsProps) {
  const adminCards = [
    { title: "Total Employees", value: "150", icon: "👥", color: "bg-blue-500" },
    { title: "Present Today", value: "142", icon: "✅", color: "bg-green-500" },
    { title: "Pending Leaves", value: "8", icon: "📋", color: "bg-yellow-500" },
    { title: "Monthly Payroll", value: "₹75L", icon: "💰", color: "bg-purple-500" },
  ];

  const employeeCards = [
    { title: "Today's Status", value: "Present", icon: "✅", color: "bg-green-500" },
    { title: "Leave Balance", value: "12 days", icon: "🏖️", color: "bg-blue-500" },
    { title: "Work Hours", value: "8h 30m", icon: "⏰", color: "bg-orange-500" },
    { title: "Next Holiday", value: "Jan 26", icon: "🎉", color: "bg-purple-500" },
  ];

  const cards = role === "admin" ? adminCards : employeeCards;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-card text-card-foreground rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-border"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`${card.color} text-white text-3xl p-3 rounded-lg`}>
              {card.icon}
            </div>
          </div>
          <h3 className="text-muted-foreground text-sm font-medium">{card.title}</h3>
          <p className="text-2xl font-bold text-foreground mt-2">{card.value}</p>
        </div>
      ))}
    </div>
  );
}
