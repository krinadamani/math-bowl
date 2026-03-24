// ==================== CONFIGURATION ====================
let QUESTIONS_PER_ROUND = 10;
const TIME_LIMIT = 10; // seconds
const SPEECH_RATE = 0.85;
const FEEDBACK_DELAY = 2500; // ms to show feedback before next question
const FEEDBACK_DELAY_WRONG = 5000; // ms for wrong/timeout — more time to review

// ==================== ROUND DEFINITIONS ====================
const ROUNDS = [
    {
        name: 'Patterns',
        emoji: '\u{1F522}',
        description: 'Find the next number in the pattern!',
        generator: generatePatternQuestions
    },
    {
        name: 'Mental Math Chain',
        emoji: '\u{1F517}',
        description: 'Add and subtract single digits in a chain!',
        generator: generateChainQuestions
    },
    {
        name: '2-Digit Addition',
        emoji: '\u2795',
        description: 'Add two 2-digit numbers (no regrouping)!',
        generator: generateAdditionQuestions
    },
    {
        name: '2-Digit Subtraction',
        emoji: '\u2796',
        description: 'Subtract two 2-digit numbers (no regrouping)!',
        generator: generateSubtractionQuestions
    }
];

// ==================== 2025 STUDY SHEET ====================
const STUDY_SHEET_2025 = {
    patterns: [
        { display: '30, 26, 22, 18, ?', speech: 'What comes next? 30, 26, 22, 18', answer: 14 },
        { display: '2, 3, 5, 8, ?', speech: 'What comes next? 2, 3, 5, 8', answer: 12 },
        { display: '9, 18, 27, 36, ?', speech: 'What comes next? 9, 18, 27, 36', answer: 45 },
        { display: '100, 95, 90, 85, ?', speech: 'What comes next? 100, 95, 90, 85', answer: 80 },
        { display: '0, 3, 6, 9, ?', speech: 'What comes next? 0, 3, 6, 9', answer: 12 },
        { display: '13, 16, 19, 22, ?', speech: 'What comes next? 13, 16, 19, 22', answer: 25 },
        { display: '80, 75, 70, 65, ?', speech: 'What comes next? 80, 75, 70, 65', answer: 60 },
        { display: '40, 37, 34, 31, ?', speech: 'What comes next? 40, 37, 34, 31', answer: 28 },
        { display: '80, 70, 60, 50, ?', speech: 'What comes next? 80, 70, 60, 50', answer: 40 },
        { display: '95, 89, 83, 77, ?', speech: 'What comes next? 95, 89, 83, 77', answer: 71 },
        { display: '0, 6, 12, 18, ?', speech: 'What comes next? 0, 6, 12, 18', answer: 24 },
        { display: '36, 30, 24, 18, ?', speech: 'What comes next? 36, 30, 24, 18', answer: 12 },
        { display: '0, 8, 16, 24, ?', speech: 'What comes next? 0, 8, 16, 24', answer: 32 },
        { display: '2, 4, 6, 8, ?', speech: 'What comes next? 2, 4, 6, 8', answer: 10 },
        { display: '62, 65, 68, 71, ?', speech: 'What comes next? 62, 65, 68, 71', answer: 74 }
    ],
    chain: [
        { display: '3 + 8 \u2212 5 + 9 = ?', speech: '3 plus 8 minus 5 plus 9', answer: 15 },
        { display: '6 + 4 + 7 \u2212 3 = ?', speech: '6 plus 4 plus 7 minus 3', answer: 14 },
        { display: '8 + 9 \u2212 6 \u2212 2 = ?', speech: '8 plus 9 minus 6 minus 2', answer: 9 },
        { display: '9 + 7 \u2212 3 + 4 = ?', speech: '9 plus 7 minus 3 plus 4', answer: 17 },
        { display: '8 + 7 + 8 \u2212 3 = ?', speech: '8 plus 7 plus 8 minus 3', answer: 20 },
        { display: '9 \u2212 3 + 5 \u2212 2 = ?', speech: '9 minus 3 plus 5 minus 2', answer: 9 },
        { display: '7 + 7 \u2212 3 \u2212 4 = ?', speech: '7 plus 7 minus 3 minus 4', answer: 7 },
        { display: '7 \u2212 5 + 9 + 3 = ?', speech: '7 minus 5 plus 9 plus 3', answer: 14 },
        { display: '8 \u2212 5 + 7 \u2212 1 = ?', speech: '8 minus 5 plus 7 minus 1', answer: 9 },
        { display: '9 + 8 \u2212 2 + 6 = ?', speech: '9 plus 8 minus 2 plus 6', answer: 21 },
        { display: '8 \u2212 3 + 8 + 9 = ?', speech: '8 minus 3 plus 8 plus 9', answer: 22 },
        { display: '8 + 5 + 9 \u2212 4 = ?', speech: '8 plus 5 plus 9 minus 4', answer: 18 },
        { display: '5 + 8 + 5 \u2212 2 = ?', speech: '5 plus 8 plus 5 minus 2', answer: 16 },
        { display: '8 + 9 \u2212 4 \u2212 3 = ?', speech: '8 plus 9 minus 4 minus 3', answer: 10 },
        { display: '9 \u2212 3 + 5 + 4 = ?', speech: '9 minus 3 plus 5 plus 4', answer: 15 }
    ],
    addition: [
        { display: '63 + 22 = ?', speech: '63 plus 22', answer: 85 },
        { display: '53 + 25 = ?', speech: '53 plus 25', answer: 78 },
        { display: '35 + 32 = ?', speech: '35 plus 32', answer: 67 },
        { display: '35 + 24 = ?', speech: '35 plus 24', answer: 59 },
        { display: '38 + 41 = ?', speech: '38 plus 41', answer: 79 },
        { display: '52 + 36 = ?', speech: '52 plus 36', answer: 88 },
        { display: '84 + 15 = ?', speech: '84 plus 15', answer: 99 },
        { display: '53 + 24 = ?', speech: '53 plus 24', answer: 77 },
        { display: '52 + 37 = ?', speech: '52 plus 37', answer: 89 },
        { display: '62 + 15 = ?', speech: '62 plus 15', answer: 77 },
        { display: '47 + 52 = ?', speech: '47 plus 52', answer: 99 },
        { display: '34 + 55 = ?', speech: '34 plus 55', answer: 89 },
        { display: '41 + 26 = ?', speech: '41 plus 26', answer: 67 },
        { display: '32 + 16 = ?', speech: '32 plus 16', answer: 48 },
        { display: '32 + 43 = ?', speech: '32 plus 43', answer: 75 }
    ],
    subtraction: [
        { display: '67 \u2212 44 = ?', speech: '67 minus 44', answer: 23 },
        { display: '67 \u2212 41 = ?', speech: '67 minus 41', answer: 26 },
        { display: '94 \u2212 42 = ?', speech: '94 minus 42', answer: 52 },
        { display: '97 \u2212 54 = ?', speech: '97 minus 54', answer: 43 },
        { display: '92 \u2212 50 = ?', speech: '92 minus 50', answer: 42 },
        { display: '85 \u2212 32 = ?', speech: '85 minus 32', answer: 53 },
        { display: '64 \u2212 33 = ?', speech: '64 minus 33', answer: 31 },
        { display: '84 \u2212 43 = ?', speech: '84 minus 43', answer: 41 },
        { display: '66 \u2212 45 = ?', speech: '66 minus 45', answer: 21 },
        { display: '56 \u2212 24 = ?', speech: '56 minus 24', answer: 32 },
        { display: '48 \u2212 33 = ?', speech: '48 minus 33', answer: 15 },
        { display: '78 \u2212 46 = ?', speech: '78 minus 46', answer: 32 },
        { display: '78 \u2212 15 = ?', speech: '78 minus 15', answer: 63 },
        { display: '47 \u2212 13 = ?', speech: '47 minus 13', answer: 34 },
        { display: '84 \u2212 33 = ?', speech: '84 minus 33', answer: 51 }
    ]
};

// ==================== 2020 PRACTICE PATTERNS ====================
const PRACTICE_2020_PATTERNS = [
    // Set 1
    [
        { display: '54, 45, 36, 27, ?', speech: 'What comes next? 54, 45, 36, 27', answer: 18 },
        { display: '22, 19, 16, 13, ?', speech: 'What comes next? 22, 19, 16, 13', answer: 10 },
        { display: '78, 68, 58, 48, ?', speech: 'What comes next? 78, 68, 58, 48', answer: 38 },
        { display: '0, 8, 16, 24, ?', speech: 'What comes next? 0, 8, 16, 24', answer: 32 },
        { display: '95, 90, 85, 80, ?', speech: 'What comes next? 95, 90, 85, 80', answer: 75 },
        { display: '22, 33, 44, 55, ?', speech: 'What comes next? 22, 33, 44, 55', answer: 66 },
        { display: '20, 24, 28, 32, ?', speech: 'What comes next? 20, 24, 28, 32', answer: 36 },
        { display: '49, 42, 35, 28, ?', speech: 'What comes next? 49, 42, 35, 28', answer: 21 },
        { display: '98, 92, 86, 80, ?', speech: 'What comes next? 98, 92, 86, 80', answer: 74 },
        { display: '0, 7, 14, 21, ?', speech: 'What comes next? 0, 7, 14, 21', answer: 28 }
    ],
    // Set 2
    [
        { display: '55, 44, 33, 22, ?', speech: 'What comes next? 55, 44, 33, 22', answer: 11 },
        { display: '11, 17, 23, 29, ?', speech: 'What comes next? 11, 17, 23, 29', answer: 35 },
        { display: '0, 8, 16, 24, ?', speech: 'What comes next? 0, 8, 16, 24', answer: 32 },
        { display: '17, 22, 27, 32, ?', speech: 'What comes next? 17, 22, 27, 32', answer: 37 },
        { display: '90, 86, 82, 78, ?', speech: 'What comes next? 90, 86, 82, 78', answer: 74 },
        { display: '7, 10, 13, 16, ?', speech: 'What comes next? 7, 10, 13, 16', answer: 19 },
        { display: '29, 33, 37, 41, ?', speech: 'What comes next? 29, 33, 37, 41', answer: 45 },
        { display: '5, 25, 45, 65, ?', speech: 'What comes next? 5, 25, 45, 65', answer: 85 },
        { display: '0, 9, 18, 27, ?', speech: 'What comes next? 0, 9, 18, 27', answer: 36 },
        { display: '65, 60, 55, 50, ?', speech: 'What comes next? 65, 60, 55, 50', answer: 45 }
    ],
    // Set 3
    [
        { display: '40, 35, 30, 25, ?', speech: 'What comes next? 40, 35, 30, 25', answer: 20 },
        { display: '100, 80, 60, 40, ?', speech: 'What comes next? 100, 80, 60, 40', answer: 20 },
        { display: '77, 66, 55, 44, ?', speech: 'What comes next? 77, 66, 55, 44', answer: 33 },
        { display: '86, 80, 74, 68, ?', speech: 'What comes next? 86, 80, 74, 68', answer: 62 },
        { display: '55, 45, 35, 25, ?', speech: 'What comes next? 55, 45, 35, 25', answer: 15 },
        { display: '99, 92, 85, 78, ?', speech: 'What comes next? 99, 92, 85, 78', answer: 71 },
        { display: '33, 44, 55, 66, ?', speech: 'What comes next? 33, 44, 55, 66', answer: 77 },
        { display: '75, 70, 65, 60, ?', speech: 'What comes next? 75, 70, 65, 60', answer: 55 },
        { display: '75, 80, 85, 90, ?', speech: 'What comes next? 75, 80, 85, 90', answer: 95 },
        { display: '23, 27, 31, 35, ?', speech: 'What comes next? 23, 27, 31, 35', answer: 39 }
    ],
    // Set 4
    [
        { display: '40, 30, 20, 10, ?', speech: 'What comes next? 40, 30, 20, 10', answer: 0 },
        { display: '16, 21, 26, 31, ?', speech: 'What comes next? 16, 21, 26, 31', answer: 36 },
        { display: '0, 9, 18, 27, ?', speech: 'What comes next? 0, 9, 18, 27', answer: 36 },
        { display: '15, 18, 21, 24, ?', speech: 'What comes next? 15, 18, 21, 24', answer: 27 },
        { display: '39, 35, 31, 27, ?', speech: 'What comes next? 39, 35, 31, 27', answer: 23 },
        { display: '18, 24, 30, 36, ?', speech: 'What comes next? 18, 24, 30, 36', answer: 42 },
        { display: '70, 66, 62, 58, ?', speech: 'What comes next? 70, 66, 62, 58', answer: 54 },
        { display: '27, 37, 47, 57, ?', speech: 'What comes next? 27, 37, 47, 57', answer: 67 },
        { display: '94, 74, 54, 34, ?', speech: 'What comes next? 94, 74, 54, 34', answer: 14 },
        { display: '44, 34, 24, 14, ?', speech: 'What comes next? 44, 34, 24, 14', answer: 4 }
    ],
    // Set 5
    [
        { display: '7, 13, 19, 25, ?', speech: 'What comes next? 7, 13, 19, 25', answer: 31 },
        { display: '17, 26, 35, 44, ?', speech: 'What comes next? 17, 26, 35, 44', answer: 53 },
        { display: '89, 78, 67, 56, ?', speech: 'What comes next? 89, 78, 67, 56', answer: 45 },
        { display: '15, 25, 35, 45, ?', speech: 'What comes next? 15, 25, 35, 45', answer: 55 },
        { display: '25, 31, 37, 43, ?', speech: 'What comes next? 25, 31, 37, 43', answer: 49 },
        { display: '50, 54, 58, 62, ?', speech: 'What comes next? 50, 54, 58, 62', answer: 66 },
        { display: '91, 86, 81, 76, ?', speech: 'What comes next? 91, 86, 81, 76', answer: 71 },
        { display: '58, 68, 78, 88, ?', speech: 'What comes next? 58, 68, 78, 88', answer: 98 },
        { display: '37, 48, 59, 70, ?', speech: 'What comes next? 37, 48, 59, 70', answer: 81 },
        { display: '22, 33, 44, 55, ?', speech: 'What comes next? 22, 33, 44, 55', answer: 66 }
    ],
    // Set 6
    [
        { display: '16, 24, 32, 40, ?', speech: 'What comes next? 16, 24, 32, 40', answer: 48 },
        { display: '16, 14, 12, 10, ?', speech: 'What comes next? 16, 14, 12, 10', answer: 8 },
        { display: '37, 43, 49, 55, ?', speech: 'What comes next? 37, 43, 49, 55', answer: 61 },
        { display: '65, 60, 55, 50, ?', speech: 'What comes next? 65, 60, 55, 50', answer: 45 },
        { display: '94, 90, 86, 82, ?', speech: 'What comes next? 94, 90, 86, 82', answer: 78 },
        { display: '88, 83, 78, 73, ?', speech: 'What comes next? 88, 83, 78, 73', answer: 68 },
        { display: '42, 39, 36, 33, ?', speech: 'What comes next? 42, 39, 36, 33', answer: 30 },
        { display: '10, 25, 40, 55, ?', speech: 'What comes next? 10, 25, 40, 55', answer: 70 },
        { display: '51, 54, 57, 60, ?', speech: 'What comes next? 51, 54, 57, 60', answer: 63 },
        { display: '44, 40, 36, 32, ?', speech: 'What comes next? 44, 40, 36, 32', answer: 28 }
    ]
];

