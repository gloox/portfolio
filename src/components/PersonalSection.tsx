import React from "react";
import { Section } from "./basic/Section";
import { Text } from "./basic/Text";
import { Book, Heart } from "lucide-react";
import {SectionTitle} from "@/components/basic/SectionTitle";
import {Card} from "@/components/basic/Card";
import {Bubble} from "@/components/basic/Bubble";

interface PersonalSectionProps {
  interests: {
    books: string[];
    hobbies: string[];
  };
}

export const PersonalSection = ({ interests }: PersonalSectionProps) => {
  return (
    <Section id="personal" className="py-12">
      <SectionTitle>Things I like</SectionTitle>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Books */}
        <Card>
          <div className="flex items-center gap-2 mb-4">
            <Book className="w-5 h-5 text-(--ai-primary)" />
            <Text variant="h3">Books I Love</Text>
          </div>
          <ul className="space-y-2">
            {interests.books.map((book, i) => (
              <li key={i} className="text-(--ai-text)/80 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-(--ai-primary)/40" />
                {book}
              </li>
            ))}
          </ul>
        </Card>

        {/* Hobbies */}
        <Card>
          <div className="flex items-center gap-2 mb-4">
            <Heart className="w-5 h-5 text-(--ai-primary)" />
            <Text variant="h3">Hobbies & Interests</Text>
          </div>
          <div className="flex flex-wrap gap-2">
            {interests.hobbies.map((hobby, i) => (

              <Bubble
                key={i}
                className="text-sm"
              >
                {hobby}
              </Bubble>
            ))}
          </div>
        </Card>
      </div>
    </Section>
  );
};
