// import { ArrowRight, BookOpen, BrainCircuit, Clock3, Flame, History, Lightbulb, MessageCircleQuestion, Sparkles, Target, TrendingUp, WandSparkles } from 'lucide-react'
// import { Link } from 'react-router-dom'
// import { historyItems } from '../data'
// import { PageIntro, Score, StatCard } from '../components/UI'

// export default function Dashboard() {
//   return (
//     <>
//       <PageIntro eyebrow="Monday, June 22" title="Good morning, Alex 👋" description="Your curiosity is building momentum. Here’s what’s happening in your learning workspace." />
//       <div className="relative mb-6 overflow-hidden rounded-3xl border border-indigo-400/20 bg-gradient-to-br from-blue-600/30 via-indigo-600/25 to-violet-600/20 p-6 sm:p-8">
//         <div className="absolute right-4 top-1/2 hidden -translate-y-1/2 opacity-20 sm:block"><BrainCircuit size={150} /></div>
//         <div className="relative max-w-xl"><span className="mb-4 inline-flex items-center gap-2 text-xs font-semibold text-cyan-300"><Flame size={15} />7 day learning streak</span><h2 className="text-2xl font-bold sm:text-3xl">Every great answer begins with a better question.</h2><p className="mt-3 text-sm leading-6 text-slate-300">Keep your streak alive—explore a concept you’ve been wondering about.</p><Link to="/ask" className="button-primary mt-6 !bg-white !bg-none !text-indigo-700">Ask a question <ArrowRight size={16} /></Link></div>
//       </div>
//       <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
//         <StatCard icon={MessageCircleQuestion} label="Total questions" value="128" detail="+12 this month" />
//         <StatCard icon={BookOpen} label="Topics learned" value="24" detail="+3 this month" color="cyan" />
//         <StatCard icon={Target} label="Similar matches" value="486" detail="94% avg. relevance" color="emerald" />
//         <StatCard icon={TrendingUp} label="Learning progress" value="82%" detail="+8% from May" color="amber" />
//       </div>
//       <div className="mt-6 grid gap-6 xl:grid-cols-[1.5fr_1fr]">
//         <section className="glass rounded-2xl p-5 sm:p-6">
//           <div className="mb-5 flex items-center justify-between"><div><h2 className="font-semibold">Recent activity</h2><p className="mt-1 text-xs text-slate-500">Your latest questions and matches</p></div><Link to="/history" className="text-xs font-semibold text-indigo-400">View all</Link></div>
//           <div className="space-y-2">
//             {historyItems.slice(0, 4).map(item => <Link to={`/question/${item.id}`} key={item.id} className="flex items-center gap-4 rounded-xl border border-transparent p-3 transition hover:border-white/[0.06] hover:bg-white/[0.035]"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-indigo-500/10 text-indigo-300"><Lightbulb size={18} /></span><div className="min-w-0 flex-1"><p className="truncate text-sm font-medium">{item.question}</p><p className="mt-1 text-xs text-slate-500">{item.topic} · {item.date}</p></div><span className="hidden rounded-lg bg-emerald-500/10 px-2 py-1 text-xs font-semibold text-emerald-300 sm:block">{item.score}% match</span></Link>)}
//           </div>
//         </section>
//         <div className="space-y-6">
//           <section className="glass rounded-2xl p-5 sm:p-6"><h2 className="font-semibold">Quick actions</h2><div className="mt-4 grid gap-3"><Link to="/ask" className="group flex items-center gap-4 rounded-xl border border-indigo-400/15 bg-indigo-500/10 p-4 transition hover:bg-indigo-500/15"><span className="grid h-10 w-10 place-items-center rounded-xl bg-indigo-500/20 text-indigo-300"><WandSparkles size={19} /></span><div><p className="text-sm font-semibold">Ask new question</p><p className="text-xs text-slate-500">Find similar concepts</p></div><ArrowRight size={16} className="ml-auto text-slate-600 transition group-hover:translate-x-1 group-hover:text-indigo-300" /></Link><Link to="/history" className="group flex items-center gap-4 rounded-xl border border-white/[0.06] bg-white/[0.03] p-4 transition hover:bg-white/[0.06]"><span className="grid h-10 w-10 place-items-center rounded-xl bg-cyan-500/10 text-cyan-300"><History size={19} /></span><div><p className="text-sm font-semibold">View history</p><p className="text-xs text-slate-500">Revisit past discoveries</p></div><ArrowRight size={16} className="ml-auto text-slate-600 transition group-hover:translate-x-1" /></Link></div></section>
//           <section className="glass rounded-2xl p-5"><div className="mb-4 flex items-center justify-between"><div className="flex items-center gap-2"><Sparkles size={16} className="text-amber-300" /><p className="text-sm font-semibold">Weekly goal</p></div><span className="text-xs text-slate-500">8 / 10</span></div><Score value={80} /><p className="mt-3 text-xs text-slate-500">Two more questions to complete your goal.</p></section>
//         </div>
//       </div>
//     </>
//   )
// }






import {
  ArrowRight,
  BookOpen,
  BrainCircuit,
  Flame,
  History,
  Lightbulb,
  MessageCircleQuestion,
  Sparkles,
  Target,
  TrendingUp,
  WandSparkles
} from "lucide-react";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api";

import {
  PageIntro,
  Score,
  StatCard
} from "../components/UI";

