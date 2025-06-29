
import { GoogleGenAI } from "@google/genai";
import type { FullAnalysisReport } from '../types';

const API_KEY = process.env.GEMINI_API_KEY || process.env.API_KEY;

if (!API_KEY) {
  console.warn("GEMINI_API_KEY is not set. Please ensure the environment variable is configured in your .env file.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY || "MISSING_API_KEY" });

const createComprehensivePrompt = (code: string): string => {
  // Note: This prompt is becoming very large. For production, consider model-specific optimizations or breaking it down if feasible.
  return `
You are an expert-level, world-class code analysis assistant. I will provide you with a code snippet.
Please perform an exhaustive and multifaceted analysis, covering all aspects listed below.
Return the response as a single, valid JSON object.
Do not include any text, explanations, or markdown formatting outside of this JSON object.

The JSON object must strictly adhere to the following structure. If a section is not applicable (e.g., API design for non-API code, or no A11y hints for backend logic), omit the entire field for that section OR provide it as an empty array/object as specified. For list-based items (like bugs, smells, etc.), if none are found, provide an empty array [].

{
  "language": "string (e.g., 'Python', 'JavaScript', 'Java', 'C++', 'Unknown', 'Unrecognized')",
  "analysis": {
    "bugs": [
      {
        "line_number": "string (optional: line number or range e.g., '5' or '10-12', or 'N/A')",
        "description": "string (concise description of the bug/error)",
        "explanation": "string (ELI5-style: why this bug/error is occurring, assuming NO prior programming knowledge. Explain fundamental concepts if relevant.)",
        "fix_suggestion": "string (how to fix it, explained simply)"
      }
    ],
    "line_by_line_explanation": [
      {
        "line_range": "string (e.g., '1-3' or '5')",
        "code_snippet": "string (the relevant code snippet)",
        "explanation": "string (ELI5-style: detailed, step-by-step explanation of what this line/block does, its purpose, how it works, and why it's written that way. Assume ABSOLUTELY NO prior programming knowledge. Explain every character, symbol, keyword, and concept.)"
      }
    ],
    "overall_summary": "string (optional: a very simple, beginner-friendly summary of what the code is trying to achieve. If the input is not recognizable as code, set language to 'Unrecognized' and provide a message here.)",
    "optimization_suggestions": [
      {
        "area": "string (e.g., 'Performance', 'Readability', 'Maintainability', 'Best Practice')",
        "description": "string (description of the optimization potential)",
        "suggestion": "string (concrete suggestion on how to optimize it)",
        "reasoning": "string (why this suggested change is better or beneficial)"
      }
    ],
    "security_vulnerabilities": [
      {
        "vulnerability_type": "string (e.g., 'SQL Injection', 'XSS', 'Insecure Data Handling', 'Hardcoded Secret')",
        "line_number": "string (optional: line number or range where vulnerability is suspected)",
        "description": "string (description of the vulnerability)",
        "potential_impact": "string (what could happen if exploited)",
        "mitigation_suggestion": "string (how to fix or prevent it)",
        "severity": "string (optional: 'Critical', 'High', 'Medium', 'Low', 'Informational')"
      }
    ],
    "complexity_analysis": {
      "time_complexity": "string (e.g., 'O(n)', 'O(n log n)', 'O(1)', or 'Not Applicable')",
      "space_complexity": "string (e.g., 'O(n)', 'O(1)', or 'Not Applicable')",
      "explanation": "string (brief explanation for these estimations or why it's not applicable for simple code)"
    },
    "code_quality_assessment": {
      "readability": "string (evaluation of code readability, e.g., naming, comments, structure)",
      "maintainability": "string (evaluation of code maintainability, e.g., modularity, coupling)",
      "best_practices": "string (evaluation of adherence to common coding standards and best practices for the identified language)",
      "suggestions": ["string (specific suggestion for improving code quality)"]
    },
    "code_smells": [ // Optional array
      {
        "smell_type": "string (e.g., 'Long Method', 'Large Class', 'Feature Envy', 'Data Clumps', 'Primitive Obsession')",
        "line_number": "string (optional)",
        "description": "string (what this code smell is and why it's present here)",
        "suggestion": "string (how to refactor to remove the smell)"
      }
    ],
    "testability_feedback": { // Optional object
      "overall_assessment": "string (how easy is this code to unit test?)",
      "suggestions": [
        {
          "area": "string (e.g., 'Dependency Injection', 'Pure Functions', 'Mocking Strategy')",
          "description": "string (specific suggestion to improve testability)"
        }
      ]
    },
    "concurrency_issues": [ // Optional array - if language/context suggests concurrency
      {
        "type": "string (e.g., 'Race Condition', 'Deadlock', 'Thread Safety Concern')",
        "line_number": "string (optional)",
        "description": "string (description of the potential concurrency issue)",
        "mitigation": "string (how to prevent or fix it)"
      }
    ],
    "api_design_critique": { // Optional object - ONLY if the code appears to define an API (e.g., REST endpoints, library interface)
      "clarity": "string (assessment of API clarity and intuitiveness)",
      "consistency": "string (assessment of API consistency in naming, patterns, etc.)",
      "restfulness_notes": "string (optional - if a REST API, notes on adherence to REST principles like HATEOAS)",
      "error_handling_practices": "string (assessment of API error responses)",
      "versioning_strategy_notes": "string (optional - comments on versioning if discernible)",
      "suggestions": ["string (specific suggestions for improving the API design)"]
    },
    "scalability_concerns": [ // Optional array
      {
        "area": "string (e.g., 'Database Bottleneck', 'Single Point of Failure', 'Inefficient Algorithm for Large Data')",
        "description": "string (description of the scalability concern)",
        "suggestion": "string (how to address or investigate this concern)"
      }
    ],
    "performance_hints": [ // Optional array
      {
        "description": "string (e.g., 'Inefficient loop structure', 'Potential N+1 query pattern', 'Costly string concatenations in loop')",
        "line_number": "string (optional)",
        "suggestion": "string (how to potentially improve performance or what to profile)"
      }
    ],
    "dependency_management_insights": [ // Optional array
      {
        "type": "string ('Count', 'Outdated Version', 'Circular Dependency', 'Unused Dependency', 'General Observation')",
        "description": "string (e.g., 'High number of dependencies', 'Consider updating [library]', 'Potential circular dependency between module A and B')",
        "details": "string (optional - specific library name, version, or modules involved)"
      }
    ],
    "documentation_quality_review": { // Optional object
      "overall_quality": "string (e.g., 'Well-documented', 'Needs Improvement', 'Sparse', 'No documentation found')",
      "specific_areas": [
        {
          "area": "string (e.g., 'Function Headers/Docstrings', 'Inline Comments', 'Module/Class Overview')",
          "comment": "string (specific feedback on this area)"
        }
      ],
      "suggestions": ["string (suggestions for improving documentation)"]
    },
    "error_handling_robustness": { // Optional object
      "coverage_assessment": "string (how comprehensively are errors handled or propagated?)",
      "specificity_of_catches": "string (e.g., 'Uses specific exception types', 'Relies on generic catch-all blocks')",
      "resource_management_notes": "string (e.g., 'Good use of finally/defer for resource cleanup', 'Potential resource leaks if errors occur')",
      "suggestions": ["string (suggestions for more robust error handling)"]
    },
    "magic_values_identification": [ // Optional array
      {
        "type": "string ('Number' or 'String')",
        "value": "string (the actual magic number or string)",
        "line_number": "string (optional)",
        "suggestion": "string (e.g., 'Replace with a named constant for clarity and maintainability')"
      }
    ],
    "internationalization_readiness": [ // Optional array - for user-facing strings
      {
        "line_number": "string (optional: the specific line number(s) where THIS particular hardcoded_string appears, e.g., '42' or '101-103'. Do NOT list all lines from the entire code that contain any hardcoded string; only list lines relevant to THIS specific string.)",
        "hardcoded_string": "string (the exact hardcoded user-facing string found)",
        "suggestion": "string (e.g., 'Externalize this string for internationalization (i18n) purposes')"
      }
    ],
    "accessibility_hints": [ // Optional array - ONLY if code appears to be UI-related (HTML, JSX, etc.)
      {
        "issue": "string (e.g., 'Missing alt text for image', 'No ARIA label for interactive element', 'Insufficient color contrast potential')",
        "line_number": "string (optional)",
        "suggestion": "string (how to improve accessibility)",
        "wcag_reference": "string (optional - e.g., 'WCAG 2.1 A 1.1.1')"
      }
    ],
    "conceptual_maintainability_metrics": { // Optional object
      "qualitative_cyclomatic_complexity": "string (descriptive - e.g., 'Low', 'Moderate', 'High - consider refactoring complex paths')",
      "qualitative_halstead_difficulty": "string (descriptive - e.g., 'Appears easy to understand', 'Moderately complex vocabulary/operators')",
      "code_cohesion_notes": "string (descriptive - e.g., 'High - module components seem well-related', 'Low - consider splitting unrelated responsibilities')",
      "code_coupling_notes": "string (descriptive - e.g., 'Loose - dependencies are minimal', 'Tight - consider reducing inter-module dependencies')",
      "general_notes": "string (any other high-level observations on maintainability)"
    }
  }
}

Important Instructions:
- If the programming language cannot be reliably determined, set "language" to "Unknown".
- If the input is not recognizable as code, set "language" to "Unrecognized" and provide a relevant message in "overall_summary".
- For all arrays (e.g., "bugs", "code_smells"), if no items are found, the array MUST be an empty array: [].
- For "line_by_line_explanation", explain each significant line/block. Prioritize extreme clarity for absolute beginners.
- Ensure all string values within the JSON are properly escaped (e.g., double quotes within strings should be \\", newlines as \\n).
- The entire response must be ONLY the JSON object. No extra text or markdown.

Here is the code to analyze:
\`\`\`
${code}
\`\`\`

Analyze the code and provide your response strictly in the specified JSON format.
  `;
};

export const analyzeCodeWithGemini = async (code: string): Promise<FullAnalysisReport> => {
  if (!API_KEY || API_KEY === "MISSING_API_KEY") {
    console.error("Gemini API Key is not configured. Please set the GEMINI_API_KEY environment variable in your .env file.");
    throw new Error("Gemini API Key is not configured. Please create a .env file with your GEMINI_API_KEY. See .env.example for reference.");
  }

  const model = "gemini-2.5-flash-preview-04-17";
  const prompt = createComprehensivePrompt(code);

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.1, // Lower temperature for more deterministic, factual output
        topP: 0.8,       // Adjust Top P
        topK: 30,        // Adjust Top K
      }
    });
    
    if (!response.text) {
      throw new Error("Received empty response from Gemini API");
    }
    
    let jsonString = response.text.trim();

    // Remove markdown fences if present
    const fenceRegex = /^```(?:json)?\s*\n?(.*?)\n?\s*```$/s;
    const match = jsonString.match(fenceRegex);
    if (match && match[1]) {
      jsonString = match[1].trim();
    }
    
    // Fallback for a simple ``` wrapper without 'json' tag
    if (jsonString.startsWith("```") && jsonString.endsWith("```")) {
        jsonString = jsonString.substring(3, jsonString.length - 3).trim();
    }


    try {
      const parsedResult: FullAnalysisReport = JSON.parse(jsonString);
      
      if (!parsedResult || typeof parsedResult.language !== 'string' || typeof parsedResult.analysis !== 'object') {
        console.error("Malformed JSON structure (top level):", parsedResult, "\nRaw string:", jsonString);
        throw new Error("Received malformed JSON structure from API. Missing 'language' or 'analysis' field.");
      }

      const analysis = parsedResult.analysis;
      if (!analysis ||
          !Array.isArray(analysis.bugs) ||
          !Array.isArray(analysis.line_by_line_explanation) ||
          (typeof analysis.overall_summary !== 'string' && typeof analysis.overall_summary !== 'undefined') ||
          !Array.isArray(analysis.optimization_suggestions) ||
          !Array.isArray(analysis.security_vulnerabilities) ||
          typeof analysis.complexity_analysis !== 'object' ||
          typeof analysis.code_quality_assessment !== 'object'
          // Not exhaustively checking all new optional fields here to avoid overly strict validation
          // The UI components should gracefully handle missing optional fields.
        ) {
        console.error("Malformed JSON structure (core analysis details):", analysis, "\nRaw string:", jsonString);
        throw new Error("Received malformed JSON structure within 'analysis' object. Check console for details.");
      }
      
      return parsedResult;
    } catch (parseError) {
      console.error("Failed to parse JSON response from Gemini:", parseError);
      console.error("Raw response text before parsing attempt:", jsonString); // Log the string that failed to parse
      console.error("Original API response text:", response.text);
      let snippet = jsonString.substring(0, 500);
      if (jsonString.length > 500) snippet += "...";
      throw new Error(`Failed to parse analysis data. The API may have returned an unexpected format. Response snippet: ${snippet}`);
    }

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        if (error.message.includes("API key not valid")) {
             throw new Error("Gemini API request failed: API key is not valid. Please check your configuration.");
        }
        // Check for quota issues or other specific Gemini errors if possible
        if (error.message.toLowerCase().includes("quota") || (error as any)?.response?.status === 429) {
             throw new Error("Gemini API request failed: Quota exceeded or rate limit hit. Please try again later.");
        }
        throw new Error(`Gemini API request failed: ${error.message}`);
    }
    throw new Error("An unknown error occurred while communicating with Gemini API.");
  }
};
