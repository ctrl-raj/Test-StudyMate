const data = {
  "Chemistry": [
    {
      "topic": "Atomic Structure",
      "question": "What is the maximum number of electrons that can occupy the third energy level (n=3)?",
      "answer": "18 ($2n^2$ rule, $2\\times 3^2 = 18$)"
    },
    {
      "topic": "Chemical Bonding",
      "question": "Name the type of bond formed by the electrostatic attraction between oppositely charged ions.",
      "answer": "Ionic bond"
    },
    {
      "topic": "Stoichiometry",
      "question": "What is the molar mass of water ($H_2O$)? (Given H $\\approx 1.01$ g/mol, O $\\approx 16.00$ g/mol)",
      "answer": "$18.02$ g/mol ($2\\times 1.01 + 16.00$)"
    },
    {
      "topic": "Acids and Bases",
      "question": "A substance with a pH of 2 is considered a strong...",
      "answer": "Acid"
    },
    {
      "topic": "Organic Chemistry",
      "question": "What is the chemical formula for the simplest alkane, methane?",
      "answer": "$CH_4$"
    }
  ],
  "Physics": [
    {
      "topic": "Kinematics",
      "question": "An object accelerates from rest at $5 \\text{ m/s}^2$ for 4 seconds. What is its final velocity?",
      "answer": "$20 \\text{ m/s}$ ($v = u + at$)"
    },
    {
      "topic": "Forces and Motion",
      "question": "State Newton's First Law of Motion.",
      "answer": "An object will remain at rest or in uniform motion in a straight line unless acted upon by an external force."
    },
    {
      "topic": "Electricity",
      "question": "If a circuit has a voltage of $12 \\text{ V}$ and a resistance of $4 \\text{ \\Omega}$, what is the current in Amperes?",
      "answer": "$3 \\text{ A}$ (Ohm's Law: $I = V/R$)"
    },
    {
      "topic": "Work and Energy",
      "question": "What type of energy is stored in an object due to its position above the ground?",
      "answer": "Gravitational potential energy"
    },
    {
      "topic": "Waves",
      "question": "The bending of a wave as it passes at an angle from one medium to another is called...",
      "answer": "Refraction"
    }
  ],
  "Mathematics": [
    {
      "topic": "Algebra",
      "question": "Solve for $x$: $3x + 5 = 20$",
      "answer": "$x = 5$"
    },
    {
      "topic": "Geometry",
      "question": "If a circle has a radius of $5 \\text{ cm}$, what is its area? (Use $\\pi \\approx 3.14$)",
      "answer": "$78.5 \\text{ cm}^2$ ($A = \\pi r^2$)"
    },
    {
      "topic": "Calculus",
      "question": "What is the derivative of the function $f(x) = x^3$?",
      "answer": "$f'(x) = 3x^2$"
    },
    {
      "topic": "Statistics",
      "question": "What is the median of the following set of numbers: 2, 5, 8, 1, 4?",
      "answer": "$4$ (Ordered: 1, 2, 4, 5, 8)"
    },
    {
      "topic": "Trigonometry",
      "question": "In a right triangle, the ratio of the **opposite** side to the **hypotenuse** is defined as which trigonometric function?",
      "answer": "Sine (sin)"
    }
  ]
};

const dataObject = JSON.parse(jsonString);