// src/pages/Network/NetworkPage.tsx
import * as React from 'react';
import {
  Box, Paper, Stack, Tabs, Tab, Typography, Button,
  IconButton, Tooltip, Table, TableHead, TableBody, TableRow, TableCell, Divider,
} from '@mui/material';

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import SearchIcon from '@mui/icons-material/Search';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import LanOutlinedIcon from '@mui/icons-material/LanOutlined';

import './Network.css';

export type NetworkScan = {
  id: string;
  title: string;
  status: 'Failed' | 'Success' | 'Running' | 'Queued';
  date: string;
};

const DISCOVERY_TABS = [
  'Discovery', 'New Scan', 'Scheduled Scans', 'Scan Results',
  'Vulnerabilities', 'False Positive History', 'Open Services Report',
];

const MOCK_SCANS: NetworkScan[] = [
  { id: '1', title: 'IPSCAN', status: 'Failed', date: '01/14/2026' },
  { id: '2', title: 'allIPscan', status: 'Failed', date: '01/14/2026' },
];

function StatusCell({ status }: { status: NetworkScan['status'] }) {
  const className =
    status === 'Failed' ? 'status status-failed' :
    status === 'Success' ? 'status status-success' :
    status === 'Running' ? 'status status-running' :
    'status status-queued';
  return <span className={className}>{status}</span>;
}

function NetworkDiscoveryContent() {
  const [tab, setTab] = React.useState(0);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage] = React.useState(10);

  const scans = MOCK_SCANS;
  const total = scans.length;
  const pageCount = Math.max(1, Math.ceil(total / rowsPerPage));
  const startIndex = page * rowsPerPage;
  const pageRows = scans.slice(startIndex, startIndex + rowsPerPage);
  const startLabel = total === 0 ? 0 : startIndex + 1;
  const endLabel = Math.min(total, startIndex + pageRows.length);

  const handleFirst = () => setPage(0);
  const handlePrev  = () => setPage(p => Math.max(0, p - 1));
  const handleNext  = () => setPage(p => Math.min(pageCount - 1, p + 1));
  const handleLast  = () => setPage(pageCount - 1);
  const handleNewScan = () => console.log('New Scan clicked');
  const handleSearch  = () => console.log('Search clicked');

  return (
    <Box className="network-root">
      <Paper className="network-shell" elevation={0}>
        <Stack direction="row" alignItems="center" gap={1.25} className="network-title-row">
          <LanOutlinedIcon className="network-title-icon" />
          <Typography variant="h6" className="network-title-text">Network</Typography>
        </Stack>

        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
          className="network-tabs"
        >
          {DISCOVERY_TABS.map(label => (
            <Tab key={label} label={label} className="network-tab" />
          ))}
        </Tabs>
      </Paper>

      <Paper className="network-panel" elevation={0}>
        <div className="network-panel-bar">
          <div className="network-actions">
            <Button
              variant="contained"
              disableElevation
              onClick={handleNewScan}
              className="newscan-btn"
            >
              New Scan
            </Button>
            <Button
              variant="outlined"
              onClick={handleSearch}
              startIcon={<SearchIcon />}
              className="search-btn"
            >
              Search
            </Button>
          </div>

          <div className="network-pagination">
            <div className="pager-chip">
              <Tooltip title="First page"><span>
                <IconButton size="small" onClick={handleFirst} disabled={page === 0}>
                  <FirstPageIcon fontSize="small" />
                </IconButton>
              </span></Tooltip>
              <Tooltip title="Previous page"><span>
                <IconButton size="small" onClick={handlePrev} disabled={page === 0}>
                  <NavigateBeforeIcon fontSize="small" />
                </IconButton>
              </span></Tooltip>

              <span className="pager-label">{startLabel} - {endLabel} of {total}</span>

              <Tooltip title="Next page"><span>
                <IconButton size="small" onClick={handleNext} disabled={page >= pageCount - 1}>
                  <NavigateNextIcon fontSize="small" />
                </IconButton>
              </span></Tooltip>
              <Tooltip title="Last page"><span>
                <IconButton size="small" onClick={handleLast} disabled={page >= pageCount - 1}>
                  <LastPageIcon fontSize="small" />
                </IconButton>
              </span></Tooltip>
            </div>
          </div>
        </div>

        <div className="network-table-wrap">
          <Table size="medium" aria-label="Discovery scans table">
            <TableHead>
              <TableRow className="network-thead-row">
                <TableCell className="th details">Details</TableCell>
                <TableCell className="th view">View</TableCell>
                <TableCell className="th">Scan Title</TableCell>
                <TableCell className="th status">Scan Status</TableCell>
                <TableCell className="th date">Scan Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pageRows.map(row => (
                <TableRow key={row.id} hover className="network-row">
                  <TableCell className="cell details">
                    <Tooltip title="Scan details">
                      <IconButton size="small" color="info" aria-label={`Details for ${row.title}`} className="icon-btn">
                        <InfoOutlinedIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                  <TableCell className="cell view">
                    <Tooltip title="View scan">
                      <IconButton size="small" aria-label={`View ${row.title}`} className="icon-btn">
                        <SearchIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                  <TableCell className="cell title">
                    <Typography className="scan-title">{row.title}</Typography>
                  </TableCell>
                  <TableCell className="cell status">
                    <StatusCell status={row.status} />
                  </TableCell>
                  <TableCell className="cell date">
                    <Typography className="scan-date">{row.date}</Typography>
                  </TableCell>
                </TableRow>
              ))}

              {pageRows.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} align="center" className="empty-state">No scans found.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <Divider className="panel-divider" />
      </Paper>
    </Box>
  );
}

export const NetworkPage: React.FC = () => {
  return <NetworkDiscoveryContent />;
};