// ==================== 2020 PRACTICE CHAIN ====================
const PRACTICE_2020_CHAIN = [
    // Set 1
    [
        { display: '9 + 6 \u2212 7 + 3 = ?', speech: '9 plus 6 minus 7 plus 3', answer: 11 },
        { display: '8 + 7 \u2212 3 + 9 = ?', speech: '8 plus 7 minus 3 plus 9', answer: 21 },
        { display: '7 + 4 \u2212 5 + 3 = ?', speech: '7 plus 4 minus 5 plus 3', answer: 9 },
        { display: '7 + 9 \u2212 6 + 5 = ?', speech: '7 plus 9 minus 6 plus 5', answer: 15 },
        { display: '9 + 6 \u2212 5 + 4 = ?', speech: '9 plus 6 minus 5 plus 4', answer: 14 },
        { display: '8 + 7 \u2212 5 + 7 = ?', speech: '8 plus 7 minus 5 plus 7', answer: 17 },
        { display: '6 + 5 \u2212 4 + 7 = ?', speech: '6 plus 5 minus 4 plus 7', answer: 14 },
        { display: '8 + 7 \u2212 5 + 7 = ?', speech: '8 plus 7 minus 5 plus 7', answer: 17 },
        { display: '9 + 5 \u2212 4 + 8 = ?', speech: '9 plus 5 minus 4 plus 8', answer: 18 },
        { display: '7 + 4 \u2212 5 + 8 = ?', speech: '7 plus 4 minus 5 plus 8', answer: 14 }
    ],
    // Set 2
    [
        { display: '8 + 5 \u2212 9 + 4 = ?', speech: '8 plus 5 minus 9 plus 4', answer: 8 },
        { display: '5 + 9 \u2212 5 + 7 = ?', speech: '5 plus 9 minus 5 plus 7', answer: 16 },
        { display: '5 + 4 \u2212 7 + 7 = ?', speech: '5 plus 4 minus 7 plus 7', answer: 9 },
        { display: '7 + 8 \u2212 6 + 5 = ?', speech: '7 plus 8 minus 6 plus 5', answer: 14 },
        { display: '8 + 4 \u2212 8 + 5 = ?', speech: '8 plus 4 minus 8 plus 5', answer: 9 },
        { display: '8 + 7 \u2212 5 + 6 = ?', speech: '8 plus 7 minus 5 plus 6', answer: 16 },
        { display: '9 + 8 \u2212 6 + 4 = ?', speech: '9 plus 8 minus 6 plus 4', answer: 15 },
        { display: '7 + 7 \u2212 6 + 9 = ?', speech: '7 plus 7 minus 6 plus 9', answer: 17 },
        { display: '9 + 5 \u2212 6 + 9 = ?', speech: '9 plus 5 minus 6 plus 9', answer: 17 },
        { display: '8 + 9 \u2212 5 + 3 = ?', speech: '8 plus 9 minus 5 plus 3', answer: 15 }
    ],
    // Set 3
    [
        { display: '5 + 8 \u2212 6 + 6 = ?', speech: '5 plus 8 minus 6 plus 6', answer: 13 },
        { display: '8 + 7 \u2212 4 + 8 = ?', speech: '8 plus 7 minus 4 plus 8', answer: 19 },
        { display: '8 + 7 \u2212 4 + 3 = ?', speech: '8 plus 7 minus 4 plus 3', answer: 14 },
        { display: '7 + 3 \u2212 8 + 4 = ?', speech: '7 plus 3 minus 8 plus 4', answer: 6 },
        { display: '5 + 8 \u2212 6 + 3 = ?', speech: '5 plus 8 minus 6 plus 3', answer: 10 },
        { display: '7 + 6 \u2212 8 + 5 = ?', speech: '7 plus 6 minus 8 plus 5', answer: 10 },
        { display: '6 + 5 \u2212 3 + 7 = ?', speech: '6 plus 5 minus 3 plus 7', answer: 15 },
        { display: '9 + 5 \u2212 8 + 4 = ?', speech: '9 plus 5 minus 8 plus 4', answer: 10 },
        { display: '8 + 7 \u2212 5 + 3 = ?', speech: '8 plus 7 minus 5 plus 3', answer: 13 },
        { display: '8 + 6 \u2212 7 + 5 = ?', speech: '8 plus 6 minus 7 plus 5', answer: 12 }
    ],
    // Set 4
    [
        { display: '8 + 7 \u2212 5 + 9 = ?', speech: '8 plus 7 minus 5 plus 9', answer: 19 },
        { display: '9 + 6 \u2212 8 + 4 = ?', speech: '9 plus 6 minus 8 plus 4', answer: 11 },
        { display: '9 + 4 \u2212 8 + 6 = ?', speech: '9 plus 4 minus 8 plus 6', answer: 11 },
        { display: '8 + 6 \u2212 4 + 7 = ?', speech: '8 plus 6 minus 4 plus 7', answer: 17 },
        { display: '5 + 8 \u2212 7 + 8 = ?', speech: '5 plus 8 minus 7 plus 8', answer: 14 },
        { display: '8 + 6 \u2212 3 + 7 = ?', speech: '8 plus 6 minus 3 plus 7', answer: 18 },
        { display: '6 + 4 \u2212 7 + 5 = ?', speech: '6 plus 4 minus 7 plus 5', answer: 8 },
        { display: '6 + 7 \u2212 4 + 9 = ?', speech: '6 plus 7 minus 4 plus 9', answer: 18 },
        { display: '9 + 5 \u2212 4 + 8 = ?', speech: '9 plus 5 minus 4 plus 8', answer: 18 },
        { display: '3 + 7 \u2212 6 + 9 = ?', speech: '3 plus 7 minus 6 plus 9', answer: 13 }
    ],
    // Set 5
    [
        { display: '9 + 8 \u2212 5 + 8 = ?', speech: '9 plus 8 minus 5 plus 8', answer: 20 },
        { display: '7 + 6 \u2212 8 + 2 = ?', speech: '7 plus 6 minus 8 plus 2', answer: 7 },
        { display: '7 + 5 \u2212 8 + 7 = ?', speech: '7 plus 5 minus 8 plus 7', answer: 11 },
        { display: '7 + 5 \u2212 6 + 6 = ?', speech: '7 plus 5 minus 6 plus 6', answer: 12 },
        { display: '8 + 2 \u2212 5 + 9 = ?', speech: '8 plus 2 minus 5 plus 9', answer: 14 },
        { display: '9 + 4 \u2212 8 + 5 = ?', speech: '9 plus 4 minus 8 plus 5', answer: 10 },
        { display: '9 + 3 \u2212 7 + 5 = ?', speech: '9 plus 3 minus 7 plus 5', answer: 10 },
        { display: '6 + 7 \u2212 6 + 3 = ?', speech: '6 plus 7 minus 6 plus 3', answer: 10 },
        { display: '7 + 9 \u2212 5 + 6 = ?', speech: '7 plus 9 minus 5 plus 6', answer: 17 },
        { display: '7 + 6 \u2212 9 + 4 = ?', speech: '7 plus 6 minus 9 plus 4', answer: 8 }
    ],
    // Set 6
    [
        { display: '9 + 5 \u2212 7 + 8 = ?', speech: '9 plus 5 minus 7 plus 8', answer: 15 },
        { display: '6 + 9 \u2212 6 + 8 = ?', speech: '6 plus 9 minus 6 plus 8', answer: 17 },
        { display: '8 + 5 \u2212 7 + 8 = ?', speech: '8 plus 5 minus 7 plus 8', answer: 14 },
        { display: '8 + 5 \u2212 6 + 4 = ?', speech: '8 plus 5 minus 6 plus 4', answer: 11 },
        { display: '4 + 8 \u2212 9 + 7 = ?', speech: '4 plus 8 minus 9 plus 7', answer: 10 },
        { display: '9 + 2 \u2212 8 + 6 = ?', speech: '9 plus 2 minus 8 plus 6', answer: 9 }
    ]
];

