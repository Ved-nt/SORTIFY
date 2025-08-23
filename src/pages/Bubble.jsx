// src/pages/Bubble.jsx
import React, { useState, useEffect } from "react";
import CodeDisplay from "../components/CodeDisplay";
import { bubbleSortSnippets } from "../utils/sortingSnippets";
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

const Bubble = () => {
  const [array, setArray] = useState([5, 3, 8, 4, 2]);
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);

  // Generate dry run steps with correct messages
  useEffect(() => {
    const arr = [...array];
    const tempSteps = [];
    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        const a = arr[j];
        const b = arr[j + 1];

        let step = {
          arr: [...arr],
          comparing: [j, j + 1],
          swapped: [],
          message: `Comparing ${a} and ${b}`,
        };

        if (a > b) {
          [arr[j], arr[j + 1]] = [b, a];
          step.swapped = [j, j + 1];
          step.message = `Since ${a} > ${b}, swapping them.`;
        } else {
          step.message = `Since ${a} ≤ ${b}, no swap needed.`;
        }

        tempSteps.push(step);
      }
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

  // Time complexity graph data
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
        Bubble Sort
      </motion.h1>

      {/* Algorithm Details */}
      <motion.div
        className="bg-gray-800 rounded-xl shadow-lg p-6 mb-6"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="text-2xl font-semibold mb-3 text-blue-300">
          About Bubble Sort
        </h2>
        <p className="mb-3 text-xl text-gray-300">
          Bubble Sort is a simple comparison-based algorithm. It repeatedly steps through the list, 
          compares adjacent elements, and swaps them if they are in the wrong order. The pass through
          the list is repeated until the list is sorted.
          <p className="mb-3 text-xl text-gray-300">
            Although easy to implement, Bubble Sort is inefficient for large datasets due to its quadratic
            time complexity. It performs multiple passes even when the array is nearly sorted, unless optimized
            with an early exit condition. Despite its limitations, it's often used for educational purposes to 
            illustrate basic sorting logic and algorithmic thinking.
          </p>
        </p>
        <ul className="list-disc text-xl list-inside text-gray-400">
          <li>
            <b className="text-white">Time Complexity:</b> O(n²) in worst and average case
          </li>
          <li>
            <b className="text-white">Best Case:</b> O(n) when the array is already sorted
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
            <p className="mb-3 text-xl text-gray-300">{steps[currentStep].message}</p>
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
        <CodeDisplay snippets={bubbleSortSnippets} />
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
              <Tooltip contentStyle={{ backgroundColor: "#1f2937", color: "#fff" }} />
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

export default Bubble;
