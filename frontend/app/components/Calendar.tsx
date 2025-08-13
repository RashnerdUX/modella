import React, { useState, useMemo } from 'react';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

interface CalendarDay {
  day: number;
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
}

type CalendarSize = 'sm' | 'md' | 'lg' | 'xl';

interface CalendarProps {
  onDateSelect?: (date: Date) => void;
  selectedDate?: Date | null;
  className?: string;
  size?: CalendarSize;
}

const Calendar: React.FC<CalendarProps> = ({ 
  onDateSelect, 
  selectedDate: externalSelectedDate,
  className = "",
  size = 'md'
}) => {
  // Track the first day of the current month being viewed
  const [currentMonthStart, setCurrentMonthStart] = useState<Date>(() => {
    const today = new Date();
    const start = new Date(today.getFullYear(), today.getMonth(), 1);
    start.setHours(0, 0, 0, 0);
    return start;
  });

  const [internalSelectedDate, setInternalSelectedDate] = useState<Date | null>(null);

  // Use external selectedDate if provided, otherwise use internal state
  const selectedDate = externalSelectedDate !== undefined ? externalSelectedDate : internalSelectedDate;

  const today: Date = new Date();
  
  const monthNames: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const dayNames: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Size configuration
  const sizeConfig = {
    sm: {
  containerClass: 'w-full',
      headerPadding: 'px-4 py-3',
      headerTitle: 'text-lg',
      gridPadding: 'p-3',
      dayButton: 'h-8 w-8 text-xs',
      buttonText: 'text-xs',
      iconSize: 16,
      dayHeader: 'text-xs'
    },
    md: {
  containerClass: 'w-full',
      headerPadding: 'px-6 py-4',
      headerTitle: 'text-xl',
      gridPadding: 'p-4',
      dayButton: 'h-10 w-10 text-sm',
      buttonText: 'text-sm',
      iconSize: 20,
      dayHeader: 'text-sm'
    },
    lg: {
  containerClass: 'w-full',
      headerPadding: 'px-8 py-5',
      headerTitle: 'text-2xl',
      gridPadding: 'p-6',
      dayButton: 'h-12 w-12 text-base',
      buttonText: 'text-base',
      iconSize: 24,
      dayHeader: 'text-base'
    },
    xl: {
  containerClass: 'w-full',
      headerPadding: 'px-10 py-6',
      headerTitle: 'text-3xl',
      gridPadding: 'p-8',
      dayButton: 'h-14 w-14 text-lg',
      buttonText: 'text-lg',
      iconSize: 28,
      dayHeader: 'text-lg'
    }
  };

  const config = sizeConfig[size];

  // Generate the current month's 6x7 grid data (including leading/trailing days)
  const monthData: CalendarDay[] = useMemo(() => {
    const days: CalendarDay[] = [];
    const year = currentMonthStart.getFullYear();
    const month = currentMonthStart.getMonth();

    // First day of month (0=Sun..6=Sat)
    const firstDayOfMonth = new Date(year, month, 1);
    const startDayIndex = firstDayOfMonth.getDay();

    // Number of days in current month
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Determine start date for grid (Sunday before/at first day)
    const gridStartDate = new Date(firstDayOfMonth);
    gridStartDate.setDate(firstDayOfMonth.getDate() - startDayIndex);

    // Create 42 cells (6 weeks * 7 days)
    for (let i = 0; i < 42; i++) {
      const date = new Date(gridStartDate);
      date.setDate(gridStartDate.getDate() + i);

      const isToday = date.toDateString() === today.toDateString();
      const isSelected = selectedDate !== null && date.toDateString() === selectedDate.toDateString();
      const isCurrentMonth = date.getMonth() === month && date.getFullYear() === year;

      days.push({
        day: date.getDate(),
        date: new Date(date),
        isCurrentMonth,
        isToday,
        isSelected
      });
    }

    return days;
  }, [currentMonthStart, selectedDate, today]);

  // Get the month/year to display in header (current month)
  const headerDate = useMemo(() => {
    return {
      month: monthNames[currentMonthStart.getMonth()],
      year: currentMonthStart.getFullYear()
    };
  }, [currentMonthStart, monthNames]);

  const navigateMonth = (direction: number): void => {
    setCurrentMonthStart(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction, 1);
      return newDate;
    });
  };

  const handleDateClick = (date: Date): void => {
    // Update selected date
    if (externalSelectedDate === undefined) {
      setInternalSelectedDate(date);
    }
    
    // Call external callback if provided
    if (onDateSelect) {
      onDateSelect(date);
    }
  };

  const handleTodayClick = (): void => {
    const todayDate = new Date();
    // Navigate to current month
    setCurrentMonthStart(new Date(todayDate.getFullYear(), todayDate.getMonth(), 1));
    // Select today
    if (externalSelectedDate === undefined) {
      setInternalSelectedDate(todayDate);
    }
    if (onDateSelect) {
      onDateSelect(todayDate);
    }
  };

  const handleClearSelection = (): void => {
    if (externalSelectedDate === undefined) {
      setInternalSelectedDate(null);
    }
    
    if (onDateSelect) {
      onDateSelect(null as any);
    }
  };

  return (
    <div className={`w-full ${config.containerClass} mx-auto bg-white rounded-2xl shadow-xl border border-pink-100 overflow-hidden ${className}`}>
      {/* Header */}
      <div className={`bg-gradient-to-r from-rose-400 to-pink-400 ${config.headerPadding} text-white`}>
        <div className="flex items-center justify-between mb-2">
          <button
            type="button"
            onClick={() => navigateMonth(-1)}
            className="p-2 hover:bg-white/20 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/30"
            aria-label="Previous month"
          >
            <HiChevronLeft size={config.iconSize} />
          </button>
          
          <div className="flex items-center space-x-2">
            <h2 className={`${config.headerTitle} font-semibold`}>
              {headerDate.month} {headerDate.year}
            </h2>
          </div>
          
          <button
            type="button"
            onClick={() => navigateMonth(1)}
            className="p-2 hover:bg-white/20 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/30"
            aria-label="Next month"
          >
            <HiChevronRight size={config.iconSize} />
          </button>
        </div>
      </div>

      {/* Calendar Grid - full month */}
      <div className={config.gridPadding}>
        {/* Day Headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {dayNames.map((day: string) => (
            <div
              key={day}
              className={`text-center ${config.dayHeader} font-medium text-gray-500 py-2`}
            >
              {day}
            </div>
          ))}
        </div>

        {/* Month Days (6 weeks) */}
        <div className="grid grid-cols-7 gap-1">
          {monthData.map((dateObj: CalendarDay, index: number) => {
            return (
              <button
                key={index}
                type="button"
                onClick={() => handleDateClick(dateObj.date)}
                className={`
                  relative ${config.dayButton} rounded-lg font-medium transition-all duration-200
                  hover:scale-105 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-rose-300
                  ${dateObj.isCurrentMonth 
                    ? 'text-gray-900 hover:bg-rose-50' 
                    : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
                  }
                  ${dateObj.isToday 
                    ? 'bg-rose-500 text-white hover:bg-rose-600 shadow-lg' 
                    : ''
                  }
                  ${dateObj.isSelected && !dateObj.isToday 
                    ? 'bg-pink-200 text-rose-800 ring-2 ring-rose-400' 
                    : ''
                  }
                `}
                aria-label={`Select ${dateObj.date.toLocaleDateString()}`}
              >
                {dateObj.day}
                
                {/* Today indicator dot */}
                {dateObj.isToday && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full"></div>
                )}
              </button>
            );
          })}
        </div>

        {/* Quick navigation */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex justify-center space-x-2">
            <button
              type="button"
              onClick={handleTodayClick}
              className={`px-4 py-2 ${config.buttonText} font-medium text-rose-600 bg-rose-50 rounded-lg hover:bg-rose-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-rose-300`}
            >
              This Month
            </button>
            <button
              type="button"
              onClick={handleClearSelection}
              className={`px-4 py-2 ${config.buttonText} font-medium text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300`}
            >
              Clear Selection
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;