// ==================== 2020 PRACTICE ADDING ====================
const PRACTICE_2020_ADDING = [
    // Set 1
    [
        { display: '4 + 5 + 8 + 10 = ?', speech: '4 plus 5 plus 8 plus 10', answer: 27 },
        { display: '9 + 6 + 5 + 10 = ?', speech: '9 plus 6 plus 5 plus 10', answer: 30 },
        { display: '4 + 5 + 7 + 10 = ?', speech: '4 plus 5 plus 7 plus 10', answer: 26 },
        { display: '6 + 9 + 7 + 10 = ?', speech: '6 plus 9 plus 7 plus 10', answer: 32 },
        { display: '4 + 7 + 9 + 10 = ?', speech: '4 plus 7 plus 9 plus 10', answer: 30 },
        { display: '8 + 6 + 9 + 10 = ?', speech: '8 plus 6 plus 9 plus 10', answer: 33 },
        { display: '5 + 8 + 4 + 10 = ?', speech: '5 plus 8 plus 4 plus 10', answer: 27 },
        { display: '6 + 3 + 8 + 10 = ?', speech: '6 plus 3 plus 8 plus 10', answer: 27 },
        { display: '7 + 4 + 8 + 10 = ?', speech: '7 plus 4 plus 8 plus 10', answer: 29 },
        { display: '6 + 8 + 9 + 10 = ?', speech: '6 plus 8 plus 9 plus 10', answer: 33 }
    ],
    // Set 2
    [
        { display: '5 + 9 + 7 + 10 = ?', speech: '5 plus 9 plus 7 plus 10', answer: 31 },
        { display: '9 + 5 + 4 + 10 = ?', speech: '9 plus 5 plus 4 plus 10', answer: 28 },
        { display: '6 + 9 + 5 + 10 = ?', speech: '6 plus 9 plus 5 plus 10', answer: 30 },
        { display: '7 + 5 + 6 + 10 = ?', speech: '7 plus 5 plus 6 plus 10', answer: 28 },
        { display: '4 + 9 + 6 + 10 = ?', speech: '4 plus 9 plus 6 plus 10', answer: 29 },
        { display: '7 + 5 + 8 + 10 = ?', speech: '7 plus 5 plus 8 plus 10', answer: 30 },
        { display: '8 + 7 + 9 + 10 = ?', speech: '8 plus 7 plus 9 plus 10', answer: 34 },
        { display: '8 + 5 + 7 + 10 = ?', speech: '8 plus 5 plus 7 plus 10', answer: 30 },
        { display: '8 + 3 + 7 + 10 = ?', speech: '8 plus 3 plus 7 plus 10', answer: 28 },
        { display: '4 + 6 + 8 + 10 = ?', speech: '4 plus 6 plus 8 plus 10', answer: 28 }
    ],
    // Set 3
    [
        { display: '9 + 6 + 5 + 10 = ?', speech: '9 plus 6 plus 5 plus 10', answer: 30 },
        { display: '7 + 5 + 6 + 10 = ?', speech: '7 plus 5 plus 6 plus 10', answer: 28 },
        { display: '7 + 8 + 4 + 10 = ?', speech: '7 plus 8 plus 4 plus 10', answer: 29 },
        { display: '8 + 4 + 7 + 10 = ?', speech: '8 plus 4 plus 7 plus 10', answer: 29 },
        { display: '8 + 7 + 9 + 10 = ?', speech: '8 plus 7 plus 9 plus 10', answer: 34 },
        { display: '9 + 5 + 8 + 10 = ?', speech: '9 plus 5 plus 8 plus 10', answer: 32 },
        { display: '7 + 8 + 5 + 10 = ?', speech: '7 plus 8 plus 5 plus 10', answer: 30 },
        { display: '3 + 9 + 4 + 10 = ?', speech: '3 plus 9 plus 4 plus 10', answer: 26 },
        { display: '6 + 5 + 7 + 10 = ?', speech: '6 plus 5 plus 7 plus 10', answer: 28 },
        { display: '8 + 7 + 5 + 10 = ?', speech: '8 plus 7 plus 5 plus 10', answer: 30 }
    ],
    // Set 4
    [
        { display: '8 + 7 + 6 + 10 = ?', speech: '8 plus 7 plus 6 plus 10', answer: 31 },
        { display: '6 + 9 + 3 + 10 = ?', speech: '6 plus 9 plus 3 plus 10', answer: 28 },
        { display: '4 + 8 + 7 + 10 = ?', speech: '4 plus 8 plus 7 plus 10', answer: 29 },
        { display: '7 + 4 + 5 + 10 = ?', speech: '7 plus 4 plus 5 plus 10', answer: 26 },
        { display: '4 + 7 + 8 + 10 = ?', speech: '4 plus 7 plus 8 plus 10', answer: 29 },
        { display: '8 + 7 + 5 + 10 = ?', speech: '8 plus 7 plus 5 plus 10', answer: 30 },
        { display: '8 + 7 + 6 + 10 = ?', speech: '8 plus 7 plus 6 plus 10', answer: 31 },
        { display: '5 + 8 + 7 + 10 = ?', speech: '5 plus 8 plus 7 plus 10', answer: 30 },
        { display: '7 + 4 + 9 + 10 = ?', speech: '7 plus 4 plus 9 plus 10', answer: 30 },
        { display: '9 + 7 + 8 + 10 = ?', speech: '9 plus 7 plus 8 plus 10', answer: 34 }
    ],
    // Set 5
    [
        { display: '5 + 8 + 6 + 10 = ?', speech: '5 plus 8 plus 6 plus 10', answer: 29 },
        { display: '9 + 6 + 5 + 10 = ?', speech: '9 plus 6 plus 5 plus 10', answer: 30 },
        { display: '6 + 8 + 5 + 10 = ?', speech: '6 plus 8 plus 5 plus 10', answer: 29 },
        { display: '8 + 9 + 4 + 10 = ?', speech: '8 plus 9 plus 4 plus 10', answer: 31 },
        { display: '4 + 9 + 7 + 10 = ?', speech: '4 plus 9 plus 7 plus 10', answer: 30 },
        { display: '4 + 8 + 7 + 10 = ?', speech: '4 plus 8 plus 7 plus 10', answer: 29 },
        { display: '8 + 6 + 7 + 10 = ?', speech: '8 plus 6 plus 7 plus 10', answer: 31 },
        { display: '6 + 7 + 3 + 10 = ?', speech: '6 plus 7 plus 3 plus 10', answer: 26 },
        { display: '9 + 6 + 5 + 10 = ?', speech: '9 plus 6 plus 5 plus 10', answer: 30 },
        { display: '4 + 9 + 8 + 10 = ?', speech: '4 plus 9 plus 8 plus 10', answer: 31 }
    ],
    // Set 6
    [
        { display: '8 + 5 + 9 + 10 = ?', speech: '8 plus 5 plus 9 plus 10', answer: 32 },
        { display: '5 + 4 + 8 + 10 = ?', speech: '5 plus 4 plus 8 plus 10', answer: 27 },
        { display: '3 + 8 + 5 + 10 = ?', speech: '3 plus 8 plus 5 plus 10', answer: 26 },
        { display: '7 + 6 + 5 + 10 = ?', speech: '7 plus 6 plus 5 plus 10', answer: 28 },
        { display: '3 + 7 + 9 + 10 = ?', speech: '3 plus 7 plus 9 plus 10', answer: 29 },
        { display: '9 + 6 + 7 + 10 = ?', speech: '9 plus 6 plus 7 plus 10', answer: 32 },
        { display: '5 + 7 + 6 + 10 = ?', speech: '5 plus 7 plus 6 plus 10', answer: 28 },
        { display: '8 + 5 + 9 + 10 = ?', speech: '8 plus 5 plus 9 plus 10', answer: 32 },
        { display: '8 + 5 + 8 + 10 = ?', speech: '8 plus 5 plus 8 plus 10', answer: 31 },
        { display: '9 + 4 + 6 + 10 = ?', speech: '9 plus 4 plus 6 plus 10', answer: 29 }
    ]
];

// ==================== 2024 PRACTICE PATTERNS ====================
const PRACTICE_2024_PATTERNS = [
    // Set 1
    [
        { display: '0, 3, 9, 18, ?', speech: 'What comes next? 0, 3, 9, 18', answer: 30 },
        { display: '70, 55, 40, 25, ?', speech: 'What comes next? 70, 55, 40, 25', answer: 10 },
        { display: '3, 7, 11, 15, ?', speech: 'What comes next? 3, 7, 11, 15', answer: 19 },
        { display: '44, 33, 22, 11, ?', speech: 'What comes next? 44, 33, 22, 11', answer: 0 },
        { display: '98, 87, 76, 65, ?', speech: 'What comes next? 98, 87, 76, 65', answer: 54 },
        { display: '0, 4, 8, 12, ?', speech: 'What comes next? 0, 4, 8, 12', answer: 16 },
        { display: '20, 16, 12, 8, ?', speech: 'What comes next? 20, 16, 12, 8', answer: 4 },
        { display: '47, 44, 41, 38, ?', speech: 'What comes next? 47, 44, 41, 38', answer: 35 },
        { display: '6, 9, 12, 15, ?', speech: 'What comes next? 6, 9, 12, 15', answer: 18 },
        { display: '90, 85, 80, 75, ?', speech: 'What comes next? 90, 85, 80, 75', answer: 70 }
    ],
    // Set 2
    [
        { display: '2, 5, 8, 11, ?', speech: 'What comes next? 2, 5, 8, 11', answer: 14 },
        { display: '0, 20, 40, 60, ?', speech: 'What comes next? 0, 20, 40, 60', answer: 80 },
        { display: '6, 12, 18, 24, ?', speech: 'What comes next? 6, 12, 18, 24', answer: 30 },
        { display: '90, 78, 66, 54, ?', speech: 'What comes next? 90, 78, 66, 54', answer: 42 },
        { display: '3, 11, 19, 27, ?', speech: 'What comes next? 3, 11, 19, 27', answer: 35 },
        { display: '20, 19, 17, 14, ?', speech: 'What comes next? 20, 19, 17, 14', answer: 10 },
        { display: '80, 65, 50, 35, ?', speech: 'What comes next? 80, 65, 50, 35', answer: 20 },
        { display: '1, 3, 7, 15, ?', speech: 'What comes next? 1, 3, 7, 15', answer: 31 },
        { display: '90, 85, 80, 75, ?', speech: 'What comes next? 90, 85, 80, 75', answer: 70 },
        { display: '2, 4, 8, 16, ?', speech: 'What comes next? 2, 4, 8, 16', answer: 32 }
    ],
    // Set 3
    [
        { display: '3, 6, 9, 12, ?', speech: 'What comes next? 3, 6, 9, 12', answer: 15 },
        { display: '4, 8, 12, 16, ?', speech: 'What comes next? 4, 8, 12, 16', answer: 20 },
        { display: '35, 28, 21, 14, ?', speech: 'What comes next? 35, 28, 21, 14', answer: 7 },
        { display: '7, 11, 15, 19, ?', speech: 'What comes next? 7, 11, 15, 19', answer: 23 },
        { display: '25, 19, 13, 7, ?', speech: 'What comes next? 25, 19, 13, 7', answer: 1 },
        { display: '90, 70, 50, 30, ?', speech: 'What comes next? 90, 70, 50, 30', answer: 10 },
        { display: '1, 12, 23, 34, ?', speech: 'What comes next? 1, 12, 23, 34', answer: 45 },
        { display: '70, 65, 60, 55, ?', speech: 'What comes next? 70, 65, 60, 55', answer: 50 },
        { display: '18, 15, 12, 9, ?', speech: 'What comes next? 18, 15, 12, 9', answer: 6 },
        { display: '8, 6, 4, 2, ?', speech: 'What comes next? 8, 6, 4, 2', answer: 0 }
    ]
];

