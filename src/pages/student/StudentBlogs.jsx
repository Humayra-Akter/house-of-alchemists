import { useMemo, useState } from "react";
import StudentLayout from "../../layouts/StudentLayout";
import {
  ChatBubbleLeftRightIcon,
  HandThumbUpIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  MagnifyingGlassIcon,
  TagIcon,
  PlusIcon,
  CheckBadgeIcon,
} from "@heroicons/react/24/outline";

/** Mock data (swap with API later) */
const INITIAL_POSTS = [
  {
    id: "p1",
    chapterTitle: "Chapter 3 – Mole Concept",
    title: "How to quickly find limiting reagent?",
    content:
      "Given masses feel tedious—any trick for exam? Example: 10g CaCO3 + 15g HCl.",
    createdBy: { name: "Nusrat", avatar: "" },
    upvotes: 6,
    createdAt: "2025-08-08T12:00:00",
    comments: [
      {
        id: "c1",
        user: { name: "Farhan" },
        text: "Convert to moles, divide by coefficient, smallest wins.",
        upvotes: 4,
        highlighted: true, // admin-marked best answer
        createdAt: "2025-08-08T12:30:00",
        replies: [
          {
            id: "c1r1",
            user: { name: "Aisha" },
            text: "Also watch units—grams ↔ moles is key.",
            upvotes: 2,
            createdAt: "2025-08-08T13:00:00",
          },
        ],
      },
    ],
  },
  {
    id: "p2",
    chapterTitle: "Chapter 5 – Organic Basics",
    title: "Difference between isomers & homologous series?",
    content: "I mix them up—simple definition please.",
    createdBy: { name: "Imran", avatar: "" },
    upvotes: 3,
    createdAt: "2025-08-07T10:00:00",
    comments: [],
  },
];

function timeAgo(iso) {
  const diff = Date.now() - new Date(iso).getTime();
  const s = Math.floor(diff / 1000);
  if (s < 60) return `${s}s ago`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
}

