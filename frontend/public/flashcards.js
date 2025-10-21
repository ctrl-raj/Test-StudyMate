const data = {
  "Chemistry": [
    {
      "topic": "Atomic Structure",
      "question": "Describe the Heisenberg Uncertainty Principle and its implication for electron behavior.",
      "answer": "It states that the precise position and momentum of a particle (like an electron) cannot be simultaneously determined. It implies electrons exist in probability clouds (orbitals)."
    },
    {
      "topic": "Chemical Bonding",
      "question": "Explain the concept of hybridization and provide an example of sp3 hybridization.",
      "answer": "Hybridization is the mixing of atomic orbitals to form new equivalent hybrid orbitals. sp3 hybridization occurs in methane (CH4)."
    },
    {
      "topic": "Stoichiometry",
      "question": "State the conditions under which a gas is considered 'ideal' according to the Ideal Gas Law (PV = nRT).",
      "answer": "An ideal gas has negligible volume for its particles and no intermolecular forces of attraction or repulsion. This is approximated at low pressure and high temperature."
    },
    {
      "topic": "Acids and Bases",
      "question": "Differentiate between a Brønsted-Lowry acid and a Lewis acid.",
      "answer": "A Brønsted-Lowry acid is a proton (H+) donor. A Lewis acid is an electron-pair acceptor."
    },
    {
      "topic": "Organic Chemistry",
      "question": "Define isomerism and provide the general criteria that two compounds must meet to be considered isomers.",
      "answer": "Isomerism is the phenomenon where compounds have the same molecular formula but different structural formulas. The two compounds must have the exact same number of each type of atom."
    },
    // --- 5 New Questions ---
    {
      "topic": "Thermodynamics",
      "question": "Explain the meaning of a negative value for the Gibbs Free Energy change (Delta G) in a chemical reaction.",
      "answer": "A negative Delta G indicates that the reaction is spontaneous (favorable) under the given conditions."
    },
    {
      "topic": "Kinetics",
      "question": "What is the effect of a catalyst on the activation energy and the equilibrium constant of a reaction?",
      "answer": "A catalyst lowers the activation energy but has no effect on the equilibrium constant (K or K_eq)."
    },
    {
      "topic": "Electrochemistry",
      "question": "In an electrochemical cell, where does oxidation occur, and what is the sign of this electrode?",
      "answer": "Oxidation occurs at the anode, which is the negative electrode in a galvanic (voltaic) cell."
    },
    {
      "topic": "Quantum Mechanics",
      "question": "What do the four quantum numbers (n, l, m_l, m_s) collectively describe for an electron?",
      "answer": "They completely describe the state and probable location of an electron in an atom (its atomic orbital)."
    },
    {
      "topic": "Solutions",
      "question": "Define colligative properties and name two examples.",
      "answer": "Properties of a solution that depend only on the concentration of solute particles, not their identity. Examples: boiling point elevation, freezing point depression."
    }
  ],
  "Physics": [
    {
      "topic": "Kinematics",
      "question": "Explain the difference between instantaneous velocity and average velocity.",
      "answer": "Instantaneous velocity is the velocity at a specific point in time, while average velocity is the total displacement divided by the total time taken."
    },
    {
      "topic": "Forces and Motion",
      "question": "In the context of Newton's Third Law, why do the action and reaction forces not cancel each other out?",
      "answer": "They do not cancel because they act on two different objects. For forces to cancel, they must be acting on the same object."
    },
    {
      "topic": "Electricity",
      "question": "Describe the relationship between electric field lines and equipotential lines.",
      "answer": "Electric field lines are always perpendicular to equipotential lines, and point in the direction of decreasing electric potential."
    },
    {
      "topic": "Work and Energy",
      "question": "State the Work-Energy Theorem and express it mathematically.",
      "answer": "The Work-Energy Theorem states that the net work done on an object is equal to the change in its kinetic energy, W_net = Delta K or W_net = 1/2*m*v_f^2 - 1/2*m*v_i^2."
    },
    {
      "topic": "Waves",
      "question": "Differentiate between transverse waves and longitudinal waves, giving one example of each.",
      "answer": "In transverse waves (e.g., light), particle oscillation is perpendicular to wave propagation. In longitudinal waves (e.g., sound), oscillation is parallel to propagation."
    },
    // --- 5 New Questions ---
    {
      "topic": "Momentum",
      "question": "What is the Law of Conservation of Momentum, and when does it apply?",
      "answer": "In a closed, isolated system, the total momentum remains constant. It applies when the net external force on the system is zero."
    },
    {
      "topic": "Thermodynamics",
      "question": "State the Second Law of Thermodynamics in terms of entropy.",
      "answer": "The total entropy (disorder) of an isolated system can never decrease over time; it can only increase or remain constant."
    },
    {
      "topic": "Optics",
      "question": "Explain the difference between a real image and a virtual image formed by mirrors or lenses.",
      "answer": "A real image is formed where light rays actually converge and can be projected onto a screen. A virtual image is formed where light rays only appear to diverge from, and cannot be projected."
    },
    {
      "topic": "Quantum Physics",
      "question": "Describe the concept of 'wave-particle duality' as it applies to light and matter.",
      "answer": "Wave-particle duality states that light (photons) and matter (like electrons) exhibit both wave-like and particle-like properties simultaneously."
    },
    {
      "topic": "Fluid Mechanics",
      "question": "State the significance of Pascal's Principle in hydraulic systems.",
      "answer": "Pascal's Principle states that a pressure change at any point in an incompressible fluid is transmitted undiminished to all portions of the fluid and the enclosing walls, allowing for force multiplication."
    }
  ],
  "Mathematics": [
    {
      "topic": "Algebra",
      "question": "Define a function, f: A to B, and state the formal criteria for a relation to be a function.",
      "answer": "A function is a relation between a set of inputs (domain A) and a set of permissible outputs (codomain B), where every input in A has exactly one output in B."
    },
    {
      "topic": "Geometry",
      "question": "State the conditions required for two triangles to be proven congruent using the SSS, SAS, and ASA postulates.",
      "answer": "SSS (Side-Side-Side), SAS (Side-Angle-Side, with the angle being included), and ASA (Angle-Side-Angle, with the side being included)."
    },
    {
      "topic": "Calculus",
      "question": "Explain the geometric interpretation of the definite integral of f(x) dx from a to b.",
      "answer": "The definite integral represents the net signed area between the function f(x) and the x-axis from x=a to x=b."
    },
    {
      "topic": "Statistics",
      "question": "What is the difference between population variance (sigma^2) and sample variance (s^2)?",
      "answer": "Population variance uses N (population size) in the denominator. Sample variance uses n-1 (degrees of freedom) in the denominator to provide an unbiased estimate of the population variance."
    },
    {
      "topic": "Trigonometry",
      "question": "State the Pythagorean Identity in terms of sine and cosine and explain how it relates to the unit circle.",
      "answer": "The identity is sin^2(theta) + cos^2(theta) = 1. On the unit circle, cos(theta) = x and sin(theta) = y, and since x^2 + y^2 = r^2 (with r=1), the identity holds."
    },
    {
      "topic": "Linear Algebra",
      "question": "Define a linear transformation T: V to W and state the two properties it must satisfy.",
      "answer": "A linear transformation is a function between two vector spaces V and W that preserves the operations of vector addition (T(u+v) = T(u) + T(v)) and scalar multiplication (T(c*v) = c*T(v))."
    },
    {
      "topic": "Set Theory",
      "question": "What is a 'power set' of a set A, denoted P(A), and if the number of elements in A is n, what is the number of elements in P(A)?",
      "answer": "The power set is the set of all possible subsets of A, including the empty set and A itself. If the number of elements in A is n, then the number of elements in P(A) is 2^n."
    },
    {
      "topic": "Sequences and Series",
      "question": "State the necessary condition for an infinite geometric series (sum of ar^n) to converge.",
      "answer": "The series converges if and only if the absolute value of the common ratio r is less than one: |r| < 1."
    },
    {
      "topic": "Differential Equations",
      "question": "Explain the difference between an ordinary differential equation (ODE) and a partial differential equation (PDE).",
      "answer": "An ODE involves derivatives with respect to only one independent variable. A PDE involves partial derivatives with respect to two or more independent variables."
    },
    {
      "topic": "Complex Numbers",
      "question": "State De Moivre's Theorem for finding powers of a complex number z = r(cos(theta) + i*sin(theta)).",
      "answer": "De Moivre's Theorem states that for any integer n, z^n = r^n(cos(n*theta) + i*sin(n*theta))."
    }
  ]
};

