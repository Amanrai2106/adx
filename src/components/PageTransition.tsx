"use client";
import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface PageTransitionContextType {
  navigate: (href: string) => void;
  isLoading: boolean;
}

const PageTransitionContext = createContext<PageTransitionContextType | undefined>(undefined);

export function usePageTransition() {
  const context = useContext(PageTransitionContext);
  if (!context) {
    throw new Error("usePageTransition must be used within a PageTransitionProvider");
  }
  return context;
}

export const PageTransitionProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const [isLoading, setIsLoading] = useState(false);
  const isNavigatingRef = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Helper to check if all critical assets are loaded
  const checkAssetsLoaded = async () => {
    try {
        // 1. Check document readiness
        if (document.readyState !== 'complete') {
            await new Promise<void>(resolve => {
                const handler = () => {
                    window.removeEventListener('load', handler);
                    resolve();
                };
                window.addEventListener('load', handler);
                // Fallback check
                const interval = setInterval(() => {
                    if (document.readyState === 'complete') {
                        clearInterval(interval);
                        window.removeEventListener('load', handler);
                        resolve();
                    }
                }, 100);
            });
        }

        // 2. Check all images in the DOM
        const images = Array.from(document.images);
        const imagePromises = images.map(img => {
            if (img.complete && img.naturalHeight !== 0) return Promise.resolve();
            return new Promise<void>(resolve => {
                const handler = () => {
                    img.removeEventListener('load', handler);
                    img.removeEventListener('error', handler);
                    resolve();
                };
                img.addEventListener('load', handler);
                img.addEventListener('error', handler);
            });
        });

        // Wait for all images or a maximum timeout per image check
        await Promise.race([
            Promise.all(imagePromises),
            new Promise(resolve => setTimeout(resolve, 3000)) // Max 3s wait for images
        ]);

        // 3. Optional: Check for any specific custom elements or logic if needed
        // For now, a small buffer ensures DOM paint
        await new Promise(resolve => setTimeout(resolve, 500));

    } catch (error) {
        console.warn("Asset check warning:", error);
    }
  };

  const navigate = async (href: string) => {
    // Resolve href to absolute path to compare with current location
    const currentUrl = new URL(window.location.href);
    // Handle relative paths by using current origin
    const targetUrl = new URL(href, window.location.origin);

    const isSamePage = targetUrl.pathname === currentUrl.pathname && 
                       targetUrl.search === currentUrl.search;

    if (isSamePage) {
        // If only hash changed, just push (handles scrolling) without loader
        if (targetUrl.hash !== currentUrl.hash) {
            router.push(href);
        }
        return;
    }
    
    // Clear any existing timeouts
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    setIsLoading(true);
    isNavigatingRef.current = true;

    // Minimum display time for loader entrance animation
    await new Promise(resolve => setTimeout(resolve, 800));

    router.push(href);
    
    // Safety fallback: if navigation fails or hangs indefinitely
    timeoutRef.current = setTimeout(() => {
        if (isNavigatingRef.current) {
            console.warn("Navigation timeout - forcing loader hide");
            setIsLoading(false);
            isNavigatingRef.current = false;
        }
    }, 10000); // 10 seconds max safety
  };

  // Effect to handle route changes
  useEffect(() => {
    if (isNavigatingRef.current) {
        // We are effectively on the new route (or component tree)
        const handleRouteLoad = async () => {
            // Wait for assets to be ready on the new page
            await checkAssetsLoaded();
            
            setIsLoading(false);
            isNavigatingRef.current = false;
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };

        // Defer slightly to ensure React has mounted the new tree
        const t = setTimeout(handleRouteLoad, 50);
        return () => clearTimeout(t);
    }
  }, [pathname, searchParams]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <PageTransitionContext.Provider value={{ navigate, isLoading }}>
      {children}
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[10005] flex items-center justify-center bg-black"
          >
             {/* Loader Content */}
             <div className="flex flex-col items-center gap-8">
                {/* Logo Animation */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ 
                        scale: [0.8, 1.1, 1],
                        opacity: 1,
                    }}
                    transition={{ 
                        duration: 1.5,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                    }}
                    className="relative w-40 h-16 md:w-60 md:h-24"
                >
                    <Image 
                        src="/logo.png" 
                        alt="Loading..." 
                        fill 
                        className="object-contain brightness-0 invert"
                        priority
                    />
                </motion.div>

                {/* Progress Bar / Line - Indeterminate Animation */}
                <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ x: "100%" }}
                        transition={{ 
                            duration: 1.5, 
                            repeat: Infinity, 
                            ease: "easeInOut" 
                        }}
                        className="w-full h-full bg-orange-600"
                    />
                </div>

                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-white/50 text-sm font-light tracking-widest uppercase font-aboreto"
                >
                    Loading Experience
                </motion.p>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransitionContext.Provider>
  );
};
