"use client";
import Link from "next/link";
import { Github, Sparkles, Languages, Code2 } from "lucide-react";

export default function About() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 min-h-screen">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-400 bg-clip-text text-transparent">
          About DPT
        </h1>
        <p className="text-lg text-muted-foreground">
          AI-Powered Text Processing Made Simple
        </p>
      </div>

      <div className="space-y-6 ">
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-purple-500" />
            Project Overview
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            DPT is an AI-powered text processing platform that helps you
            transform and analyze text content effortlessly. Built with
            cutting-edge language models, it enables quick summarization,
            translation, and language detection.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <Languages className="h-6 w-6 text-blue-500" />
            Key Features
          </h2>
          <ul className="grid md:grid-cols-2 gap-4">
            {[
              "Multi-language Translation",
              "Text Summarization",
              "Language Detection",
              "Real-time Processing",
            ].map((feature) => (
              <li
                key={feature}
                className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg"
              >
                <Code2 className="h-4 w-4 text-green-500" />
                {feature}
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <Github className="h-6 w-6" />
            Open Source
          </h2>
          <p className="text-muted-foreground">
            DPT is a stage 3 project made by Davidson in HNG and it is opened
            for contribution!
          </p>
          <Link
            href="https://github.com/Davidson3556/AI-Text-processor"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary hover:underline"
          >
            <Github className="h-5 w-5" />
            View on GitHub
          </Link>
        </section>
      </div>
    </div>
  );
}
