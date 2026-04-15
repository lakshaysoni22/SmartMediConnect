import React, { useMemo, useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export function AdminReportModal({ isOpen, onClose, reportData }) {
  const reportRef = useRef(null);
  const [isDownloading, setIsDownloading] = React.useState(false);
  const [downloadError, setDownloadError] = React.useState('');

  const generatedOn = useMemo(() => {
    return new Date().toLocaleString();
  }, [isOpen]);

  if (!isOpen) return null;

  const handleDownloadPdf = async () => {
    if (!reportRef.current) return;
    setIsDownloading(true);
    setDownloadError('');

    try {
      const canvas = await html2canvas(reportRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        useCORS: true,
        allowTaint: true
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const imageWidth = canvas.width;
      const imageHeight = canvas.height;
      const ratio = pdfWidth / imageWidth;
      const scaledHeight = imageHeight * ratio;

      let positionY = 0;
      let remainingHeight = scaledHeight;

      pdf.addImage(imgData, 'PNG', 0, positionY, pdfWidth, scaledHeight);
      remainingHeight -= pdfHeight;

      while (remainingHeight > 0) {
        positionY = remainingHeight - scaledHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, positionY, pdfWidth, scaledHeight);
        remainingHeight -= pdfHeight;
      }

      const blob = pdf.output('blob');
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = 'Analytics_Report.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    } catch {
      try {
        const fallbackCanvas = await html2canvas(reportRef.current, {
          scale: 2,
          backgroundColor: '#ffffff',
          useCORS: true,
          allowTaint: true
        });
        const pngUrl = fallbackCanvas.toDataURL('image/png');
        const pngLink = document.createElement('a');
        pngLink.href = pngUrl;
        pngLink.download = 'Analytics_Report.png';
        document.body.appendChild(pngLink);
        pngLink.click();
        document.body.removeChild(pngLink);
        setDownloadError('PDF generation failed. Downloaded PNG report instead.');
      } catch {
        setDownloadError('Unable to generate PDF right now. Please try again.');
      }
    } finally {
      setIsDownloading(false);
    }
  };

  const maxRevenue = Math.max(...(reportData.revenueTrend || []).map((row) => row.revenue || 0), 1);
  const totalDemographics = (reportData.demographics || []).reduce((sum, item) => sum + (item.value || 0), 0);

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-4xl max-h-[92vh] overflow-hidden bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl">
        <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Analytics Report</h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
            aria-label="Close report"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="p-5 overflow-y-auto max-h-[calc(92vh-140px)]">
          <div ref={reportRef} className="space-y-4">
            <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-4">
              <p className="text-sm text-slate-600 dark:text-slate-300">Generated on: {generatedOn}</p>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-4">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Revenue Trend</h4>
              <p className="text-sm text-slate-700 dark:text-slate-300">Total Revenue: {reportData.totalRevenue}</p>
              <p className="text-sm text-slate-700 dark:text-slate-300">Growth: {reportData.revenueGrowth}</p>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                Revenue has shown steady growth over the past period.
              </p>

              <div className="mt-4 space-y-2">
                {(reportData.revenueTrend || []).map((row) => (
                  <div key={row.month} className="grid grid-cols-[50px_1fr] gap-2 items-center">
                    <span className="text-xs text-slate-500 dark:text-slate-400">{row.month}</span>
                    <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-emerald-500"
                        style={{ width: `${Math.max(5, (row.revenue / maxRevenue) * 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-4">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Patient Demographics</h4>
              <div className="space-y-1 text-sm text-slate-700 dark:text-slate-300">
                {reportData.demographics.map((item) => (
                  <p key={item.name}>{item.name}: {item.value} patients</p>
                ))}
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                Majority patients belong to age group {reportData.majorityAgeGroup}.
              </p>

              <div className="mt-4 space-y-2">
                {(reportData.demographics || []).map((item) => {
                  const pct = totalDemographics > 0 ? ((item.value / totalDemographics) * 100).toFixed(1) : '0';
                  return (
                    <div key={`bar-${item.name}`} className="space-y-1">
                      <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-300">
                        <span>{item.name}</span>
                        <span>{pct}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${pct}%`, backgroundColor: item.color || '#3b82f6' }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-4">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Appointments Summary</h4>
              <p className="text-sm text-slate-700 dark:text-slate-300">Total Appointments: {reportData.appointments.total}</p>
              <p className="text-sm text-slate-700 dark:text-slate-300">Completed: {reportData.appointments.completed}</p>
              <p className="text-sm text-slate-700 dark:text-slate-300">Pending: {reportData.appointments.pending}</p>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-4">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Key Insights</h4>
              <ul className="space-y-1 text-sm text-slate-700 dark:text-slate-300">
                {reportData.insights.map((insight) => (
                  <li key={insight} className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-[16px] text-blue-600">insights</span>
                    <span>{insight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="px-5 py-4 border-t border-slate-200 dark:border-slate-700 flex items-center justify-end gap-3">
          {downloadError ? <p className="mr-auto text-xs text-red-500">{downloadError}</p> : null}
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-sm font-medium"
          >
            Close
          </button>
          <button
            onClick={handleDownloadPdf}
            disabled={isDownloading}
            className="px-4 py-2 rounded-lg bg-[#0077b6] hover:bg-blue-600 text-white transition-colors text-sm font-medium flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <span className="material-symbols-outlined text-[18px]">download</span>
            {isDownloading ? 'Generating PDF...' : 'Download Report (PDF)'}
          </button>
        </div>
      </div>
    </div>
  );
}