const startBtn = document.getElementById("start-btn");
const subSelect = document.getElementById("subject-select");

const questionDis = document.getElementById("question");
const topicDis = document.getElementById("chapter")
const answerDis = document.getElementById("answer")

startBtn.onclick = () => {
    subject = subSelect.value
    if(subject == "Select Subject"){
    }
    else{
        const index = Math.floor(Math.random() * 11)
        if(subject == "mathematics"){
            let topic = data.Mathematics[index].topic;
            let question = data.Mathematics[index].question;
            let answer = data.Mathematics[index].answer;

            topicDis.innerText = topic;
            questionDis.innerText = question;
            answerDis.innerText = answer;

        }
        else if(subject == "physics"){
            let topic = data.Physics[index].topic;
            let question = data.Physics[index].question;
            let answer = data.Physics[index].answer;

            topicDis.innerText = topic;
            questionDis.innerText = question;
            answerDis.innerText = answer;
        }
        else if(subject == "chemistry"){
            let topic = data.Chemistry[index].topic;
            let question = data.Chemistry[index].question;
            let answer = data.Chemistry[index].answer;

            topicDis.innerText = topic;
            questionDis.innerText = question;
            answerDis.innerText = answer;
        }
        else{
            topicDis.innerText = "- Chapter -";
            questionDis.innerText = "- Question -";
            answerDis.innerText = "- Answer -";
        }
    }
}