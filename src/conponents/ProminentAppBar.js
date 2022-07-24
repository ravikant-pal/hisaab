import * as React from "react";
import { NavLink as RouterLink } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Hidden from "@material-ui/core/Hidden";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";

const ProminentAppBar = () => {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Hidden>
            <Button
              component={RouterLink}
              to="/"
              style={{ textTransform: "none" }}
            >
              <Typography
                style={{ color: "white" }}
                component={"span"}
                variant="h5"
                noWrap
              >
                Hisaab
                <Typography variant="subtitle2" noWrap component="div">
                  Manage your expenses with your friends.
                </Typography>
              </Typography>
            </Button>
          </Hidden>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default ProminentAppBar;
