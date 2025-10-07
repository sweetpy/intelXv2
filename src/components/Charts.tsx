import React, { useState } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface BarChartProps {
  data: Array<{ label: string; value: number; color?: string }>;
  height?: number;
  showValues?: boolean;
  interactive?: boolean;
}

export const BarChart: React.FC<BarChartProps> = ({ data, height = 300, showValues = true, interactive = true }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const maxValue = Math.max(...data.map(d => d.value));

  return (
    <div className="w-full" style={{ height }}>
      <div className="flex items-end justify-between h-full gap-2">
        {data.map((item, index) => {
          const barHeight = (item.value / maxValue) * 100;
          const isHovered = hoveredIndex === index;

          return (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div className="w-full flex flex-col items-center justify-end" style={{ height: '85%' }}>
                {showValues && (isHovered || !interactive) && (
                  <div className="text-xs font-semibold text-gray-700 mb-1 animate-fade-in">
                    {item.value.toLocaleString()}
                  </div>
                )}
                <div
                  className={`w-full rounded-t-lg transition-all duration-300 cursor-pointer relative ${
                    isHovered ? 'opacity-100 shadow-lg' : 'opacity-90'
                  }`}
                  style={{
                    height: `${barHeight}%`,
                    backgroundColor: item.color || '#10B981',
                    transform: isHovered ? 'scaleY(1.05)' : 'scaleY(1)',
                    transformOrigin: 'bottom'
                  }}
                  onMouseEnter={() => interactive && setHoveredIndex(index)}
                  onMouseLeave={() => interactive && setHoveredIndex(null)}
                >
                  {isHovered && (
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                      {item.label}: {item.value.toLocaleString()}
                    </div>
                  )}
                </div>
              </div>
              <div className="text-xs text-gray-600 mt-2 text-center font-medium">
                {item.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

interface LineChartProps {
  data: Array<{ label: string; value: number }>;
  color?: string;
  height?: number;
  showDots?: boolean;
  interactive?: boolean;
}

export const LineChart: React.FC<LineChartProps> = ({
  data,
  color = '#10B981',
  height = 300,
  showDots = true,
  interactive = true
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const maxValue = Math.max(...data.map(d => d.value));
  const minValue = Math.min(...data.map(d => d.value));
  const range = maxValue - minValue;

  const points = data.map((item, index) => ({
    x: (index / (data.length - 1)) * 100,
    y: 100 - ((item.value - minValue) / range) * 80
  }));

  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaD = `${pathD} L ${points[points.length - 1].x} 100 L 0 100 Z`;

  return (
    <div className="w-full relative" style={{ height }}>
      <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.3" />
            <stop offset="100%" stopColor={color} stopOpacity="0.05" />
          </linearGradient>
        </defs>

        <path d={areaD} fill="url(#lineGradient)" />
        <path d={pathD} fill="none" stroke={color} strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round" />

        {showDots && points.map((point, index) => (
          <circle
            key={index}
            cx={point.x}
            cy={point.y}
            r={hoveredIndex === index ? "2" : "1"}
            fill={color}
            className="transition-all duration-200 cursor-pointer"
            onMouseEnter={() => interactive && setHoveredIndex(index)}
            onMouseLeave={() => interactive && setHoveredIndex(null)}
          />
        ))}
      </svg>

      <div className="flex justify-between mt-2">
        {data.map((item, index) => (
          <div key={index} className="text-xs text-gray-600 text-center flex-1">
            {item.label}
          </div>
        ))}
      </div>

      {hoveredIndex !== null && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-2 rounded-lg shadow-lg">
          <div className="font-semibold">{data[hoveredIndex].label}</div>
          <div className="text-green-300">{data[hoveredIndex].value.toLocaleString()}</div>
        </div>
      )}
    </div>
  );
};

interface DonutChartProps {
  data: Array<{ label: string; value: number; color: string }>;
  size?: number;
  thickness?: number;
  showPercentages?: boolean;
  interactive?: boolean;
}

export const DonutChart: React.FC<DonutChartProps> = ({
  data,
  size = 200,
  thickness = 30,
  showPercentages = true,
  interactive = true
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const center = size / 2;
  const radius = (size - thickness) / 2;

  let currentAngle = -90;
  const segments = data.map((item, index) => {
    const percentage = (item.value / total) * 100;
    const angle = (percentage / 100) * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + angle;

    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;

    const x1 = center + radius * Math.cos(startRad);
    const y1 = center + radius * Math.sin(startRad);
    const x2 = center + radius * Math.cos(endRad);
    const y2 = center + radius * Math.sin(endRad);

    const largeArc = angle > 180 ? 1 : 0;

    const pathData = [
      `M ${center} ${center}`,
      `L ${x1} ${y1}`,
      `A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`,
      'Z'
    ].join(' ');

    currentAngle = endAngle;

    return { ...item, pathData, percentage, startAngle, endAngle };
  });

  return (
    <div className="flex items-center gap-6">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          {segments.map((segment, index) => (
            <path
              key={index}
              d={segment.pathData}
              fill={segment.color}
              className={`transition-all duration-300 cursor-pointer ${
                hoveredIndex === index ? 'opacity-100' : 'opacity-90'
              }`}
              style={{
                transform: hoveredIndex === index ? 'scale(1.05)' : 'scale(1)',
                transformOrigin: 'center'
              }}
              onMouseEnter={() => interactive && setHoveredIndex(index)}
              onMouseLeave={() => interactive && setHoveredIndex(null)}
            />
          ))}

          <circle
            cx={center}
            cy={center}
            r={radius - thickness}
            fill="white"
          />
        </svg>

        {hoveredIndex !== null && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">
                {segments[hoveredIndex].percentage.toFixed(1)}%
              </div>
              <div className="text-xs text-gray-600 mt-1">
                {segments[hoveredIndex].label}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex-1 space-y-2">
        {segments.map((segment, index) => (
          <div
            key={index}
            className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-all ${
              hoveredIndex === index ? 'bg-gray-100' : 'hover:bg-gray-50'
            }`}
            onMouseEnter={() => interactive && setHoveredIndex(index)}
            onMouseLeave={() => interactive && setHoveredIndex(null)}
          >
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: segment.color }}
              />
              <span className="text-sm font-medium text-gray-700">{segment.label}</span>
            </div>
            <div className="text-sm font-semibold text-gray-900">
              {showPercentages ? `${segment.percentage.toFixed(1)}%` : segment.value.toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

interface ProgressBarProps {
  value: number;
  max: number;
  label?: string;
  color?: string;
  showPercentage?: boolean;
  height?: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max,
  label,
  color = '#10B981',
  showPercentage = true,
  height = 8
}) => {
  const percentage = (value / max) * 100;

  return (
    <div className="w-full">
      {label && (
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm font-medium text-gray-700">{label}</span>
          {showPercentage && (
            <span className="text-sm font-semibold text-gray-900">{percentage.toFixed(1)}%</span>
          )}
        </div>
      )}
      <div className="w-full bg-gray-200 rounded-full overflow-hidden" style={{ height }}>
        <div
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{
            width: `${percentage}%`,
            backgroundColor: color
          }}
        />
      </div>
    </div>
  );
};

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  icon?: React.ComponentType<{ className?: string }>;
  color?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  trend = 'neutral',
  icon: Icon,
  color = 'green'
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow duration-300">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          {change && (
            <div className="flex items-center mt-2">
              {trend === 'up' && <TrendingUp className="h-4 w-4 text-green-500 mr-1" />}
              {trend === 'down' && <TrendingDown className="h-4 w-4 text-red-500 mr-1" />}
              <span className={`text-sm font-medium ${
                trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-600'
              }`}>
                {change}
              </span>
            </div>
          )}
        </div>
        {Icon && (
          <div className={`w-14 h-14 rounded-xl flex items-center justify-center bg-${color}-100`}>
            <Icon className={`h-7 w-7 text-${color}-600`} />
          </div>
        )}
      </div>
    </div>
  );
};
