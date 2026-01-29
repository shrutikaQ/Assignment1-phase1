import React, { useEffect, useMemo, useState } from 'react';
import type { NavItem } from '../../types';
import PushPinOutlined from '@mui/icons-material/PushPinOutlined';
import PushPin from '@mui/icons-material/PushPin';
import MenuOutlined from '@mui/icons-material/MenuOutlined';

import '../../styles/sidebar-responsive.css';

/** If you already have a shared useMedia hook, use that instead */
const useMedia = (q: string) => {
  const [matches, setMatches] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(q).matches : true
  );

  useEffect(() => {
    const mm = window.matchMedia(q);
    const onChange = () => setMatches(mm.matches);
    // modern
    mm.addEventListener?.('change', onChange);
    // legacy (Safari)
    mm.addListener?.(onChange);

    return () => {
      mm.removeEventListener?.('change', onChange);
      mm.removeListener?.(onChange);
    };
  }, [q]);

  return matches;
};

// Renders either an already-created element (<HomeOutlined />)
// or instantiates a component type (HomeOutlined)
function renderIcon(icon?: React.ReactNode | React.ElementType) {
  if (!icon) return null;
  if (React.isValidElement(icon)) {
    return React.cloneElement(icon as React.ReactElement, { sx: { fontSize: 18 } });
  }
  const IconComp = icon as React.ElementType;
  return <IconComp sx={{ fontSize: 18 }} />;
}

type Props = {
  items: NavItem[];
  onSelect?: (id: string) => void;
  product?: string;
  subProduct?: string;
  year?: number;
  hoverExpand?: boolean;
  desktopMinWidth?: number;

  /** When true, sidebar behaves like a drawer on small screens */
  mobileOverlay?: boolean;

  /** Optional controlled API for mobile overlay */
  open?: boolean; // controls visibility in mobile overlay mode
  onOpenChange?: (open: boolean) => void;
};

export const ResponsiveSidebar: React.FC<Props> = ({
  items,
  onSelect,
  product = 'PCI',
  subProduct = 'PCI Compliance',
  year = new Date().getFullYear(),
  hoverExpand = true,
  desktopMinWidth = 992,
  mobileOverlay = true,
  open,
  onOpenChange,
}) => {
  const isDesktop = useMedia(`(min-width: ${desktopMinWidth}px)`);

  /**
   * Desktop: collapsed by default (unless pinned).
   * Mobile: expanded/open by default, behaves like a drawer (when mobileOverlay=true).
   */
  const [pinned, setPinned] = useState(false);

  // Local expanded state for desktop width
  const [expanded, setExpanded] = useState(!isDesktop);

  // Local open state (used when mobileOverlay && !controlled)
  const [localOpen, setLocalOpen] = useState(!isDesktop);

  // Determine actual "visible/open" state in mobile overlay mode
  const isControlled = typeof open === 'boolean';
  const isOpenMobile = isControlled ? !!open : localOpen;

  // Sync behavior when screen size changes or pin changes
  useEffect(() => {
    if (isDesktop) {
      // Desktop mode ignores "open" and uses expanded/pinned logic
      if (pinned) {
        setExpanded(true);
      } else {
        setExpanded(false);
      }
    } else {
      // Mobile mode - default to open (drawer) unless controlled
      if (!isControlled) {
        setLocalOpen(true);
      }
      // Expanded state doesn't visually matter in overlay mode
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDesktop, pinned]);

  const className = useMemo(() => {
    const base = ['sidebar-rsp'];

    if (isDesktop) {
      base.push(expanded ? 'is-expanded' : 'is-collapsed');
      if (hoverExpand) base.push('hover-expand');
      if (pinned) base.push('is-pinned');
    } else if (mobileOverlay) {
      base.push('is-mobile');
      base.push(isOpenMobile ? 'is-open' : 'is-closed');
    }

    return base.join(' ');
  }, [expanded, hoverExpand, pinned, isDesktop, mobileOverlay, isOpenMobile]);

  const handleEnter = () => {
    if (!pinned && isDesktop && hoverExpand) setExpanded(true);
  };
  const handleLeave = () => {
    if (!pinned && isDesktop && hoverExpand) setExpanded(false);
  };

  const toggleExpanded = () => {
    if (isDesktop) {
      setExpanded((e) => !e);
    } else if (mobileOverlay) {
      const next = !isOpenMobile;
      if (isControlled) onOpenChange?.(next);
      else setLocalOpen(next);
    }
  };

  const handleItemClick = (id: string) => {
    // 1) Switch page
    onSelect?.(id);

    // 2) If mobile overlay, close drawer so content is visible
    if (!isDesktop && mobileOverlay) {
      if (isControlled) onOpenChange?.(false);
      else setLocalOpen(false);
    }
  };

  return (
    <aside
      className={className}
      aria-label="Primary navigation"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {/* Header */}
      <div className="rsp__header">
        <div className="rsp__header-left">
          <div className="rsp__product" aria-hidden={isDesktop ? !expanded : false}>
            {product}
          </div>
          {isDesktop && expanded && <div className="rsp__subproduct">{subProduct}</div>}
        </div>

        <div className="rsp__controls">
          <button
            type="button"
            className="rsp__btn ghost"
            aria-label={
              isDesktop
                ? expanded
                  ? 'Collapse sidebar'
                  : 'Expand sidebar'
                : isOpenMobile
                ? 'Close sidebar'
                : 'Open sidebar'
            }
            onClick={toggleExpanded}
          >
            <MenuOutlined sx={{ fontSize: 18 }} />
          </button>

          {isDesktop && (
            <button
              type="button"
              className="rsp__btn ghost"
              title={pinned ? 'Unpin' : 'Pin'}
              aria-pressed={pinned}
              onClick={() => setPinned((p) => !p)}
            >
              {pinned ? <PushPin sx={{ fontSize: 18 }} /> : <PushPinOutlined sx={{ fontSize: 18 }} />}
            </button>
          )}
        </div>

        <div className="rsp__corner-notch" aria-hidden="true" />
      </div>

      {/* Navigation */}
      <nav className="rsp__nav" role="navigation" aria-label="Main">
        {items.map((i) => (
          <button
            type="button"
            key={i.id}
            className={`rsp__item ${i.active ? 'is-active' : ''}`}
            title={i.label}
            aria-label={i.label}
            aria-current={i.active ? 'page' : undefined}
            onClick={() => handleItemClick(i.id)}
          >
            <span className="rsp__icon" aria-hidden="true">
              {renderIcon(i.icon)}
            </span>
            <span className="rsp__label">{i.label}</span>
          </button>
        ))}
      </nav>

      {/* Footer */}
      <footer className="rsp__footer">
        <span className="rsp__copy">© {year}</span>
      </footer>
    </aside>
  );
};

export default ResponsiveSidebar;