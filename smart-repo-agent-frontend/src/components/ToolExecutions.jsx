import { useState } from 'react';

export default function ToolExecutions({ executions }) {
  const [expanded, setExpanded] = useState(false);

  if (!executions || executions.length === 0) return null;

  return (
    <div className="mt-3 border-t border-slate-100 pt-3">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-800 font-medium"
      >
        <span className={`inline-block transition-transform ${expanded ? 'rotate-90' : ''}`}>▶</span>
        ツール使用状況 ({executions.length})
      </button>
      {expanded && (
        <div className="mt-2 space-y-3">
          {executions.map((exec, i) => (
            <div
              key={i}
              className="bg-slate-50 rounded-lg p-3 text-sm border border-slate-100"
            >
              <div className="font-medium text-slate-700 mb-1">{exec.tool}</div>
              <div className="space-y-1">
                <div>
                  <span className="text-slate-500">入力:</span>
                  <pre className="mt-0.5 p-2 bg-white rounded text-xs overflow-x-auto text-slate-700">
                    {typeof exec.input === 'string' ? exec.input : JSON.stringify(exec.input, null, 2)}
                  </pre>
                </div>
                <div>
                  <span className="text-slate-500">出力:</span>
                  <pre className="mt-0.5 p-2 bg-white rounded text-xs overflow-x-auto text-slate-700 whitespace-pre-wrap">
                    {exec.output}
                  </pre>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
