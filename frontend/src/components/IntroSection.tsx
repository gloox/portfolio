import React, { useEffect, useState } from 'react';
import { Personal } from '@/types';
import { Text } from "@/components/basic/Text";
import { Section } from "@/components/basic/Section";
import { Button } from "@/components/basic/Button";
import { Typewriter } from "@/components/basic/TypeWriterAnimation";
import PopIn from "@/components/basic/PopIn";
import Cookies from 'js-cookie';
import {ThemeGenerator} from "@/components/basic/ThemeGenerator";

interface IntroSectionProps {
    personal: Personal;
}

const IntroSection: React.FC<IntroSectionProps> = ({ personal }) => {
    // Stage 1: Initial, Stage 2: After Refresh
    const [stage, setStage] = useState<1 | 2>(1);

    useEffect(() => {
        // Check if the user has already performed the refresh task
        const hasRefreshed = Cookies.get('task_completed');
        if (hasRefreshed) {
            setStage(2);
        }
    }, []);

    const handleRefresh = () => {
        // Set cookie before reloading
        Cookies.set('task_completed', 'true', { expires: 1 }); // Expires in 1 day
        window.location.reload();
    };

    const handleSkip = () => {
        Cookies.set('task_completed', 'true', { expires: 7 });
        setStage(2);
    };

    return (
        <Section className="ps-52 pt-52 min-h-[100vh]" id="home">
            <div className="w-full">
                {stage === 1 ? (
                    <>
                        <Text variant="h1">
                            <Typewriter text={`Hi, this is ${personal.firstName}'s portfolioLM`} />
                        </Text>

                        <Text variant="h3" className="mt-4">
                            <Typewriter text="Try refreshing the page..." delay={1} />
                        </Text>

                        <div className="flex mt-2" style={{ gap: '1rem' }}>
                            <PopIn delay={1.3} style={{ display: 'inline-block' }}>
                                <Button variant="primary" onClick={handleRefresh}>
                                    Refresh
                                </Button>
                            </PopIn>
                            <PopIn delay={1.4} style={{ display: 'inline-block' }}>
                                <Button variant="secondary" onClick={handleSkip}>
                                    Skip Intro
                                </Button>
                            </PopIn>
                        </div>
                    </>
                ) : (
                    <PopIn>
                        <Text variant="h2" className="max-w-2xl">
                            <Typewriter
                                text="You have successfully completed your assigned task. You have unlocked this awesome text box. You may have noticed, it looks a little different. Type what you want this website to look like and portfolioLM will do the rest."
                            />
                        </Text>

                        {/* The AI Input Box */}
                        <PopIn delay={2} className="mt-8">
                            <div className="relative max-w-xl group">
                                <ThemeGenerator></ThemeGenerator>
                            </div>
                        </PopIn>
                    </PopIn>
                )}
            </div>
        </Section>
    );
};

export default IntroSection;