import { useState, useEffect } from "react";

const workoutDays = [
  {
    name: "Chest + Biceps",
    exercises: [
      "Bench Press",
      "Incline DB Press",
      "Cable Flys",
      "EZ Bar Curl",
      "Incline DB Curl",
      "Cable Curl",
    ],
  },
  {
    name: "Back + Triceps",
    exercises: [
      "Lat Pulldown",
      "Seated Cable Row",
      "Chest-Supported DB Row",
      "Face Pulls",
      "Dips / Close-Grip Bench",
      "Rope Pushdown",
      "Overhead Extension",
    ],
  },
  {
    name: "Legs + Shoulders",
    exercises: [
      "Squat / Hack Squat",
      "Leg Press",
      "Romanian Deadlift",
      "DB Shoulder Press",
      "Lateral Raises",
      "Rear Delt Fly",
      "Calf Raises",
    ],
  },
];

export default function App() {
  const [dayIndex, setDayIndex] = useState(0);
  const [log, setLog] = useState({});

  useEffect(() => {
    const saved = localStorage.getItem("chris_training_log");
    if (saved) setLog(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("chris_training_log", JSON.stringify(log));
  }, [log]);

  function updateSet(dayName, exercise, setNum, field, value) {
    setLog((prev) => ({
      ...prev,
      [dayName]: {
        ...(prev[dayName] || {}),
        [exercise]: {
          ...(prev[dayName]?.[exercise] || {}),
          [setNum]: {
            ...(prev[dayName]?.[exercise]?.[setNum] || {}),
            [field]: value,
          },
        },
      },
    }));
  }

  const currentDay = workoutDays[dayIndex];

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Chris' Training Tracker
      </h1>

      <div className="flex justify-between items-center mb-4">
        <button
          className="px-3 py-1 bg-gray-200 rounded-xl"
          onClick={() =>
            setDayIndex((dayIndex + workoutDays.length - 1) % workoutDays.length)
          }
        >
          ◀
        </button>
        <h2 className="text-xl font-semibold text-center">
          {currentDay.name}
        </h2>
        <button
          className="px-3 py-1 bg-gray-200 rounded-xl"
          onClick={() => setDayIndex((dayIndex + 1) % workoutDays.length)}
        >
          ▶
        </button>
      </div>

      {currentDay.exercises.map((ex) => (
        <div key={ex} className="mb-6 p-3 border rounded-2xl shadow-sm">
          <h3 className="font-bold mb-2">{ex}</h3>
          {[1, 2, 3].map((setNum) => (
            <div key={setNum} className="flex gap-2 mb-2 items-center">
              <span className="w-12 text-sm">Set {setNum}</span>
              <input
                type="number"
                placeholder="kg"
                className="border p-1 rounded w-20 text-sm"
                value={
                  log[currentDay.name]?.[ex]?.[setNum]?.weight ?? ""
                }
                onChange={(e) =>
                  updateSet(
                    currentDay.name,
                    ex,
                    setNum,
                    "weight",
                    e.target.value
                  )
                }
              />
              <input
                type="number"
                placeholder="reps"
                className="border p-1 rounded w-20 text-sm"
                value={log[currentDay.name]?.[ex]?.[setNum]?.reps ?? ""}
                onChange={(e) =>
                  updateSet(
                    currentDay.name,
                    ex,
                    setNum,
                    "reps",
                    e.target.value
                  )
                }
              />
            </div>
          ))}
        </div>
      ))}

      <p className="text-xs text-gray-500 mt-4">
        Tip: each session, just beat one number from last time – 1 more rep or a
        bit more weight.
      </p>
    </div>
  );
}