export default function StudentBlogs() {
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [q, setQ] = useState("");
  const [chapterFilter, setChapterFilter] = useState("All");
  const [sort, setSort] = useState("new"); // new | top
  const [expanded, setExpanded] = useState({}); // postId -> bool

  // compose chapter options
  const chapters = useMemo(() => {
    const set = new Set(posts.map((p) => p.chapterTitle));
    return ["All", ...Array.from(set)];
  }, [posts]);

  const filtered = useMemo(() => {
    let data = [...posts];
    const needle = q.trim().toLowerCase();
    if (needle) {
      data = data.filter(
        (p) =>
          p.title.toLowerCase().includes(needle) ||
          p.content.toLowerCase().includes(needle) ||
          p.chapterTitle.toLowerCase().includes(needle)
      );
    }
    if (chapterFilter !== "All") {
      data = data.filter((p) => p.chapterTitle === chapterFilter);
    }
    if (sort === "new") {
      data.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } else if (sort === "top") {
      data.sort((a, b) => b.upvotes - a.upvotes);
    }
    return data;
  }, [posts, q, chapterFilter, sort]);

  // posting a doubt
  const [askOpen, setAskOpen] = useState(false);
  const [ask, setAsk] = useState({
    title: "",
    content: "",
    chapterTitle: "",
  });

  const submitPost = () => {
    if (!ask.title || !ask.content) return;
    const newPost = {
      id: `p${Date.now()}`,
      chapterTitle: ask.chapterTitle || "General",
      title: ask.title,
      content: ask.content,
      createdBy: { name: "You" },
      upvotes: 0,
      createdAt: new Date().toISOString(),
      comments: [],
    };
    setPosts([newPost, ...posts]);
    setAsk({ title: "", content: "", chapterTitle: "" });
    setAskOpen(false);
  };

  const toggleExpand = (postId) =>
    setExpanded((e) => ({ ...e, [postId]: !e[postId] }));

  const upvotePost = (postId) => {
    setPosts((ps) =>
      ps.map((p) => (p.id === postId ? { ...p, upvotes: p.upvotes + 1 } : p))
    );
  };

  const addComment = (postId, text) => {
    if (!text.trim()) return;
    setPosts((ps) =>
      ps.map((p) =>
        p.id === postId
          ? {
              ...p,
              comments: [
                ...p.comments,
                {
                  id: `c${Date.now()}`,
                  user: { name: "You" },
                  text,
                  upvotes: 0,
                  createdAt: new Date().toISOString(),
                  replies: [],
                },
              ],
            }
          : p
      )
    );
  };

  const addReply = (postId, commentId, text) => {
    if (!text.trim()) return;
    setPosts((ps) =>
      ps.map((p) => {
        if (p.id !== postId) return p;
        return {
          ...p,
          comments: p.comments.map((c) =>
            c.id === commentId
              ? {
                  ...c,
                  replies: [
                    ...c.replies,
                    {
                      id: `r${Date.now()}`,
                      user: { name: "You" },
                      text,
                      upvotes: 0,
                      createdAt: new Date().toISOString(),
                    },
                  ],
                }
              : c
          ),
        };
      })
    );
  };

  const upvoteComment = (postId, commentId, replyId) => {
    setPosts((ps) =>
      ps.map((p) => {
        if (p.id !== postId) return p;
        return {
          ...p,
          comments: p.comments.map((c) => {
            if (c.id !== commentId) return c;
            if (!replyId) return { ...c, upvotes: c.upvotes + 1 };
            return {
              ...c,
              replies: c.replies.map((r) =>
                r.id === replyId ? { ...r, upvotes: r.upvotes + 1 } : r
              ),
            };
          }),
        };
      })
    );
  };

  return (
    <StudentLayout>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Blogs & Doubts</h1>
        <p className="text-sm text-gray-600">
          Ask questions, help others, and learn together.
        </p>
      </div>

      {/* Actions / Filters */}
      <div className="bg-white border rounded-xl p-4 shadow-sm mb-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          {/* search */}
          <div className="relative md:w-1/3">
            <MagnifyingGlassIcon className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              className="w-full pl-9 pr-3 py-2 border rounded-lg"
              placeholder="Search doubts, chapters…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>

          {/* chapter filter */}
          <div className="flex items-center gap-2">
            <TagIcon className="w-4 h-4 text-gray-500" />
            <select
              className="p-2 border rounded-lg"
              value={chapterFilter}
              onChange={(e) => setChapterFilter(e.target.value)}
            >
              {chapters.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* sort */}
          <div className="flex items-center gap-2 ml-auto">
            <select
              className="p-2 border rounded-lg"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="new">Newest</option>
              <option value="top">Top (Upvotes)</option>
            </select>

            <button
              className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-primary text-white hover:opacity-90"
              onClick={() => setAskOpen(true)}
            >
              <PlusIcon className="w-4 h-4" />
              Ask a Doubt
            </button>
          </div>
        </div>
      </div>

      {/* Posts */}
      <div className="space-y-4">
        {filtered.map((p) => (
          <PostCard
            key={p.id}
            post={p}
            expanded={!!expanded[p.id]}
            onToggle={() => toggleExpand(p.id)}
            onUpvote={() => upvotePost(p.id)}
            onAddComment={(text) => addComment(p.id, text)}
            onAddReply={(cid, text) => addReply(p.id, cid, text)}
            onUpvoteComment={(cid, rid) => upvoteComment(p.id, cid, rid)}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center text-gray-500 bg-white border rounded-xl p-10">
          No posts match your filters.
        </div>
      )}

      {/* Ask a Doubt Modal */}
      {askOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="flex-1 bg-black/40"
            onClick={() => setAskOpen(false)}
          />
          <div className="w-full max-w-lg h-full ml-auto bg-white shadow-xl border-l p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Ask a Doubt</h3>
              <button
                className="text-sm px-3 py-1 rounded-md border hover:bg-gray-50"
                onClick={() => setAskOpen(false)}
              >
                Close
              </button>
            </div>

            <input
              className="w-full p-2 border rounded"
              placeholder="Title (e.g., Trick for limiting reagent?)"
              value={ask.title}
              onChange={(e) => setAsk({ ...ask, title: e.target.value })}
            />
            <input
              className="w-full p-2 border rounded"
              placeholder="Chapter (optional, e.g., Chapter 3 – Mole Concept)"
              value={ask.chapterTitle}
              onChange={(e) => setAsk({ ...ask, chapterTitle: e.target.value })}
            />
            <textarea
              className="w-full p-2 border rounded min-h-[140px]"
              placeholder="Describe your doubt clearly…"
              value={ask.content}
              onChange={(e) => setAsk({ ...ask, content: e.target.value })}
            />
            <div className="flex items-center justify-end gap-2">
              <button
                className="text-sm px-3 py-2 rounded-md border hover:bg-gray-50"
                onClick={() => setAskOpen(false)}
              >
                Cancel
              </button>
              <button
                className="text-sm px-4 py-2 rounded-md bg-primary text-white hover:opacity-90"
                onClick={submitPost}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      )}
    </StudentLayout>
  );
}

