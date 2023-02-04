export default function Button({ name, onClick, type }) {
  return (
    <div>
      <button
        onClick={onClick}
        type={type || 'button'}
        className='group relative flex justify-center rounded-md border border-transparent bg-orange-500 py-2 px-4 text-sm font-medium text-white hover:bg-orange-600 '
      >
        <span className='absolute inset-y-0 left-0 flex items-center pl-3'></span>
        {name}
      </button>
    </div>
  );
}
