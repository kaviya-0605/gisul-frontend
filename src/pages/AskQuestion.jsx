




import { motion } from "framer-motion";
import {
  Eraser,
  Search,
  Sparkles,
  WandSparkles,
} from "lucide-react";

import { useState } from "react";
import api from "../api";

import {
  PageIntro,
  ResultCard,
  Skeleton,
} from "../components/UI";

const examples = [
  "Why does photosynthesis need sunlight?",
  "What causes gravity?",
  "Explain Newton's Third Law.",
];

export default function AskQuestion() {
  const [question, setQuestion] = useState("");

  const [loading, setLoading] = useState(false);

  const [searched, setSearched] = useState(false);

  const [results, setResults] = useState([]);

  const [topic, setTopic] = useState("");

  const search = async () => {
    if (!question.trim()) return;

    try {
      setLoading(true);

      const response = await api.post("/ask", {
        question: question,
      });

      setResults(
        response.data.similarQuestions
      );

      setTopic(
        response.data.topic
      );

      setSearched(true);
    } catch (error) {
      console.log(error);

      alert("Failed to fetch results");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageIntro
        eyebrow="AI question finder"
        title="What are you curious about?"
        description="Ask any study question. We’ll understand its meaning and surface the closest conceptual matches."
      />

      <div className="mx-auto max-w-4xl">

        <section className="glass relative overflow-hidden rounded-3xl p-5 sm:p-7">

          <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />

          <div className="relative">

            <label className="mb-3 flex items-center gap-2 text-sm font-semibold">
              <WandSparkles
                size={17}
                className="text-primary"
              />
              Your study question
            </label>

            <textarea
              value={question}
              onChange={(e) =>
                setQuestion(e.target.value)
              }
              className="input min-h-44 resize-none !p-5 text-base leading-7"
              placeholder="Type your study question here..."
            />

            <div className="mt-3 flex items-center justify-between text-[11px] text-slate-600">
              <span>
                Be specific for stronger matches
              </span>

              <span>
                {question.length} / 500
              </span>
            </div>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">

              <button
                onClick={search}
                className="button-primary flex-1 !py-3.5 disabled:opacity-40"
                disabled={!question.trim() || loading}
              >
                {loading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Analyzing your question...
                  </>
                ) : (
                  <>
                    <Search size={17} />
                    Search similar questions
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  setQuestion("");
                  setResults([]);
                  setTopic("");
                  setSearched(false);
                }}
                className="button-secondary"
              >
                <Eraser size={16} />
                Clear
              </button>

            </div>

          </div>

        </section>

        <div className="mt-5">

          <p className="mb-3 text-xs font-medium text-slate-500">
            Try an example
          </p>

          <div className="flex flex-wrap gap-2">

            {examples.map((x) => (
              <button
                key={x}
                onClick={() => setQuestion(x)}
                className="rounded-full border border-white/[0.07] bg-white/[0.03] px-3 py-2 text-xs text-slate-400 transition hover:border-primary/30 hover:text-primary"
              >
                {x}
              </button>
            ))}

          </div>

        </div>

        <div className="mt-10">

          {loading && (
            <>
              <div className="mb-5 flex items-center gap-3">

                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="grid h-9 w-9 place-items-center rounded-xl bg-primary/10 text-primary"
                >
                  <Sparkles size={17} />
                </motion.span>

                <div>
                  <p className="text-sm font-semibold">
                    Reading between the lines...
                  </p>

                  <p className="text-xs text-slate-500">
                    Understanding concepts, intent,
                    and topic
                  </p>
                </div>

              </div>

              <Skeleton />
            </>
          )}

          {searched && !loading && (

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >

              <div className="mb-5 flex items-end justify-between">

                <div>

                  <h2 className="text-xl font-semibold">
                    Similar questions
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    {results.length} matches found
                  </p>

                </div>

                <span className="rounded-full bg-success/10 px-3 py-1.5 text-xs font-semibold text-success">
                  {topic}
                </span>

              </div>

              <div className="space-y-3">

                {results.map((item, i) => (

                  <ResultCard
                    key={i}
                    index={i}
                    item={{
                      title: item.question,
                      score: item.score,
                    }}
                  />

                ))}

              </div>

            </motion.div>

          )}

          {!loading && !searched && (

            <div className="rounded-2xl border border-dashed border-white/10 py-12 text-center">

              <Sparkles
                className="mx-auto text-slate-700"
                size={26}
              />

              <p className="mt-3 text-sm text-slate-500">
                Your matches will appear here.
              </p>

            </div>

          )}

        </div>

      </div>
    </>
  );
}