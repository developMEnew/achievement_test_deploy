import { MonthlyCount } from '@/app/utils/calendar';

interface MonthlySummaryProps {
  monthlyCounts: MonthlyCount;
}

export function MonthlySummary({ monthlyCounts }: MonthlySummaryProps) {
  const summaryEntries = Array.from(monthlyCounts.entries())
    .filter(([_, count]) => count > 0)
    .sort(([monthA], [monthB]) => monthA.localeCompare(monthB));

  if (summaryEntries.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm">
      <h3 className="text-sm font-medium text-gray-500 mb-3">Monthly Summary</h3>
      <div className="space-y-2">
        {summaryEntries.map(([month, count]) => (
          <div key={month} className="flex justify-between items-center text-gray-600">
            <span>{month}</span>
            <span className="font-medium">{count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}