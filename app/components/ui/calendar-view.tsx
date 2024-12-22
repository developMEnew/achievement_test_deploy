import { useMemo } from 'react';
import type { Month } from '@/app/utils/calendar';

interface CalendarViewProps {
  month: Month;
  year: number;
  selectedDays: Set<string>;
  onDayToggle: (day: string) => void;
}

export function CalendarView({ month, year, selectedDays, onDayToggle }: CalendarViewProps) {
  const daysInMonth = useMemo(() => {
    const monthIndex = new Date(`${month} 1, ${year}`).getMonth();
    return new Date(year, monthIndex + 1, 0).getDate();
  }, [month, year]);

  const firstDayOfMonth = useMemo(() => {
    return new Date(`${month} 1, ${year}`).getDay();
  }, [month, year]);

  const days = useMemo(() => {
    const result = [];
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      result.push(null);
    }
    // Add the days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      result.push(i);
    }
    return result;
  }, [firstDayOfMonth, daysInMonth]);

  const getDayKey = (day: number) => `${month}-${day}-${year}`;

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm">
      {/* Weekday headers */}
      <div className="grid grid-cols-7 gap-2 mb-4">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="text-center text-sm font-medium text-gray-500">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-2">
        {days.map((day, index) => (
          <div key={index} className="aspect-square">
            {day !== null && (
              <button
                onClick={() => onDayToggle(getDayKey(day))}
                className={`w-full h-full flex items-center justify-center rounded-lg text-sm
                  ${selectedDays.has(getDayKey(day))
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                {day}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}