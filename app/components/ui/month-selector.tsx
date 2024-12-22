import { months, Month } from '@/app/utils/calendar';

interface MonthSelectorProps {
  selectedMonth: Month;
  onChange: (month: Month) => void;
}

export function MonthSelector({ selectedMonth, onChange }: MonthSelectorProps) {
  return (
    <div className="relative">
      <select
        value={selectedMonth}
        onChange={(e) => onChange(e.target.value as Month)}
        className="w-full p-3 rounded-xl bg-white border border-gray-200 appearance-none pr-10"
      >
        {months.map((month) => (
          <option key={month} value={month}>
            {month} 2025
          </option>
        ))}
      </select>
      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
}