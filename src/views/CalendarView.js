import {
  ArrowLeftRounded as ArrowLeftRoundedIcon,
  ArrowRightRounded as ArrowRightRoundedIcon,
  CalendarMonth as CalendarMonthIcon,
  CalendarToday as CalendarTodayIcon,
  SkipNextRounded as SkipNextRoundedIcon,
  SkipPreviousRounded as SkipPreviousRoundedIcon,
} from '@mui/icons-material';
import {
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import AppContainer from '../conponents/AppContainer';
import DailyExpense from '../conponents/DailyExpense';
import Page from '../conponents/Page';
import * as dailyService from '../services/DailyService';

const AppView = () => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(dailyService.getOrBuildDate(new Date()));
  const [view, setView] = useState('month'); // 'month' or 'year'

  const handleViewChange = (event, newView) => {
    if (newView !== null) {
      setView(newView);
    }
  };

  const handleClickOnDay = (date) => {
    setDate(dailyService.getOrBuildDate(date));
    setOpen(true);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(Math.abs(amount));
  };

  const tileContent = ({ date, view }) => {
    let content = null;
    if (view === 'month') {
      let total = dailyService.getTotalForDay(date);
      if (total) {
        content = (
          <Box
            className='expense-amount'
            sx={{
              fontSize: '0.7rem',
              fontWeight: 600,
              color: '#667eea',
              marginTop: '2px',
            }}
          >
            {formatCurrency(total * -1)}
          </Box>
        );
      }
    } else if (view === 'year') {
      // Get monthly total
      const month = date.getMonth();
      const year = date.getFullYear();
      let monthlyTotal = 0;

      // Calculate total for the entire month
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      for (let day = 1; day <= daysInMonth; day++) {
        const dayDate = new Date(year, month, day);
        const dayTotal = dailyService.getTotalForDay(dayDate);
        if (dayTotal) {
          monthlyTotal += dayTotal;
        }
      }

      if (monthlyTotal !== 0) {
        content = (
          <Box
            className='expense-amount'
            sx={{
              fontSize: '0.85rem',
              fontWeight: 600,
              color: '#667eea',
              marginTop: '4px',
            }}
          >
            {formatCurrency(monthlyTotal * -1)}
          </Box>
        );
      }
    }
    return content;
  };

  return (
    <Page title='Hissab - Daily'>
      <AppContainer>
        <Box
          sx={{
            padding: { xs: '16px', sm: '24px' },
            maxWidth: 600,
            margin: '0 auto',
          }}
        >
          {/* View Toggle */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mb: 3,
            }}
          >
            <ToggleButtonGroup
              value={view}
              exclusive
              onChange={handleViewChange}
              aria-label='calendar view'
              sx={{
                backgroundColor: 'white',
                borderRadius: 3,
                boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                '& .MuiToggleButton-root': {
                  border: 'none',
                  borderRadius: 3,
                  px: { xs: 2, sm: 3 },
                  py: 1,
                  textTransform: 'none',
                  fontSize: '0.95rem',
                  fontWeight: 500,
                  color: '#666',
                  '&.Mui-selected': {
                    background:
                      'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    '&:hover': {
                      background:
                        'linear-gradient(135deg, #5568d3 0%, #63408a 100%)',
                    },
                  },
                  '&:hover': {
                    backgroundColor: '#f5f5f5',
                  },
                },
              }}
            >
              <ToggleButton value='month' aria-label='daily view'>
                <CalendarTodayIcon sx={{ mr: 1, fontSize: '1.2rem' }} />
                <Typography variant='body2' sx={{ fontWeight: 500 }}>
                  Daily View
                </Typography>
              </ToggleButton>
              <ToggleButton value='year' aria-label='monthly view'>
                <CalendarMonthIcon sx={{ mr: 1, fontSize: '1.2rem' }} />
                <Typography variant='body2' sx={{ fontWeight: 500 }}>
                  Monthly View
                </Typography>
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>

          <Box
            sx={{
              backgroundColor: 'white',
              borderRadius: 3,
              overflow: 'hidden',
              boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
              '& .react-calendar': {
                width: '100%',
                border: 'none',
                fontFamily: 'inherit',
                padding: { xs: '12px', sm: '20px' },
              },
              '& .react-calendar__navigation': {
                marginBottom: '16px',
                height: '44px',
              },
              '& .react-calendar__navigation button': {
                minWidth: '44px',
                fontSize: '1.1rem',
                fontWeight: 600,
                color: '#667eea',
                borderRadius: '8px',
                transition: 'all 0.2s ease',
                '&:hover': {
                  backgroundColor: '#e8eaf6',
                },
                '&:disabled': {
                  backgroundColor: 'transparent',
                  color: '#ccc',
                },
              },
              '& .react-calendar__month-view__weekdays': {
                fontSize: '0.85rem',
                fontWeight: 600,
                color: '#666',
                textTransform: 'uppercase',
              },
              '& .react-calendar__tile': {
                padding: '12px 6px',
                fontSize: '0.95rem',
                borderRadius: '8px',
                transition: 'all 0.2s ease',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: view === 'year' ? '80px' : 'auto',
                '&:hover': {
                  backgroundColor: '#f5f5f5',
                },
              },
              '& .react-calendar__tile--active': {
                backgroundColor: '#667eea !important',
                color: 'white',
                fontWeight: 600,
                '& .expense-amount': {
                  color: 'white !important',
                  backgroundColor: 'rgba(255, 255, 255, 0.3)',
                  padding: '2px 6px',
                  borderRadius: '4px',
                },
              },
              '& .react-calendar__tile--now': {
                backgroundColor: '#e8eaf6',
                fontWeight: 600,
              },
              '& .react-calendar__tile--hasActive': {
                backgroundColor: '#667eea',
                color: 'white',
              },
              '& .react-calendar__month-view__days__day--neighboringMonth': {
                color: '#ccc',
              },
            }}
          >
            <Calendar
              view={view}
              tileContent={tileContent}
              onClickDay={handleClickOnDay}
              prevLabel={<ArrowLeftRoundedIcon />}
              nextLabel={<ArrowRightRoundedIcon />}
              prev2Label={<SkipPreviousRoundedIcon />}
              next2Label={<SkipNextRoundedIcon />}
            />
          </Box>
          <DailyExpense
            date={date}
            setDate={setDate}
            open={open}
            setOpen={setOpen}
          />
        </Box>
      </AppContainer>
    </Page>
  );
};

export default AppView;
