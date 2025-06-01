import React, { useState, useEffect } from 'react';
import { Play, BookOpen, Trophy, Star, CheckCircle, XCircle, ArrowRight, RotateCcw, Volume2, Award, Sparkles, Zap } from 'lucide-react';

const EnglishLearningApp = () => {
  const [currentTab, setCurrentTab] = useState('home');
  const [currentSubTab, setCurrentSubTab] = useState('vocabulary');
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationType, setCelebrationType] = useState(''); // 'correct', 'wrong', 'perfect'
  const [userProgress, setUserProgress] = useState({
    passiveVoice: { vocabulary: 0, exercises: 0 },
    relativePronouns: { vocabulary: 0, exercises: 0 },
    listening: { vocabulary: 0, exercises: 0 },
    asIfAsThough: { vocabulary: 0, exercises: 0 },
    supplierEvaluation: { vocabulary: 0, exercises: 0 }
  });

  // Efectos de sonido usando Web Audio API
  const playSound = (type) => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    if (type === 'correct') {
      // Sonido de éxito (Do-Mi-Sol)
      oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
      oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // E5
      oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2); // G5
    } else if (type === 'wrong') {
      // Sonido de error (frecuencia descendente)
      oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 0.3);
    } else if (type === 'perfect') {
      // Fanfarra de celebración
      oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // A4
      oscillator.frequency.setValueAtTime(554.37, audioContext.currentTime + 0.1); // C#5
      oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.2); // E5
      oscillator.frequency.setValueAtTime(880, audioContext.currentTime + 0.3); // A5
    }

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.4);
  };

  // Componente de celebración
  const CelebrationEffect = ({ type, show, onComplete }) => {
    useEffect(() => {
      if (show) {
        const timer = setTimeout(() => {
          onComplete();
        }, 2000);
        return () => clearTimeout(timer);
      }
    }, [show, onComplete]);

    if (!show) return null;

    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
        {type === 'correct' && (
          <div className="animate-bounce-in">
            <div className="bg-green-500 text-white px-8 py-4 rounded-full shadow-2xl flex items-center space-x-3 text-2xl font-bold">
              <CheckCircle className="w-8 h-8" />
              <span>¡Excelente! 🎉</span>
            </div>
          </div>
        )}
        
        {type === 'wrong' && (
          <div className="animate-shake-error">
            <div className="bg-red-500 text-white px-8 py-4 rounded-full shadow-2xl flex items-center space-x-3 text-2xl font-bold">
              <XCircle className="w-8 h-8" />
              <span>¡Sigue intentando! 💪</span>
            </div>
          </div>
        )}
        
        {type === 'perfect' && (
          <>
            <div className="animate-celebration">
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-12 py-6 rounded-full shadow-2xl flex items-center space-x-4 text-3xl font-bold">
                <Sparkles className="w-10 h-10" />
                <span>¡PERFECTO! 🏆</span>
                <Zap className="w-10 h-10" />
              </div>
            </div>
            {/* Confetti */}
            <div className="celebration-confetti">
              {[...Array(50)].map((_, i) => (
                <div
                  key={i}
                  className="confetti-piece"
                  style={{
                    left: Math.random() * 100 + '%',
                    animationDelay: Math.random() * 3 + 's',
                    backgroundColor: ['#f59e0b', '#3b82f6', '#ef4444', '#10b981', '#8b5cf6'][Math.floor(Math.random() * 5)]
                  }}
                />
              ))}
            </div>
          </>
        )}
      </div>
    );
  };

  // Datos del curso organizados por tema
  const courseData = {
    passiveVoice: {
      title: "Passive Voice",
      icon: "📝",
      vocabulary: [
        { term: "Passive Voice", definition: "A grammatical construction where the subject receives the action", example: "The report was written by John." },
        { term: "Impersonal Passive", definition: "Structure using 'It + be + past participle + that clause'", example: "It is believed that the tests are accurate." },
        { term: "Personal Passive", definition: "Structure using 'Subject + passive verb + to-infinitive'", example: "The tests are believed to be accurate." },
        { term: "Past Participle", definition: "The third form of a verb used in passive constructions", example: "written, reported, thought" },
        { term: "Reporting Verbs", definition: "Verbs like believe, think, report, say used in passive voice", example: "It is reported that..." }
      ],
      exercises: [
        {
          question: "Complete: ________ that user flows should be presented with more detail.",
          options: ["It has understood", "It understands", "It is understood", "It understanding"],
          correct: 2,
          explanation: "We use 'It is understood' for impersonal passive with present meaning."
        },
        {
          question: "Complete: Single sign-on functionality ________ to be a standard.",
          options: ["it is considered", "considered", "is considered", "considering"],
          correct: 2,
          explanation: "Personal passive structure: Subject + passive verb + to-infinitive"
        }
      ]
    },
    relativePronouns: {
      title: "Relative Pronouns",
      icon: "🔗",
      vocabulary: [
        { term: "Relative Pronouns", definition: "Words like that, which, who, whom, whose that introduce relative clauses", example: "The test which we ran was successful." },
        { term: "Relative Clause", definition: "A clause that provides additional information about a noun", example: "The team that worked on this project..." },
        { term: "Nominal Relative Clause", definition: "Uses what, when, where, how, who, why to mean 'the thing which'", example: "That's what I meant." },
        { term: "Which", definition: "Used for things in relative clauses", example: "The software which we developed..." },
        { term: "Who/Whom", definition: "Used for people (who=subject, whom=object)", example: "The person who called / to whom I spoke" }
      ],
      exercises: [
        {
          question: "Complete: Talking to customers is ________ they should be doing.",
          options: ["who", "what", "that", "which"],
          correct: 1,
          explanation: "'What' is used in nominal relative clauses meaning 'the thing that'."
        },
        {
          question: "Complete: The feedback ________ we received was positive.",
          options: ["which", "what", "who", "whom"],
          correct: 0,
          explanation: "'Which' is used for things in relative clauses."
        }
      ]
    },
    listening: {
      title: "UX Experience Listening",
      icon: "🎧",
      vocabulary: [
        { term: "Net Promoter Score (NPS)", definition: "A key indicator of customer satisfaction and loyalty", example: "Our NPS improved after the UX changes." },
        { term: "User Experience (UX)", definition: "The personal experience a user has when using a product's interface", example: "Good UX leads to higher conversion rates." },
        { term: "Detractors", definition: "Customers who give negative feedback about a brand", example: "We need to interview the detractors to understand issues." },
        { term: "Mention an issue", definition: "Comment on a problem without giving much detail", example: "They mentioned the login problem briefly." },
        { term: "Invest money", definition: "Use money to earn more money in the future", example: "We should invest in UX improvements." }
      ],
      exercises: [
        {
          question: "What does NPS measure?",
          options: ["Net Product Sales", "Customer satisfaction and loyalty", "Network Performance Score", "New Product Statistics"],
          correct: 1,
          explanation: "NPS (Net Promoter Score) measures customer satisfaction and their loyalty to a company."
        },
        {
          question: "What are detractors?",
          options: ["Happy customers", "Customers with negative experiences", "New customers", "Loyal customers"],
          correct: 1,
          explanation: "Detractors are customers who have had negative experiences and give poor feedback."
        }
      ]
    },
    asIfAsThough: {
      title: "As If / As Though",
      icon: "🤔",
      vocabulary: [
        { term: "As If / As Though", definition: "Conjunctions used for hypothetical situations, often with past simple", example: "You're acting as if you knew everything." },
        { term: "Hypothetical Situation", definition: "A situation that is imagined or not real", example: "If I were rich... (but I'm not)" },
        { term: "Subjunctive Mood", definition: "Using 'were' instead of 'was' for unreal situations", example: "He acts as if he were the boss." },
        { term: "Past Simple in Unreal Situations", definition: "Using past tense to show something is not real", example: "You talk as if you didn't care." },
        { term: "Express Doubt/Frustration", definition: "As if/as though can show you don't believe something", example: "As if that would work!" }
      ],
      exercises: [
        {
          question: "Complete: It ________ we couldn't access the data.",
          options: ["seemed as like", "appeared if", "looked as though", "seems like"],
          correct: 2,
          explanation: "'Looked as though' is the correct structure for expressing how something appeared."
        },
        {
          question: "Is this hypothetical or real? 'They act as if they didn't understand.'",
          options: ["Hypothetical", "Real"],
          correct: 0,
          explanation: "This is hypothetical - they probably DO understand, but they're acting like they don't."
        }
      ]
    },
    supplierEvaluation: {
      title: "Supplier Evaluation",
      icon: "📊",
      vocabulary: [
        { term: "Secondment", definition: "Temporary transfer of an employee to another project/department", example: "We got help through secondments from other teams." },
        { term: "Onboarding", definition: "The process of orienting and training a new employee", example: "Onboarding new contractors takes time." },
        { term: "Go out of business", definition: "When a company stops all operations", example: "They almost went out of business last year." },
        { term: "Mitigate risks", definition: "Reduce the chances of something bad happening", example: "We need to mitigate delivery risks." },
        { term: "Scope creep", definition: "When a project's scope changes beyond original intentions", example: "Luckily, we haven't faced scope creep." },
        { term: "Supply chain", definition: "All businesses involved in creating and delivering a product", example: "The delayed supplier affected our supply chain." }
      ],
      exercises: [
        {
          question: "What is a secondment?",
          options: ["A second deadline", "A backup plan", "Temporary employee transfer", "A contract extension"],
          correct: 2,
          explanation: "A secondment is a temporary transfer of an employee to another project or department."
        },
        {
          question: "What happened to the customer in the reading?",
          options: ["They found new suppliers", "They almost went out of business", "They expanded globally", "They hired more staff"],
          correct: 1,
          explanation: "The customer almost went out of business due to an unreliable supplier."
        }
      ]
    }
  };