// ==================== 2024 PRACTICE CHAIN ====================
const PRACTICE_2024_CHAIN = [
    // Set 1
    [
        { display: '9 + 7 \u2212 8 + 3 = ?', speech: '9 plus 7 minus 8 plus 3', answer: 11 },
        { display: '8 + 9 \u2212 3 + 7 = ?', speech: '8 plus 9 minus 3 plus 7', answer: 21 },
        { display: '9 \u2212 3 \u2212 4 + 7 = ?', speech: '9 minus 3 minus 4 plus 7', answer: 9 },
        { display: '6 \u2212 4 + 8 + 7 = ?', speech: '6 minus 4 plus 8 plus 7', answer: 17 },
        { display: '7 + 9 \u2212 4 + 8 = ?', speech: '7 plus 9 minus 4 plus 8', answer: 20 },
        { display: '4 + 7 \u2212 8 + 5 = ?', speech: '4 plus 7 minus 8 plus 5', answer: 8 },
        { display: '5 \u2212 3 \u2212 1 + 7 = ?', speech: '5 minus 3 minus 1 plus 7', answer: 8 },
        { display: '6 + 5 \u2212 4 + 8 = ?', speech: '6 plus 5 minus 4 plus 8', answer: 15 },
        { display: '3 + 8 + 7 \u2212 4 = ?', speech: '3 plus 8 plus 7 minus 4', answer: 14 },
        { display: '9 + 5 \u2212 4 \u2212 3 = ?', speech: '9 plus 5 minus 4 minus 3', answer: 7 }
    ],
    // Set 2
    [
        { display: '8 \u2212 6 + 9 \u2212 4 = ?', speech: '8 minus 6 plus 9 minus 4', answer: 7 },
        { display: '3 + 8 + 6 \u2212 9 = ?', speech: '3 plus 8 plus 6 minus 9', answer: 8 },
        { display: '5 \u2212 4 + 8 + 7 = ?', speech: '5 minus 4 plus 8 plus 7', answer: 16 },
        { display: '7 + 7 \u2212 6 \u2212 3 = ?', speech: '7 plus 7 minus 6 minus 3', answer: 5 },
        { display: '8 + 7 + 6 \u2212 9 = ?', speech: '8 plus 7 plus 6 minus 9', answer: 12 },
        { display: '4 + 9 \u2212 7 + 8 = ?', speech: '4 plus 9 minus 7 plus 8', answer: 14 },
        { display: '6 + 7 + 8 \u2212 4 = ?', speech: '6 plus 7 plus 8 minus 4', answer: 17 },
        { display: '5 + 7 + 6 \u2212 5 = ?', speech: '5 plus 7 plus 6 minus 5', answer: 13 },
        { display: '8 + 9 \u2212 4 \u2212 5 = ?', speech: '8 plus 9 minus 4 minus 5', answer: 8 },
        { display: '7 + 5 \u2212 8 + 3 = ?', speech: '7 plus 5 minus 8 plus 3', answer: 7 }
    ],
    // Set 3
    [
        { display: '5 + 4 + 9 \u2212 6 = ?', speech: '5 plus 4 plus 9 minus 6', answer: 12 },
        { display: '3 + 2 + 8 \u2212 5 = ?', speech: '3 plus 2 plus 8 minus 5', answer: 8 },
        { display: '6 + 4 \u2212 5 + 3 = ?', speech: '6 plus 4 minus 5 plus 3', answer: 8 },
        { display: '8 + 7 \u2212 6 + 9 = ?', speech: '8 plus 7 minus 6 plus 9', answer: 18 },
        { display: '4 + 7 \u2212 9 + 3 = ?', speech: '4 plus 7 minus 9 plus 3', answer: 5 },
        { display: '4 + 8 + 7 \u2212 3 = ?', speech: '4 plus 8 plus 7 minus 3', answer: 16 },
        { display: '7 + 3 \u2212 5 + 9 = ?', speech: '7 plus 3 minus 5 plus 9', answer: 14 },
        { display: '6 + 7 + 9 \u2212 4 = ?', speech: '6 plus 7 plus 9 minus 4', answer: 18 },
        { display: '3 + 2 + 6 \u2212 5 = ?', speech: '3 plus 2 plus 6 minus 5', answer: 6 }
    ]
];

const PRACTICE_2024_ADDING = [
    // Set 1
    [
        { display: '65 + 23 = ?', speech: '65 plus 23', answer: 88 },
        { display: '16 + 32 = ?', speech: '16 plus 32', answer: 48 },
        { display: '41 + 55 = ?', speech: '41 plus 55', answer: 96 },
        { display: '36 + 23 = ?', speech: '36 plus 23', answer: 59 },
        { display: '14 + 24 = ?', speech: '14 plus 24', answer: 38 },
        { display: '73 + 14 = ?', speech: '73 plus 14', answer: 87 },
        { display: '54 + 13 = ?', speech: '54 plus 13', answer: 67 },
        { display: '26 + 12 = ?', speech: '26 plus 12', answer: 38 },
        { display: '35 + 14 = ?', speech: '35 plus 14', answer: 49 },
        { display: '38 + 21 = ?', speech: '38 plus 21', answer: 59 }
    ],
    // Set 2
    [
        { display: '47 + 31 = ?', speech: '47 plus 31', answer: 78 },
        { display: '17 + 32 = ?', speech: '17 plus 32', answer: 49 },
        { display: '43 + 26 = ?', speech: '43 plus 26', answer: 69 },
        { display: '12 + 34 = ?', speech: '12 plus 34', answer: 46 },
        { display: '18 + 51 = ?', speech: '18 plus 51', answer: 69 },
        { display: '75 + 12 = ?', speech: '75 plus 12', answer: 87 },
        { display: '14 + 51 = ?', speech: '14 plus 51', answer: 65 },
        { display: '25 + 24 = ?', speech: '25 plus 24', answer: 49 },
        { display: '32 + 65 = ?', speech: '32 plus 65', answer: 97 },
        { display: '33 + 44 = ?', speech: '33 plus 44', answer: 77 }
    ],
    // Set 3
    [
        { display: '13 + 45 = ?', speech: '13 plus 45', answer: 58 },
        { display: '62 + 14 = ?', speech: '62 plus 14', answer: 76 },
        { display: '23 + 56 = ?', speech: '23 plus 56', answer: 79 },
        { display: '18 + 31 = ?', speech: '18 plus 31', answer: 49 },
        { display: '16 + 41 = ?', speech: '16 plus 41', answer: 57 },
        { display: '52 + 33 = ?', speech: '52 plus 33', answer: 85 },
        { display: '17 + 32 = ?', speech: '17 plus 32', answer: 49 },
        { display: '25 + 31 = ?', speech: '25 plus 31', answer: 56 },
        { display: '66 + 22 = ?', speech: '66 plus 22', answer: 88 },
        { display: '45 + 11 = ?', speech: '45 plus 11', answer: 56 }
    ]
];

const PRACTICE_2024_BONUS = [
    // Set 1
    [
        { display: 'N + 13 = 25', speech: 'N plus 13 equals 25. What is N?', answer: 12 },
        { display: 'N \u2212 12 = 14', speech: 'N minus 12 equals 14. What is N?', answer: 26 },
        { display: 'N + 11 = 19', speech: 'N plus 11 equals 19. What is N?', answer: 8 },
        { display: 'N \u2212 10 = 14', speech: 'N minus 10 equals 14. What is N?', answer: 24 },
        { display: 'N + 13 = 20', speech: 'N plus 13 equals 20. What is N?', answer: 7 },
        { display: 'N \u2212 13 = 10', speech: 'N minus 13 equals 10. What is N?', answer: 23 },
        { display: 'N + 7 = 11', speech: 'N plus 7 equals 11. What is N?', answer: 4 },
        { display: 'N \u2212 5 = 12', speech: 'N minus 5 equals 12. What is N?', answer: 17 },
        { display: 'N + 9 = 15', speech: 'N plus 9 equals 15. What is N?', answer: 6 },
        { display: 'N \u2212 6 = 11', speech: 'N minus 6 equals 11. What is N?', answer: 17 }
    ],
    // Set 2
    [
        { display: 'N + 7 = 13', speech: 'N plus 7 equals 13. What is N?', answer: 6 },
        { display: 'N \u2212 8 = 11', speech: 'N minus 8 equals 11. What is N?', answer: 19 },
        { display: 'N + 3 = 9', speech: 'N plus 3 equals 9. What is N?', answer: 6 },
        { display: 'N \u2212 4 = 8', speech: 'N minus 4 equals 8. What is N?', answer: 12 },
        { display: 'N + 6 = 14', speech: 'N plus 6 equals 14. What is N?', answer: 8 },
        { display: 'N + 17 = 29', speech: 'N plus 17 equals 29. What is N?', answer: 12 },
        { display: 'N \u2212 13 = 15', speech: 'N minus 13 equals 15. What is N?', answer: 28 },
        { display: 'N + 14 = 26', speech: 'N plus 14 equals 26. What is N?', answer: 12 },
        { display: 'N \u2212 12 = 15', speech: 'N minus 12 equals 15. What is N?', answer: 27 },
        { display: 'N + 14 = 26', speech: 'N plus 14 equals 26. What is N?', answer: 12 }
    ],
    // Set 3
    [
        { display: 'N \u2212 15 = 10', speech: 'N minus 15 equals 10. What is N?', answer: 25 },
        { display: 'N + 8 = 12', speech: 'N plus 8 equals 12. What is N?', answer: 4 },
        { display: 'N \u2212 3 = 14', speech: 'N minus 3 equals 14. What is N?', answer: 17 },
        { display: 'N + 8 = 17', speech: 'N plus 8 equals 17. What is N?', answer: 9 },
        { display: 'N \u2212 4 = 14', speech: 'N minus 4 equals 14. What is N?', answer: 18 },
        { display: 'N + 8 = 19', speech: 'N plus 8 equals 19. What is N?', answer: 11 },
        { display: 'N \u2212 3 = 12', speech: 'N minus 3 equals 12. What is N?', answer: 15 },
        { display: 'N + 5 = 16', speech: 'N plus 5 equals 16. What is N?', answer: 11 },
        { display: 'N + 6 = 18', speech: 'N plus 6 equals 18. What is N?', answer: 12 },
        { display: 'N \u2212 5 = 13', speech: 'N minus 5 equals 13. What is N?', answer: 18 }
    ]
];

// ==================== STATE ====================
const state = {
    currentRound: 0,
    currentQuestion: 0,
    practiceMode: false,
    studySheetMode: false,
    scores: [0, 0, 0, 0],
    questions: [],
    results: [],
    allResults: [[], [], [], []],
    timerInterval: null,
    timerTimeout: null,
    timeLeft: TIME_LIMIT,
    isAnswered: false,
    isPaused: false,
    feedbackTimeout: null
};

// ==================== DOM REFERENCES ====================
const $ = (id) => document.getElementById(id);
const PRACTICE_2020_EQUATIONS = [
    // Set 1
    [
        { display: 'N + 14 = 36', speech: 'N plus 14 equals 36. What is N?', answer: 22 },
        { display: 'N + 31 = 52', speech: 'N plus 31 equals 52. What is N?', answer: 21 },
        { display: 'N + 26 = 48', speech: 'N plus 26 equals 48. What is N?', answer: 22 },
        { display: 'N \u2212 15 = 22', speech: 'N minus 15 equals 22. What is N?', answer: 37 },
        { display: 'N \u2212 23 = 31', speech: 'N minus 23 equals 31. What is N?', answer: 54 },
        { display: 'N \u2212 24 = 35', speech: 'N minus 24 equals 35. What is N?', answer: 59 },
        { display: 'N + 15 = 38', speech: 'N plus 15 equals 38. What is N?', answer: 23 },
        { display: 'N + 25 = 47', speech: 'N plus 25 equals 47. What is N?', answer: 22 },
        { display: 'N + 25 = 48', speech: 'N plus 25 equals 48. What is N?', answer: 23 },
        { display: 'N \u2212 16 = 21', speech: 'N minus 16 equals 21. What is N?', answer: 37 }
    ],
    // Set 2
    [
        { display: 'N \u2212 34 = 41', speech: 'N minus 34 equals 41. What is N?', answer: 75 },
        { display: 'N \u2212 35 = 41', speech: 'N minus 35 equals 41. What is N?', answer: 76 },
        { display: 'N + 12 = 34', speech: 'N plus 12 equals 34. What is N?', answer: 22 },
        { display: 'N + 22 = 37', speech: 'N plus 22 equals 37. What is N?', answer: 15 },
        { display: 'N + 32 = 47', speech: 'N plus 32 equals 47. What is N?', answer: 15 },
        { display: 'N \u2212 22 = 35', speech: 'N minus 22 equals 35. What is N?', answer: 57 },
        { display: 'N \u2212 31 = 37', speech: 'N minus 31 equals 37. What is N?', answer: 68 },
        { display: 'N \u2212 34 = 45', speech: 'N minus 34 equals 45. What is N?', answer: 79 },
        { display: 'N + 15 = 38', speech: 'N plus 15 equals 38. What is N?', answer: 23 },
        { display: 'N + 24 = 38', speech: 'N plus 24 equals 38. What is N?', answer: 14 }
    ],
    // Set 3
    [
        { display: 'N + 24 = 39', speech: 'N plus 24 equals 39. What is N?', answer: 15 },
        { display: 'N \u2212 16 = 23', speech: 'N minus 16 equals 23. What is N?', answer: 39 },
        { display: 'N \u2212 26 = 31', speech: 'N minus 26 equals 31. What is N?', answer: 57 },
        { display: 'N \u2212 23 = 36', speech: 'N minus 23 equals 36. What is N?', answer: 59 },
        { display: 'N + 11 = 33', speech: 'N plus 11 equals 33. What is N?', answer: 22 },
        { display: 'N + 27 = 49', speech: 'N plus 27 equals 49. What is N?', answer: 22 },
        { display: 'N + 24 = 36', speech: 'N plus 24 equals 36. What is N?', answer: 12 },
        { display: 'N \u2212 27 = 32', speech: 'N minus 27 equals 32. What is N?', answer: 59 },
        { display: 'N \u2212 26 = 32', speech: 'N minus 26 equals 32. What is N?', answer: 58 },
        { display: 'N \u2212 26 = 33', speech: 'N minus 26 equals 33. What is N?', answer: 59 }
    ],
    // Set 4
    [
        { display: 'N + 25 = 47', speech: 'N plus 25 equals 47. What is N?', answer: 22 },
        { display: 'N + 32 = 53', speech: 'N plus 32 equals 53. What is N?', answer: 21 },
        { display: 'N + 24 = 49', speech: 'N plus 24 equals 49. What is N?', answer: 25 },
        { display: 'N \u2212 23 = 34', speech: 'N minus 23 equals 34. What is N?', answer: 57 },
        { display: 'N + 22 = 37', speech: 'N plus 22 equals 37. What is N?', answer: 15 },
        { display: 'N \u2212 25 = 35', speech: 'N minus 25 equals 35. What is N?', answer: 60 },
        { display: 'N + 25 = 48', speech: 'N plus 25 equals 48. What is N?', answer: 23 },
        { display: 'N + 26 = 48', speech: 'N plus 26 equals 48. What is N?', answer: 22 },
        { display: 'N + 22 = 36', speech: 'N plus 22 equals 36. What is N?', answer: 14 },
        { display: 'N \u2212 26 = 33', speech: 'N minus 26 equals 33. What is N?', answer: 59 }
    ],
    // Set 5
    [
        { display: 'N \u2212 36 = 42', speech: 'N minus 36 equals 42. What is N?', answer: 78 },
        { display: 'N \u2212 25 = 31', speech: 'N minus 25 equals 31. What is N?', answer: 56 },
        { display: 'N + 24 = 45', speech: 'N plus 24 equals 45. What is N?', answer: 21 },
        { display: 'N + 23 = 45', speech: 'N plus 23 equals 45. What is N?', answer: 22 },
        { display: 'N + 34 = 47', speech: 'N plus 34 equals 47. What is N?', answer: 13 },
        { display: 'N \u2212 22 = 31', speech: 'N minus 22 equals 31. What is N?', answer: 53 },
        { display: 'N \u2212 22 = 37', speech: 'N minus 22 equals 37. What is N?', answer: 59 },
        { display: 'N \u2212 34 = 41', speech: 'N minus 34 equals 41. What is N?', answer: 75 },
        { display: 'N + 24 = 49', speech: 'N plus 24 equals 49. What is N?', answer: 25 },
        { display: 'N + 35 = 58', speech: 'N plus 35 equals 58. What is N?', answer: 23 }
    ],
    // Set 6
    [
        { display: 'N + 24 = 37', speech: 'N plus 24 equals 37. What is N?', answer: 13 },
        { display: 'N \u2212 28 = 31', speech: 'N minus 28 equals 31. What is N?', answer: 59 },
        { display: 'N \u2212 26 = 31', speech: 'N minus 26 equals 31. What is N?', answer: 57 },
        { display: 'N \u2212 24 = 35', speech: 'N minus 24 equals 35. What is N?', answer: 59 },
        { display: 'N + 22 = 36', speech: 'N plus 22 equals 36. What is N?', answer: 14 },
        { display: 'N + 26 = 48', speech: 'N plus 26 equals 48. What is N?', answer: 22 },
        { display: 'N + 21 = 37', speech: 'N plus 21 equals 37. What is N?', answer: 16 },
        { display: 'N \u2212 36 = 42', speech: 'N minus 36 equals 42. What is N?', answer: 78 },
        { display: 'N \u2212 22 = 37', speech: 'N minus 22 equals 37. What is N?', answer: 59 },
        { display: 'N + 32 = 55', speech: 'N plus 32 equals 55. What is N?', answer: 23 }
    ]
];

