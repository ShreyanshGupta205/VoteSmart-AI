"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { m, AnimatePresence } from "framer-motion";

type Post = {
  id: string;
  author: string;
  question: string;
  answer?: string;
  likes: number;
  tags: string[];
};

const INITIAL_POSTS: Post[] = [
  {
    id: "1",
    author: "Citizen_XYZ",
    question: "I recently moved to a new state. Can I vote here?",
    answer: "Yes, but you need to register as a new voter in your current constituency using Form 6 and surrender your old voter ID. You cannot be registered in two places.",
    likes: 42,
    tags: ["Eligibility", "Relocation"],
  },
  {
    id: "2",
    author: "FirstTimeVoter23",
    question: "Are mobile phones allowed inside the voting booth?",
    answer: "No, mobile phones, cameras, or any recording devices are strictly prohibited inside the polling booth to maintain the secrecy of the ballot.",
    likes: 18,
    tags: ["Polling Booth", "Rules"],
  },
];

export default function CommunityPage() {
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [newQuestion, setNewQuestion] = useState("");

  const handlePostQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion.trim()) return;

    const newPost: Post = {
      id: Date.now().toString(),
      author: "Anonymous_User",
      question: newQuestion,
      likes: 0,
      tags: ["General"],
    };

    setPosts([newPost, ...posts]);
    setNewQuestion("");
  };

  const handleLike = (id: string) => {
    setPosts(posts.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p));
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 lg:p-8 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold font-display text-brand-700">Community Q&A</h1>
        <p className="text-muted-foreground mt-2">A safe, moderated space to ask questions and learn from the community.</p>
      </div>

      <Card className="bg-brand-50 border-brand-200">
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold mb-3">Ask a Question</h2>
          <form onSubmit={handlePostQuestion} className="flex gap-3">
            <Input 
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              placeholder="What do you want to know about voting?"
              className="flex-grow bg-white"
            />
            <Button type="submit">Post</Button>
          </form>
          <p className="text-xs text-muted-foreground mt-2">Note: All posts are reviewed for political neutrality.</p>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h2 className="text-xl font-bold font-display">Recent Questions</h2>
        <AnimatePresence>
          {posts.map((post) => (
            <m.div key={post.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <Card className="overflow-hidden hover:shadow-md transition-shadow">
                <CardHeader className="pb-2 bg-muted/30">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-base font-semibold">{post.question}</CardTitle>
                      <p className="text-xs text-muted-foreground mt-1">Asked by {post.author}</p>
                    </div>
                    <div className="flex gap-1">
                      {post.tags.map(tag => (
                        <span key={tag} className="text-[10px] uppercase font-bold tracking-wider bg-brand-100 text-brand-700 px-2 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  {post.answer ? (
                    <div className="bg-green-50 border-l-4 border-green-500 p-3 rounded-r-md text-sm text-green-900">
                      <span className="font-bold">Verified Answer:</span> {post.answer}
                    </div>
                  ) : (
                    <div className="text-sm text-muted-foreground italic">
                      Pending review/answer from moderators.
                    </div>
                  )}
                  <div className="mt-4 flex justify-between items-center">
                    <Button variant="ghost" size="sm" onClick={() => handleLike(post.id)} className="text-muted-foreground hover:text-brand-600">
                      👍 Helpful ({post.likes})
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </m.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
