import {
  ArrowBackRounded,
  ArrowDownwardRounded as ArrowDownwardRoundedIcon,
  ArrowUpwardRounded as ArrowUpwardRoundedIcon,
} from '@mui/icons-material';
import {
  Box,
  Chip,
  Fab,
  IconButton,
  List,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import {
  NavLink as RouterLink,
  useLocation,
  useParams,
} from 'react-router-dom';
import AddExpense from '../conponents/AddExpense';
import AppContainer from '../conponents/AppContainer';
import Page from '../conponents/Page';
import TransactionCard from '../conponents/TransactionCard';
import * as contactService from '../services/ContactService';
import * as transactionService from '../services/TransactionService';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const TransactionView = (props) => {
  let query = useQuery();
  const { id } = useParams();
  const [txnId, setTxnId] = useState(0);
  const [openGive, setOpenGive] = useState(false);
  const [openTake, setOpenTake] = useState(false);
  const [itemName, setItemName] = useState('');
  const [value, setValue] = useState(0);
  const [nameErrorText, setNameErrorText] = useState('');
  const [valueErrorText, setValueErrorText] = useState('');
  const [contact, setContact] = useState(contactService.findById(id));

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

  const [total, setTotal] = useState(getTotal());

  const handleOpenGive = () => {
    setOpenGive(true);
  };

  const handleOpenTake = () => {
    setOpenTake(true);
  };

  const handleCloseGive = () => {
    setOpenGive(false);
    setValue(0);
    setItemName('');
    setNameErrorText('');
    setValueErrorText('');
  };

  const handleCloseTake = () => {
    setOpenTake(false);
    setValue(0);
    setItemName('');
    setNameErrorText('');
    setValueErrorText('');
  };

  const handleSaveItemGive = () => {
    let item = txnId
      ? findTransactionById(txnId)
      : {
          id: ++contact.transactionId,
          itemName: itemName,
          value: value,
          cdate: new Date(),
        };
    [item.itemName, item.value] = [itemName, value];
    if (!txnId) {
      contact.transactions.unshift(item);
    }
    transactionService.addContactExpance(contact);
    setTotal(getTotal());
    setOpenGive(false);
    setItemName('');
    setValue(0);
    setTxnId(0);
  };

  const handleSaveItemTake = () => {
    let item = txnId
      ? findTransactionById(txnId)
      : {
          id: ++contact.transactionId,
          itemName: itemName,
          value: -value,
          cdate: new Date(),
        };
    [item.itemName, item.value] = [itemName, -value];
    if (!txnId) {
      contact.transactions.unshift(item);
    }
    transactionService.addContactExpance(contact);
    setTotal(getTotal());
    setOpenTake(false);
    setItemName('');
    setValue(0);
    setTxnId(0);
  };
  const onDelete = (id) => {
    transactionService.deleteContactExpance(contact, id);
    setContact(contactService.findById(contact.id));
    setTotal(getTotal());
  };
  const onEdit = (id) => {
    let currTxn = findTransactionById(id);
    setTxnId(id);
    setItemName(currTxn.itemName);
    setValue(Math.abs(currTxn.value));
    currTxn.value < 0 ? setOpenTake(true) : setOpenGive(true);
  };

  const findTransactionById = (txnId) => {
    return contact.transactions.filter((txn) => txn.id == txnId)[0];
  };

  return (
    <Page
      sx={{
        backgroundColor: 'background.default',
        flexGrow: 1,
      }}
      title={`Your Friend - ${contact.name}`}
    >
      <AppContainer showTabs={false}>
        <Box
          sx={{
            padding: { xs: '20px 16px', sm: '24px' },
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            borderRadius: 0,
            marginBottom: 0,
          }}
        >
          <Stack spacing={2}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Tooltip title='Back to friends' arrow>
                <IconButton
                  component={RouterLink}
                  to='/'
                  sx={{
                    color: 'white',
                    backgroundColor: 'rgba(255,255,255,0.15)',
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.25)',
                    },
                  }}
                >
                  <ArrowBackRounded />
                </IconButton>
              </Tooltip>
              <Typography
                variant='h4'
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: '1.5rem', sm: '2rem' },
                  flexGrow: 1,
                }}
              >
                {contact.name}
              </Typography>
            </Box>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: 'rgba(255,255,255,0.15)',
                padding: { xs: '12px 16px', sm: '16px 20px' },
                borderRadius: 3,
                backdropFilter: 'blur(10px)',
              }}
            >
              <Box>
                <Typography
                  variant='body2'
                  sx={{ opacity: 0.9, fontSize: '0.85rem', mb: 0.5 }}
                >
                  {total < 0
                    ? 'You owe'
                    : total > 0
                    ? 'You will get'
                    : 'All Settled Up'}
                </Typography>
                <Typography
                  variant='h5'
                  sx={{
                    fontWeight: 700,
                    fontSize: { xs: '1.5rem', sm: '1.75rem' },
                  }}
                >
                  {formatCurrency(total)}
                </Typography>
              </Box>
              <Chip
                label={`${contact.transactions.length} Transaction${
                  contact.transactions.length === 1 ? '' : 's'
                }`}
                sx={{
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  color: 'white',
                  fontWeight: 600,
                  height: 32,
                  fontSize: '0.85rem',
                }}
              />
            </Box>
          </Stack>
        </Box>

        {contact.transactions.length === 0 ? (
          <Box
            sx={{
              padding: { xs: '48px 16px', sm: '64px 24px' },
              textAlign: 'center',
              color: 'text.secondary',
            }}
          >
            <Typography
              variant='h6'
              gutterBottom
              sx={{ fontWeight: 600, color: 'text.primary' }}
            >
              No transactions yet
            </Typography>
            <Typography variant='body2' color='textSecondary'>
              Start by adding a transaction using the buttons below
            </Typography>
          </Box>
        ) : (
          <List
            sx={{
              padding: 0,
              marginBottom: '100px',
            }}
          >
            {contact.transactions.map((txn, index) => (
              <TransactionCard
                key={index}
                txn={txn}
                onDelete={onDelete}
                onEdit={onEdit}
              />
            ))}
          </List>
        )}

        <Box
          sx={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '16px',
            backgroundColor: 'white',
            boxShadow: '0 -4px 20px rgba(0,0,0,0.08)',
            display: 'flex',
            gap: 2,
            justifyContent: 'center',
            zIndex: 1000,
          }}
        >
          <Fab
            variant='extended'
            color='primary'
            onClick={handleOpenGive}
            sx={{
              flex: { xs: 1, sm: 'none' },
              minWidth: { sm: 140 },
              maxWidth: { xs: 200 },
              boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
              fontWeight: 600,
              fontSize: '0.95rem',
              '&:hover': {
                boxShadow: '0 6px 16px rgba(102, 126, 234, 0.4)',
                transform: 'translateY(-2px)',
              },
            }}
          >
            <ArrowUpwardRoundedIcon sx={{ marginRight: 1 }} />
            You Give
          </Fab>
          <Fab
            variant='extended'
            color='secondary'
            onClick={handleOpenTake}
            sx={{
              flex: { xs: 1, sm: 'none' },
              minWidth: { sm: 140 },
              maxWidth: { xs: 200 },
              boxShadow: '0 4px 12px rgba(156, 39, 176, 0.3)',
              fontWeight: 600,
              fontSize: '0.95rem',
              '&:hover': {
                boxShadow: '0 6px 16px rgba(156, 39, 176, 0.4)',
                transform: 'translateY(-2px)',
              },
            }}
          >
            <ArrowDownwardRoundedIcon sx={{ marginRight: 1 }} />
            You Get
          </Fab>
        </Box>

        <AddExpense
          isAdd={!txnId}
          open={openGive}
          handleClose={handleCloseGive}
          itemName={itemName}
          setItemName={setItemName}
          value={value}
          setValue={setValue}
          nameErrorText={nameErrorText}
          setNameErrorText={setNameErrorText}
          valueErrorText={valueErrorText}
          setValueErrorText={setValueErrorText}
          handleSaveItem={handleSaveItemGive}
        />
        <AddExpense
          isAdd={!txnId}
          open={openTake}
          handleClose={handleCloseTake}
          itemName={itemName}
          setItemName={setItemName}
          value={value}
          setValue={setValue}
          nameErrorText={nameErrorText}
          setNameErrorText={setNameErrorText}
          valueErrorText={valueErrorText}
          setValueErrorText={setValueErrorText}
          handleSaveItem={handleSaveItemTake}
        />
      </AppContainer>
    </Page>
  );
};

export default TransactionView;
