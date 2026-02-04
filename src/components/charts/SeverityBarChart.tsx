import React, { useMemo } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useAppSelector } from '../../store/hooks';
import { selectSeverityCounts } from '../../store/severityslice';

const severityOrder = ['Critical', 'High', 'Medium', 'Low'] as const;
const severityColors: Record<(typeof severityOrder)[number], string> = {
  Critical: '#ef4444', // red-500
  High:     '#f97316', // orange-500
  Medium:   '#f59e0b', // amber-500
  Low:      '#22c55e', // green-500
};

export default function SeverityBarChart() {
  const counts = useAppSelector(selectSeverityCounts);

  const options = useMemo<Highcharts.Options>(() => {
    const categories = severityOrder as unknown as string[];
    const data = severityOrder.map(s => ({
      name: s,
      y: counts[s],
      color: severityColors[s],
    }));

    return {
      chart: {
        type: 'bar', // horizontal bar mimics your existing layout
        backgroundColor: 'transparent',
        height: 220,
        spacing: [8, 8, 8, 8],
      },
      title: { text: undefined },
      xAxis: {
        categories,
        labels: {
          style: { color: 'var(--text-color, #0f172a)', fontWeight: '600' },
        },
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
        backgroundColor: 'var(--surface, #ffffff)',
        borderColor: 'var(--border-color, #e2e8f0)',
        style: { color: 'var(--text-color, #0f172a)' },
        pointFormat: `<b>{point.y}</b> issues`,
      },
      plotOptions: {
        series: {
          borderWidth: 0,
          dataLabels: {
            enabled: true,
            color: 'var(--text-color, #0f172a)',
            style: { textOutline: 'none', fontWeight: '600' },
          },
        },
        bar: {
          pointPadding: 0.1,
          groupPadding: 0.08,
        },
      },
      series: [
        {
          type: 'bar',
          name: 'Vulnerabilities',
          data,
        },
      ],
      credits: { enabled: false },
    };
  }, [counts]);

  return <HighchartsReact highcharts={Highcharts} options={options} />;
}