const dom = {
    roundBadge: $('round-badge'),
    roundName: $('round-name'),
    roundDescription: $('round-description'),

    headerRound: $('header-round'),
    headerQuestion: $('header-question'),
    headerScore: $('header-score'),
    timerBar: $('timer-bar'),
    timerText: $('timer-text'),
    questionText: $('question-text'),
    answerInput: $('answer-input'),
    btnSubmit: $('btn-submit'),
    inputSection: $('input-section'),

    feedbackIcon: $('feedback-icon'),
    feedbackText: $('feedback-text'),
    feedbackAnswer: $('feedback-answer'),

    summaryTitle: $('summary-title'),
    summaryScore: $('summary-score'),
    summaryDetails: $('summary-details'),

    finalBreakdown: $('final-breakdown'),
    finalTotal: $('final-total'),
    finalMessage: $('final-message')
};

// ==================== UTILITIES ====================
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ==================== QUESTION GENERATORS ====================

function generatePatternQuestions() {
    const patternDefs = [
        { startMin: 1, startMax: 5, step: 1 },
        { startMin: 3, startMax: 8, step: 1 },
        { startMin: 2, startMax: 6, step: 2 },
        { startMin: 1, startMax: 5, step: 2 },
        { startMin: 5, startMax: 10, step: 5 },
        { startMin: 5, startMax: 15, step: 5 },
        { startMin: 10, startMax: 30, step: 10 },
        { startMin: 10, startMax: 20, step: 10 },
        { startMin: 8, startMax: 15, step: -1 },
        { startMin: 12, startMax: 20, step: -2 }
    ];

    const questions = [];
    for (let i = 0; i < QUESTIONS_PER_ROUND; i++) {
        const p = patternDefs[i % patternDefs.length];
        const start = random(p.startMin, p.startMax);
        const nums = [start];
        for (let j = 1; j < 4; j++) {
            nums.push(nums[j - 1] + p.step);
        }
        const answer = nums[3] + p.step;

        questions.push({
            display: nums.join(',  ') + ',  ?',
            speech: 'What comes next? ' + nums.join(', '),
            answer: answer
        });
    }
    return shuffle(questions);
}

function generateChainQuestions() {
    const questions = [];
    for (let q = 0; q < QUESTIONS_PER_ROUND; q++) {
        const firstNum = random(2, 9);
        const nums = [firstNum];
        const ops = [];
        let result = firstNum;

        for (let i = 0; i < 3; i++) {
            const canAdd = result < 14;
            const canSub = result > 3;
            let op;
            if (canAdd && canSub) {
                op = Math.random() < 0.5 ? '+' : '-';
            } else if (canAdd) {
                op = '+';
            } else {
                op = '-';
            }

            let num;
            if (op === '+') {
                num = random(1, Math.min(9, 18 - result));
                result += num;
            } else {
                num = random(1, Math.min(9, result - 1));
                result -= num;
            }
            ops.push(op);
            nums.push(num);
        }

        let display = String(nums[0]);
        let speech = String(nums[0]);
        for (let i = 0; i < 3; i++) {
            display += ' ' + ops[i] + ' ' + nums[i + 1];
            speech += ', ' + (ops[i] === '+' ? 'plus' : 'minus') + ' ' + nums[i + 1];
        }

        questions.push({
            display: display + ' = ?',
            speech: speech,
            answer: result
        });
    }
    return questions;
}

function generateAdditionQuestions() {
    const questions = [];
    for (let q = 0; q < QUESTIONS_PER_ROUND; q++) {
        const tens1 = random(1, 7);
        const ones1 = random(0, 8);
        const tens2 = random(1, 9 - tens1);
        const ones2 = random(0, 9 - ones1);

        const num1 = tens1 * 10 + ones1;
        const num2 = tens2 * 10 + ones2;

        questions.push({
            display: num1 + ' + ' + num2 + ' = ?',
            speech: num1 + ' plus ' + num2,
            answer: num1 + num2
        });
    }
    return questions;
}

function generateSubtractionQuestions() {
    const questions = [];
    for (let q = 0; q < QUESTIONS_PER_ROUND; q++) {
        const tens1 = random(3, 9);
        const ones1 = random(1, 9);
        const tens2 = random(1, tens1 - 1);
        const ones2 = random(0, ones1);

        const num1 = tens1 * 10 + ones1;
        const num2 = tens2 * 10 + ones2;

        questions.push({
            display: num1 + ' \u2212 ' + num2 + ' = ?',
            speech: num1 + ' minus ' + num2,
            answer: num1 - num2
        });
    }
    return questions;
}

// ==================== SPEECH SYNTHESIS ====================

function speak(text) {
    return new Promise((resolve) => {
        if (!('speechSynthesis' in window)) {
            resolve();
            return;
        }
        speechSynthesis.cancel();

        // Chrome bug workaround: resume if paused/stuck after cancel
        speechSynthesis.resume();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = SPEECH_RATE;
        utterance.pitch = 1.1;
        utterance.onend = () => resolve();
        utterance.onerror = () => resolve();

        // Chrome sometimes drops speech if called right after cancel
        setTimeout(() => {
            speechSynthesis.speak(utterance);
        }, 50);
    });
}

function restoreRounds() {
    QUESTIONS_PER_ROUND = 10;

    // If ROUNDS was replaced by 2020 practice, rebuild from scratch
    if (ROUNDS.length !== 4 || ROUNDS[0].name.startsWith('Patterns Set')) {
        while (ROUNDS.length > 0) ROUNDS.pop();
        ROUNDS.push(
            { name: 'Patterns', emoji: '\u{1F522}', description: 'Find the next number in the pattern!', generator: generatePatternQuestions },
            { name: 'Mental Math Chain', emoji: '\u{1F517}', description: 'Add and subtract single digits in a chain!', generator: generateChainQuestions },
            { name: '2-Digit Addition', emoji: '\u2795', description: 'Add two 2-digit numbers (no regrouping)!', generator: generateAdditionQuestions },
            { name: '2-Digit Subtraction', emoji: '\u2796', description: 'Subtract two 2-digit numbers (no regrouping)!', generator: generateSubtractionQuestions }
        );
        return;
    }

    // Restore all rounds if overridden by study sheet
    for (let i = 0; i < 4; i++) {
        if (ROUNDS[i]._ssGenerator) {
            ROUNDS[i].generator = ROUNDS[i]._ssGenerator;
            delete ROUNDS[i]._ssGenerator;
        }
    }
}

// ==================== SCREEN MANAGEMENT ====================

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
}

// ==================== GAME FLOW ====================

function startGame() {
    restoreRounds();
    state.currentRound = 0;
    state.practiceMode = false;
    state.studySheetMode = false;
    state.scores = new Array(ROUNDS.length).fill(0);
    state.allResults = ROUNDS.map(() => []);
    showRoundIntro();
}

function startPractice(roundIndex) {
    restoreRounds();
    state.currentRound = roundIndex;
    state.practiceMode = true;
    state.scores = new Array(ROUNDS.length).fill(0);
    state.allResults = ROUNDS.map(() => []);
    QUESTIONS_PER_ROUND = 10;
    showRoundIntro();
}

function startStudySheet() {
    restoreRounds();
    QUESTIONS_PER_ROUND = 15;
    state.currentRound = 0;
    state.practiceMode = false;
    state.studySheetMode = true;
    state.scores = new Array(ROUNDS.length).fill(0);
    state.allResults = ROUNDS.map(() => []);

    // Override all 4 rounds with study sheet questions
    const sections = ['patterns', 'chain', 'addition', 'subtraction'];
    for (let i = 0; i < 4; i++) {
        ROUNDS[i]._ssGenerator = ROUNDS[i].generator;
        ROUNDS[i].generator = ((idx) => () => shuffle([...STUDY_SHEET_2025[sections[idx]]]))(i);
    }

    showRoundIntro();
}

function startStudySheetRound(sectionKey) {
    restoreRounds();
    QUESTIONS_PER_ROUND = 15;

    const sectionMeta = {
        patterns:    { name: 'Patterns',           emoji: '\u{1F522}', description: '2025 Study Sheet \u2014 Patterns' },
        chain:       { name: 'Mental Math Chain',   emoji: '\u{1F517}', description: '2025 Study Sheet \u2014 Chain' },
        addition:    { name: '2-Digit Addition',    emoji: '\u2795',    description: '2025 Study Sheet \u2014 Addition' },
        subtraction: { name: '2-Digit Subtraction', emoji: '\u2796',    description: '2025 Study Sheet \u2014 Subtraction' }
    };
    const meta = sectionMeta[sectionKey];

    while (ROUNDS.length > 0) ROUNDS.pop();
    ROUNDS.push({
        name: meta.name,
        emoji: meta.emoji,
        description: meta.description,
        generator: () => shuffle([...STUDY_SHEET_2025[sectionKey]])
    });

    state.currentRound = 0;
    state.practiceMode = false;
    state.studySheetMode = true;
    state.scores = new Array(ROUNDS.length).fill(0);
    state.allResults = ROUNDS.map(() => []);

    showRoundIntro();
}

