import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, AlertTriangle, Play, BarChart3 } from "lucide-react";
import { 
  testScenarios, 
  lateEntryTestScenarios, 
  performanceTestScenarios,
  testTradeRecommendationAlgorithm,
  testLateEntryDetection,
  runAllTests
} from "@/utils/tradeAlgorithmTests";

const AlgorithmTestPanel = () => {
  const [testResults, setTestResults] = useState<any>(null);
  const [isRunning, setIsRunning] = useState(false);

  const runTests = async () => {
    setIsRunning(true);
    
    // Run all tests and capture results
    const results = {
      tradeRecommendations: {},
      lateEntryDetection: {},
      performance: {}
    };

    // Test trade recommendations
    Object.entries(testScenarios).forEach(([scenarioName, scenario]) => {
      const recommendations = testTradeRecommendationAlgorithm(scenario.currencies);
      results.tradeRecommendations[scenarioName] = {
        recommendations,
        expected: scenario.expectedRecommendation,
        passed: recommendations[0]?.suggested_pair === scenario.expectedRecommendation
      };
    });

    // Test late entry detection
    Object.entries(lateEntryTestScenarios).forEach(([scenarioName, scenario]) => {
      const result = testLateEntryDetection(scenario);
      results.lateEntryDetection[scenarioName] = {
        ...result,
        expectedGoodCount: scenario.filter(s => s.status === 'good').length,
        passed: result.safeToTrade === (scenarioName === 'goodEntry')
      };
    });

    // Test performance scenarios
    Object.entries(performanceTestScenarios).forEach(([scenarioName, scenario]) => {
      const recommendations = testTradeRecommendationAlgorithm(scenario.currencies);
      results.performance[scenarioName] = {
        recommendations,
        highConfidence: recommendations[0]?.confidence_score >= 4,
        multiplePairs: recommendations.length > 1,
        passed: recommendations[0]?.confidence_score >= 4 === scenario.expectedHighConfidence
      };
    });

    setTestResults(results);
    setIsRunning(false);
  };

  const getStatusIcon = (passed: boolean) => {
    return passed ? (
      <CheckCircle className="h-4 w-4 text-green-600" />
    ) : (
      <XCircle className="h-4 w-4 text-red-600" />
    );
  };

  const getStatusBadge = (passed: boolean) => {
    return passed ? (
      <Badge className="bg-green-100 text-green-800 border-green-300">PASS</Badge>
    ) : (
      <Badge className="bg-red-100 text-red-800 border-red-300">FAIL</Badge>
    );
  };

  return (
    <Card className="border-blue-200 bg-blue-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-blue-600" />
          Algorithm Testing Panel
        </CardTitle>
        <p className="text-sm text-blue-700">
          Test trade recommendation algorithms and late entry detection with various market scenarios
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Test Button */}
          <div className="flex justify-center">
            <Button 
              onClick={runTests} 
              disabled={isRunning}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Play className={`mr-2 h-4 w-4 ${isRunning ? 'animate-spin' : ''}`} />
              {isRunning ? 'Running Tests...' : 'Run Algorithm Tests'}
            </Button>
          </div>

          {/* Test Results */}
          {testResults && (
            <div className="space-y-6">
              {/* Trade Recommendation Tests */}
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-3 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  Trade Recommendation Tests
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {Object.entries(testResults.tradeRecommendations).map(([scenario, result]: [string, any]) => (
                    <Card key={scenario} className="border-slate-200">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm flex items-center justify-between">
                          <span className="capitalize">{scenario.replace(/([A-Z])/g, ' $1').trim()}</span>
                          {getStatusIcon(result.passed)}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="text-xs">
                            <div className="font-medium">Expected: {result.expected}</div>
                            <div className="font-medium">Got: {result.recommendations[0]?.suggested_pair}</div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-slate-600">
                              Confidence: {result.recommendations[0]?.confidence_score}/5
                            </span>
                            {getStatusBadge(result.passed)}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Late Entry Detection Tests */}
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-3 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                  Late Entry Detection Tests
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {Object.entries(testResults.lateEntryDetection).map(([scenario, result]: [string, any]) => (
                    <Card key={scenario} className="border-slate-200">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm flex items-center justify-between">
                          <span className="capitalize">{scenario.replace(/([A-Z])/g, ' $1').trim()}</span>
                          {getStatusIcon(result.passed)}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="text-xs">
                            <div className="font-medium">Good: {result.goodCount}/{result.totalCount}</div>
                            <div className="font-medium">Safe: {result.safeToTrade ? 'Yes' : 'No'}</div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-slate-600">
                              {result.safeToTrade ? '✅ Trade' : '🚨 Wait'}
                            </span>
                            {getStatusBadge(result.passed)}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Performance Tests */}
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-3 flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-purple-600" />
                  Performance Tests
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(testResults.performance).map(([scenario, result]: [string, any]) => (
                    <Card key={scenario} className="border-slate-200">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm flex items-center justify-between">
                          <span className="capitalize">{scenario.replace(/([A-Z])/g, ' $1').trim()}</span>
                          {getStatusIcon(result.passed)}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="text-xs">
                            <div className="font-medium">Top Pair: {result.recommendations[0]?.suggested_pair}</div>
                            <div className="font-medium">Confidence: {result.recommendations[0]?.confidence_score}/5</div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-slate-600">
                              {result.highConfidence ? '🔥 High' : '📊 Low'} Confidence
                            </span>
                            {getStatusBadge(result.passed)}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Summary */}
              <div className="bg-slate-100 p-4 rounded-lg">
                <h3 className="font-semibold text-slate-800 mb-2">Test Summary</h3>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="font-medium text-green-700">Trade Recommendations</div>
                    <div className="text-slate-600">
                      {Object.values(testResults.tradeRecommendations).filter((r: any) => r.passed).length}/
                      {Object.keys(testResults.tradeRecommendations).length} passed
                    </div>
                  </div>
                  <div>
                    <div className="font-medium text-yellow-700">Late Entry Detection</div>
                    <div className="text-slate-600">
                      {Object.values(testResults.lateEntryDetection).filter((r: any) => r.passed).length}/
                      {Object.keys(testResults.lateEntryDetection).length} passed
                    </div>
                  </div>
                  <div>
                    <div className="font-medium text-purple-700">Performance</div>
                    <div className="text-slate-600">
                      {Object.values(testResults.performance).filter((r: any) => r.passed).length}/
                      {Object.keys(testResults.performance).length} passed
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AlgorithmTestPanel;
