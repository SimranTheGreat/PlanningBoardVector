// submit.js

export const SubmitButton = () => {
  return (
    <div className="flex items-center justify-center py-4">
      <button
        type="submit"
        className="
          group
          relative
          overflow-hidden
          px-8
          py-3
          rounded-xl
          font-semibold
          text-white
          bg-gradient-to-r
          from-indigo-600
          via-violet-600
          to-indigo-600
          shadow-lg
          shadow-indigo-500/30
          transition-all
          duration-300
          hover:scale-105
          hover:shadow-xl
          hover:shadow-violet-500/40
          active:scale-95
        "
      >
        <span className="relative z-10 flex items-center gap-2">
          🚀 Submit Pipeline
        </span>

        <span
          className="
            absolute
            inset-0
            bg-white/20
            translate-x-[-100%]
            group-hover:translate-x-[100%]
            transition-transform
            duration-700
          "
        />
      </button>
    </div>
  );
};