function startPractice2020() {
    restoreRounds();
    QUESTIONS_PER_ROUND = 10;

    // Replace ROUNDS with 6 pattern sets
    while (ROUNDS.length > 0) ROUNDS.pop();
    for (let i = 0; i < PRACTICE_2020_PATTERNS.length; i++) {
        ROUNDS.push({
            name: 'Patterns Set ' + (i + 1),
            emoji: '\u{1F522}',
            description: '2020 Practice \u2014 Set ' + (i + 1) + ' of 6',
            generator: ((idx) => () => shuffle([...PRACTICE_2020_PATTERNS[idx]]))(i)
        });
    }

    state.currentRound = 0;
    state.practiceMode = false;
    state.studySheetMode = false;
    state.scores = new Array(ROUNDS.length).fill(0);
    state.allResults = ROUNDS.map(() => []);

    showRoundIntro();
}

function startPractice2020Chain() {
    restoreRounds();
    QUESTIONS_PER_ROUND = 10;

    // Replace ROUNDS with 6 chain sets
    while (ROUNDS.length > 0) ROUNDS.pop();
    for (let i = 0; i < PRACTICE_2020_CHAIN.length; i++) {
        ROUNDS.push({
            name: 'Chain Set ' + (i + 1),
            emoji: '\u{1F517}',
            description: '2020 Practice \u2014 Set ' + (i + 1) + ' of ' + PRACTICE_2020_CHAIN.length,
            generator: ((idx) => () => shuffle([...PRACTICE_2020_CHAIN[idx]]))(i)
        });
    }

    state.currentRound = 0;
    state.practiceMode = false;
    state.studySheetMode = false;
    state.scores = new Array(ROUNDS.length).fill(0);
    state.allResults = ROUNDS.map(() => []);

    showRoundIntro();
}

function startPractice2020Adding() {
    restoreRounds();
    QUESTIONS_PER_ROUND = 10;

    // Replace ROUNDS with 6 adding sets
    while (ROUNDS.length > 0) ROUNDS.pop();
    for (let i = 0; i < PRACTICE_2020_ADDING.length; i++) {
        ROUNDS.push({
            name: 'Adding Set ' + (i + 1),
            emoji: '\u2795',
            description: '2020 Practice \u2014 Set ' + (i + 1) + ' of ' + PRACTICE_2020_ADDING.length,
            generator: ((idx) => () => shuffle([...PRACTICE_2020_ADDING[idx]]))(i)
        });
    }

    state.currentRound = 0;
    state.practiceMode = false;
    state.studySheetMode = false;
    state.scores = new Array(ROUNDS.length).fill(0);
    state.allResults = ROUNDS.map(() => []);

    showRoundIntro();
}

function startPractice2020Equations() {
    restoreRounds();
    QUESTIONS_PER_ROUND = 10;

    while (ROUNDS.length > 0) ROUNDS.pop();
    for (let i = 0; i < PRACTICE_2020_EQUATIONS.length; i++) {
        ROUNDS.push({
            name: 'Find N Set ' + (i + 1),
            emoji: '\u{1F9E9}',
            description: '2020 Equations \u2014 Set ' + (i + 1) + ' of ' + PRACTICE_2020_EQUATIONS.length,
            generator: ((idx) => () => shuffle([...PRACTICE_2020_EQUATIONS[idx]]))(i)
        });
    }

    state.currentRound = 0;
    state.practiceMode = false;
    state.studySheetMode = false;
    state.scores = new Array(ROUNDS.length).fill(0);
    state.allResults = ROUNDS.map(() => []);

    showRoundIntro();
}

function startPractice2024Patterns() {
    restoreRounds();
    QUESTIONS_PER_ROUND = 10;

    while (ROUNDS.length > 0) ROUNDS.pop();
    for (let i = 0; i < PRACTICE_2024_PATTERNS.length; i++) {
        ROUNDS.push({
            name: 'Patterns Set ' + (i + 1),
            emoji: '\u{1F522}',
            description: '2024 Practice \u2014 Set ' + (i + 1) + ' of ' + PRACTICE_2024_PATTERNS.length,
            generator: ((idx) => () => shuffle([...PRACTICE_2024_PATTERNS[idx]]))(i)
        });
    }

    state.currentRound = 0;
    state.practiceMode = false;
    state.studySheetMode = false;
    state.scores = new Array(ROUNDS.length).fill(0);
    state.allResults = ROUNDS.map(() => []);

    showRoundIntro();
}

function startPractice2024Chain() {
    restoreRounds();
    QUESTIONS_PER_ROUND = 10;

    while (ROUNDS.length > 0) ROUNDS.pop();
    for (let i = 0; i < PRACTICE_2024_CHAIN.length; i++) {
        ROUNDS.push({
            name: 'Chain Set ' + (i + 1),
            emoji: '\u{1F517}',
            description: '2024 Practice \u2014 Set ' + (i + 1) + ' of ' + PRACTICE_2024_CHAIN.length,
            generator: ((idx) => () => shuffle([...PRACTICE_2024_CHAIN[idx]]))(i)
        });
    }

    state.currentRound = 0;
    state.practiceMode = false;
    state.studySheetMode = false;
    state.scores = new Array(ROUNDS.length).fill(0);
    state.allResults = ROUNDS.map(() => []);

    showRoundIntro();
}

function startPractice2024Adding() {
    restoreRounds();
    QUESTIONS_PER_ROUND = 10;

    while (ROUNDS.length > 0) ROUNDS.pop();
    for (let i = 0; i < PRACTICE_2024_ADDING.length; i++) {
        ROUNDS.push({
            name: 'Adding Set ' + (i + 1),
            emoji: '\u{2795}',
            description: '2024 Practice \u2014 Set ' + (i + 1) + ' of ' + PRACTICE_2024_ADDING.length,
            generator: ((idx) => () => shuffle([...PRACTICE_2024_ADDING[idx]]))(i)
        });
    }

    state.currentRound = 0;
    state.practiceMode = false;
    state.studySheetMode = false;
    state.scores = new Array(ROUNDS.length).fill(0);
    state.allResults = ROUNDS.map(() => []);

    showRoundIntro();
}

function startPractice2024Bonus() {
    restoreRounds();
    QUESTIONS_PER_ROUND = 10;

    while (ROUNDS.length > 0) ROUNDS.pop();
    for (let i = 0; i < PRACTICE_2024_BONUS.length; i++) {
        ROUNDS.push({
            name: 'Find N Set ' + (i + 1),
            emoji: '\u{1F9E9}',
            description: '2024 Bonus \u2014 Set ' + (i + 1) + ' of ' + PRACTICE_2024_BONUS.length,
            generator: ((idx) => () => shuffle([...PRACTICE_2024_BONUS[idx]]))(i)
        });
    }

    state.currentRound = 0;
    state.practiceMode = false;
    state.studySheetMode = false;
    state.scores = new Array(ROUNDS.length).fill(0);
    state.allResults = ROUNDS.map(() => []);

    showRoundIntro();
}

function showRoundIntro() {
    const round = ROUNDS[state.currentRound];
    dom.roundBadge.textContent = 'Round ' + (state.currentRound + 1);
    dom.roundName.textContent = round.emoji + ' ' + round.name;
    dom.roundDescription.textContent = round.description;
    showScreen('screen-round-intro');
    speak('Round ' + (state.currentRound + 1) + '. ' + round.name + '. ' + round.description);
}

function beginRound() {
    const round = ROUNDS[state.currentRound];
    state.currentQuestion = 0;
    state.scores[state.currentRound] = 0;
    state.results = [];
    state.questions = round.generator();
    showQuestion();
}

async function showQuestion() {
    const q = state.questions[state.currentQuestion];
    state.isAnswered = false;

    // Update header
    dom.headerRound.textContent = 'Round ' + (state.currentRound + 1);
    const totalQ = Math.min(QUESTIONS_PER_ROUND, state.questions.length);
    dom.headerQuestion.textContent = 'Q ' + (state.currentQuestion + 1) + '/' + totalQ;
    dom.headerScore.textContent = '\u2B50 ' + state.scores[state.currentRound];

    // Single screen — show listening prompt + input area together
    dom.questionText.textContent = '\uD83D\uDD0A Listen carefully...';
    dom.inputSection.classList.remove('hidden');

    // Reset input — visible but disabled while question is being read
    dom.answerInput.value = '';
    dom.answerInput.disabled = true;
    dom.btnSubmit.disabled = true;

    // Reset timer visual (paused, full bar)
    dom.timerBar.style.transition = 'none';
    dom.timerBar.style.width = '100%';
    dom.timerBar.className = 'timer-bar';
    dom.timerText.textContent = TIME_LIMIT;

    showScreen('screen-question');

    // Speak the question (student listens on this same screen)
    await speak(q.speech);

    // Safety: if already answered somehow, bail
    if (state.isAnswered) return;

    // Now enable input and start the countdown — same screen, no transition
    dom.questionText.textContent = '\u2753 Your answer?';
    dom.answerInput.disabled = false;
    dom.answerInput.focus();
    dom.btnSubmit.disabled = false;

    startTimer();
}

function submitAnswer() {
    if (state.isAnswered) return;

    const inputVal = dom.answerInput.value.trim();
    if (inputVal === '') return;

    const userAnswer = parseInt(inputVal, 10);
    if (isNaN(userAnswer)) return;

    state.isAnswered = true;
    stopTimer();

    const q = state.questions[state.currentQuestion];
    const correct = userAnswer === q.answer;

    if (correct) {
        state.scores[state.currentRound]++;
    }

    state.results.push({
        questionDisplay: q.display,
        correctAnswer: q.answer,
        userAnswer: userAnswer,
        correct: correct,
        timedOut: false
    });

    showFeedback(correct ? 'correct' : 'wrong', q.answer, userAnswer);
}

function timeUp() {
    if (state.isAnswered) return;
    state.isAnswered = true;
    stopTimer();

    const q = state.questions[state.currentQuestion];

    // Check if partial answer was typed
    const inputVal = dom.answerInput.value.trim();
    const userAnswer = inputVal ? parseInt(inputVal, 10) : null;
    const correct = userAnswer !== null && userAnswer === q.answer;

    if (correct) {
        state.scores[state.currentRound]++;
    }

    state.results.push({
        questionDisplay: q.display,
        correctAnswer: q.answer,
        userAnswer: userAnswer,
        correct: correct,
        timedOut: true
    });

    if (correct) {
        showFeedback('correct', q.answer, userAnswer);
    } else {
        showFeedback('timeout', q.answer, userAnswer);
    }
}

function showFeedback(type, correctAnswer, userAnswer) {
    const feedbackCard = document.querySelector('.feedback-card');
    feedbackCard.className = 'card feedback-card';

    if (type === 'correct') {
        feedbackCard.classList.add('feedback-correct');
        dom.feedbackIcon.textContent = '\u{1F31F}';
        dom.feedbackText.textContent = 'Correct!';
        dom.feedbackAnswer.textContent = '';
        speak('Correct! Great job!');
    } else if (type === 'timeout') {
        feedbackCard.classList.add('feedback-timeout');
        dom.feedbackIcon.textContent = '\u23F0';
        dom.feedbackText.textContent = "Time's Up!";
        dom.feedbackAnswer.textContent = 'The answer was ' + correctAnswer;
        speak("Time's up! The answer was " + correctAnswer);
    } else {
        feedbackCard.classList.add('feedback-wrong');
        dom.feedbackIcon.textContent = '\u{1F614}';
        dom.feedbackText.textContent = 'Not quite!';
        dom.feedbackAnswer.textContent = 'The answer was ' + correctAnswer;
        speak('The answer was ' + correctAnswer);
    }

    showScreen('screen-feedback');

    const delay = (type === 'correct') ? FEEDBACK_DELAY : FEEDBACK_DELAY_WRONG;
    state.feedbackTimeout = setTimeout(() => {
        state.feedbackTimeout = null;
        state.currentQuestion++;
        if (state.currentQuestion < QUESTIONS_PER_ROUND && state.currentQuestion < state.questions.length) {
            showQuestion();
        } else {
            showRoundSummary();
        }
    }, delay);
}

