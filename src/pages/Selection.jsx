import React, { useState, useEffect } from "react";
import { selectionSortSnippets } from "../utils/sortingSnippets";
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

const Selection = () => {
  const [array, setArray] = useState([5, 3, 8, 4, 2]);
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);

  // Generate dry run steps
  useEffect(() => {
    const arr = [...array];
    const tempSteps = [];
    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {
      let minIndex = i;

      tempSteps.push({
        arr: [...arr],
        minIndex,
        comparing: [],
        swapped: [],
        message: `Starting pass ${i + 1}, assuming index ${i} (${arr[i]}) is the minimum.`,
      });

      for (let j = i + 1; j < n; j++) {
        tempSteps.push({
          arr: [...arr],
          minIndex,
          comparing: [j],
          swapped: [],
          message: `Comparing ${arr[j]} with current minimum ${arr[minIndex]}.`,
        });

        if (arr[j] < arr[minIndex]) {
          minIndex = j;
          tempSteps.push({
            arr: [...arr],
            minIndex,
            comparing: [],
            swapped: [],
            message: `New minimum found: ${arr[minIndex]} at index ${minIndex}.`,
          });
        }
      }

      if (minIndex !== i) {
        [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        tempSteps.push({
          arr: [...arr],
          minIndex,
          comparing: [],
          swapped: [i, minIndex],
          message: `Swapping ${arr[minIndex]} and ${arr[i]}.`,
        });
      } else {
        tempSteps.push({
          arr: [...arr],
          minIndex,
          comparing: [],
          swapped: [],
          message: `No swap needed, ${arr[i]} is already the smallest.`,
        });
      }
    }

    tempSteps.push({
      arr: [...arr],
      minIndex: null,
      comparing: [],
      swapped: [],
      message: "Array is fully sorted 🎉",
    });

    setSteps(tempSteps);
    setCurrentStep(0);
  }, [array]);

  // Time complexity graph data (O(n²))
  const chartData = [
    { n: 10, operations: 10 * 10 },
    { n: 20, operations: 20 * 20 },
    { n: 30, operations: 30 * 30 },
    { n: 40, operations: 40 * 40 },
    { n: 50, operations: 50 * 50 },
    { n: 100, operations: 100 * 100 },
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
        Selection Sort
      </motion.h1>

      {/* Algorithm Details */}
      <motion.div
        className="bg-gray-800 rounded-xl shadow-lg p-6 mb-6"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="text-2xl font-semibold mb-3 text-blue-300">
          About Selection Sort
        </h2>
        <p className="mb-3 text-xl text-gray-300">
          Selection Sort is a simple comparison-based sorting algorithm 
          that divides the array into a sorted and unsorted part. In each pass, 
          it selects the smallest element from the unsorted portion and swaps 
          it with the first unsorted element, gradually growing the sorted section from left to right.
        </p>
        <p className="mb-3 text-xl text-gray-300">
          It performs consistently with a time complexity of O(n²) in all cases, 
          making it inefficient for large datasets. The algorithm is not stable, 
          meaning it may change the relative order of equal elements, but it is in-place, 
          requiring no extra memory beyond the input array.
        </p>
        <ul className="list-disc text-xl list-inside text-gray-400">
          <li>
            <b className="text-white">Time Complexity:</b> O(n²) in all cases
          </li>
          <li>
            <b className="text-white">Space Complexity:</b> O(1) (in-place)
          </li>
          <li>
            <b className="text-white">Stable:</b> No
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
              {steps[currentStep].arr.map((num, idx) => {
                let classes = "px-4 py-2 rounded-lg text-lg font-bold shadow-lg ";

                if (steps[currentStep].swapped?.includes(idx)) {
                  classes += "bg-red-500 text-white";
                } else if (steps[currentStep].comparing?.includes(idx)) {
                  classes += "bg-yellow-400 text-gray-900";
                } else if (steps[currentStep].minIndex === idx) {
                  classes += "bg-purple-500 text-white";
                } else {
                  classes += "bg-blue-500 text-white";
                }

                return (
                  <motion.div
                    key={idx}
                    className={classes}
                    layout
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    {num}
                  </motion.div>
                );
              })}
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
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 transition disabled:opacity-50"
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
        <CodeDisplay snippets={selectionSortSnippets} />
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

export default Selection;
