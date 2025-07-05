import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { 
  Sparkles, 
  RotateCcw, 
  Palette, 
  Type,
  Zap,
  Heart,
  Star,
  Sun,
  Moon,
  Coffee,
  Smile
} from "lucide-react";

type TextStyle = {
  id: string;
  name: string;
  className: string;
  icon: React.ReactNode;
};

type ColorTheme = {
  id: string;
  name: string;
  gradient: string;
  textColor: string;
  accent: string;
};

const textStyles: TextStyle[] = [
  {
    id: "elegant",
    name: "Elegant",
    className: "text-6xl font-serif font-light tracking-wide",
    icon: <Type className="w-4 h-4" />
  },
  {
    id: "bold",
    name: "Bold",
    className: "text-7xl font-black uppercase tracking-wider",
    icon: <Zap className="w-4 h-4" />
  },
  {
    id: "playful",
    name: "Playful",
    className: "text-5xl font-bold italic transform rotate-2",
    icon: <Smile className="w-4 h-4" />
  },
  {
    id: "minimal",
    name: "Minimal",
    className: "text-4xl font-thin tracking-widest lowercase",
    icon: <Sun className="w-4 h-4" />
  },
  {
    id: "retro",
    name: "Retro",
    className: "text-6xl font-mono font-bold uppercase tracking-tight",
    icon: <Coffee className="w-4 h-4" />
  }
];

const colorThemes: ColorTheme[] = [
  {
    id: "sunset",
    name: "Sunset",
    gradient: "from-orange-400 via-red-500 to-pink-500",
    textColor: "bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 bg-clip-text text-transparent",
    accent: "from-orange-100 to-pink-100"
  },
  {
    id: "ocean",
    name: "Ocean",
    gradient: "from-blue-400 via-cyan-500 to-teal-500",
    textColor: "bg-gradient-to-r from-blue-400 via-cyan-500 to-teal-500 bg-clip-text text-transparent",
    accent: "from-blue-100 to-teal-100"
  },
  {
    id: "forest",
    name: "Forest",
    gradient: "from-green-400 via-emerald-500 to-teal-600",
    textColor: "bg-gradient-to-r from-green-400 via-emerald-500 to-teal-600 bg-clip-text text-transparent",
    accent: "from-green-100 to-emerald-100"
  },
  {
    id: "royal",
    name: "Royal",
    gradient: "from-purple-400 via-violet-500 to-indigo-600",
    textColor: "bg-gradient-to-r from-purple-400 via-violet-500 to-indigo-600 bg-clip-text text-transparent",
    accent: "from-purple-100 to-indigo-100"
  },
  {
    id: "cosmic",
    name: "Cosmic",
    gradient: "from-pink-400 via-purple-500 to-indigo-600",
    textColor: "bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-600 bg-clip-text text-transparent",
    accent: "from-pink-100 to-indigo-100"
  }
];

const sparkleIcons = [<Sparkles />, <Star />, <Heart />, <Zap />, <Sun />];