function showRoundSummary() {
    const round = ROUNDS[state.currentRound];
    const score = state.scores[state.currentRound];

    dom.summaryTitle.textContent = round.emoji + ' ' + round.name + ' Complete!';
    dom.summaryScore.textContent = score + ' / ' + state.results.length;

    // Build review list
    let html = '';
    state.results.forEach((r) => {
        const cls = r.correct ? 'correct' : 'wrong';
        const icon = r.correct ? '\u2705' : '\u274C';
        const questionClean = r.questionDisplay.replace(' = ?', '').replace(',  ?', '');
        const answerText = r.userAnswer !== null ? ('You: ' + r.userAnswer) : 'No answer';
        html +=
            '<div class="summary-item ' + cls + '">' +
                '<span class="icon">' + icon + '</span>' +
                '<span class="question-label">' + escapeHtml(questionClean) + '</span>' +
                '<span class="answer-info">= ' + r.correctAnswer + ' (' + escapeHtml(answerText) + ')</span>' +
            '</div>';
    });
    dom.summaryDetails.innerHTML = html;

    // Button text
    const btnNext = $('btn-next-round');
    if (state.practiceMode) {
        btnNext.textContent = 'See Results \u{1F3C6}';
    } else if (state.currentRound < ROUNDS.length - 1) {
        btnNext.textContent = 'Next Round \u2192';
    } else {
        btnNext.textContent = 'See Final Score \u{1F3C6}';
    }

    // Save this round's results for the final screen
    state.allResults[state.currentRound] = [...state.results];

    showScreen('screen-round-summary');

    const msg = score >= 8 ? 'Amazing!' : score >= 5 ? 'Good job!' : 'Keep practicing!';
    speak('You got ' + score + ' out of ' + state.results.length + '. ' + msg);
}

function nextRound() {
    if (state.practiceMode) {
        showFinalScore();
        return;
    }
    state.currentRound++;
    if (state.currentRound < ROUNDS.length) {
        showRoundIntro();
    } else {
        showFinalScore();
    }
}

function endGame() {
    // Save current round's results if any questions were answered
    if (state.results.length > 0) {
        state.allResults[state.currentRound] = [...state.results];
    }
    stopTimer();
    if (state.feedbackTimeout) {
        clearTimeout(state.feedbackTimeout);
        state.feedbackTimeout = null;
    }
    state.isPaused = false;
    document.getElementById('pause-overlay').classList.add('hidden');
    speechSynthesis.cancel();
    state.isAnswered = true;
    showFinalScore();
}

function showFinalScore() {
    const total = state.scores.reduce((a, b) => a + b, 0);
    // Count only rounds that were actually played
    let questionsPlayed = 0;
    ROUNDS.forEach((round, i) => {
        questionsPlayed += state.allResults[i].length;
    });
    const maxScore = questionsPlayed;

    let html = '';
    ROUNDS.forEach((round, i) => {
        // Skip rounds with no questions attempted
        if (state.allResults[i].length === 0) return;

        // Round header row
        html +=
            '<div class="final-round-header">' +
                '<span>' + round.emoji + ' ' + round.name + '</span>' +
                '<span class="final-round-score">' + state.scores[i] + ' / ' + state.allResults[i].length + '</span>' +
            '</div>';

        // Question-by-question details for this round
        state.allResults[i].forEach((r, qi) => {
            const cls = r.correct ? 'correct' : 'wrong';
            const icon = r.correct ? '\u2705' : '\u274C';
            const questionClean = r.questionDisplay.replace(' = ?', '').replace(',  ?', '');
            const yourAnswer = r.userAnswer !== null ? r.userAnswer : '\u2014';
            html +=
                '<div class="final-question-row ' + cls + '">' +
                    '<span class="fq-num">' + icon + '</span>' +
                    '<span class="fq-question">' + escapeHtml(questionClean) + '</span>' +
                    '<span class="fq-correct">= ' + r.correctAnswer + '</span>' +
                    '<span class="fq-yours">' + escapeHtml(String(yourAnswer)) + '</span>' +
                '</div>';
        });
    });
    dom.finalBreakdown.innerHTML = html;

    dom.finalTotal.textContent = total + ' / ' + maxScore;

    const pct = total / maxScore;
    let message;
    if (pct >= 0.9) message = "Outstanding! You're a Math Champion!";
    else if (pct >= 0.7) message = 'Great job! Keep it up!';
    else if (pct >= 0.5) message = 'Good effort! Practice makes perfect!';
    else message = "Keep practicing, you'll get better!";

    dom.finalMessage.textContent = message;

    showScreen('screen-final');
    speak('You scored ' + total + ' out of ' + maxScore + '. ' + message);

    generateTips();

    saveSession(total, maxScore);
}

// ==================== TIPS & RECOMMENDATIONS ====================

function categorizeRound(name) {
    const n = name.toLowerCase();
    if (n.includes('pattern')) return 'patterns';
    if (n.includes('chain') || n.includes('mental')) return 'chain';
    if (n.includes('add')) return 'addition';
    if (n.includes('sub')) return 'subtraction';
    if (n.includes('find n') || n.includes('equation')) return 'equations';
    return 'general';
}

function generateTips() {
    const tipsSection = document.getElementById('tips-section');
    const tipsContent = document.getElementById('tips-content');

    // Gather per-category stats
    const stats = {};
    ROUNDS.forEach((round, i) => {
        const results = state.allResults[i];
        if (results.length === 0) return;
        const cat = categorizeRound(round.name);
        if (!stats[cat]) stats[cat] = { correct: 0, total: 0, timedOut: 0, wrong: [], roundName: round.name };
        results.forEach(r => {
            stats[cat].total++;
            if (r.correct) stats[cat].correct++;
            if (r.timedOut && !r.correct) stats[cat].timedOut++;
            if (!r.correct) stats[cat].wrong.push(r);
        });
    });

    const categories = Object.keys(stats);
    if (categories.length === 0) {
        tipsSection.classList.add('hidden');
        return;
    }

    let html = '';

    // === Per-category analysis ===
    categories.forEach(cat => {
        const s = stats[cat];
        const pct = Math.round((s.correct / s.total) * 100);
        const timedOutPct = s.total > 0 ? Math.round((s.timedOut / s.total) * 100) : 0;

        // Status badge
        let badge, badgeClass;
        if (pct >= 90) { badge = '\u2B50 Excellent'; badgeClass = 'tip-badge-excellent'; }
        else if (pct >= 70) { badge = '\u{1F44D} Good'; badgeClass = 'tip-badge-good'; }
        else if (pct >= 50) { badge = '\u{1F4AA} Needs Practice'; badgeClass = 'tip-badge-practice'; }
        else { badge = '\u{1F6A8} Focus Area'; badgeClass = 'tip-badge-focus'; }

        const catLabel = getCategoryLabel(cat);
        html += '<div class="tip-card">';
        html += '<div class="tip-card-header">';
        html += '<span class="tip-cat-name">' + catLabel + '</span>';
        html += '<span class="tip-badge ' + badgeClass + '">' + badge + '</span>';
        html += '</div>';
        html += '<div class="tip-score-bar"><div class="tip-score-fill" style="width:' + pct + '%"></div></div>';
        html += '<div class="tip-score-label">' + s.correct + '/' + s.total + ' correct (' + pct + '%)</div>';

        // Speed issue
        if (timedOutPct >= 30) {
            html += '<div class="tip-item tip-speed">\u23F1 <strong>Speed:</strong> ' + s.timedOut + ' question' + (s.timedOut > 1 ? 's' : '') + ' timed out. Try to answer faster — start with a quick guess and refine.</div>';
        }

        // Category-specific tips
        const tips = getCategoryTips(cat, s, pct);
        tips.forEach(t => {
            html += '<div class="tip-item">' + t + '</div>';
        });

        html += '</div>';
    });

    // === General mental math strategies ===
    html += '<div class="tip-card tip-card-general">';
    html += '<div class="tip-card-header"><span class="tip-cat-name">\u{1F9E0} General Mental Math Strategies</span></div>';

    const allCorrect = Object.values(stats).reduce((a, s) => a + s.correct, 0);
    const allTotal = Object.values(stats).reduce((a, s) => a + s.total, 0);
    const allPct = allTotal > 0 ? Math.round((allCorrect / allTotal) * 100) : 0;

    if (allPct >= 90) {
        html += '<div class="tip-item">\u{1F3C6} Outstanding performance! Challenge yourself with faster time limits or harder problems.</div>';
    } else if (allPct >= 70) {
        html += '<div class="tip-item">\u{1F4AA} Strong foundation! Focus on the categories below 90% to reach champion level.</div>';
    } else {
        html += '<div class="tip-item">\u{1F4DA} Practice a little bit every day — even 5 minutes helps build speed and confidence.</div>';
    }

    html += '<div class="tip-item">\u270D\uFE0F <strong>Write it in your head:</strong> Visualize the numbers on a mental whiteboard as they are read.</div>';
    html += '<div class="tip-item">\u{1F50A} <strong>Say it aloud:</strong> Repeating the problem quietly helps memory.</div>';
    html += '<div class="tip-item">\u23F3 <strong>Don\'t rush the listen phase:</strong> Use the speaking time to understand, then answer quickly.</div>';
    html += '</div>';

    tipsContent.innerHTML = html;
    tipsSection.classList.remove('hidden');
}

function getCategoryLabel(cat) {
    const labels = {
        patterns: '\u{1F522} Patterns',
        chain: '\u{1F517} Mental Math Chain',
        addition: '\u2795 Addition',
        subtraction: '\u2796 Subtraction',
        equations: '\u{1F9E9} Find N / Equations',
        general: '\u{1F4D0} General'
    };
    return labels[cat] || cat;
}

function getCategoryTips(cat, s, pct) {
    const tips = [];
    const wrongAnswers = s.wrong;

    if (cat === 'patterns') {
        if (pct < 70) {
            tips.push('\u{1F50D} <strong>Find the rule first:</strong> Look at the difference between each pair of numbers. Is it always the same? That\'s your pattern step.');
            tips.push('\u270F\uFE0F <strong>Trick:</strong> Subtract the 2nd number from the 1st (e.g., 30, 26 → difference is 4). Then apply that to the last number.');
        }
        if (pct >= 70 && pct < 90) {
            tips.push('\u{1F4A1} Good pattern spotting! Double-check by verifying the rule works for ALL given numbers, not just the first two.');
        }
        if (pct >= 90) {
            tips.push('\u2B50 Excellent pattern recognition! You\'re identifying the step quickly.');
        }
        // Check for common mistakes
        const closeWrong = wrongAnswers.filter(r => r.userAnswer !== null && Math.abs(r.userAnswer - r.correctAnswer) <= 3);
        if (closeWrong.length > 0) {
            tips.push('\u{1F3AF} Some answers were very close! Double-check your final step — make sure you\'re adding/subtracting the difference to the <em>last</em> number, not an earlier one.');
        }
    }

    if (cat === 'chain') {
        if (pct < 70) {
            tips.push('\u{1F9EE} <strong>Go step by step:</strong> Don\'t try to solve it all at once. Start with the first two numbers, get that result, then apply the next operation.');
            tips.push('\u261D\uFE0F <strong>Use fingers:</strong> It\'s okay to count on your fingers for each step!');
            tips.push('\u{1F4A1} <strong>Watch the signs:</strong> Pay extra attention to whether you\'re adding (+) or subtracting (−).');
        }
        if (pct >= 70 && pct < 90) {
            tips.push('\u{1F44F} Great chaining! For even more speed, try combining two operations at once (e.g., "+8 −3" is the same as "+5").');
        }
        if (pct >= 90) {
            tips.push('\u2B50 Superb mental math chaining!');
        }
        const signErrors = wrongAnswers.filter(r => {
            if (r.userAnswer === null) return false;
            const diff = Math.abs(r.userAnswer - r.correctAnswer);
            return diff % 2 === 0 && diff <= 18;
        });
        if (signErrors.length >= 2) {
            tips.push('\u26A0\uFE0F It looks like some errors might be from mixing up + and −. Slow down on the signs!');
        }
    }

    if (cat === 'addition') {
        if (pct < 70) {
            tips.push('\u{1F522} <strong>Split into tens and ones:</strong> For 35 + 24, think: 30+20 = 50, then 5+4 = 9, so 59.');
            tips.push('\u{1F4A1} <strong>Add tens first:</strong> Always start with the bigger place value — it\'s easier and faster.');
        }
        if (pct >= 70 && pct < 90) {
            tips.push('\u{1F44D} Good addition skills! Make sure you\'re adding ones carefully — that\'s where small mistakes creep in.');
        }
        if (pct >= 90) {
            tips.push('\u2B50 Excellent addition! Your place-value skills are strong.');
        }
        const offByTen = wrongAnswers.filter(r => r.userAnswer !== null && Math.abs(r.userAnswer - r.correctAnswer) === 10);
        if (offByTen.length > 0) {
            tips.push('\u{1F50E} Some answers were off by exactly 10. Double-check your tens column!');
        }
        const offByOne = wrongAnswers.filter(r => r.userAnswer !== null && Math.abs(r.userAnswer - r.correctAnswer) === 1);
        if (offByOne.length >= 2) {
            tips.push('\u{1F50E} A few answers were off by 1 — slow down on the ones digit.');
        }
    }

    if (cat === 'subtraction') {
        if (pct < 70) {
            tips.push('\u{1F522} <strong>Split into tens and ones:</strong> For 85 − 32, think: 80−30 = 50, then 5−2 = 3, so 53.');
            tips.push('\u{1F4A1} <strong>Count up:</strong> Instead of subtracting, count up from the smaller number. 32 + ? = 85 → 32+50=82, 82+3=85, answer: 53.');
        }
        if (pct >= 70 && pct < 90) {
            tips.push('\u{1F44D} Solid subtraction! Keep using the split method for speed.');
        }
        if (pct >= 90) {
            tips.push('\u2B50 Great subtraction skills!');
        }
        const offByTen = wrongAnswers.filter(r => r.userAnswer !== null && Math.abs(r.userAnswer - r.correctAnswer) === 10);
        if (offByTen.length > 0) {
            tips.push('\u{1F50E} Some answers were off by 10. Focus on getting the tens digit right first.');
        }
    }

    if (cat === 'equations') {
        if (pct < 70) {
            tips.push('\u{1F9E9} <strong>Think "undo":</strong> For N + 13 = 25, undo the +13 by subtracting: 25 − 13 = 12.');
            tips.push('\u{1F504} <strong>For subtraction equations:</strong> N − 12 = 14 means N = 14 + 12. Flip the operation!');
        }
        if (pct >= 70 && pct < 90) {
            tips.push('\u{1F44D} Good equation solving! Make sure to check: does your answer make the equation true?');
        }
        if (pct >= 90) {
            tips.push('\u2B50 Excellent equation skills!');
        }
    }

    // Timeout-specific tip
    if (s.timedOut > 0 && tips.length > 0) {
        tips.push('\u{1F3C3} <strong>Speed tip:</strong> Even if you\'re not 100% sure, enter your best guess before time runs out!');
    }

    return tips;
}

