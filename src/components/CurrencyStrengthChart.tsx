import { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CurrencyStrengthData {
  code: string;
  change: number;
}

interface CurrencyStrengthChartProps {
  data: CurrencyStrengthData[];
  title: string;
  provider: string;
}

const CurrencyStrengthChart = ({ data, title, provider }: CurrencyStrengthChartProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Sort data from strongest to weakest
  const sortedData = [...data].sort((a, b) => b.change - a.change);

  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth;
    canvas.height = 400;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw chart
    drawChart(ctx, sortedData, canvas.width, canvas.height);
  }, [sortedData]);

  const drawChart = (
    ctx: CanvasRenderingContext2D, 
    data: CurrencyStrengthData[], 
    width: number, 
    height: number
  ) => {
    // Chart settings
    const padding = { top: 50, right: 80, bottom: 50, left: 80 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;
    
    // Find min and max values for y-axis scaling
    const values = data.map(d => d.change);
    let minValue = Math.min(...values);
    let maxValue = Math.max(...values);
    
    // Add some padding to min/max for better visualization
    const padding_factor = 0.2; // 20% padding
    const valueRange = maxValue - minValue;
    
    minValue = minValue - valueRange * padding_factor;
    maxValue = maxValue + valueRange * padding_factor;
    
    // Round to nice values
    minValue = Math.floor(minValue * 10) / 10;
    maxValue = Math.ceil(maxValue * 10) / 10;
    
    // Ensure zero is always visible
    if (minValue > 0) minValue = 0;
    if (maxValue < 0) maxValue = 0;
    
    // Calculate scales
    const barWidth = chartWidth / data.length;
    const yScale = chartHeight / (maxValue - minValue);
    
    // Draw background
    ctx.fillStyle = '#1e293b'; // slate-800
    ctx.fillRect(0, 0, width, height);
    
    // Draw grid lines
    ctx.strokeStyle = '#334155'; // slate-700
    ctx.lineWidth = 1;
    
    // Horizontal grid lines
    const numGridLines = 10;
    const gridStep = (maxValue - minValue) / numGridLines;
    
    ctx.beginPath();
    for (let i = 0; i <= numGridLines; i++) {
      const value = minValue + i * gridStep;
      const y = padding.top + chartHeight - (value - minValue) * yScale;
      
      ctx.moveTo(padding.left, y);
      ctx.lineTo(width - padding.right, y);
      
      // Add y-axis labels
      ctx.fillStyle = '#94a3b8'; // slate-400
      ctx.font = '12px Inter, sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(`${value.toFixed(2)}%`, padding.left - 10, y + 4);
    }
    ctx.stroke();
    
    // Draw zero line thicker if it's in the range
    if (minValue <= 0 && maxValue >= 0) {
      const zeroY = padding.top + chartHeight - (0 - minValue) * yScale;
      ctx.beginPath();
      ctx.strokeStyle = '#475569'; // slate-600
      ctx.lineWidth = 2;
      ctx.moveTo(padding.left, zeroY);
      ctx.lineTo(width - padding.right, zeroY);
      ctx.stroke();
    }
    
    // Draw bars
    data.forEach((item, index) => {
      const x = padding.left + index * barWidth;
      const barHeight = Math.abs(item.change) * yScale;
      
      // Determine if bar goes up or down from zero
      const zeroY = padding.top + chartHeight - (0 - minValue) * yScale;
      let y = zeroY;
      
      if (item.change > 0) {
        y = zeroY - barHeight;
      }
      
      // Determine bar color based on value
      let color;
      if (item.change > 0) {
        color = '#10b981'; // emerald-500
      } else if (item.change < 0) {
        color = '#ef4444'; // red-500
      } else {
        color = '#6b7280'; // gray-500
      }
      
      // Draw bar
      ctx.fillStyle = color;
      ctx.fillRect(x + barWidth * 0.15, y, barWidth * 0.7, item.change > 0 ? barHeight : -barHeight);
      
      // Draw currency code
      ctx.fillStyle = '#f8fafc'; // slate-50
      ctx.font = 'bold 14px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(item.code, x + barWidth / 2, height - padding.bottom / 2);
      
      // Draw value on top/bottom of bar
      ctx.fillStyle = '#f8fafc'; // slate-50
      ctx.font = '12px Inter, sans-serif';
      ctx.textAlign = 'center';
      const valueText = `${item.change > 0 ? '+' : ''}${item.change.toFixed(2)}%`;
      
      if (item.change > 0) {
        ctx.fillText(valueText, x + barWidth / 2, y - 8);
      } else {
        ctx.fillText(valueText, x + barWidth / 2, y + 16);
      }
    });
    
    // Draw chart title
    ctx.fillStyle = '#f8fafc'; // slate-50
    ctx.font = 'bold 16px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(title, width / 2, 25);
  };

  return (
    <Card className="border-slate-700 bg-slate-800 text-white">
      <CardHeader className="pb-2">
        <CardTitle className="text-slate-200 flex items-center justify-between">
          <span>{title}</span>
          <span className="text-xs font-normal text-slate-400">Data provider: {provider}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full h-[400px] relative">
          <canvas ref={canvasRef} className="w-full h-full" />
        </div>
      </CardContent>
    </Card>
  );
};

export default CurrencyStrengthChart; 