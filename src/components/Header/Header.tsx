
import type { User } from '../../types';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';

// ➊ Import the image from src/assets
import logo from '../../assets/qualys.png';
import "../../styles/header.css";
type Props = { user: User };

export const Header: React.FC<Props> = ({ user }) => {
  const initials =
    user.initials ??
    user.name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();

  return (
    <header className="header">
      <div className="header-left">
        {/* ➋ Replace the decorative pill with the real logo */}
        <img
          src={logo}
          alt="Qualys"
          className="brand-logo"
          width={28}
          height={28}
        />

        <div className="brand-text">
          <div className="brand-name">Qualys</div>
          <div className="brand-sub">PCI dashboard</div>
        </div>
      </div>

      <div className="header-right">
        {/* Notifications with MUI Icon */}
        <IconButton aria-label="Notifications" size="large" sx={{ mr: 1 }}>
          <Badge badgeContent={3} color="error" overlap="circular">
            <NotificationsIcon />
          </Badge>
        </IconButton>

        <div className="user-chip">
          <span className="initials">{initials}</span>
        </div>

        <div className="portal">
          <div className="portal-title">Merchant Portal</div>
          <div className="portal-sub">Powered by Qualys</div>
        </div>
      </div>
    </header>
  );
};
