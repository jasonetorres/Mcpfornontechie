import React, { useState } from 'react'
import { CheckCircle, X, RotateCcw, ArrowRight, Lightbulb, ChevronRight } from 'lucide-react'

interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  hint?: string
}

interface InteractiveQuizProps {
  questions: QuizQuestion[]
  title: string
  onComplete?: (score: number) => void
}

export default function InteractiveQuiz({ questions, title, onComplete }: InteractiveQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [showHint, setShowHint] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return; // Prevent selecting after showing result
    
    setSelectedAnswer(answerIndex)
    setShowResult(true)
    
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = answerIndex
    setAnswers(newAnswers)

    if (answerIndex === questions[currentQuestion].correctAnswer) {
      setScore(score + 1)
    }
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer(null)
        setShowResult(false)
        setShowHint(false)
        setIsAnimating(false)
      }, 300)
    } else {
      setQuizCompleted(true)
      onComplete?.(score)
    }
  }

  const resetQuiz = () => {
    setIsAnimating(true)
    setTimeout(() => {
      setCurrentQuestion(0)
      setSelectedAnswer(null)
      setShowResult(false)
      setScore(0)
      setAnswers([])
      setShowHint(false)
      setQuizCompleted(false)
      setIsAnimating(false)
    }, 300)
  }

  const currentQ = questions[currentQuestion]
  const isCorrect = selectedAnswer === currentQ?.correctAnswer

  if (quizCompleted) {
    const percentage = Math.round((score / questions.length) * 100)
    const passed = percentage >= 70

    return (
      <div className="glass p-6 sm:p-8 text-center animate-fade-in">
        <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 ${
          passed ? 'bg-green-500' : 'bg-orange-500'
        }`}>
          {passed ? (
            <CheckCircle className="w-8 h-8 text-white" />
          ) : (
            <RotateCcw className="w-8 h-8 text-white" />
          )}
        </div>
        
        <h3 className="heading-md mb-2">
          {passed ? 'Congratulations!' : 'Keep Learning!'}
        </h3>
        
        <p className="text-muted-foreground mb-6">
          You scored {score} out of {questions.length} ({percentage}%)
        </p>

        <div className="glass-strong p-4 mb-6">
          <div className="text-foreground font-medium mb-2">Your Results:</div>
          <div className="space-y-2">
            {questions.map((q, index) => (
              <div key={q.id} className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Question {index + 1}</span>
                <div className="flex items-center space-x-1">
                  {answers[index] === q.correctAnswer ? (
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  ) : (
                    <X className="w-4 h-4 text-red-400" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 justify-center">
          <button
            onClick={resetQuiz}
            className="btn-secondary"
          >
            Try Again
          </button>
          {passed && (
            <button className="btn-primary">
              Continue Learning
            </button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="glass p-6 sm:p-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="heading-sm">{title}</h3>
        <div className="text-muted-foreground text-sm">
          {currentQuestion + 1} of {questions.length}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="progress-bar mb-8">
        <div 
          className="progress-fill"
          style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
        ></div>
      </div>

      {/* Question */}
      <div className={`mb-8 transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
        <h4 className="text-lg font-semibold text-foreground mb-6">{currentQ?.question}</h4>
        
        <div className="space-y-3">
          {currentQ?.options.map((option, index) => (
            <button
              key={index}
              onClick={() => !showResult && handleAnswerSelect(index)}
              disabled={showResult}
              className={`w-full text-left p-4 rounded-lg border transition-all duration-200 ${
                showResult
                  ? index === currentQ.correctAnswer
                    ? 'bg-green-500/20 border-green-500 text-green-300'
                    : index === selectedAnswer && index !== currentQ.correctAnswer
                    ? 'bg-red-500/20 border-red-500 text-red-300'
                    : 'bg-muted/50 border-border text-muted-foreground'
                  : selectedAnswer === index
                  ? 'bg-matrix-primary/20 border-matrix-primary text-matrix-primary'
                  : 'bg-muted/50 border-border text-foreground hover:bg-muted hover:border-matrix-primary/50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold ${
                  showResult && index === currentQ.correctAnswer
                    ? 'border-green-500 bg-green-500 text-white'
                    : showResult && index === selectedAnswer && index !== currentQ.correctAnswer
                    ? 'border-red-500 bg-red-500 text-white'
                    : 'border-current'
                }`}>
                  {String.fromCharCode(65 + index)}
                </div>
                <span>{option}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Hint */}
      {currentQ?.hint && !showResult && (
        <div className="mb-6">
          <button
            onClick={() => setShowHint(!showHint)}
            className="flex items-center space-x-2 text-matrix-primary hover:text-matrix-secondary transition-colors duration-200"
          >
            <Lightbulb className="w-4 h-4" />
            <span className="text-sm">Need a hint?</span>
            <ChevronRight className={`w-4 h-4 transition-transform duration-200 ${showHint ? 'rotate-90' : ''}`} />
          </button>
          
          {showHint && (
            <div className="mt-3 text-matrix-primary text-sm p-3 animate-fade-in">
              <p>{currentQ.hint}</p>
            </div>
          )}
        </div>
      )}

      {/* Explanation */}
      {showResult && (
        <div className={`mb-6 p-4 rounded-lg border animate-fade-in ${
          isCorrect 
            ? 'bg-green-500/20 border-green-500/30' 
            : 'bg-red-500/20 border-red-500/30'
        }`}>
          <div className="flex items-center space-x-2 mb-2">
            {isCorrect ? (
              <CheckCircle className="w-5 h-5 text-green-400" />
            ) : (
              <X className="w-5 h-5 text-red-400" />
            )}
            <span className={`font-medium ${isCorrect ? 'text-green-300' : 'text-red-300'}`}>
              {isCorrect ? 'Correct!' : 'Not quite right'}
            </span>
          </div>
          <p className={`text-sm ${isCorrect ? 'text-green-200' : 'text-red-200'}`}>
            {currentQ?.explanation}
          </p>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <div className="text-muted-foreground text-sm">
          Score: {score}/{questions.length}
        </div>
        
        {showResult && (
          <button
            onClick={handleNext}
            className="btn-primary"
          >
            <span>{currentQuestion < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        )}
      </div>
    </div>
  )
}