import {
  DeleteForeverRounded,
  EditRounded as EditRoundedIcon,
  ReceiptRounded as ReceiptRoundedIcon,
} from '@mui/icons-material';
import {
  Box,
  Chip,
  Divider,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Tooltip,
  Typography,
} from '@mui/material';

const ContactCard = (props) => {
  const { txn, onDelete, onEdit } = props;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(Math.abs(amount));
  };

  const buildDate = () => {
    let today = new Date(txn.cdate);
    let day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][today.getDay()];
    let month = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ][today.getMonth()];
    let dd = String(today.getDate()).padStart(2, '0');
    let yyyy = today.getFullYear();
    today = day + ', ' + month + ' ' + dd + ' ' + yyyy;
    return today;
  };

  const isNegative = txn.value < 0;

  return (
    <>
      <ListItem
        sx={{
          padding: { xs: '16px', sm: '18px 20px' },
          backgroundColor: 'white',
          transition: 'all 0.2s ease',
          '&:hover': {
            backgroundColor: '#f8f9fa',
          },
        }}
      >
        <ListItemAvatar>
          <Box
            sx={{
              width: { xs: 48, sm: 52 },
              height: { xs: 48, sm: 52 },
              borderRadius: '50%',
              backgroundColor: isNegative ? '#ffebee' : '#e8f5e9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: isNegative ? '#ff4444' : '#4caf50',
            }}
          >
            <ReceiptRoundedIcon sx={{ fontSize: { xs: 24, sm: 28 } }} />
          </Box>
        </ListItemAvatar>
        <ListItemText
          primary={
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <span>{txn.itemName}</span>
              <Tooltip title='Edit transaction' placement='top' arrow>
                <IconButton
                  size='small'
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onEdit(txn.id);
                  }}
                  sx={{
                    padding: '4px',
                    color: '#667eea',
                    opacity: 0.7,
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      opacity: 1,
                      backgroundColor: '#e8eaf6',
                      transform: 'scale(1.1)',
                    },
                  }}
                >
                  <EditRoundedIcon sx={{ fontSize: 18 }} />
                </IconButton>
              </Tooltip>
            </Box>
          }
          secondary={
            <Box
              sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}
            >
              <Chip
                size='small'
                label={formatCurrency(txn.value)}
                sx={{
                  height: 24,
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  backgroundColor: isNegative ? '#ffebee' : '#e8f5e9',
                  color: isNegative ? '#ff4444' : '#4caf50',
                  border: 'none',
                }}
              />
              <Typography
                component='span'
                variant='caption'
                sx={{ color: 'text.secondary', fontSize: '0.75rem' }}
              >
                {buildDate()}
              </Typography>
            </Box>
          }
          primaryTypographyProps={{
            sx: {
              fontSize: { xs: '1rem', sm: '1.05rem' },
              fontWeight: 600,
              color: '#212121',
              marginBottom: 0.5,
            },
          }}
          secondaryTypographyProps={{
            component: 'div',
          }}
        />

        <ListItemSecondaryAction>
          <Tooltip title='Delete transaction' placement='left' arrow>
            <IconButton
              edge='end'
              aria-label='delete'
              onClick={(e) => {
                e.preventDefault();
                onDelete(txn.id);
              }}
              sx={{
                color: '#ff4444',
                transition: 'all 0.2s ease',
                '&:hover': {
                  backgroundColor: '#ffebee',
                  transform: 'scale(1.1)',
                },
              }}
            >
              <DeleteForeverRounded />
            </IconButton>
          </Tooltip>
        </ListItemSecondaryAction>
      </ListItem>
      <Divider sx={{ marginLeft: { xs: 8, sm: 9 } }} />
    </>
  );
};

export default ContactCard;
