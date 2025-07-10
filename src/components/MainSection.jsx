export const MainSection = () => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 text-center gap-5 bg-gradient-to-br">
      <h1 className="text-5xl font-extrabold drop-shadow-md">
        Code Space
      </h1>

      <h3 className="text-xl font-semibold text-gray-600">
        code → submit → repeat
      </h3>

      <p className="max-w-xl text-gray-700 text-md">
        Want to master <span className="font-medium text-indigo-600">Data Structures</span> and 
        <span className="font-medium text-indigo-600"> Algorithms</span>? <br />
        Want to improve your <span className="font-medium text-indigo-600">problem-solving skills</span>?
        This platform is built for you.
      </p>

      <div className="flex gap-4 mt-4">
        <a
          href="/"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition duration-300"
        >
          Get Started
        </a>
        <a
          href="/login"
          className="border border-blue-600 hover:bg-blue-50 text-blue-600 font-semibold px-6 py-2 rounded-lg transition duration-300"
        >
          Already have an account?
        </a>
      </div>
    </div>
  );
};
