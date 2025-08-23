import React, { useState, useEffect } from "react";
import { oddEvenSortSnippets } from "../utils/sortingSnippets";
import CodeDisplay from "../components/CodeDisplay";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";

const OddAndEven = () => {
  const [array, setArray] = useState([5, 3, 8, 4, 2]);
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);

  // Generate dry run steps
  useEffect(() => {
    const arr = [...array];
    const tempSteps = [];
    let isSorted = false;
    let phase = 0;

    while (!isSorted) {
      isSorted = true;

      // Odd phase (1–2, 3–4 …)
      for (let i = 1; i <= arr.length - 2; i += 2) {
        const a = arr[i];
        const b = arr[i + 1];

        let step = {
          arr: [...arr],
          comparing: [i, i + 1],
          swapped: [],
          message: `Odd phase: comparing ${a} and ${b}`,
        };

        if (arr[i] > arr[i + 1]) {
          [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
          step.swapped = [i, i + 1];
          step.message = `Odd phase: swapping ${a} and ${b}`;
          isSorted = false;
        }
        tempSteps.push(step);
      }

      // Even phase (0–1, 2–3 …)
      for (let i = 0; i <= arr.length - 2; i += 2) {
        const a = arr[i];
        const b = arr[i + 1];

        let step = {
          arr: [...arr],
          comparing: [i, i + 1],
          swapped: [],
          message: `Even phase: comparing ${a} and ${b}`,
        };

        if (arr[i] > arr[i + 1]) {
          [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
          step.swapped = [i, i + 1];
          step.message = `Even phase: swapping ${a} and ${b}`;
          isSorted = false;
        }
        tempSteps.push(step);
      }

      phase++;
      if (phase > arr.length * 2) break; // safety stop
    }

    tempSteps.push({
      arr: [...arr],
      comparing: [],
      swapped: [],
      message: "Array is fully sorted 🎉",
    });

    setSteps(tempSteps);
    setCurrentStep(0);
  }, [array]);

  // Time complexity graph data (O(n²))
  const chartData = [
    { n: 10, operations: 100 },
    { n: 20, operations: 400 },
    { n: 30, operations: 900 },
    { n: 40, operations: 1600 },
    { n: 50, operations: 2500 },
    { n: 100, operations: 10000 },
  ];

  return (
    <div className="p-8 mt-10 min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100">
      {/* Page Title */}
      <motion.h1
        className="text-4xl font-extrabold mb-8 text-center text-blue-400 drop-shadow-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Odd-Even Sort
      </motion.h1>

      {/* Algorithm Details */}
      <motion.div
        className="bg-gray-800 rounded-xl shadow-lg p-6 mb-6"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="text-2xl font-semibold mb-3 text-blue-300">
          About Odd-Even Sort
        </h2>
        <p className="mb-3 text-xl text-gray-300">
          Odd-Even Sort, also known as Brick Sort, is a variation of Bubble Sort 
          designed to work in two alternating phases. In the odd phase, it compares 
          and swaps adjacent elements at odd indices (1–2, 3–4, etc.), while in the 
          even phase, it does the same for even indices (0–1, 2–3, etc.).
        </p>
        <p className="mb-3 text-xl text-gray-300">
          This process repeats until the array is fully sorted. Though its worst-case 
          time complexity is O(n²) like Bubble Sort, it can be parallelized efficiently, 
          making it useful in parallel computing environments. It is an in-place, stable sorting 
          algorithm with a best-case time complexity of O(n) when the array is already sorted.
        </p>
        <ul className="list-disc text-xl list-inside text-gray-400">
          <li>
            <b className="text-white">Time Complexity:</b> O(n²) in worst/average, O(n) best case
          </li>
          <li>
            <b className="text-white">Space Complexity:</b> O(1) (in-place)
          </li>
          <li>
            <b className="text-white">Stable:</b> Yes
          </li>
        </ul>
      </motion.div>

      {/* Dry Run Visualization */}
      <motion.div
        className="bg-gray-800 rounded-xl shadow-lg p-6 mb-6"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <h2 className="text-2xl font-semibold mb-4 text-blue-300">
          Dry Run Visualization
        </h2>
        {steps.length > 0 && (
          <div className="mb-4">
            <p className="mb-3 text-xl text-gray-300">
              {steps[currentStep].message}
            </p>
            <div className="flex space-x-2 mb-4 justify-center">
              {steps[currentStep].arr.map((num, idx) => (
                <motion.div
                  key={idx}
                  className={`px-4 py-2 rounded-lg text-lg font-bold shadow-lg ${
                    steps[currentStep].comparing?.includes(idx)
                      ? "bg-yellow-400 text-gray-900"
                      : steps[currentStep].swapped?.includes(idx)
                      ? "bg-red-500 text-white"
                      : "bg-blue-500 text-white"
                  }`}
                  layout
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {num}
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Controls */}
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 0))}
            className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition"
            disabled={currentStep === 0}
          >
            Prev
          </button>
          <button
            onClick={() =>
              setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
            }
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition disabled:opacity-50"
            disabled={currentStep === steps.length - 1}
          >
            Next
          </button>
        </div>
        <p className="mt-2 text-gray-400 text-center">
          Step {currentStep + 1} of {steps.length}
        </p>
      </motion.div>

      {/* Code Snippets */}
      <motion.div
        className="bg-gray-800 rounded-xl shadow-lg p-6 mb-6"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
      >
        <h2 className="text-2xl font-semibold mb-3 text-blue-300">
          Implementations
        </h2>
        <CodeDisplay snippets={oddEvenSortSnippets} />
      </motion.div>

      {/* Time Complexity Graph */}
      <motion.div
        className="bg-gray-800 rounded-xl shadow-lg p-6 mt-10"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
      >
        <h2 className="text-2xl font-semibold mb-4 text-blue-300">
          Time Complexity Graph
        </h2>
        <p className="text-gray-400 text-xl mb-4">
          The graph below shows how the number of operations grows with input
          size <b>(O(n²))</b>.
        </p>
        <div className="w-full h-80">
          <ResponsiveContainer>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis
                dataKey="n"
                stroke="#aaa"
                label={{
                  value: "Input Size (n)",
                  position: "insideBottom",
                  offset: -5,
                  fill: "#ccc",
                }}
              />
              <YAxis
                stroke="#aaa"
                label={{
                  value: "Operations",
                  angle: -90,
                  position: "insideLeft",
                  fill: "#ccc",
                }}
              />
              <Tooltip
                contentStyle={{ backgroundColor: "#1f2937", color: "#fff" }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="operations"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ r: 4, fill: "#60a5fa" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
};

export default OddAndEven;
