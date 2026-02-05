import React from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  fetchScans,
  startNewScan,
  setFilters,
  selectScanFilters,
  selectScansLoading,
} from "../store/Scanslice";

export default function ScanControls() {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(selectScanFilters);
  const loading = useAppSelector(selectScansLoading);

  const handleStartScan = async () => {
    await dispatch(startNewScan("Quick PCI Scan"));   // <-- THIS IS THE FIX
  };

  const handleRefresh = () => {
    dispatch(fetchScans());
  };

  return (
    <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
      <select
        value={filters.status ?? "all"}
        onChange={(e) => dispatch(setFilters({ status: e.target.value as any }))}
      >
        <option value="all">All</option>
        <option value="queued">Queued</option>
        <option value="running">Running</option>
        <option value="completed">Completed</option>
        <option value="failed">Failed</option>
      </select>

      <input
        placeholder="Search by name or id"
        value={filters.search ?? ""}
        onChange={(e) => dispatch(setFilters({ search: e.target.value }))}
      />

      <button onClick={handleRefresh} disabled={loading}>
        {loading ? "Refreshing..." : "Refresh"}
      </button>

      <button onClick={handleStartScan} disabled={loading}>
        {loading ? "Starting..." : "Start Scan"}
      </button>
    </div>
  );
}
