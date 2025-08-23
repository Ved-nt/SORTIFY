import React, { useState, useEffect } from "react";
import { heapSortSnippets } from "../utils/sortingSnippets";
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

const Heap = () => {
  const [array, setArray] = useState([5, 3, 8, 4, 2]);
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
  const arr = [...array];
  const tempSteps = [];

  function heapify(arr, n, i) {
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;

    if (left < n && arr[left] > arr[largest]) largest = left;
    if (right < n && arr[right] > arr[largest]) largest = right;

    if (largest !== i) {
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      tempSteps.push({
        arr: [...arr],
        message: `Swapped ${arr[largest]} with ${arr[i]} to maintain heap property`,
      });
      heapify(arr, n, largest);
    }
  }

  function heapSort(arr) {
    let n = arr.length;

    // 🔹 Step 1: Initial Array
    tempSteps.push({
      arr: [...arr],
      message: `Starting Heap Sort on array: [${arr.join(", ")}]`,
    });

    // 🔹 Step 2: Build max heap
    tempSteps.push({
      arr: [...arr],
      message: "Building max heap from array...",
    });

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      heapify(arr, n, i);
    }

    tempSteps.push({
      arr: [...arr],
      message: `Max heap built: [${arr.join(", ")}]`,
    });

    // 🔹 Step 3: Extraction phase
    for (let i = n - 1; i > 0; i--) {
      [arr[0], arr[i]] = [arr[i], arr[0]];
      tempSteps.push({
        arr: [...arr],
        message: `Swapped root (${arr[i]}) with last element → [${arr.join(", ")}], heapify remaining part`,
      });
      heapify(arr, i, 0);
    }
  }

  heapSort(arr);

  // 🔹 Step 4: Sorted array
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
        Heap Sort
      </motion.h1>

      {/* Algorithm Details */}
      <motion.div
        className="bg-gray-800 rounded-xl shadow-lg p-6 mb-6"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="text-2xl font-semibold mb-3 text-blue-300">
          About Heap Sort
        </h2>
        <p className="mb-3 text-xl text-gray-300">
          Heap Sort is a comparison-based algorithm that uses a binary heap 
          data structure. It first builds a max heap and then repeatedly 
          extracts the largest element from the heap to build the sorted array.
        </p>
        <p className="mb-3 text-xl text-gray-300">
          Heap Sort runs in O(n log n) time in all cases, making it reliable 
          for large datasets. However, it is not stable because equal elements 
          may be reordered during heap operations.
        </p>
        <ul className="list-disc text-xl list-inside text-gray-400">
          <li>
            <b className="text-white">Time Complexity:</b> O(n log n) in all cases
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
        <CodeDisplay snippets={heapSortSnippets} />
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

export default Heap;
