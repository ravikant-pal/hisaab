import {
  ArrowDownwardRounded as ArrowDownwardRoundedIcon,
  ArrowUpwardRounded as ArrowUpwardRoundedIcon,
  DeleteForeverRounded as DeleteForeverRoundedIcon,
  DriveFileRenameOutline as DriveFileRenameOutlineIcon,
  RemoveRounded as RemoveRoundedIcon,
} from '@mui/icons-material';
import {
  Avatar,
  Box,
  Chip,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Tooltip,
  Typography,
} from '@mui/material';
import { NavLink as RouterLink } from 'react-router-dom';

const ContactCard = (props) => {
  const { contact, onDelete, onEdit } = props;

  const getTotal = () => {
    return contact.transactions
      .map((txn) => parseInt(txn.value))
      .reduce((a, b) => a + b, 0);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(Math.abs(amount));
  };

  let icon, color, lable, chipBg, avatarBg;
  if (getTotal() < 0) {
    icon = <ArrowUpwardRoundedIcon sx={{ fontSize: 18 }} />;
    color = '#ff4444';
    chipBg = '#ffebee';
    avatarBg = '#ffebee';
    lable = 'You owe';
  } else if (getTotal() > 0) {
    icon = <ArrowDownwardRoundedIcon sx={{ fontSize: 18 }} />;
    color = '#4caf50';
    chipBg = '#e8f5e9';
    avatarBg = '#e8f5e9';
    lable = 'You get';
  } else {
    icon = <RemoveRoundedIcon sx={{ fontSize: 18 }} />;
    color = '#9e9e9e';
    chipBg = '#f5f5f5';
    avatarBg = '#f5f5f5';
    lable = 'Settled';
  }

  const to = '/hisaab/contact/' + contact.id;

  return (
    <>
      <ListItem
        component={RouterLink}
        to={to}
        sx={{
          padding: { xs: '16px', sm: '18px 20px' },
          backgroundColor: 'white',
        }}
      >
        <ListItemAvatar>
          <Avatar
            alt={contact.name}
            sx={{
              width: { xs: 48, sm: 52 },
              height: { xs: 48, sm: 52 },
              backgroundColor: avatarBg,
              color: color,
              fontSize: '1.25rem',
              fontWeight: 600,
            }}
          >
            {contact.name.charAt(0).toUpperCase()}
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Typography
                sx={{
                  overflow: 'hidden',
                  display: '-webkit-box',
                  WebkitBoxOrient: 'vertical',
                  textOverflow: 'ellipsis',
                  WebkitLineClamp: 1,
                }}
              >
                {contact.name}
              </Typography>
              <Tooltip title='Rename' placement='top' arrow>
                <IconButton
                  size='small'
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onEdit(contact);
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
                  <DriveFileRenameOutlineIcon sx={{ fontSize: 18 }} />
                </IconButton>
              </Tooltip>
            </Box>
          }
          secondary={
            <>
              <Chip
                size='small'
                icon={icon}
                label={lable}
                sx={{
                  marginRight: 1,
                  marginTop: 0.5,
                  height: 24,
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  backgroundColor: chipBg,
                  color: color,
                  border: 'none',
                  '& .MuiChip-icon': {
                    color: color,
                  },
                }}
              />
              <Chip
                size='small'
                label={formatCurrency(getTotal())}
                sx={{
                  marginTop: 0.5,
                  height: 24,
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  backgroundColor: '#f5f5f5',
                  color: color,
                  border: 'none',
                }}
              />
            </>
          }
          primaryTypographyProps={{
            sx: {
              fontSize: { xs: '1rem', sm: '1.1rem' },
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
          <Tooltip title='Delete friend' placement='left' arrow>
            <IconButton
              edge='end'
              aria-label='delete'
              onClick={(e) => {
                e.preventDefault();
                onDelete(contact.id);
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
              <DeleteForeverRoundedIcon />
            </IconButton>
          </Tooltip>
        </ListItemSecondaryAction>
      </ListItem>
    </>
  );
};

export default ContactCard;
