import Spinner from "@/components/Spinner";
import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  useEffect,
} from "react";

interface LoadingContextType {
  loading: boolean;
  setIsLoading: (isLoading: boolean, loadingMessage?: string) => void;
  setIsLoadingTransparent: (
    isLoading: boolean,
    loadingMessage?: string
  ) => void;
  setIsLoadingScrollToTop: (isLoading: boolean) => void;
  //   moveScrollToTop: (param?: {
  //     top?: number;
  //     behavior?: "smooth" | "instant";
  //   }) => void;
}

// Context
const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

// Provider
export const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [isBgColorHidden, setIsBgColorHidden] = useState(false);

  useEffect(() => {}, []);

  // 로딩 처리
  const setIsLoading = (isLoading: boolean, loadingMessage?: string) => {
    setLoading(isLoading);
    setLoadingMessage(loadingMessage || "");
    setIsBgColorHidden(false);
  };

  const setIsLoadingTransparent = (
    isLoading: boolean,
    loadingMessage?: string
  ) => {
    setLoading(isLoading);
    setLoadingMessage(loadingMessage || "");
    setIsBgColorHidden(true);
  };

  // 로딩 처리후 스크롤 상단으로 이동
  const setIsLoadingScrollToTop = (isLoading: boolean) => {
    setLoading(isLoading);
    // moveScrollToTop();
  };

  return (
    <LoadingContext.Provider
      value={{
        loading,
        setIsLoading,
        setIsLoadingTransparent,
        setIsLoadingScrollToTop,
      }}
    >
      {loading && (
        <div
          className={`fixed inset-0 z-50 flex flex-col items-center justify-center ${
            isBgColorHidden ? "bg-transparent" : "bg-black opacity-50"
          }`}
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full">
            <Spinner />
          </div>
          <p className="text-white">{loadingMessage}</p>
        </div>
      )}
      {children}
    </LoadingContext.Provider>
  );
};

// Hook
export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};