export default function Dashboard() {

  const [stats, setStats] = useState({
    totalQuestions: 0,
    topicsLearned: 0,
    similarMatches: 0,
    progress: 0
  });

  const [recentQuestions, setRecentQuestions] = useState([]);

  useEffect(() => {
    fetchDashboard();
    fetchHistory();
  }, []);

  const fetchDashboard = async () => {
    try {

      const response = await api.get("/dashboard");

      setStats(response.data);

    } catch (error) {
      console.log(error);
    }
  };

  const fetchHistory = async () => {
    try {

      const response = await api.get("/history");

      setRecentQuestions(
        response.data.slice(0, 4)
      );

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <PageIntro
        eyebrow="AI Learning Dashboard"
        title="Welcome Back 👋"
        description="Track your learning journey and explore previously asked questions."
      />

      <div className="relative mb-6 overflow-hidden rounded-3xl border border-indigo-400/20 bg-gradient-to-br from-blue-600/30 via-indigo-600/25 to-violet-600/20 p-6 sm:p-8">

        <div className="absolute right-4 top-1/2 hidden -translate-y-1/2 opacity-20 sm:block">
          <BrainCircuit size={150} />
        </div>

        <div className="relative max-w-xl">

          <span className="mb-4 inline-flex items-center gap-2 text-xs font-semibold text-cyan-300">
            <Flame size={15} />
            AI Powered Learning
          </span>

          <h2 className="text-2xl font-bold sm:text-3xl">
            Every great answer begins with a better question.
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-300">
            Ask questions and discover similar concepts using semantic search.
          </p>

          <Link
            to="/ask"
            className="button-primary mt-6 !bg-white !bg-none !text-indigo-700"
          >
            Ask a Question
            <ArrowRight size={16} />
          </Link>

        </div>

      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

        <StatCard
          icon={MessageCircleQuestion}
          label="Total Questions"
          value={stats.totalQuestions}
          detail="Stored in MongoDB"
        />

        <StatCard
          icon={BookOpen}
          label="Topics Learned"
          value={stats.topicsLearned}
          detail="Unique Subjects"
          color="cyan"
        />

        <StatCard
          icon={Target}
          label="Similar Matches"
          value={stats.similarMatches}
          detail="AI Similarity Results"
          color="emerald"
        />

        <StatCard
          icon={TrendingUp}
          label="Learning Progress"
          value={`${stats.progress}%`}
          detail="Based on activity"
          color="amber"
        />

      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.5fr_1fr]">

        <section className="glass rounded-2xl p-5 sm:p-6">

          <div className="mb-5 flex items-center justify-between">

            <div>
              <h2 className="font-semibold">
                Recent Activity
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Latest searched questions
              </p>
            </div>

            <Link
              to="/history"
              className="text-xs font-semibold text-indigo-400"
            >
              View all
            </Link>

          </div>

          <div className="space-y-2">

            {recentQuestions.length > 0 ? (

              recentQuestions.map((item) => (

                <div
                  key={item.id}
                  className="flex items-center gap-4 rounded-xl border border-transparent p-3 transition hover:border-white/[0.06] hover:bg-white/[0.035]"
                >

                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-indigo-500/10 text-indigo-300">
                    <Lightbulb size={18} />
                  </span>

                  <div className="min-w-0 flex-1">

                    <p className="truncate text-sm font-medium">
                      {item.question}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {item.topic}
                    </p>

                  </div>

                  <span className="hidden rounded-lg bg-emerald-500/10 px-2 py-1 text-xs font-semibold text-emerald-300 sm:block">
                    {item.score}% match
                  </span>

                </div>

              ))

            ) : (

              <p className="text-sm text-slate-500">
                No questions found.
              </p>

            )}

          </div>

        </section>

        <div className="space-y-6">

          <section className="glass rounded-2xl p-5 sm:p-6">

            <h2 className="font-semibold">
              Quick Actions
            </h2>

            <div className="mt-4 grid gap-3">

              <Link
                to="/ask"
                className="group flex items-center gap-4 rounded-xl border border-indigo-400/15 bg-indigo-500/10 p-4 transition hover:bg-indigo-500/15"
              >

                <span className="grid h-10 w-10 place-items-center rounded-xl bg-indigo-500/20 text-indigo-300">
                  <WandSparkles size={19} />
                </span>

                <div>
                  <p className="text-sm font-semibold">
                    Ask New Question
                  </p>

                  <p className="text-xs text-slate-500">
                    Find similar concepts
                  </p>
                </div>

                <ArrowRight
                  size={16}
                  className="ml-auto text-slate-600 transition group-hover:translate-x-1 group-hover:text-indigo-300"
                />

              </Link>

              <Link
                to="/history"
                className="group flex items-center gap-4 rounded-xl border border-white/[0.06] bg-white/[0.03] p-4 transition hover:bg-white/[0.06]"
              >

                <span className="grid h-10 w-10 place-items-center rounded-xl bg-cyan-500/10 text-cyan-300">
                  <History size={19} />
                </span>

                <div>
                  <p className="text-sm font-semibold">
                    View History
                  </p>

                  <p className="text-xs text-slate-500">
                    Revisit old searches
                  </p>
                </div>

                <ArrowRight
                  size={16}
                  className="ml-auto text-slate-600 transition group-hover:translate-x-1"
                />

              </Link>

            </div>

          </section>

          <section className="glass rounded-2xl p-5">

            <div className="mb-4 flex items-center justify-between">

              <div className="flex items-center gap-2">

                <Sparkles
                  size={16}
                  className="text-amber-300"
                />

                <p className="text-sm font-semibold">
                  Learning Progress
                </p>

              </div>

              <span className="text-xs text-slate-500">
                {stats.progress}%
              </span>

            </div>

            <Score value={stats.progress} />

            <p className="mt-3 text-xs text-slate-500">
              Keep asking questions to improve your learning score.
            </p>

          </section>

        </div>

      </div>
    </>
  );
}