export function HelloWorldDisplay() {
  const [currentStyle, setCurrentStyle] = useState(textStyles[0]);
  const [currentTheme, setCurrentTheme] = useState(colorThemes[0]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showSparkles, setShowSparkles] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const randomizeStyle = () => {
    setIsAnimating(true);
    const randomStyle = textStyles[Math.floor(Math.random() * textStyles.length)];
    const randomTheme = colorThemes[Math.floor(Math.random() * colorThemes.length)];
    
    setTimeout(() => {
      setCurrentStyle(randomStyle);
      setCurrentTheme(randomTheme);
      setIsAnimating(false);
      setShowSparkles(true);
      setClickCount(prev => prev + 1);
      
      toast.success(`Styled with ${randomStyle.name} & ${randomTheme.name}!`, {
        description: "Your Hello World just got a makeover!",
        duration: 2000,
      });
      
      setTimeout(() => setShowSparkles(false), 1000);
    }, 300);
  };

  const resetToDefault = () => {
    setCurrentStyle(textStyles[0]);
    setCurrentTheme(colorThemes[0]);
    setClickCount(0);
    toast.info("Reset to default style", {
      description: "Back to the elegant beginning",
      duration: 1500,
    });
  };

  useEffect(() => {
    if (clickCount > 0 && clickCount % 10 === 0) {
      toast("🎉 Style Explorer!", {
        description: `You've tried ${clickCount} different styles!`,
        duration: 3000,
      });
    }
  }, [clickCount]);

  return (
    <div className="relative w-full max-w-6xl mx-auto p-8">
      {/* Background sparkles */}
      <AnimatePresence>
        {showSparkles && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className={`absolute text-${currentTheme.gradient.split(' ')[1].replace('via-', '').replace('-500', '-400')}`}
                initial={{ 
                  opacity: 0, 
                  scale: 0,
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight
                }}
                animate={{ 
                  opacity: [0, 1, 0], 
                  scale: [0, 1.5, 0],
                  rotate: 360
                }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ 
                  duration: 1,
                  delay: i * 0.1,
                  ease: "easeOut"
                }}
              >
                {sparkleIcons[i % sparkleIcons.length]}
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      <Card className={`relative overflow-hidden bg-gradient-to-br ${currentTheme.accent} border-2 border-white/50 shadow-2xl backdrop-blur-sm`}>
        <div className="p-16 text-center space-y-8">
          {/* Main Hello World Text */}
          <motion.div
            key={`${currentStyle.id}-${currentTheme.id}`}
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 1.2 }}
            transition={{ 
              duration: 0.6,
              ease: "easeOut",
              type: "spring",
              stiffness: 100
            }}
            className="relative"
          >
            <h1 className={`${currentStyle.className} ${currentTheme.textColor} drop-shadow-lg`}>
              Hello World 4
            </h1>
            
            {/* Animated underline */}
            <motion.div 
              className={`mx-auto mt-4 h-1 bg-gradient-to-r ${currentTheme.gradient} rounded-full`}
              initial={{ width: 0 }}
              animate={{ width: "200px" }}
              transition={{ delay: 0.3, duration: 0.8 }}
            />
          </motion.div>

          <Separator className="bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

          {/* Style Info */}
          <div className="flex flex-wrap justify-center gap-4 items-center">
            <Badge variant="secondary" className="flex items-center gap-2 px-4 py-2 text-sm">
              {currentStyle.icon}
              {currentStyle.name}
            </Badge>
            <Badge variant="outline" className="flex items-center gap-2 px-4 py-2 text-sm">
              <Palette className="w-4 h-4" />
              {currentTheme.name}
            </Badge>
            {clickCount > 0 && (
              <Badge variant="default" className="flex items-center gap-2 px-3 py-1 text-xs">
                <Star className="w-3 h-3" />
                {clickCount} styles
              </Badge>
            )}
          </div>

          {/* Control Buttons */}
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Button 
              onClick={randomizeStyle}
              disabled={isAnimating}
              className={`bg-gradient-to-r ${currentTheme.gradient} hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-white border-0`}
              size="lg"
            >
              {isAnimating ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
                >
                  <RotateCcw className="w-5 h-5 mr-2" />
                </motion.div>
              ) : (
                <Sparkles className="w-5 h-5 mr-2" />
              )}
              {isAnimating ? "Styling..." : "Randomize Style"}
            </Button>
            
            <Button 
              onClick={resetToDefault}
              variant="outline"
              size="lg"
              className="hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Reset
            </Button>
          </div>

          {/* Fun Stats */}
          {clickCount > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center pt-6 border-t border-gray-200"
            >
              <p className="text-sm text-gray-600">
                🎨 You've explored <span className="font-semibold text-gray-800">{clickCount}</span> different style{clickCount !== 1 ? 's' : ''}!
              </p>
              {clickCount >= 5 && (
                <p className="text-xs text-gray-500 mt-1">
                  ✨ You're a true style explorer!
                </p>
              )}
            </motion.div>
          )}
        </div>
      </Card>

      {/* Floating action hint */}
      {clickCount === 0 && (
        <motion.div
          className="absolute -bottom-16 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <div className="bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border">
            <p className="text-sm text-gray-600 flex items-center gap-2">
              <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                👆
              </motion.div>
              Try the randomize button!
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}