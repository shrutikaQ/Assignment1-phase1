
import React, { useEffect, useMemo, useState } from 'react';
import type { NavItem } from '../../types';
import PushPinOutlined from '@mui/icons-material/PushPinOutlined';
import PushPin from '@mui/icons-material/PushPin';
import MenuOutlined from '@mui/icons-material/MenuOutlined';

import "../../styles/sidebar-responsive.css";



/** If you already have useMedia in your app, import it instead of this stub. */
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
};

export const ResponsiveSidebar: React.FC<Props> = ({
  items,
  onSelect,
  product = 'PCI',
  subProduct = 'PCI Compliance',
  year = new Date().getFullYear(),
  hoverExpand = true,
  desktopMinWidth = 992,
}) => {
  const isDesktop = useMedia(`(min-width: ${desktopMinWidth}px)`);
  const [pinned, setPinned] = useState(false);

  // Desktop: collapsed by default; Mobile: expanded (drawer-like)
  const [expanded, setExpanded] = useState(!isDesktop);

  useEffect(() => {
    if (pinned) {
      setExpanded(true);
    } else {
      setExpanded(!isDesktop ? true : false);
    }
  }, [isDesktop, pinned]);

  const className = useMemo(() => {
    const base = ['sidebar-rsp'];
    base.push(expanded ? 'is-expanded' : 'is-collapsed');
    if (hoverExpand) base.push('hover-expand');
    if (pinned) base.push('is-pinned');
    return base.join(' ');
  }, [expanded, hoverExpand, pinned]);

  const handleEnter = () => {
    if (!pinned && isDesktop && hoverExpand) setExpanded(true);
  };
  const handleLeave = () => {
    if (!pinned && isDesktop && hoverExpand) setExpanded(false);
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
          <div className="rsp__product" aria-hidden={!expanded}>{product}</div>
          {expanded && <div className="rsp__subproduct">{subProduct}</div>}
        </div>

        <div className="rsp__controls">
          <button
            type="button"
            className="rsp__btn ghost"
            aria-label={expanded ? 'Collapse sidebar' : 'Expand sidebar'}
            onClick={() => setExpanded(e => !e)}
          >
            <MenuOutlined sx={{ fontSize: 18 }} />
          </button>
          <button
            type="button"
            className="rsp__btn ghost"
            title={pinned ? 'Unpin' : 'Pin'}
            aria-pressed={pinned}
            onClick={() => setPinned(p => !p)}
          >
            {pinned ? <PushPin sx={{ fontSize: 18 }} /> : <PushPinOutlined sx={{ fontSize: 18 }} />}
          </button>
        </div>

        <div className="rsp__corner-notch" aria-hidden="true" />
      </div>

      {/* Navigation */}
      <nav className="rsp__nav" role="navigation" aria-label="Main">
        {items.map(i => (
          <button
            type="button"
            key={i.id}
            className={`rsp__item ${i.active ? 'is-active' : ''}`}
            title={i.label}
            aria-label={i.label}
            aria-current={i.active ? 'page' : undefined}
            onClick={() => onSelect?.(i.id)}
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
