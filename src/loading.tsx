export default function Loader() {
  return (
    <div className="flex items-center justify-center h-screen bg-linear-to-br from-black via-gray-900 to-black">
      <div className="flex flex-col items-center gap-5">
        <div className="w-14 h-14 rounded-full border-4 border-transparent border-t-purple-500 border-r-pink-500 animate-spin"></div>

        <p className="text-gray-300 text-sm tracking-widest animate-pulse">
          LOADING...
        </p>
      </div>
    </div>
  );
}
