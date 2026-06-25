import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Filter,
  Search,
  SlidersHorizontal,
  Trash2,
} from "lucide-react";

import { useEffect, useMemo, useState } from "react";
import api from "../api";
import { PageIntro, Score } from "../components/UI";

export default function HistoryPage() {
  const [historyItems, setHistoryItems] = useState([]);
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState("All topics");
  const [sort, setSort] = useState("Newest first");

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await api.get("/history");

      setHistoryItems(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteItem = async (id) => {
    if (!window.confirm("Are you sure you want to delete this question?")) return;
    try {
      await api.delete(`/history/${id}`);
      setHistoryItems(prev => prev.filter(item => item.id !== id));
    } catch (error) {
      console.log(error);
      alert("Failed to delete the item.");
    }
  };

  const topics = [
    "All topics",
    ...new Set(historyItems.map((item) => item.topic)),
  ];

  const results = useMemo(() => {
    return historyItems
      .filter(
        (item) =>
          (topic === "All topics" ||
            item.topic === topic) &&
          item.question
            .toLowerCase()
            .includes(query.toLowerCase())
      )
      .sort((a, b) => {
        if (sort === "Highest match") {
          return (
            (b.similarQuestions?.[0]?.score || 0) -
            (a.similarQuestions?.[0]?.score || 0)
          );
        }

        return (
          new Date(b.createdAt) -
          new Date(a.createdAt)
        );
      });
  }, [historyItems, query, topic, sort]);

  return (
    <>
      <PageIntro
        eyebrow="Your knowledge trail"
        title="Question history"
        description="Search, filter, and revisit every concept you've explored."
      />

      <section className="glass mb-5 rounded-2xl p-4">
        <div className="grid gap-3 lg:grid-cols-[1fr_auto_auto_auto]">
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
            />
            <input
              value={query}
              onChange={(e) =>
                setQuery(e.target.value)
              }
              className="input !pl-10"
              placeholder="Search your questions..."
            />
          </div>

          <div className="relative">
            <Filter
              size={15}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
            />
            <select
              value={topic}
              onChange={(e) =>
                setTopic(e.target.value)
              }
              className="input min-w-44 appearance-none !pl-10"
            >
              {topics.map((t) => (
                <option
                  className="bg-slate-900"
                  key={t}
                >
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div className="relative">
            <SlidersHorizontal
              size={15}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
            />
            <select
              value={sort}
              onChange={(e) =>
                setSort(e.target.value)
              }
              className="input min-w-40 appearance-none !pl-10"
            >
              <option>Newest first</option>
              <option>Highest match</option>
            </select>
          </div>

          <button className="button-secondary">
            <CalendarDays size={16} />
            History
          </button>
        </div>
      </section>

      <div className="mb-4 flex items-center justify-between">
        <p className="text-xs text-slate-500">
          {results.length} questions found
        </p>

        <button
          onClick={() => {
            setQuery("");
            setTopic("All topics");
          }}
          className="text-xs font-medium text-primary"
        >
          Reset filters
        </button>
      </div>

      <div className="space-y-3">
        {results.map((item, index) => (
          <div
            key={index}
            className="glass glass-hover block rounded-2xl p-5"
          >
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <div className="min-w-0 flex-1">
                <div className="mb-2 flex items-center gap-2">
                  <span className="rounded-md bg-primary/10 px-2 py-1 text-[10px] font-semibold text-primary">
                    {item.topic}
                  </span>

                  <span className="text-[11px] text-slate-600">
                    {new Date(
                      item.createdAt
                    ).toLocaleDateString()}
                  </span>
                </div>

                <h3 className="font-medium leading-6">
                  {item.question}
                </h3>
              </div>

              <div className="flex w-full items-start gap-4 sm:w-auto sm:min-w-44">
                <div className="flex-1">
                  <p className="mb-2 text-[10px] uppercase tracking-wider text-slate-600">
                    Best similarity
                  </p>

                  <Score
                    value={
                      item.similarQuestions?.[0]
                        ?.score || 0
                    }
                  />
                </div>

                <button
                  onClick={() => deleteItem(item.id)}
                  className="mt-1 rounded-lg p-2 text-slate-500 transition hover:bg-red-500/10 hover:text-red-400"
                  title="Delete"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}

        {!results.length && (
          <div className="glass rounded-2xl py-16 text-center">
            <Search className="mx-auto text-slate-700" />
            <p className="mt-4 font-medium">
              No questions found
            </p>
          </div>
        )}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <p className="text-xs text-slate-600">
          Total Questions: {results.length}
        </p>

        <div className="flex gap-2">
          <button className="button-secondary !p-2.5 opacity-40">
            <ChevronLeft size={16} />
          </button>

          <button className="grid h-10 w-10 place-items-center rounded-xl bg-primary text-black text-sm font-semibold">
            1
          </button>

          <button className="button-secondary !p-2.5 opacity-40">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </>
  );
}