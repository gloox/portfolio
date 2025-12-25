import React from "react";
import { Section } from "./basic/Section";
import { Text } from "./basic/Text";
import { Book, Heart } from "lucide-react";

interface PersonalSectionProps {
  interests: {
    books: string[];
    hobbies: string[];
  };
}

export const PersonalSection = ({ interests }: PersonalSectionProps) => {
  return (
    <Section id="personal" className="py-12">
      <div className="mb-12">
        <Text variant="h2" className="text-[var(--ai-primary)] mb-2">
          Things I like
        </Text>
        <div className="h-1 w-20 bg-[var(--ai-text)]/20 rounded-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Books */}
        <div className="p-6 rounded-[var(--ai-radius)] bg-[var(--ai-surface)] border border-[var(--ai-text)]/10">
          <div className="flex items-center gap-2 mb-4">
            <Book className="w-5 h-5 text-[var(--ai-primary)]" />
            <Text variant="h3">Books I Love</Text>
          </div>
          <ul className="space-y-2">
            {interests.books.map((book, i) => (
              <li key={i} className="text-[var(--ai-text)]/80 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--ai-primary)]/40" />
                {book}
              </li>
            ))}
          </ul>
        </div>

        {/* Hobbies */}
        <div className="p-6 rounded-[var(--ai-radius)] bg-[var(--ai-surface)] border border-[var(--ai-text)]/10">
          <div className="flex items-center gap-2 mb-4">
            <Heart className="w-5 h-5 text-[var(--ai-primary)]" />
            <Text variant="h3">Hobbies & Interests</Text>
          </div>
          <div className="flex flex-wrap gap-2">
            {interests.hobbies.map((hobby, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-full bg-[var(--ai-primary)]/10 text-[var(--ai-primary)] text-sm border border-[var(--ai-primary)]/20"
              >
                {hobby}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};
