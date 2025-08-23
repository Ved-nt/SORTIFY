import React, { useState, useEffect } from "react";
import { mergeSortSnippets } from "../utils/sortingSnippets";
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

const Merge = () => {
  const [array, setArray] = useState([5, 3, 8, 4, 2]);
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);

  // Generate dry run steps
  useEffect(() => {
    const arr = [...array];
    const tempSteps = [];

    function mergeSort(arr, depth = 0) {
      if (arr.length <= 1) return arr;

      const mid = Math.floor(arr.length / 2);
      const left = arr.slice(0, mid);
      const right = arr.slice(mid);

      tempSteps.push({
        arr: [...arr],
        message: `Splitting [${arr.join(", ")}] into [${left.join(
          ", "
        )}] and [${right.join(", ")}]`,
      });

      const sortedLeft = mergeSort(left, depth + 1);
      const sortedRight = mergeSort(right, depth + 1);

      const merged = merge(sortedLeft, sortedRight);
      tempSteps.push({
        arr: [...merged],
        message: `Merging [${sortedLeft.join(", ")}] and [${sortedRight.join(
          ", "
        )}] → [${merged.join(", ")}]`,
      });

      return merged;
    }

    function merge(left, right) {
      let result = [];
      let i = 0,
        j = 0;

      while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
          result.push(left[i++]);
        } else {
          result.push(right[j++]);
        }
      }

      return result.concat(left.slice(i)).concat(right.slice(j));
    }

    mergeSort(arr);

    tempSteps.push({
      arr: arr.sort((a, b) => a - b),
      message: "Array is fully sorted 🎉",
    });

    setSteps(tempSteps);
    setCurrentStep(0);
  }, [array]);

  // Time complexity graph data (O(n log n))
  const chartData = [
    { n: 10, operations: Math.round(10 * Math.log2(10)) },
    { n: 20, operations: Math.round(20 * Math.log2(20)) },
    { n: 30, operations: Math.round(30 * Math.log2(30)) },
    { n: 40, operations: Math.round(40 * Math.log2(40)) },
    { n: 50, operations: Math.round(50 * Math.log2(50)) },
    { n: 100, operations: Math.round(100 * Math.log2(100)) },
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
        Merge Sort
      </motion.h1>

      {/* Algorithm Details */}
      <motion.div
        className="bg-gray-800 rounded-xl shadow-lg p-6 mb-6"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="text-2xl font-semibold mb-3 text-blue-300">
          About Merge Sort
        </h2>
        <p className="mb-3 text-xl text-gray-300">
          Merge Sort is a powerful divide-and-conquer algorithm that recursively splits the array
          into halves, sorts each half, and merges them back in order. Its consistent time complexity 
          of O(n log n) makes it highly efficient, especially for large datasets
        </p>
        <p className="mb-3 text-xl text-gray-300">
          This structured approach ensures consistent performance across all input cases. Its time 
          complexity remains O(n log n), making it suitable for large datasets. Merge Sort is also 
          stable, preserving the relative order of equal elements, and requires additional space for merging operations.
        </p>
        <ul className="list-disc text-xl list-inside text-gray-400">
          <li>
            <b className="text-white">Time Complexity:</b> O(n log n) in all cases
          </li>
          <li>
            <b className="text-white">Space Complexity:</b> O(n) (needs extra array for merging)
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
                  className="px-4 py-2 rounded-lg text-lg font-bold shadow-lg bg-blue-500 text-white"
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
        <CodeDisplay snippets={mergeSortSnippets} />
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
          size <b>(O(n log n))</b>.
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

export default Merge;