/** ---------- Components ---------- */

function PostCard({
  post,
  expanded,
  onToggle,
  onUpvote,
  onAddComment,
  onAddReply,
  onUpvoteComment,
}) {
  const [commentText, setCommentText] = useState("");
  return (
    <div className="bg-white border rounded-xl p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <span className="px-2 py-0.5 rounded-full bg-cyan-50 text-cyan-700 border border-cyan-100">
              {post.chapterTitle}
            </span>
            <span>{timeAgo(post.createdAt)}</span>
          </div>
          <h3 className="mt-1 font-semibold text-gray-900">{post.title}</h3>
          <p className="text-sm text-gray-800 mt-1">{post.content}</p>
        </div>

        <button
          className="shrink-0 inline-flex items-center gap-1 text-sm px-2 py-1 rounded-md border hover:bg-gray-50"
          onClick={onUpvote}
          title="Upvote"
        >
          <HandThumbUpIcon className="w-4 h-4" />
          {post.upvotes}
        </button>
      </div>

      {/* Comments */}
      <div className="mt-3">
        <button
          className="text-xs text-gray-600 hover:underline inline-flex items-center gap-1"
          onClick={onToggle}
        >
          {expanded ? (
            <>
              <ChevronUpIcon className="w-4 h-4" /> Hide comments
            </>
          ) : (
            <>
              <ChevronDownIcon className="w-4 h-4" /> Show comments (
              {post.comments.length})
            </>
          )}
        </button>

        {expanded && (
          <div className="mt-3 space-y-3">
            {post.comments.length === 0 ? (
              <p className="text-sm text-gray-500">No comments yet.</p>
            ) : (
              post.comments.map((c) => (
                <CommentItem
                  key={c.id}
                  comment={c}
                  onAddReply={(text) => onAddReply(c.id, text)}
                  onUpvote={(rid) => onUpvoteComment(c.id, rid)}
                />
              ))
            )}

            {/* add comment */}
            <div className="flex gap-2">
              <input
                className="flex-1 p-2 border rounded"
                placeholder="Write a comment…"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
              <button
                className="text-sm px-3 py-2 rounded-md bg-primary text-white hover:opacity-90"
                onClick={() => {
                  onAddComment(commentText);
                  setCommentText("");
                }}
              >
                Comment
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function CommentItem({ comment, onAddReply, onUpvote }) {
  const [replyText, setReplyText] = useState("");
  return (
    <div className="border rounded-lg p-3">
      <div className="flex items-start justify-between gap-2">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium text-gray-900">
              {comment.user.name}
            </p>
            {comment.highlighted && (
              <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
                <CheckBadgeIcon className="w-3 h-3" /> Best Answer
              </span>
            )}
            <span className="text-xs text-gray-500">
              {timeAgo(comment.createdAt)}
            </span>
          </div>
          <p className="text-sm text-gray-800">{comment.text}</p>
        </div>
        <button
          className="shrink-0 inline-flex items-center gap-1 text-xs px-2 py-1 rounded-md border hover:bg-gray-50"
          onClick={() => onUpvote()}
          title="Upvote"
        >
          <HandThumbUpIcon className="w-4 h-4" />
          {comment.upvotes}
        </button>
      </div>

      {/* replies */}
      {comment.replies?.length > 0 && (
        <div className="mt-2 ml-4 space-y-2">
          {comment.replies.map((r) => (
            <div key={r.id} className="text-sm p-2 rounded border">
              <div className="flex items-center gap-2">
                <span className="font-medium">{r.user.name}</span>
                <span className="text-xs text-gray-500">
                  {timeAgo(r.createdAt)}
                </span>
              </div>
              <div className="mt-1">{r.text}</div>
              <button
                className="mt-1 inline-flex items-center gap-1 text-xs px-2 py-1 rounded-md border hover:bg-gray-50"
                onClick={() => onUpvote(r.id)}
                title="Upvote"
              >
                <HandThumbUpIcon className="w-4 h-4" /> {r.upvotes}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* add reply */}
      <div className="mt-2 ml-4 flex gap-2">
        <input
          className="flex-1 p-2 border rounded"
          placeholder="Reply…"
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
        />
        <button
          className="text-xs px-3 py-2 rounded-md bg-white border hover:bg-gray-50"
          onClick={() => {
            onAddReply(replyText);
            setReplyText("");
          }}
        >
          Reply
        </button>
      </div>
    </div>
  );
}
