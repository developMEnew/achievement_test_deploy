import { useCalendarState } from '../hooks/useCalendarState';
import { CalendarView } from './ui/calendar-view';
import { MonthSelector } from './ui/month-selector';
import { CounterDisplay } from './ui/counter-display';
import { UpdateButton } from './calendar/UpdateButton';
import { countSelectedDaysPerMonth } from '../utils/calendar';
import { useCalendarData } from '../hooks/useCalendarData';
import { useState } from 'react';
import type { Month } from '../utils/calendar';

export function ProfileTab() {
  const userId = "current-user-id";
  const [year] = useState(new Date().getFullYear());
  
  const { 
    calendarData, 
    loading, 
    error, 
    updateCalendarData,
    getMonthData 
  } = useCalendarData({ userId, year });

  const {
    selectedDays,
    selectedMonth,
    setMonth,
    toggleDay,
    getSelectedDayNumbers
  } = useCalendarState(userId);

  const handleUpdate = async () => {
    const selectedNumbers = getSelectedDayNumbers();
    const currentMonthData = getMonthData(selectedMonth);
    
    const success = await updateCalendarData(selectedMonth, {
      selectedDays: selectedNumbers,
      target: currentMonthData?.target || 0,
      achieved: currentMonthData?.achieved || 0
    });

    if (success) {
      console.log('Calendar updated successfully');
    }
  };

  const monthCounts = countSelectedDaysPerMonth(selectedDays);
  const currentMonthCount = monthCounts.get(selectedMonth) || 0;

  if (loading) {
    return <div className="p-4">Loading calendar data...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-4 space-y-6">
      <CounterDisplay
        count={currentMonthCount}
        selectedMonth={selectedMonth}
        lastUpdated={calendarData?.lastUpdated}
      />
      <MonthSelector 
        selectedMonth={selectedMonth} 
        onChange={(month: Month) => setMonth(month)} 
      />
      <CalendarView
        month={selectedMonth}
        year={year}
        selectedDays={selectedDays}
        onDayToggle={toggleDay}
      />
      <UpdateButton onUpdate={handleUpdate} />
    </div>
  );
}