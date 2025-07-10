export const MainSection = () => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center bg-gradient-to-b from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 gap-6">
      <h1 className="text-5xl font-extrabold tracking-tight text-gray-800 dark:text-white animate-fade-in">
        CodeSpace 🚀
      </h1>
      <h3 className="text-xl font-medium text-gray-600 dark:text-gray-300 animate-fade-in-slow">
        code → summit → repeat
      </h3>
      <p className="max-w-2xl text-gray-500 dark:text-gray-400 text-base sm:text-lg leading-relaxed animate-fade-in-slower">
        Want to master Data Structures & Algorithms? <br />
        Ready to enhance your problem-solving skills? <br />
        <span className="font-semibold text-blue-600 dark:text-blue-400">This platform is built for you.</span>
      </p>
      <a href="/login" className="mt-6 inline-block px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-lg transition duration-300 shadow-md">
        Get Started
      </a>
    </div>
  );
};
