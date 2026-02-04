// src/components/charts/SeverityBarChart.tsx
import React, { useMemo } from 'react';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useAppSelector } from '../../store/hooks';
import { selectSeverityCounts } from '../../store/severityslice';

const severityOrder = ['Critical', 'High', 'Medium', 'Low'] as const;
const severityColors: Record<(typeof severityOrder)[number], string> = {
  Critical: '#ef4444',
  High:     '#f97316',
  Medium:   '#f59e0b',
  Low:      '#22c55e',
};

export default function SeverityBarChart() {
  const counts = useAppSelector(selectSeverityCounts);

  const options = useMemo<Highcharts.Options>(() => {
    const categories = severityOrder as unknown as string[];
    const data = severityOrder.map(s => ({
      name: s,
      y: counts?.[s] ?? 0,
      color: severityColors[s],
    }));

    return {
      chart: {
        type: 'bar',
        backgroundColor: 'transparent',
        height: 220,
        spacing: [8, 8, 8, 8],
        style: { pointerEvents: 'auto' },
      },
      title: { text: undefined },

      xAxis: {
        categories,
        labels: { style: { color: 'var(--text-color, #0f172a)', fontWeight: '600' } },
        lineColor: 'var(--border-color, #e2e8f0)',
        tickColor: 'var(--border-color, #e2e8f0)',
      },
      yAxis: {
        title: { text: undefined },
        gridLineColor: 'rgba(0,0,0,0.07)',
        labels: { style: { color: 'var(--text-color, #0f172a)' } },
      },
      legend: { enabled: false },

      tooltip: {
        enabled: true,
        useHTML: true,
        outside: true,
        followPointer: true,
        stickOnContact: true,
        padding: 8,
        borderWidth: 1,
        borderRadius: 6,
        className: 'severity-tooltip',
        formatter: function (this: any) {
          const p = this.point;
          const name = p?.name ?? this.x ?? '';
          const val = typeof p?.y === 'number' ? p.y : 0;
          return `<div><strong>${name}</strong>: ${val} issues</div>`;
        },
      },

      plotOptions: {
        series: {
          borderWidth: 0,
          enableMouseTracking: true,
          states: {
            inactive: { enabled: false },
            hover: { enabled: true, brightness: 0.06 },
          },
          dataLabels: { enabled: false }, // only show values on hover (tooltip)
        },
        bar: {
          pointPadding: 0.1,
          groupPadding: 0.08,
        },
      },

      series: [{ type: 'bar', name: 'Vulnerabilities', data }],
      credits: { enabled: false },
      accessibility: { enabled: false },
    };
  }, [counts]);

  return (
    <div style={{ position: 'relative', height: 220, zIndex: 5 }}>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}