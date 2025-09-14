import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";

interface CurrencyData {
  code: string;
  name: string;
  change: number;
  flag: string;
}

interface CurrencyStrengthTableProps {
  data: CurrencyData[];
}

const CurrencyStrengthTable = ({ data }: CurrencyStrengthTableProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-blue-600" />
          Currency Strength Ranking (1-Day Performance)
        </CardTitle>
        <p className="text-sm text-slate-600">
          Based on relative performance data from major forex pairs. Data refreshes daily but remains consistent throughout the day.
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {data.map((currency, index) => (
            <div 
              key={currency.code}
              className={`flex items-center justify-between p-4 rounded-lg border transition-all hover:shadow-md ${
                index === 0 
                  ? 'bg-green-50 border-green-200' 
                  : index === data.length - 1 
                  ? 'bg-red-50 border-red-200' 
                  : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{currency.flag}</span>
                  <div>
                    <div className="font-semibold text-slate-800">{currency.code}</div>
                    <div className="text-sm text-slate-600">{currency.name}</div>
                  </div>
                </div>
                
                {index === 0 && (
                  <Badge className="bg-green-600 text-white">🟢 Strongest</Badge>
                )}
                {index === data.length - 1 && (
                  <Badge className="bg-red-600 text-white">🔴 Weakest</Badge>
                )}
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className={`text-lg font-bold ${
                    currency.change > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {currency.change > 0 ? '+' : ''}{currency.change.toFixed(2)}%
                  </div>
                </div>
                {currency.change > 0 ? (
                  <TrendingUp className="h-5 w-5 text-green-600" />
                ) : (
                  <TrendingDown className="h-5 w-5 text-red-600" />
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CurrencyStrengthTable;
