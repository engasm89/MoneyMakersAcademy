
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle, Target } from "lucide-react";

interface EntryCheckItem {
  indicator: string;
  goodCriteria: string;
  lateCriteria: string;
  currentValue: string;
  status: 'good' | 'late' | 'caution';
}

interface LateEntryCheckProps {
  data: EntryCheckItem[];
  pair: string;
}

const LateEntryCheck = ({ data, pair }: LateEntryCheckProps) => {
  const goodCount = data.filter(item => item.status === 'good').length;
  const totalCount = data.length;
  const safeToTrade = goodCount >= Math.ceil(totalCount * 0.6); // 60% threshold

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'good':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'late':
        return <AlertTriangle className="h-5 w-5 text-red-600" />;
      case 'caution':
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
      default:
        return null;
    }
  };

  const getStatusEmoji = (status: string) => {
    switch (status) {
      case 'good':
        return '✅';
      case 'late':
        return '🚨';
      case 'caution':
        return '⚠️';
      default:
        return '';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'good':
        return <Badge className="bg-green-100 text-green-800 border-green-300">Good Entry</Badge>;
      case 'late':
        return <Badge className="bg-red-100 text-red-800 border-red-300">Late Entry</Badge>;
      case 'caution':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">Caution</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5 text-blue-600" />
          Late Entry Check - {pair}
        </CardTitle>
        <div className="flex items-center gap-4">
          <p className="text-sm text-slate-600">
            Analyzing entry timing across multiple technical indicators
          </p>
          <Badge variant="outline" className={`${
            safeToTrade ? 'border-green-300 text-green-700' : 'border-red-300 text-red-700'
          }`}>
            {goodCount}/{totalCount} indicators positive
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-2 font-semibold text-slate-700">Indicator</th>
                <th className="text-left py-3 px-2 font-semibold text-green-700">Good Entry ✅</th>
                <th className="text-left py-3 px-2 font-semibold text-red-700">Late Entry 🚨</th>
                <th className="text-left py-3 px-2 font-semibold text-slate-700">Current Status</th>
                <th className="text-center py-3 px-2 font-semibold text-slate-700">Result</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr 
                  key={index} 
                  className={`border-b border-slate-100 transition-colors hover:bg-slate-50 ${
                    item.status === 'good' ? 'bg-green-50/30' : 
                    item.status === 'late' ? 'bg-red-50/30' : 'bg-yellow-50/30'
                  }`}
                >
                  <td className="py-4 px-2 font-medium text-slate-800">{item.indicator}</td>
                  <td className="py-4 px-2 text-sm text-slate-600">{item.goodCriteria}</td>
                  <td className="py-4 px-2 text-sm text-slate-600">{item.lateCriteria}</td>
                  <td className="py-4 px-2">
                    <div className="font-medium text-slate-800">{item.currentValue}</div>
                  </td>
                  <td className="py-4 px-2 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-xl">{getStatusEmoji(item.status)}</span>
                      {getStatusIcon(item.status)}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Summary */}
        <div className={`mt-6 p-4 rounded-lg border-2 ${
          safeToTrade 
            ? 'bg-green-50 border-green-200' 
            : 'bg-red-50 border-red-200'
        }`}>
          <div className="flex items-center gap-3 mb-2">
            {safeToTrade ? (
              <CheckCircle className="h-6 w-6 text-green-600" />
            ) : (
              <AlertTriangle className="h-6 w-6 text-red-600" />
            )}
            <h3 className={`font-semibold text-lg ${
              safeToTrade ? 'text-green-800' : 'text-red-800'
            }`}>
              ADHD-Friendly Summary
            </h3>
          </div>
          <p className={`text-base font-medium ${
            safeToTrade ? 'text-green-700' : 'text-red-700'
          }`}>
            {safeToTrade 
              ? `✅ All late entry checks are looking good! ${pair} appears to be a solid entry opportunity.`
              : `🚨 Too many late entry signals detected. Wait for a pullback or consolidation before trading ${pair}.`
            }
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default LateEntryCheck;
