
export interface CodeBug {
  line_number?: string; // Optional: "N/A", a specific line number, or a range like "10-12"
  description: string;
  explanation: string;
  fix_suggestion: string;
}

export interface LineExplanationDetail {
  line_range: string; // e.g., "1-3" or "5"
  code_snippet: string;
  explanation: string;
}

export interface OptimizationSuggestion {
  area: string; // e.g., "Performance", "Readability", "Maintainability", "Best Practice"
  description: string;
  suggestion: string;
  reasoning: string;
}

export interface SecurityVulnerability {
  vulnerability_type: string; // e.g., "SQL Injection", "XSS", "Insecure Data Handling"
  line_number?: string; // Optional: line number or range where vulnerability is suspected
  description: string;
  potential_impact: string;
  mitigation_suggestion: string;
  severity?: "Critical" | "High" | "Medium" | "Low" | "Informational"; // Optional
}

export interface ComplexityAnalysis {
  time_complexity: string; // e.g., "O(n)", "O(n log n)", "Not Applicable"
  space_complexity: string; // e.g., "O(n)", "O(1)", "Not Applicable"
  explanation: string; // Explanation for these estimations or why it's not applicable
}

export interface CodeQualityAssessment {
  readability: string; // Evaluation text
  maintainability: string; // Evaluation text
  best_practices: string; // Evaluation text regarding adherence
  suggestions: string[]; // Array of specific improvement suggestions
}

// --- Ultra-Advanced Analysis Types ---

export interface CodeSmell {
  smell_type: string; // e.g., "Long Method", "Large Class", "Feature Envy"
  line_number?: string;
  description: string;
  suggestion: string;
}

export interface TestabilitySuggestionDetail {
  area: string; // e.g., "Dependency Injection", "Pure Functions", "Mocking"
  description: string;
}
export interface TestabilityFeedback {
  overall_assessment: string;
  suggestions: TestabilitySuggestionDetail[];
}

export interface ConcurrencyIssue {
  type: string; // e.g., "Race Condition", "Deadlock", "Thread Safety"
  line_number?: string;
  description: string;
  mitigation: string;
}

export interface ApiDesignCritique {
  // Provided if code appears to define an API
  clarity: string;
  consistency: string;
  restfulness_notes?: string; // If applicable (e.g. for REST APIs)
  error_handling_practices: string;
  versioning_strategy_notes?: string;
  suggestions: string[];
}

export interface ScalabilityConcern {
  area: string; // e.g., "Database Bottleneck", "Single Point of Failure", "Inefficient Algorithm"
  description: string;
  suggestion: string;
}

export interface PerformanceHint {
  description: string; // e.g., "Inefficient loop", "Potential N+1 query"
  line_number?: string;
  suggestion: string; // How to potentially improve or investigate
}

export interface DependencyNote {
  type: "Count" | "Outdated Version" | "Circular Dependency" | "Unused Dependency" | "General Observation";
  description: string;
  details?: string; // e.g., specific library name or version concern
}

export interface DocumentationAreaFeedback {
  area: string; // e.g., "Function Headers", "Inline Comments", "Module Overview"
  comment: string;
}
export interface DocumentationFeedback {
  overall_quality: string; // e.g., "Well-documented", "Needs Improvement", "Sparse"
  specific_areas: DocumentationAreaFeedback[];
  suggestions: string[];
}

export interface ErrorHandlingReviewDetail {
  coverage_assessment: string; // How comprehensively errors are handled
  specificity_of_catches: string; // Generic vs. specific error handling
  resource_management_notes: string; // e.g., finally blocks, try-with-resources
  suggestions: string[];
}

export interface MagicValue {
  type: "Number" | "String";
  value: string;
  line_number?: string;
  suggestion: string; // e.g., "Replace with a named constant"
}

export interface I18nSuggestion {
  line_number?: string;
  hardcoded_string: string;
  suggestion: string; // e.g., "Externalize this string for internationalization"
}

export interface A11yHint {
  // Provided if code appears to be UI-related
  issue: string; // e.g., "Missing alt text", "No ARIA label"
  line_number?: string;
  suggestion: string;
  wcag_reference?: string; // e.g., "WCAG 2.1 A 1.1.1"
}

export interface ConceptualMaintainabilityMetrics {
  qualitative_cyclomatic_complexity: string; // Descriptive (e.g., "Low", "Moderate", "High - consider refactoring complex paths")
  qualitative_halstead_difficulty: string; // Descriptive (e.g., "Appears easy to understand", "Moderately complex vocabulary/operators")
  code_cohesion_notes: string; // Descriptive (e.g., "High - module components seem well-related", "Low - consider splitting unrelated responsibilities")
  code_coupling_notes: string; // Descriptive (e.g., "Loose - dependencies are minimal", "Tight - consider reducing inter-module dependencies")
  general_notes: string;
}

export interface AnalysisDetails {
  bugs: CodeBug[];
  line_by_line_explanation: LineExplanationDetail[];
  overall_summary?: string;
  optimization_suggestions: OptimizationSuggestion[];
  security_vulnerabilities: SecurityVulnerability[];
  complexity_analysis: ComplexityAnalysis;
  code_quality_assessment: CodeQualityAssessment;

  // Ultra-Advanced Fields (all optional)
  code_smells?: CodeSmell[];
  testability_feedback?: TestabilityFeedback;
  concurrency_issues?: ConcurrencyIssue[];
  api_design_critique?: ApiDesignCritique; // Only if applicable
  scalability_concerns?: ScalabilityConcern[];
  performance_hints?: PerformanceHint[];
  dependency_management_insights?: DependencyNote[];
  documentation_quality_review?: DocumentationFeedback;
  error_handling_robustness?: ErrorHandlingReviewDetail;
  magic_values_identification?: MagicValue[];
  internationalization_readiness?: I18nSuggestion[];
  accessibility_hints?: A11yHint[]; // Only if applicable (UI code)
  conceptual_maintainability_metrics?: ConceptualMaintainabilityMetrics;
}

export interface FullAnalysisReport {
  language: string;
  analysis: AnalysisDetails;
}