// ==================== SESSION HISTORY ====================

function saveSession(total, maxScore) {
    if (maxScore === 0) return; // Don't save empty sessions
    const history = JSON.parse(localStorage.getItem('mathBowlHistory') || '[]');

    const roundDetails = [];
    ROUNDS.forEach((round, i) => {
        if (state.allResults[i].length === 0) return;
        const wrongOnes = [];
        state.allResults[i].forEach(r => {
            if (!r.correct) {
                wrongOnes.push({
                    q: r.questionDisplay.replace(' = ?', '').replace(',  ?', ''),
                    correct: r.correctAnswer,
                    yours: r.userAnswer
                });
            }
        });
        roundDetails.push({
            name: round.emoji + ' ' + round.name,
            score: state.scores[i],
            total: state.allResults[i].length,
            wrong: wrongOnes
        });
    });

    history.unshift({
        date: new Date().toLocaleString(),
        score: total,
        maxScore: maxScore,
        rounds: roundDetails
    });

    // Keep only the last 50 sessions
    if (history.length > 50) history.length = 50;
    localStorage.setItem('mathBowlHistory', JSON.stringify(history));
}

function renderHistory() {
    const history = JSON.parse(localStorage.getItem('mathBowlHistory') || '[]');
    const container = $('history-list');
    const btnClear = $('btn-clear-history');

    if (history.length === 0) {
        container.innerHTML = '<p class="history-empty">No sessions yet. Play a round to see your history!</p>';
        btnClear.classList.add('hidden');
        return;
    }

    btnClear.classList.remove('hidden');
    let html = '';
    history.forEach((session, si) => {
        const pct = session.maxScore > 0 ? Math.round((session.score / session.maxScore) * 100) : 0;
        const medal = pct >= 90 ? '\u{1F3C6}' : pct >= 70 ? '\u{1F31F}' : pct >= 50 ? '\u{1F44D}' : '\u{1F4AA}';

        html += '<details class="history-entry">';
        html += '<summary class="history-summary">';
        html += '<span class="history-medal">' + medal + '</span>';
        html += '<span class="history-info">';
        html += '<span class="history-score">' + session.score + '/' + session.maxScore + ' (' + pct + '%)</span>';
        html += '<span class="history-date">' + escapeHtml(session.date) + '</span>';
        html += '</span>';
        html += '</summary>';
        html += '<div class="history-details">';

        session.rounds.forEach(rd => {
            html += '<div class="history-round">';
            html += '<strong>' + escapeHtml(rd.name) + '</strong>: ' + rd.score + '/' + rd.total;
            if (rd.wrong.length > 0) {
                html += '<div class="history-wrong">';
                rd.wrong.forEach(w => {
                    const yours = w.yours !== null ? w.yours : 'no answer';
                    html += '<div class="history-wrong-item">\u274C ' + escapeHtml(w.q) + ' = ' + w.correct + ' (you: ' + escapeHtml(String(yours)) + ')</div>';
                });
                html += '</div>';
            }
            html += '</div>';
        });

        html += '</div></details>';
    });
    container.innerHTML = html;
}

// ==================== TIMER ====================

function startTimer() {
    state.timeLeft = TIME_LIMIT;
    dom.timerText.textContent = TIME_LIMIT;
    dom.timerBar.className = 'timer-bar';

    // Reset bar to full
    dom.timerBar.style.transition = 'none';
    dom.timerBar.style.width = '100%';

    // Force reflow then animate
    void dom.timerBar.offsetHeight;
    dom.timerBar.style.transition = 'width ' + TIME_LIMIT + 's linear';
    dom.timerBar.style.width = '0%';

    // Countdown text and color changes
    state.timerInterval = setInterval(() => {
        state.timeLeft--;
        dom.timerText.textContent = Math.max(0, state.timeLeft);

        if (state.timeLeft <= 2) {
            dom.timerBar.classList.remove('warning');
            dom.timerBar.classList.add('danger');
        } else if (state.timeLeft <= 3) {
            dom.timerBar.classList.add('warning');
        }
    }, 1000);

    // Auto time-up
    state.timerTimeout = setTimeout(() => {
        timeUp();
    }, TIME_LIMIT * 1000);
}

function stopTimer() {
    if (state.timerInterval) {
        clearInterval(state.timerInterval);
        state.timerInterval = null;
    }
    if (state.timerTimeout) {
        clearTimeout(state.timerTimeout);
        state.timerTimeout = null;
    }
    // Freeze the bar
    const rect = dom.timerBar.getBoundingClientRect();
    dom.timerBar.style.transition = 'none';
    dom.timerBar.style.width = rect.width + 'px';
}

// ==================== PAUSE / RESUME ====================

function pauseGame() {
    if (state.isPaused) return;
    state.isPaused = true;

    // Stop speech
    if ('speechSynthesis' in window) speechSynthesis.cancel();

    // Pause timer (save remaining time)
    if (state.timerInterval) {
        clearInterval(state.timerInterval);
        state.timerInterval = null;
    }
    if (state.timerTimeout) {
        clearTimeout(state.timerTimeout);
        state.timerTimeout = null;
    }
    // Freeze bar position
    const rect = dom.timerBar.getBoundingClientRect();
    dom.timerBar.style.transition = 'none';
    dom.timerBar.style.width = rect.width + 'px';

    // Pause feedback delay if active
    if (state.feedbackTimeout) {
        clearTimeout(state.feedbackTimeout);
        state.feedbackTimeout = null;
    }

    // Show overlay
    document.getElementById('pause-overlay').classList.remove('hidden');
}

function resumeGame() {
    if (!state.isPaused) return;
    state.isPaused = false;

    // Hide overlay
    document.getElementById('pause-overlay').classList.add('hidden');

    // Determine which screen is active and resume accordingly
    const activeScreen = document.querySelector('.screen.active');
    if (!activeScreen) return;

    if (activeScreen.id === 'screen-question' && !state.isAnswered) {
        // Resume the timer with remaining time
        resumeTimer();
        dom.answerInput.focus();
    } else if (activeScreen.id === 'screen-feedback') {
        // Resume feedback — advance to next question after a short delay
        const lastResult = state.results[state.results.length - 1];
        const delay = (lastResult && lastResult.correct) ? FEEDBACK_DELAY : FEEDBACK_DELAY_WRONG;
        state.feedbackTimeout = setTimeout(() => {
            state.feedbackTimeout = null;
            state.currentQuestion++;
            if (state.currentQuestion < QUESTIONS_PER_ROUND && state.currentQuestion < state.questions.length) {
                showQuestion();
            } else {
                showRoundSummary();
            }
        }, delay);
    }
}

function resumeTimer() {
    const remaining = state.timeLeft;
    if (remaining <= 0) {
        timeUp();
        return;
    }

    // Animate bar from current position to 0 over remaining seconds
    void dom.timerBar.offsetHeight;
    dom.timerBar.style.transition = 'width ' + remaining + 's linear';
    dom.timerBar.style.width = '0%';

    state.timerInterval = setInterval(() => {
        state.timeLeft--;
        dom.timerText.textContent = Math.max(0, state.timeLeft);
        if (state.timeLeft <= 2) {
            dom.timerBar.classList.remove('warning');
            dom.timerBar.classList.add('danger');
        } else if (state.timeLeft <= 3) {
            dom.timerBar.classList.add('warning');
        }
    }, 1000);

    state.timerTimeout = setTimeout(() => {
        timeUp();
    }, remaining * 1000);
}

// ==================== EVENT LISTENERS ====================

function setupEventListeners() {
    $('btn-start').addEventListener('click', startGame);
    $('btn-study-sheet').addEventListener('click', startStudySheet);
    $('btn-ss-patterns').addEventListener('click', () => startStudySheetRound('patterns'));
    $('btn-ss-chain').addEventListener('click', () => startStudySheetRound('chain'));
    $('btn-ss-addition').addEventListener('click', () => startStudySheetRound('addition'));
    $('btn-ss-subtraction').addEventListener('click', () => startStudySheetRound('subtraction'));
    $('btn-practice-2020').addEventListener('click', startPractice2020);
    $('btn-practice-2020-chain').addEventListener('click', startPractice2020Chain);
    $('btn-practice-2020-adding').addEventListener('click', startPractice2020Adding);
    $('btn-practice-2020-equations').addEventListener('click', startPractice2020Equations);
    $('btn-practice-2024-patterns').addEventListener('click', startPractice2024Patterns);
    $('btn-practice-2024-chain').addEventListener('click', startPractice2024Chain);
    $('btn-practice-2024-adding').addEventListener('click', startPractice2024Adding);
    $('btn-practice-2024-bonus').addEventListener('click', startPractice2024Bonus);
    $('btn-begin-round').addEventListener('click', beginRound);

    // Pause / Resume
    $('btn-pause').addEventListener('click', pauseGame);
    $('btn-resume').addEventListener('click', resumeGame);

    // Practice round buttons
    document.querySelectorAll('.btn-practice').forEach(btn => {
        btn.addEventListener('click', () => {
            startPractice(parseInt(btn.dataset.round, 10));
        });
    });

    dom.btnSubmit.addEventListener('click', submitAnswer);

    dom.answerInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            submitAnswer();
        }
    });

    // Only allow digits
    dom.answerInput.addEventListener('input', () => {
        dom.answerInput.value = dom.answerInput.value.replace(/[^0-9]/g, '');
    });

    $('btn-next-round').addEventListener('click', nextRound);

    $('btn-restart').addEventListener('click', () => {
        restoreRounds();
        renderHistory();
        showScreen('screen-start');
    });

    $('btn-clear-history').addEventListener('click', () => {
        localStorage.removeItem('mathBowlHistory');
        renderHistory();
    });

    // End Game buttons (multiple across screens)
    document.querySelectorAll('[data-action="end-game"]').forEach(btn => {
        btn.addEventListener('click', endGame);
    });
}

// ==================== INIT ====================

function init() {
    setupEventListeners();
    renderHistory();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
