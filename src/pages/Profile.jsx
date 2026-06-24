import {
  CalendarDays,
  Camera,
  KeyRound,
  LogOut,
  Mail,
  Pencil,
  Save,
} from "lucide-react";

import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { PageIntro, Score } from "../components/UI";

const tipStyle = {
  background: "#111827",
  border: "1px solid rgba(255,255,255,.1)",
  borderRadius: 12,
  fontSize: 12,
};

export default function Profile() {
  const [editing, setEditing] = useState(false);

  const [profileData, setProfileData] = useState({
    totalQuestions: 0,
    topics: {},
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(
        "http://127.0.0.1:8000/profile"
      );

      setProfileData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const topicData = Object.entries(
    profileData.topics
  ).map(([name, value], index) => ({
    name,
    value,
    color: [
      "#2563EB", // Primary
      "#7C3AED", // Secondary
      "#06B6D4", // Accent
      "#22C55E", // Success
      "#F59E0B", // Warning
    ][index % 5],
  }));

  const monthlyData = [
    {
      month: "Current",
      questions: profileData.totalQuestions,
    },
  ];

  return (
    <>
      <PageIntro
        eyebrow="Personal workspace"
        title="Profile & Progress"
        description="Manage your account and see your learning analytics."
        action={
          <button
            onClick={() => setEditing(!editing)}
            className="button-secondary"
          >
            {editing ? (
              <Save size={16} />
            ) : (
              <Pencil size={16} />
            )}

            {editing
              ? "Save Changes"
              : "Edit Profile"}
          </button>
        }
      />

      <section className="glass mb-6 rounded-3xl p-6 sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
          <div className="relative">
            <div className="grid h-24 w-24 place-items-center rounded-3xl bg-gradient-to-br from-accent to-primary text-2xl font-bold">
              AK
            </div>

            <button className="absolute -bottom-2 -right-2 grid h-8 w-8 place-items-center rounded-xl border border-white/10 bg-slate-800">
              <Camera size={14} />
            </button>
          </div>

          <div className="flex-1">
            <h2 className="text-2xl font-bold">
              StudySync User
            </h2>

            <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-500">
              <span className="flex items-center gap-2">
                <Mail size={14} />
                student@example.com
              </span>

              <span className="flex items-center gap-2">
                <CalendarDays size={14} />
                Total Questions:
                {profileData.totalQuestions}
              </span>
            </div>
          </div>

          <button className="button-secondary">
            <KeyRound size={16} />
            Change Password
          </button>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">

        <section className="glass rounded-2xl p-5 sm:p-6">
          <h3 className="font-semibold">
            Questions Asked
          </h3>

          <div className="h-72">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <AreaChart data={monthlyData}>
                <CartesianGrid
                  stroke="rgba(255,255,255,.05)"
                  vertical={false}
                />

                <XAxis dataKey="month" />

                <YAxis />

                <Tooltip contentStyle={tipStyle} />

                <Area
                  type="monotone"
                  dataKey="questions"
                  stroke="#2563EB"
                  fill="#2563EB"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="glass rounded-2xl p-5 sm:p-6">
          <h3 className="font-semibold">
            Topic Distribution
          </h3>

          <div className="h-52">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <PieChart>
                <Pie
                  data={topicData}
                  dataKey="value"
                  innerRadius={55}
                  outerRadius={80}
                >
                  {topicData.map((item) => (
                    <Cell
                      key={item.name}
                      fill={item.color}
                    />
                  ))}
                </Pie>

                <Tooltip contentStyle={tipStyle} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {topicData.map((item) => (
              <div
                key={item.name}
                className="flex items-center gap-2 text-xs"
              >
                <span
                  className="h-2 w-2 rounded-full"
                  style={{
                    background: item.color,
                  }}
                />

                {item.name}

                <span className="ml-auto">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="glass mt-6 rounded-2xl p-5 sm:p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-semibold">
            Learning Progress
          </h3>

          <span className="text-2xl font-bold text-success">
            {Math.min(
              profileData.totalQuestions * 10,
              100
            )}
            %
          </span>
        </div>

        <Score
          value={Math.min(
            profileData.totalQuestions * 10,
            100
          )}
        />
      </section>

      <div className="mt-6 flex justify-end">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-red-400"
        >
          <LogOut size={16} />
          Log out
        </Link>
      </div>
    </>
  );
}