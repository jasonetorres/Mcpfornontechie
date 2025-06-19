import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, X, CheckCircle, Clock, Users, Star, Download } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useXP } from '../hooks/useXP';

interface GuideViewerProps {
  guide: {
    id: number;
    title: string;
    content: string;
    readTime: string;
    category: string;
    difficulty: string;
  };
  onClose: () => void;
}

export default function GuideViewer({ guide, onClose }: GuideViewerProps) {
  const { user, addNotification } = useAuth();
  const { addXP } = useXP();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [slides, setSlides] = useState<string[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Parse the markdown content into slides
  useEffect(() => {
    if (guide?.content) {
      // Split content by h2 headers (## ) to create slides
      const content = guide.content;
      const slideRegex = /^## (.*$)/gm;
      const slideMatches = [...content.matchAll(slideRegex)];
      
      if (slideMatches.length > 0) {
        const parsedSlides: string[] = [];
        
        // Add title slide
        const titleContent = content.substring(0, slideMatches[0].index).trim();
        parsedSlides.push(titleContent);
        
        // Add content slides
        for (let i = 0; i < slideMatches.length; i++) {
          const startIndex = slideMatches[i].index;
          const endIndex = i < slideMatches.length - 1 ? slideMatches[i + 1].index : content.length;
          const slideContent = content.substring(startIndex, endIndex).trim();
          parsedSlides.push(slideContent);
        }
        
        setSlides(parsedSlides);
      } else {
        // If no ## headers, just use the whole content as one slide
        setSlides([content]);
      }
    }
  }, [guide]);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentSlide(currentSlide + 1);
        setIsAnimating(false);
      }, 300);
    } else if (!completed && user) {
      markAsCompleted();
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentSlide(currentSlide - 1);
        setIsAnimating(false);
      }, 300);
    }
  };

  const markAsCompleted = async () => {
    if (!user) return;
    
    setCompleted(true);
    
    // Save completion to localStorage
    const completedGuides = JSON.parse(localStorage.getItem(`completed-guides-${user.id}`) || '[]');
    if (!completedGuides.includes(guide.id)) {
      completedGuides.push(guide.id);
      localStorage.setItem(`completed-guides-${user.id}`, JSON.stringify(completedGuides));
      
      // Award XP
      const xpAmount = 50;
      const leveledUp = await addXP(xpAmount, 'lesson_completed', `Completed guide: ${guide.title}`);
      
      // Show notification
      addNotification({
        id: `guide-completed-${guide.id}`,
        message: `Guide completed! You earned ${xpAmount} XP`,
        type: 'success',
        duration: 5000
      });
    }
  };

  // Check if guide is already completed
  useEffect(() => {
    if (user) {
      const completedGuides = JSON.parse(localStorage.getItem(`completed-guides-${user.id}`) || '[]');
      if (completedGuides.includes(guide.id)) {
        setCompleted(true);
      }
    }
  }, [user, guide.id]);

  // Format markdown for display
  const formatMarkdown = (markdown: string) => {
    // Replace headers
    let formatted = markdown
      .replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold text-foreground mb-4">$1</h1>')
      .replace(/^## (.*$)/gm, '<h2 class="text-xl font-semibold text-foreground mb-3">$1</h2>')
      .replace(/^### (.*$)/gm, '<h3 class="text-lg font-semibold text-foreground mb-2">$1</h3>')
      .replace(/^#### (.*$)/gm, '<h4 class="font-semibold text-foreground mb-2">$1</h4>');
    
    // Replace bold and italic
    formatted = formatted
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    // Replace lists
    formatted = formatted
      .replace(/^- (.*$)/gm, '<li class="flex items-start space-x-2 mb-1"><div class="w-1.5 h-1.5 bg-matrix-primary rounded-full mt-2 flex-shrink-0"></div><span>$1</span></li>')
      .replace(/<\/li>\n<li/g, '</li><li');
    
    formatted = formatted
      .replace(/^([0-9]+)\. (.*$)/gm, '<li class="flex items-start space-x-2 mb-1"><div class="w-5 h-5 bg-matrix-primary/20 rounded-full flex items-center justify-center text-xs text-matrix-primary mr-2">$1</div><span>$2</span></li>')
      .replace(/<\/li>\n<li/g, '</li><li');
    
    // Wrap lists
    formatted = formatted
      .replace(/(<li.*<\/li>)+/g, '<ul class="space-y-2 my-4">$&</ul>');
    
    // Replace tables
    formatted = formatted.replace(/\|(.+)\|/g, (match) => {
      const cells = match.split('|').filter(cell => cell.trim() !== '');
      const isHeader = cells.some(cell => cell.includes('---'));
      
      if (isHeader) return match; // Skip separator rows
      
      const cellsHtml = cells.map(cell => `<td class="p-2 border border-border">${cell.trim()}</td>`).join('');
      return `<tr>${cellsHtml}</tr>`;
    });
    
    // Wrap tables
    formatted = formatted.replace(/(<tr>.*<\/tr>)+/g, '<table class="w-full border-collapse my-4 border border-border">$&</table>');
    
    // Replace paragraphs (must come after lists)
    formatted = formatted
      .replace(/^(?!<[ht])(.+)$/gm, '<p class="text-muted-foreground mb-4">$1</p>')
      .replace(/<p class="text-muted-foreground mb-4"><\/p>/g, '');
    
    // Replace code blocks
    formatted = formatted
      .replace(/```(.*?)\n([\s\S]*?)```/g, '<pre class="bg-muted/50 p-4 rounded-lg overflow-x-auto my-4"><code>$2</code></pre>');
    
    // Replace inline code
    formatted = formatted
      .replace(/`(.*?)`/g, '<code class="bg-muted px-1 py-0.5 rounded text-matrix-primary">$1</code>');
    
    // Replace links
    formatted = formatted
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-matrix-primary hover:text-matrix-secondary">$1</a>');
    
    // Replace blockquotes
    formatted = formatted
      .replace(/^> (.*$)/gm, '<blockquote class="border-l-4 border-matrix-primary/50 pl-4 py-1 text-muted-foreground italic my-4">$1</blockquote>');
    
    return formatted;
  };

  const progress = ((currentSlide + 1) / slides.length) * 100;
  
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-border flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">{guide.title}</h2>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{guide.readTime}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4" />
                <span>Beginner friendly</span>
              </div>
              {completed && (
                <div className="flex items-center space-x-1 text-green-400">
                  <CheckCircle className="w-4 h-4" />
                  <span>Completed</span>
                </div>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1 bg-muted">
          <div 
            className="h-full bg-matrix-primary transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div 
            className={`transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}
            dangerouslySetInnerHTML={{ __html: formatMarkdown(slides[currentSlide] || '') }}
          />
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border flex justify-between items-center">
          <div className="text-sm text-muted-foreground">
            Slide {currentSlide + 1} of {slides.length}
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2 ${
                currentSlide === 0
                  ? 'bg-muted/50 text-muted-foreground cursor-not-allowed'
                  : 'bg-muted text-foreground hover:bg-muted/80'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>
            
            {currentSlide < slides.length - 1 ? (
              <button
                onClick={nextSlide}
                className="bg-gradient-to-r from-matrix-primary to-matrix-secondary hover:from-matrix-accent hover:to-matrix-primary text-primary-foreground px-6 py-2 rounded-lg font-semibold transition-all duration-200 flex items-center space-x-2"
              >
                <span>Next</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={completed ? onClose : markAsCompleted}
                className={`px-6 py-2 rounded-lg font-semibold transition-all duration-200 flex items-center space-x-2 ${
                  completed
                    ? 'bg-muted text-foreground hover:bg-muted/80'
                    : 'bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white'
                }`}
              >
                {completed ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    <span>Close</span>
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    <span>Mark as Completed</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}