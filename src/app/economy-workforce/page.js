"use client";
import { useRouter } from "next/navigation";

export default function EconomyWorkforce() {
  const router = useRouter();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Economy & Workforce</h1>
      <p className="text-gray-700 dark:text-gray-300">
        Income and Earnings, Labor Force and Employment, Business and Economic Data, Consumer Spending and Poverty
      </p>
    </div>
  );
}