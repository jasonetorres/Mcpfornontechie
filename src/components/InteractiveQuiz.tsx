import React, { useState } from 'react'
import { CheckCircle, X, RotateCcw, ArrowRight, Lightbulb } from 'lucide-react'

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

  const handleAnswerSelect = (answerIndex: number) => {
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
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowResult(false)
      setShowHint(false)
    } else {
      setQuizCompleted(true)
      onComplete?.(score)
    }
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
    setAnswers([])
    setShowHint(false)
    setQuizCompleted(false)
  }

  const currentQ = questions[currentQuestion]
  const isCorrect = selectedAnswer === currentQ?.correctAnswer

  if (quizCompleted) {
    const percentage = Math.round((score / questions.length) * 100)
    const passed = percentage >= 70

    return (
      <div className="bg-card/50 backdrop-blur-md border border-border rounded-xl p-8 text-center">
        <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 ${
          passed ? 'bg-green-500' : 'bg-orange-500'
        }`}>
          {passed ? (
            <CheckCircle className="w-8 h-8 text-white" />
          ) : (
            <RotateCcw className="w-8 h-8 text-white" />
          )}
        </div>
        
        <h3 className="text-2xl font-bold text-foreground mb-2">
          {passed ? 'Congratulations!' : 'Keep Learning!'}
        </h3>
        
        <p className="text-muted-foreground mb-6">
          You scored {score} out of {questions.length} ({percentage}%)
        </p>

        <div className="bg-muted/50 rounded-lg p-4 mb-6">
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

        <div className="flex space-x-4 justify-center">
          <button
            onClick={resetQuiz}
            className="border border-border text-foreground px-6 py-2 rounded-lg font-medium hover:bg-muted transition-colors duration-200"
          >
            Try Again
          </button>
          {passed && (
            <button className="bg-gradient-to-r from-matrix-primary to-matrix-secondary text-primary-foreground px-6 py-2 rounded-lg font-medium">
              Continue Learning
            </button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-card/50 backdrop-blur-md border border-border rounded-xl p-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-foreground">{title}</h3>
        <div className="text-muted-foreground text-sm">
          {currentQuestion + 1} of {questions.length}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-muted rounded-full h-2 mb-8">
        <div 
          className="bg-gradient-to-r from-matrix-primary to-matrix-secondary h-2 rounded-full transition-all duration-300"
          style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
        ></div>
      </div>

      {/* Question */}
      <div className="mb-8">
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
          </button>
          
          {showHint && (
            <div className="mt-3 bg-matrix-primary/20 border border-matrix-primary/30 rounded-lg p-3">
              <p className="text-matrix-primary text-sm">{currentQ.hint}</p>
            </div>
          )}
        </div>
      )}

      {/* Explanation */}
      {showResult && (
        <div className={`mb-6 p-4 rounded-lg border ${
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
      <div className="flex justify-between">
        <div className="text-muted-foreground text-sm">
          Score: {score}/{questions.length}
        </div>
        
        {showResult && (
          <button
            onClick={handleNext}
            className="bg-gradient-to-r from-matrix-primary to-matrix-secondary text-primary-foreground px-6 py-2 rounded-lg font-medium flex items-center space-x-2 transition-all duration-200"
          >
            <span>{currentQuestion < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  )
}