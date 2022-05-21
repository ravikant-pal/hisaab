import React from "react";
import { NavLink as RouterLink } from "react-router-dom";
import {
  Avatar,
  Chip,
  ListItem,
  ListItemText,
  ListItemAvatar,
  IconButton,
  ListItemSecondaryAction,
  Tooltip,
  Divider,
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import ArrowDownwardRoundedIcon from "@material-ui/icons/ArrowDownwardRounded";
import ArrowUpwardRoundedIcon from "@material-ui/icons/ArrowUpwardRounded";
import RemoveRoundedIcon from "@material-ui/icons/RemoveRounded";
import DeleteForeverRoundedIcon from "@material-ui/icons/DeleteForeverRounded";
import { PersonRounded } from "@material-ui/icons";

const ContactCard = (props) => {
  const { contact, onDelete } = props;
  const getTotal = () => {
    return contact.transactions
      .map((txn) => parseInt(txn.value))
      .reduce((a, b) => a + b, 0);
  };
  let icon, color, lable;
  if (getTotal() < 0) {
    icon = <ArrowUpwardRoundedIcon />;
    color = "secondary";
    lable = "will take";
  } else if (getTotal() > 0) {
    icon = <ArrowDownwardRoundedIcon />;
    color = "primary";
    lable = "will give";
  } else {
    icon = <RemoveRoundedIcon />;
    color = "default";
    lable = "neither";
  }

  const to = "/hisaab/contact/" + contact.id;

  return (
    <>
      <Tooltip title="Click to view">
        <ListItem
          button
          component={RouterLink}
          to={to}
          style={{ background: "#b1dffb4f" }}
        >
          <ListItemAvatar>
            <Avatar alt={contact.name}>
              <PersonRounded />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={contact.name}
            secondary={
              <>
                <Typography
                  component="span"
                  variant="body2"
                  color="textPrimary"
                >
                  <Chip
                    variant="outlined"
                    color={color}
                    size="small"
                    icon={icon}
                    label={lable}
                  />
                </Typography>
                <Typography
                  component="span"
                  variant="body2"
                  color="textPrimary"
                >
                  <Chip
                    variant="outlined"
                    color="default"
                    size="small"
                    avatar={
                      <Avatar>
                        <b>₹</b>
                      </Avatar>
                    }
                    label={Math.abs(getTotal())}
                  />
                </Typography>
              </>
            }
          />

          <ListItemSecondaryAction>
            <Tooltip title="Delete" placement="top" arrow>
              <IconButton
                edge="end"
                color="secondary"
                aria-label="delete"
                onClick={() => onDelete(contact.id)}
              >
                <DeleteForeverRoundedIcon />
              </IconButton>
            </Tooltip>
          </ListItemSecondaryAction>
        </ListItem>
      </Tooltip>
      <Divider />
    </>
  );
};

export default ContactCard;
