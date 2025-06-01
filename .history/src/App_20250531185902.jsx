import React, { useState, useEffect } from 'react';
import { Play, BookOpen, Trophy, Star, CheckCircle, XCircle, ArrowRight, RotateCcw, Volume2, Award } from 'lucide-react';

const EnglishLearningApp = () => {
  const [currentTab, setCurrentTab] = useState('home');
  const [currentSubTab, setCurrentSubTab] = useState('vocabulary');
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [userProgress, setUserProgress] = useState({
    passiveVoice: { vocabulary: 0, exercises: 0 },
    relativePronouns: { vocabulary: 0, exercises: 0 },
    listening: { vocabulary: 0, exercises: 0 },
    asIfAsThough: { vocabulary: 0, exercises: 0 },
    supplierEvaluation: { vocabulary: 0, exercises: 0 }
  });

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
      className="relative w-80 h-48 mx-auto cursor-pointer perspective-1000"
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
            className={`w-full p-3 text-left rounded-lg border-2 transition-all ${
              showResult
                ? index === correct
                  ? 'border-green-500 bg-green-50 text-green-700'
                  : index === userAnswer && index !== correct
                  ? 'border-red-500 bg-red-50 text-red-700'
                  : 'border-gray-200 bg-gray-50'
                : userAnswer === index
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
            }`}
          >
            <div className="flex items-center justify-between">
              <span>{option}</span>
              {showResult && index === correct && <CheckCircle className="w-5 h-5 text-green-500" />}
              {showResult && index === userAnswer && index !== correct && <XCircle className="w-5 h-5 text-red-500" />}
            </div>
          </button>
        ))}
      </div>
      {showResult && (
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
          <p className="text-blue-800 font-medium">Explanation:</p>
          <p className="text-blue-700">{explanation}</p>
        </div>
      )}
    </div>
  );

  const TopicCard = ({ topic, topicKey, progress }) => (
    <div 
      className="bg-white rounded-xl shadow-lg p-6 cursor-pointer transform hover:scale-105 transition-all duration-300 border-l-4 border-blue-500"
      onClick={() => setCurrentTab(topicKey)}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <span className="text-3xl mr-3">{topic.icon}</span>
          <h3 className="text-xl font-semibold text-gray-800">{topic.title}</h3>
        </div>
        <ArrowRight className="w-5 h-5 text-gray-400" />
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Vocabulary</span>
          <span>{progress.vocabulary}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-blue-500 h-2 rounded-full" style={{width: `${progress.vocabulary}%`}}></div>
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>Exercises</span>
          <span>{progress.exercises}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-green-500 h-2 rounded-full" style={{width: `${progress.exercises}%`}}></div>
        </div>
      </div>
    </div>
  );

  const HomePage = () => (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-cyan-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            🎯 English Grammar Mastery
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Master advanced English grammar with interactive learning
          </p>
          <div className="flex justify-center items-center space-x-8 bg-white rounded-lg p-4 shadow-lg max-w-md mx-auto">
            <div className="text-center">
              <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-1" />
              <p className="text-2xl font-bold text-gray-800">{score}</p>
              <p className="text-sm text-gray-600">Score</p>
            </div>
            <div className="text-center">
              <Star className="w-8 h-8 text-blue-500 mx-auto mb-1" />
              <p className="text-2xl font-bold text-gray-800">{streak}</p>
              <p className="text-sm text-gray-600">Streak</p>
            </div>
          </div>
        </div>

        {/* Topics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
        <div className="mt-12 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center">
            <Award className="w-6 h-6 mr-2 text-yellow-500" />
            Your Learning Journey
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <BookOpen className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-blue-600">
                {Object.values(userProgress).reduce((acc, topic) => acc + topic.vocabulary, 0) / 5}%
              </p>
              <p className="text-sm text-gray-600">Avg. Vocabulary Progress</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <Play className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-green-600">
                {Object.values(userProgress).reduce((acc, topic) => acc + topic.exercises, 0) / 5}%
              </p>
              <p className="text-sm text-gray-600">Avg. Exercise Progress</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <Trophy className="w-8 h-8 text-purple-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-purple-600">{score}</p>
              <p className="text-sm text-gray-600">Total Points Earned</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const TopicInterface = ({ topicKey }) => {
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswer, setUserAnswer] = useState(null);
    const [showResult, setShowResult] = useState(false);
    const [quizScore, setQuizScore] = useState(0);

    const topic = courseData[topicKey];
    
    const handleCardFlip = () => {
      setIsFlipped(!isFlipped);
    };

    const nextCard = () => {
      if (currentCardIndex < topic.vocabulary.length - 1) {
        setCurrentCardIndex(currentCardIndex + 1);
        setIsFlipped(false);
      }
    };

    const prevCard = () => {
      if (currentCardIndex > 0) {
        setCurrentCardIndex(currentCardIndex - 1);
        setIsFlipped(false);
      }
    };

    const handleAnswer = (answerIndex) => {
      setUserAnswer(answerIndex);
      setShowResult(true);
      
      if (answerIndex === topic.exercises[currentQuestionIndex].correct) {
        setQuizScore(quizScore + 10);
        setScore(score + 10);
        setStreak(streak + 1);
      }
    };

    const nextQuestion = () => {
      if (currentQuestionIndex < topic.exercises.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setUserAnswer(null);
        setShowResult(false);
      }
    };

    const resetQuiz = () => {
      setCurrentQuestionIndex(0);
      setUserAnswer(null);
      setShowResult(false);
      setQuizScore(0);
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-cyan-100">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => setCurrentTab('home')}
              className="flex items-center text-blue-600 hover:text-blue-800 font-medium"
            >
              ← Back to Home
            </button>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center">
              <span className="mr-3">{topic.icon}</span>
              {topic.title}
            </h1>
            <div></div>
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-8">
            <div className="bg-white rounded-lg p-1 shadow-lg">
              <button
                onClick={() => setCurrentSubTab('vocabulary')}
                className={`px-6 py-2 rounded-md font-medium transition-all ${
                  currentSubTab === 'vocabulary'
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-600 hover:text-blue-500'
                }`}
              >
                📚 Vocabulary Cards
              </button>
              <button
                onClick={() => setCurrentSubTab('exercises')}
                className={`px-6 py-2 rounded-md font-medium transition-all ${
                  currentSubTab === 'exercises'
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-600 hover:text-blue-500'
                }`}
              >
                🎯 Practice Quiz
              </button>
            </div>
          </div>

          {/* Content */}
          {currentSubTab === 'vocabulary' && (
            <div className="space-y-8">
              <div className="text-center mb-6">
                <p className="text-lg text-gray-600">
                  Card {currentCardIndex + 1} of {topic.vocabulary.length}
                </p>
              </div>
              
              <FlashCard
                term={topic.vocabulary[currentCardIndex].term}
                definition={topic.vocabulary[currentCardIndex].definition}
                example={topic.vocabulary[currentCardIndex].example}
                isFlipped={isFlipped}
                onFlip={handleCardFlip}
              />

              <div className="flex justify-center space-x-4">
                <button
                  onClick={prevCard}
                  disabled={currentCardIndex === 0}
                  className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <button
                  onClick={() => setIsFlipped(!isFlipped)}
                  className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Flip Card
                </button>
                <button
                  onClick={nextCard}
                  disabled={currentCardIndex === topic.vocabulary.length - 1}
                  className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {currentSubTab === 'exercises' && (
            <div className="space-y-8">
              <div className="text-center mb-6">
                <p className="text-lg text-gray-600">
                  Question {currentQuestionIndex + 1} of {topic.exercises.length}
                </p>
                <p className="text-sm text-blue-600 font-medium">
                  Quiz Score: {quizScore} points
                </p>
              </div>

              <QuizQuestion
                question={topic.exercises[currentQuestionIndex].question}
                options={topic.exercises[currentQuestionIndex].options}
                correct={topic.exercises[currentQuestionIndex].correct}
                explanation={topic.exercises[currentQuestionIndex].explanation}
                onAnswer={handleAnswer}
                userAnswer={userAnswer}
                showResult={showResult}
              />

              <div className="flex justify-center space-x-4">
                {showResult && currentQuestionIndex < topic.exercises.length - 1 && (
                  <button
                    onClick={nextQuestion}
                    className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    Next Question
                  </button>
                )}
                {showResult && currentQuestionIndex === topic.exercises.length - 1 && (
                  <button
                    onClick={resetQuiz}
                    className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                  >
                    Restart Quiz
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="app">
      <style jsx>{`
        .perspective-1000 { perspective: 1000px; }
        .transform-style-preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>
      
      {currentTab === 'home' ? (
        <HomePage />
      ) : (
        <TopicInterface topicKey={currentTab} />
      )}
    </div>
  );
};

export default EnglishLearningApp;