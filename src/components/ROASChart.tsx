import { useEffect, useRef } from "react";
const ROASChart = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size for high DPI
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    const width = rect.width;
    const height = rect.height;

    // Data
    const data = [{
      label: "The Brew Company",
      value: 13
    }, {
      label: "Četras Zoles",
      value: 36
    }, {
      label: "Aleph Clients",
      value: 10
    }];
    const maxValue = 40;
    const padding = {
      top: 40,
      right: 40,
      bottom: 60,
      left: 60
    };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw bars
    const barWidth = chartWidth / data.length / 1.5;
    const barSpacing = chartWidth / data.length;
    data.forEach((item, index) => {
      const barHeight = item.value / maxValue * chartHeight;
      const x = padding.left + index * barSpacing + (barSpacing - barWidth) / 2;
      const y = padding.top + chartHeight - barHeight;

      // Bar
      ctx.fillStyle = `rgba(255, 255, 255, ${0.4 + index * 0.2})`;
      ctx.fillRect(x, y, barWidth, barHeight);

      // Value on top
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 18px Playfair Display';
      ctx.textAlign = 'center';
      ctx.fillText(`${item.value}x`, x + barWidth / 2, y - 10);

      // Label
      ctx.fillStyle = '#E0E0E0';
      ctx.font = '12px Montserrat';
      const words = item.label.split(' ');
      words.forEach((word, i) => {
        ctx.fillText(word, x + barWidth / 2, padding.top + chartHeight + 20 + i * 15);
      });
    });

    // Y-axis
    ctx.strokeStyle = '#E0E0E0';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padding.left, padding.top);
    ctx.lineTo(padding.left, padding.top + chartHeight);
    ctx.stroke();

    // Y-axis labels
    ctx.fillStyle = '#E0E0E0';
    ctx.font = '12px Montserrat';
    ctx.textAlign = 'right';
    for (let i = 0; i <= 4; i++) {
      const value = maxValue / 4 * i;
      const y = padding.top + chartHeight - chartHeight / 4 * i;
      ctx.fillText(`${value}x`, padding.left - 10, y + 4);
    }

    // Title
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 16px Playfair Display';
    ctx.textAlign = 'left';
    ctx.fillText('Campaign Performance (ROAS)', padding.left, padding.top - 15);
  }, []);
  return;
};
export default ROASChart;