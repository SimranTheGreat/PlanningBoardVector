export const DraggableNode = ({ type, label }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };

    event.target.style.cursor = 'grabbing';

    event.dataTransfer.setData(
      'application/reactflow',
      JSON.stringify(appData)
    );

    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className="
        flex
        items-center
        justify-center
        min-w-[110px]
        h-[72px]
        px-4
        rounded-2xl
        bg-gradient-to-br
        from-slate-800
        via-slate-900
        to-slate-800
        text-white
        font-medium
        text-sm
        shadow-md
        border
        border-slate-700
        cursor-grab
        select-none
        transition-all
        duration-200
        hover:-translate-y-1
        hover:shadow-xl
        hover:border-indigo-500
        hover:from-slate-700
        hover:to-slate-800
        active:cursor-grabbing
      "
      onDragStart={(event) =>
        onDragStart(event, type)
      }
      onDragEnd={(event) =>
        (event.target.style.cursor = 'grab')
      }
      draggable
    >
      <span className="tracking-wide">
        {label}
      </span>
    </div>
  );
};