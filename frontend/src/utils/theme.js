export function getClasses(theme) {
  switch (theme) {
    case "light":
      return {
        body: "bg-white text-gray-900",
        nav: "bg-gray-100 border-t border-gray-200",
        active: "text-blue-600",
        inactive: "text-gray-500",
        card: "bg-white",
        background: "bg-white",
        text: "text-gray-900",
        activeButtonBg: "bg-blue-600",
        activeButtonText: "text-white"
      };
    case "purple":
      return {
        body: "bg-gradient-to-br from-purple-700 via-purple-900 to-black text-white",
        nav: "bg-purple-900 border-t border-purple-700",
        active: "text-yellow-300",
        inactive: "text-purple-200",
        card: "bg-white bg-opacity-10 backdrop-blur",
        background: "bg-black",
        text: "text-white",
        activeButtonBg: "bg-yellow-300",
        activeButtonText: "text-purple-900"
      };
    case "auto":
      // يمكن لاحقاً ربطه بـ prefers-color-scheme
      return {
        body: "bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white",
        nav: "bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700",
        active: "text-blue-600 dark:text-yellow-300",
        inactive: "text-gray-500 dark:text-gray-300",
        card: "bg-white dark:bg-gray-800",
        background: "bg-gray-50 dark:bg-gray-900",
        text: "text-gray-900 dark:text-white",
        activeButtonBg: "bg-blue-600 dark:bg-yellow-300",
        activeButtonText: "text-white dark:text-gray-900"
      };
    case "dark":
    default:
      return {
        body: "bg-gray-900 text-white",
        nav: "bg-gray-800 border-t border-gray-700",
        active: "text-yellow-300",
        inactive: "text-gray-400",
        card: "bg-gray-800",
        background: "bg-gray-900",
        text: "text-white",
        activeButtonBg: "bg-yellow-300",
        activeButtonText: "text-gray-900"
      };
  }
} 