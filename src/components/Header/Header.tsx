import React, { useState } from 'react';
import type { User } from '../../types';

import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import ListItemIcon from '@mui/material/ListItemIcon';
import LogoutIcon from '@mui/icons-material/Logout';

import logo from '../../assets/qualys.png';
import '../../styles/header.css';

type Props = {
  user: User;
  onLogout?: () => void;
  onLogin?: (u: User) => void; // NEW: for switching users during demo
};

export const Header: React.FC<Props> = ({ user, onLogout, onLogin }) => {
  const initials =
    user.initials ??
    user.name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpenMenu = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleCloseMenu = () => setAnchorEl(null);

  const handleLogout = () => {
    handleCloseMenu();
    if (onLogout) onLogout();
    else console.log('Logout clicked');
  };

  const handleSwitchToDemo = () => {
    handleCloseMenu();
    onLogin?.({
      name: 'Demo User',
      initials: 'DU',
      role: 'Viewer',
      email: 'demo.user@example.com',
    });
  };

  const handleSwitchToAdmin = () => {
    handleCloseMenu();
    onLogin?.({
      name: 'Admin User',
      initials: 'AU',
      role: 'Admin',
      email: 'admin@example.com',
    });
  };

  return (
    <header className="header">
      <div className="header-left">
        <img src={logo} alt="Qualys" className="brand-logo" width={28} height={28} />
        <div className="brand-text">
          <div className="brand-name">Qualys</div>
          <div className="brand-sub">PCI dashboard</div>
        </div>
      </div>

      <div className="header-right">
        <IconButton aria-label="Notifications" size="large" sx={{ mr: 1 }}>
          <Badge badgeContent={3} color="error" overlap="circular">
            <NotificationsIcon />
          </Badge>
        </IconButton>

        {/* User chip (opens menu) */}
        <button
          className="user-chip-btn"
          onClick={handleOpenMenu}
          aria-label="Open profile menu"
          aria-controls={open ? 'profile-menu' : undefined}
          aria-haspopup="menu"
          aria-expanded={open ? 'true' : undefined}
        >
          <span
            className="initials"
            title={user.name}
            style={{
              width: 38,
              height: 38,
              display: 'inline-grid',
              placeItems: 'center',
              borderRadius: '50%',
              background: 'var(--primary)',
              color: '#fff',
              fontWeight: 800,
              fontSize: 14,
              letterSpacing: '0.5px',
              textTransform: 'uppercase',
              lineHeight: 1,
              userSelect: 'none',
              boxShadow: '0 0 0 2px var(--surface)',
            }}
          >
            {initials}
          </span>
        </button>

        <div className="portal">
          <div className="portal-title">Merchant Portal</div>
          <div className="portal-sub">Powered by Qualys</div>
        </div>

        {/* Profile menu */}
        <Menu
          id="profile-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleCloseMenu}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          keepMounted
          PaperProps={{
            elevation: 8,
            sx: {
              mt: 1,
              minWidth: 240,
              borderRadius: 2.5,
              overflow: 'hidden',
              boxShadow: '0 8px 22px rgba(0,0,0,0.28), 0 2px 6px rgba(0,0,0,0.12)',
              border: '1px solid rgba(255,255,255,0.08)',
              bgcolor: 'background.paper',
              '& .MuiMenuItem-root': {
                py: 1.1,
                gap: 1,
                '&:hover': { bgcolor: 'action.hover' },
              },
            },
          }}
          MenuListProps={{
            dense: false,
            sx: { p: 0 },
          }}
        >
          {/* Menu header: avatar + name + email */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.25,
              px: 1.5,
              py: 1.25,
              bgcolor: 'background.default',
            }}
          >
            <Avatar
              sx={{
                width: 36,
                height: 36,
                fontSize: 14,
                fontWeight: 800,
                bgcolor: 'primary.main',
                color: '#fff',
                boxShadow: '0 0 0 2px var(--surface, #0f1220)',
              }}
            >
              {initials}
            </Avatar>

            <Box sx={{ minWidth: 0 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, lineHeight: 1.2 }} noWrap>
                {user.name}
              </Typography>

              {/* ✅ Clean, type-safe email display */}
              {user.email ? (
                <Typography
                  variant="caption"
                  sx={{ color: 'text.secondary' }}
                  noWrap
                  title={user.email}
                >
                  {user.email}
                </Typography>
              ) : null}
            </Box>
          </Box>

          <Divider />

          {/* Optional: quick mock switches (only work if onLogin is provided) */}
          <MenuItem onClick={handleSwitchToDemo} disabled={!onLogin}>
            <ListItemIcon sx={{ minWidth: 32, color: 'text.secondary' }}>👤</ListItemIcon>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              Switch to Demo User
            </Typography>
          </MenuItem>

          <MenuItem onClick={handleSwitchToAdmin} disabled={!onLogin}>
            <ListItemIcon sx={{ minWidth: 32, color: 'text.secondary' }}>🛡️</ListItemIcon>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              Switch to Admin
            </Typography>
          </MenuItem>

          <Divider />

          {/* Logout */}
          <MenuItem onClick={handleLogout}>
            <ListItemIcon sx={{ minWidth: 32, color: 'text.secondary' }}>
              <LogoutIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              Logout
            </Typography>
          </MenuItem>
        </Menu>
      </div>
    </header>
  );
};