const FlashCard = ({ term, definition, example, isFlipped, onFlip }) => (
    <div 
      className="relative w-80 h-48 mx-auto cursor-pointer perspective-1000 hover:scale-105 transition-transform duration-300"
      onClick={onFlip}
    >
      <div className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
        {/* Front */}
        <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg flex items-center justify-center backface-hidden">
          <div className="text-center text-white p-6">
            <h3 className="text-2xl font-bold mb-2">{term}</h3>
            <p className="text-sm opacity-75">Click to see definition</p>
          </div>
        </div>
        {/* Back */}
        <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-green-500 to-teal-600 rounded-xl shadow-lg rotate-y-180 backface-hidden">
          <div className="text-white p-4 h-full flex flex-col justify-center">
            <p className="text-sm mb-3 font-medium">{definition}</p>
            {example && (
              <div className="mt-auto">
                <p className="text-xs opacity-75 mb-1">Example:</p>
                <p className="text-sm italic">"{example}"</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const QuizQuestion = ({ question, options, correct, explanation, onAnswer, userAnswer, showResult }) => (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-2xl mx-auto">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">{question}</h3>
      <div className="space-y-3 mb-4">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => !showResult && onAnswer(index)}
            disabled={showResult}
            className={`w-full p-3 text-left rounded-lg border-2 transition-all duration-300 transform hover:scale-102 ${
              showResult
                ? index === correct
                  ? 'border-green-500 bg-green-50 text-green-700 animate-pulse-success sound-wave'
                  : index === userAnswer && index !== correct
                  ? 'border-red-500 bg-red-50 text-red-700 animate-shake-error'
                  : 'border-gray-200 bg-gray-50'
                : userAnswer === index
                ? 'border-blue-500 bg-blue-50 scale-105'
                : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50 hover:shadow-md'
            }`}
          >
            <div className="flex items-center justify-between">
              <span>{option}</span>
              {showResult && index === correct && <CheckCircle className="w-5 h-5 text-green-500 animate-bounce" />}
              {showResult && index === userAnswer && index !== correct && <XCircle className="w-5 h-5 text-red-500 animate-pulse" />}
            </div>
          </button>
        ))}
      </div>
      {showResult && (
        <div className={`border-l-4 p-4 rounded animate-bounce-in ${
          userAnswer === correct 
            ? 'bg-green-50 border-green-400' 
            : 'bg-blue-50 border-blue-400'
        }`}>
          <p className={`font-medium ${
            userAnswer === correct ? 'text-green-800' : 'text-blue-800'
          }`}>
            {userAnswer === correct ? '🎉 ¡Correcto!' : '💡 Explicación:'}
          </p>
          <p className={userAnswer === correct ? 'text-green-700' : 'text-blue-700'}>
            {explanation}
          </p>
        </div>
      )}
    </div>
  );

  const TopicCard = ({ topic, topicKey, progress }) => (
    <div 
      className="bg-white rounded-xl shadow-lg p-6 cursor-pointer transform hover:scale-105 transition-all duration-300 border-l-4 border-blue-500 hover:shadow-2xl"
      onClick={() => setCurrentTab(topicKey)}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <span className="text-3xl mr-3">{topic.icon}</span>
          <h3 className="text-xl font-semibold text-gray-800">{topic.title}</h3>
        </div>
        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Vocabulary</span>
          <span>{progress.vocabulary}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-blue-500 h-2 rounded-full transition-all duration-500" style={{width: `${progress.vocabulary}%`}}></div>
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>Exercises</span>
          <span>{progress.exercises}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-green-500 h-2 rounded-full transition-all duration-500" style={{width: `${progress.exercises}%`}}></div>
        </div>
      </div>
    </div>
  );

  const HomePage = () => (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-cyan-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 animate-bounce-in">
            🎯 English Grammar Mastery
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Master advanced English grammar with interactive learning
          </p>
          <div className="flex justify-center items-center space-x-8 bg-white rounded-lg p-4 shadow-lg max-w-md mx-auto hover:shadow-xl transition-shadow">
            <div className="text-center">
              <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-1 animate-pulse" />
              <p className="text-2xl font-bold text-gray-800">{score}</p>
              <p className="text-sm text-gray-600">Score</p>
            </div>
            <div className="text-center">
              <Star className="w-8 h-8 text-blue-500 mx-auto mb-1 animate-pulse" />
              <p className="text-2xl font-bold text-gray-800">{streak}</p>
              <p className="text-sm text-gray-600">Streak</p>
            </div>
          </div>
        </div>

        {/* Topics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {Object.entries(courseData).map(([key, topic]) => (
            <TopicCard 
              key={key} 
              topic={topic} 
              topicKey={key} 
              progress={userProgress[key]} 
            />
          ))}
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center">
            <Award className="w-6 h-6 mr-2 text-yellow-500" />
            Your Learning Journey
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
              <BookOpen className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-blue-600">
                {Math.round(Object.values(userProgress).reduce((acc, topic) => acc + topic.vocabulary, 0) / 5)}%
              </p>
              <p className="text-sm text-gray-600">Avg. Vocabulary Progress</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
              <Play className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-green-600">
                {Math.round(Object.values(userProgress).reduce((acc, topic) => acc + topic.exercises, 0) / 5)}%
              </p>
              <p className="text-sm text-gray-600">Avg. Exercise Progress</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
              <Trophy className="w-8 h-8 text-purple-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-purple-600">{score}</p>
              <p className="text-sm text-gray-600">Total Points Earned</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}