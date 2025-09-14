import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, TrendingUp, Copy, AlertTriangle, ChevronDown, ChevronUp } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

interface CurrencyData {
  code: string;
  name: string;
  change: number;
  flag: string;
}

interface EntryCheckItem {
  indicator: string;
  goodCriteria: string;
  lateCriteria: string;
  currentValue: string;
  status: 'good' | 'late' | 'caution';
}

interface TradeRecommendation {
  id?: string;
  suggested_pair: string;
  strongest_currency: string;
  weakest_currency: string;
  confidence_score: number;
  recommendation_text: string;
  is_late_entry?: boolean;
  entry_score?: number;
  recommendation?: 'buy' | 'wait';
  created_at?: string;
}

interface TradeRecommendationProps {
  strongest: CurrencyData;
  weakest: CurrencyData;
  entryCheckData: EntryCheckItem[];
  pair: string;
  recommendations?: TradeRecommendation[];
}

const TradeRecommendation = ({ strongest, weakest, entryCheckData, pair, recommendations = [] }: TradeRecommendationProps) => {
  const [expandedPairs, setExpandedPairs] = useState<string[]>([]);
  
  const goodCount = entryCheckData.filter(item => item.status === 'good').length;
  const totalCount = entryCheckData.length;
  const safeToTrade = goodCount >= Math.ceil(totalCount * 0.6);
  
  // Toggle expanded state for a pair
  const toggleExpand = (pair: string) => {
    if (expandedPairs.includes(pair)) {
      setExpandedPairs(expandedPairs.filter(p => p !== pair));
    } else {
      setExpandedPairs([...expandedPairs, pair]);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Trade idea copied to clipboard!");
  };

  const tradeIdea = safeToTrade 
    ? `BUY ${pair} - Entry confirmed by technical analysis. ${goodCount}/${totalCount} indicators positive.`
    : `WAIT - ${pair} showing late entry signals. Wait for pullback before entering.`;

  // Display multiple recommendations if available, otherwise fallback to the single recommendation
  const hasMultipleRecommendations = recommendations && recommendations.length > 0;

  return (
    <Card className={`border-2 ${
      safeToTrade 
        ? 'border-green-300 bg-gradient-to-r from-green-50 to-emerald-50' 
        : 'border-red-300 bg-gradient-to-r from-red-50 to-orange-50'
    }`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {safeToTrade ? (
            <CheckCircle className="h-6 w-6 text-green-600" />
          ) : (
            <XCircle className="h-6 w-6 text-red-600" />
          )}
          Trade Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Multiple Trade Recommendations */}
          {hasMultipleRecommendations ? (
            <div className="space-y-4">
              {recommendations.map((rec, index) => {
                const isExpanded = expandedPairs.includes(rec.suggested_pair);
                const isBuy = rec.recommendation === 'buy';
                const isFirstRec = index === 0;
                
                return (
                  <div 
                    key={rec.id || index}
                    className={`p-4 rounded-xl border-2 ${
                      isBuy 
                        ? 'border-green-200 bg-white' 
                        : 'border-red-200 bg-white'
                    } ${isFirstRec ? 'ring-2 ring-blue-300' : ''}`}
                  >
                    <div 
                      className="flex items-center justify-between cursor-pointer"
                      onClick={() => toggleExpand(rec.suggested_pair)}
                    >
                      <div className="flex items-center gap-2">
                        {isBuy ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : (
                          <AlertTriangle className="h-5 w-5 text-red-600" />
                        )}
                        <h3 className="text-lg font-bold text-slate-800">
                          {rec.suggested_pair}
                          {isFirstRec && <span className="ml-2 text-sm text-blue-600">(Best Entry)</span>}
                        </h3>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Badge 
                          variant="outline"
                          className={`text-sm font-medium ${
                            isBuy 
                              ? 'border-green-300 text-green-700 bg-green-50' 
                              : 'border-red-300 text-red-700 bg-red-50'
                          }`}
                        >
                          {isBuy ? 'BUY' : 'WAIT'}
                        </Badge>
                        {isExpanded ? (
                          <ChevronUp className="h-4 w-4 text-slate-500" />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-slate-500" />
                        )}
                      </div>
                    </div>
                    
                    {isExpanded && (
                      <div className="mt-4 space-y-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className={`p-3 rounded-lg ${isBuy ? 'bg-green-50' : 'bg-red-50'}`}>
                            <div className={`text-sm font-medium ${isBuy ? 'text-green-700' : 'text-red-700'} mb-1`}>
                              Entry Quality
                            </div>
                            <div className={`text-lg font-bold ${isBuy ? 'text-green-800' : 'text-red-800'}`}>
                              {rec.confidence_score}/5
                            </div>
                          </div>
                          <div className="bg-blue-50 p-3 rounded-lg">
                            <div className="text-sm font-medium text-blue-700 mb-1">Pair Ranking</div>
                            <div className="text-lg font-bold text-blue-800">
                              #{index + 1} of {recommendations.length}
                            </div>
                          </div>
                        </div>

                        <div className={`p-4 rounded-lg border ${
                          isBuy ? 'bg-green-100 border-green-200' : 'bg-red-100 border-red-200'
                        }`}>
                          <div className="flex items-start gap-2">
                            {isBuy ? (
                              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                            ) : (
                              <XCircle className="h-5 w-5 text-red-600 mt-0.5" />
                            )}
                            <div>
                              <div className={`font-medium ${isBuy ? 'text-green-800' : 'text-red-800'} mb-1`}>
                                Recommendation:
                              </div>
                              <div className={`text-sm ${isBuy ? 'text-green-700' : 'text-red-700'}`}>
                                {rec.recommendation_text}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-3">
                          <Button 
                            onClick={() => copyToClipboard(
                              `${isBuy ? 'BUY' : 'WAIT'} ${rec.suggested_pair} - ${rec.recommendation_text}`
                            )}
                            variant="outline"
                            className="flex-1"
                          >
                            <Copy className="mr-2 h-4 w-4" />
                            Copy Trade Idea
                          </Button>
                          
                          {isBuy && (
                            <Button 
                              onClick={() => copyToClipboard(`BUY ${rec.suggested_pair}`)}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <TrendingUp className="mr-2 h-4 w-4" />
                              Copy Order
                            </Button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            // Original single recommendation UI
            <>
              {/* Trade Status */}
              <div className={`p-6 rounded-xl border-2 ${
                safeToTrade 
                  ? 'border-green-200 bg-white' 
                  : 'border-red-200 bg-white'
              }`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-slate-800">
                    {safeToTrade ? '🎯 Recommended Trade' : '⏳ No Safe Trade Now'}
                  </h3>
                  <Badge 
                    variant="outline"
                    className={`text-sm font-medium ${
                      safeToTrade 
                        ? 'border-green-300 text-green-700 bg-green-50' 
                        : 'border-red-300 text-red-700 bg-red-50'
                    }`}
                  >
                    {safeToTrade ? 'ENTER' : 'WAIT'}
                  </Badge>
                </div>

                {safeToTrade ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-4">
                      <TrendingUp className="h-8 w-8 text-green-600" />
                      <div>
                        <div className="text-2xl font-bold text-slate-800">BUY {pair}</div>
                        <div className="text-slate-600">
                          Buy {strongest.code} ({strongest.change > 0 ? '+' : ''}{strongest.change.toFixed(2)}%) 
                          against {weakest.code} ({weakest.change.toFixed(2)}%)
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div className="bg-green-50 p-3 rounded-lg">
                        <div className="text-sm font-medium text-green-700 mb-1">Entry Quality</div>
                        <div className="text-lg font-bold text-green-800">
                          {goodCount}/{totalCount} indicators positive
                        </div>
                      </div>
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <div className="text-sm font-medium text-blue-700 mb-1">Strength Differential</div>
                        <div className="text-lg font-bold text-blue-800">
                          {(strongest.change - weakest.change).toFixed(2)}%
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-100 p-4 rounded-lg border border-green-200">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                        <div>
                          <div className="font-medium text-green-800 mb-1">Entry Recommendation:</div>
                          <div className="text-sm text-green-700">
                            Technical analysis supports entry. Wait for a small pullback if you want extra safety, 
                            but the current setup looks solid for {pair}.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center gap-4">
                      <AlertTriangle className="h-8 w-8 text-red-600" />
                      <div>
                        <div className="text-xl font-bold text-slate-800">Hold Off on {pair}</div>
                        <div className="text-slate-600">Late entry signals detected</div>
                      </div>
                    </div>

                    <div className="bg-red-100 p-4 rounded-lg border border-red-200">
                      <div className="flex items-start gap-2">
                        <XCircle className="h-5 w-5 text-red-600 mt-0.5" />
                        <div>
                          <div className="font-medium text-red-800 mb-1">Wait for Better Setup:</div>
                          <div className="text-sm text-red-700">
                            🚨 Too late to enter now. Wait for a pullback or consolidation before trading {pair}. 
                            Consider looking for other currency pairs with better entry timing.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Copy Trade Idea */}
              <div className="flex gap-3">
                <Button 
                  onClick={() => copyToClipboard(tradeIdea)}
                  variant="outline"
                  className="flex-1"
                >
                  <Copy className="mr-2 h-4 w-4" />
                  Copy Trade Idea
                </Button>
                
                {safeToTrade && (
                  <Button 
                    onClick={() => copyToClipboard(`BUY ${pair}`)}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <TrendingUp className="mr-2 h-4 w-4" />
                    Copy Order
                  </Button>
                )}
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TradeRecommendation;
