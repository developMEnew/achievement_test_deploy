import { useState, useEffect } from 'react';
import { getPreselectedDaysForMonth, parseDayKey } from '../utils/calendarHelpers';
import { months, Month } from '../utils/calendar';
import { useCalendarData } from './useCalendarData';

interface CalendarState {
  selectedDays: Set<string>;
  selectedMonth: Month;
}

export function useCalendarState(userId: string) {
  const { calendarData } = useCalendarData({ userId });
  const [state, setState] = useState<CalendarState>({
    selectedDays: new Set<string>(),
    selectedMonth: months[0]
  });

  // Load pre-selected days when component mounts or month changes
  useEffect(() => {
    const preselectedDays = getPreselectedDaysForMonth(state.selectedMonth, calendarData);
    setState(prevState => ({
      ...prevState,
      selectedDays: preselectedDays
    }));
  }, [state.selectedMonth, calendarData]);

  const setMonth = (newMonth: Month) => {
    setState(prevState => ({
      selectedDays: new Set<string>(),
      selectedMonth: newMonth
    }));
  };

  const toggleDay = (day: string) => {
    const newDays = new Set(state.selectedDays);
    if (newDays.has(day)) {
      newDays.delete(day);
    } else {
      newDays.add(day);
    }
    setState({ ...state, selectedDays: newDays });
  };

  const getSelectedDayNumbers = () => {
    return Array.from(state.selectedDays)
      .filter(day => day.startsWith(state.selectedMonth))
      .map(day => parseDayKey(day).day)
      .sort((a, b) => a - b);
  };

  return {
    selectedDays: state.selectedDays,
    selectedMonth: state.selectedMonth,
    setMonth,
    toggleDay,
    getSelectedDayNumbers
  };
}